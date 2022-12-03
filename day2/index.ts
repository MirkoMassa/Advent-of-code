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
        // functions for part 2
        opwin(hand: A){
            for (const elem of this.elements) {
                if(hand === elem[0]){
                    return elem[1];
                }
            }
        }
        oplose(hand: B){
            for (const elem of this.elements) {
                if(hand === elem[1]){
                    return elem[0];
                }
            }
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
    // return score; // part 1 output


    // part 2 // different meaning for XYZ

    let mychoice:hands;
    score = 0;

    pairs.forEach((elem)=>{
        if(elem[1] === "X"){ // need to lose, X = 0 points
            console.log(ophandsval[elem[0]]);
            console.log("lose, choice: ",mychoice);
            mychoice = rps.oplose(ophandsval[elem[0]])!;
            score += points[mychoice];
        }
        else if(elem[1] === "Y"){ // need to draw, Y = 3 points
            console.log(ophandsval[elem[0]]);
            console.log("draw, choice: ",ophandsval[elem[0]]);
            score += 3 + points[ophandsval[elem[0]]];
        }
        else{ // need to win, Z = 6 points
            console.log(ophandsval[elem[0]]);
            console.log("win, choice: ",mychoice);
            mychoice = rps.opwin(ophandsval[elem[0]])!;
            score += 6 + points[mychoice];

        }
    })
    return score;
}

console.log(rockPaperScissors('./test.txt'))
console.log(rockPaperScissors('./input.txt'))