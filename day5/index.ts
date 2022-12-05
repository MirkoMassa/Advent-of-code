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
    for (const operation of ops) {

        for (let j = 0; j < operation.moves; j++) {
            crateStacks[operation.endpos].push(crateStacks[operation.startpos].pop()!);
        }
    }
    console.log(crateStacks);
    //creating the string containing top crates from each stack
    let topcrates:string = "";
    crateStacks.forEach(stack => {
        // idk why concat was not working with pop() so I did this
        topcrates = topcrates+stack.pop()
    });
    
    return topcrates;
}

// console.log(supplyStacks("./cratesexample.txt", "./operationsexample.txt"))
console.log(supplyStacks("./crates.txt", "./operations.txt"))