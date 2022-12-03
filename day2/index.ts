//https://adventofcode.com/2022/day/2
import fs from 'fs';

/*
ABC = elf move
XYZ = my move

A Rock X - 1 point
B Paper Y - 2 points
C Scissors Z - 3 points

round loss = 0 points, draw = 3 points, round won = 6 points
*/
export function rockPaperScissors(file:string):number{

    class Relation<A, B>{
        constructor(public elements: Set<[A, B]>){}
        
        //tuple check
        has(element:[A, B]):boolean{
            for (const elem of this.elements) {
                if(element[0] === elem[0] && element[1] === elem[1]){
                    return true;
                }
            }
            return false;
        }
    } 
    type hands = "rock" | "paper" | "scissors";

    type ophands = "A" | "B" | "C";
    type myhands = "X" | "Y" | "Z";

    const ophandsval: {[key in ophands]: hands} = {

        "A": "rock",
        "B": "paper",
        "C": "scissors"
    }
    const myhandsval: {[key in myhands]: hands} = {

        "X": "rock",
        "Y": "paper",
        "Z": "scissors"
    }
    const points: {[key in hands]: number} = {
        "rock": 1,
        "paper": 2,
        "scissors": 3
    }

    let rps = new Relation(new Set<[hands, hands]>([["rock","paper"], ["paper", "scissors"], ["scissors","rock"]]));
    
    const content:string = fs.readFileSync(file, 'utf-8');
    let pairs = content.split("\r\n").map(elem => elem.split(" ")) as [ophands, myhands][];

    // console.log(pairs);

    let score:number = 0; 

    pairs.forEach((elem)=>{
        if(rps.has([ophandsval[elem[0]], myhandsval[elem[1]]])){
            // console.log("vinto"); // WIN
            score += 6 + points[myhandsval[elem[1]]];
        }
        else if(ophandsval[elem[0]] === myhandsval[elem[1]]){
            // console.log("pareggio"); // DRAW
            score += 3 + points[myhandsval[elem[1]]];
        }
        else{
            // console.log("perso"); // LOST
            score += points[myhandsval[elem[1]]]
        }
    })
    return score;
}

console.log(rockPaperScissors('./test.txt'))
console.log(rockPaperScissors('./input.txt'))