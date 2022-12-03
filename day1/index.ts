//https://adventofcode.com/2022/day/1

import fs from 'fs';

export function maxTotalCalories(file:string){

    const content:string = fs.readFileSync(file, 'utf-8');
    const data:number[][] = content.split("\n\n").filter(elem => elem.length!=0).map(elem => elem.split("\r\n\r\n").map(elem => elem.split("\r\n").map(elem => parseInt(elem)))).flat(1);
    let sums:number[] = [];

    data.forEach(element => {
        sums.push(element.reduce((sum, n)=> sum + n, 0))
        
    });

    
    //return Math.max(...sums);  //part 1 output

    
    //part 2 - very naive solution but it works
    let max = Math.max(...sums)
    let sum = max;
    sums = sums.filter(elem => elem != max);
    max = Math.max(...sums)
    sum += max;
    sums = sums.filter(elem => elem != max);
    sum += Math.max(...sums)
    
    return sum;
}

console.log(maxTotalCalories('./input.txt'));
