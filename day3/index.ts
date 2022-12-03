//https://adventofcode.com/2022/day/3
import fs from 'fs'
// Ascii codes
// a : 97 | z : 122
// A : 65 | Z : 90

export function rucksack(file:string): number{
    const priorities: {[key: string]: number} = {}
    for(let i = 0; i<26; i++){
        priorities[String.fromCharCode(97+i)] = i+1;
    }
    for(let i = 0; i<26; i++){
        priorities[String.fromCharCode(65+i)] = i+27;
    }
    // console.log(priorities)

    //second half
    let content:string[] = fs.readFileSync(file, 'utf-8').split("\r\n");;
    //first half
    let firsthalf:string[] = content.map(elem => elem.slice(0, elem.length/2));
    content = content.map(elem => elem.slice(elem.length/2, elem.length));

    // console.log(firsthalf);
    // console.log(content);

    let sum = 0;

    firsthalf.forEach((elem, i)=> {
        const shSet = new Set();
        
        for(let j = 0; j<content[i].length;j++){
            shSet.add(content[i][j]);
        }


        for(let j = 0; j<elem.length;j++){

            if(shSet.has(elem[j])){
                sum += priorities[elem[j]];
                // console.log(elem[j])
                // console.log(sum)
                break;
            }
        }


    });

    return sum;
}

// rucksack('./test.txt')
console.log(rucksack('./input.txt'))
