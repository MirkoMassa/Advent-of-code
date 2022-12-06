import fs from 'fs'

export function tuningTrouble(file:string):number | undefined{
    let content = fs.readFileSync(file, 'utf-8');

    for(let i = 0; i<content.length; i++){
        const group = new Set();

        //start of packet marker
        for(let j = 0; j<4; j++){
            group.add(content[i+j]);
        }
        //if(group.size == 4) return i+4; // part 1 output

        //part 2, start of message marker 
        for(let j = 0; j<14; j++){
            group.add(content[i+j]);
        }
        if(group.size == 14) return i+14;
    }
}
// console.log(tuningTrouble('./test.txt'));
console.log(tuningTrouble('./input.txt'));