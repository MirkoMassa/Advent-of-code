import fs from 'fs'

export function supplyStacks(crates:string, op:string):string{

    type operations = {
        moves: number,
        startpos:number,
        endpos: number
    }
    //parsing crates
    let content = fs.readFileSync(crates, 'utf-8').split("\r\n");
    // console.log(content)

    // number of stacks
    let stacks = content.pop();
    stacks = stacks?.charAt(stacks.length-2);
    // console.log(stacks)
    // console.log(content)

    // initializing empty stacks
    let crateStacks:string[][] = [];
    for(let i = 0; i<parseInt(stacks!); i++){
        crateStacks[i] = [];
    }
    // creating stacks
    for (let i = content.length-1; i >= 0; i--) {
        const elem = content[i];
        
        let pos = 0;
        for(let j = 1; j<elem.length; j+=4){
            
            if(elem[j] != " "){
                crateStacks[pos].push(elem[j])
            }

            pos++;
        }
        
    }

    // parsing operations
    content = fs.readFileSync(op, 'utf-8').split("\r\n");
    //creating the operations array
    let ops:operations[] = [];
    content.map((elem, i)=>{
        ops.push({
            moves:parseInt(elem[5]+elem[6]),
            //-1 because array index starts from 0
            startpos: parseInt(elem[12]+elem[13])-1,
            endpos: parseInt(elem[17]+elem[18])-1
        })
        //logging the output to be sure

        // console.log("operation: "+elem+". Moves:  "+
        // ops[i].moves+" - "+
        // ops[i].startpos+" - "+
        // ops[i].endpos)
    })
    //creating the string containing top crates from each stack
    let topcrates:string = "";
    //part 1 moves
    /*

    for (const operation of ops) {

        for (let j = 0; j < operation.moves; j++) {
            crateStacks[operation.endpos].push(crateStacks[operation.startpos].pop()!);
        }
    }
    console.log(crateStacks);
    
    crateStacks.forEach(stack => {
        // idk why concat was not working with pop() so I did this
        topcrates = topcrates+stack.pop()
    });
    
    // return topcrates; // part 1 output
    */

    //part 2 solution
    // console.log(crateStacks)
    topcrates = "";

    for (const operation of ops) {
        //if there is just 1 element to move
        if(operation.moves == 1){
            crateStacks[operation.endpos].push(crateStacks[operation.startpos].pop()!);
            continue;
        }
        const substack:string[] = [];

        for (let j = 0; j < operation.moves; j++) {
            substack.push(crateStacks[operation.startpos].pop()!);
        }
        for (let j = 0; j < operation.moves; j++) {
            crateStacks[operation.endpos].push(substack.pop()!);
        }

    }
    // *NOT WORKING*
    // for (const operation of ops) {

    //     //if there is just 1 element to move
    //     if(operation.moves == 1){
    //         crateStacks[operation.endpos].push(crateStacks[operation.startpos].pop()!);
    //         console.log(operation.moves+" ")
    //         console.log(crateStacks)
    //         continue;
    //     }
    //     //positions of the first element to move in the stack
    //     const firstcell = crateStacks[operation.startpos].length - operation.moves;

    //     console.log(firstcell)
    //     crateStacks[operation.endpos].push(...crateStacks[operation.startpos].slice(firstcell))
    //     for (let i = firstcell; i < operation.moves; i++) {
    //         crateStacks[operation.startpos].pop();
    //     }
    //     console.log(operation.moves+" ")
    //     console.log(crateStacks)
    // }



    crateStacks.forEach(stack => {
        topcrates = topcrates+stack.pop()
    });
    return topcrates;
}

// console.log(supplyStacks("./cratesexample.txt", "./operationsexample.txt"))
console.log(supplyStacks("./crates.txt", "./operations.txt"))