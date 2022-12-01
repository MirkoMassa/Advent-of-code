//https://adventofcode.com/2022/day/1

import fs from 'fs';

export function maxTotalCalories(file:string){

    let content:string = fs.readFileSync(file, 'utf-8');
    let data:number[][] = content.split("\n\n").filter(elem => elem.length!=0).map(elem => elem.split("\r\n\r\n").map(elem => elem.split("\r\n").map(elem => parseInt(elem)))).flat(1);
    let sums:number[] = [];

    data.forEach(element => {
        sums.push(element.reduce((sum, n)=> sum + n, 0))
        
    });

    
    return Math.max(...sums);
}

console.log(maxTotalCalories('./input.txt'));