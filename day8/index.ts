import fs from 'fs'

export function Treetop(file:string){

    let content = fs.readFileSync(file, 'utf-8').split("\r\n").map(elem =>elem.split("").map(elem =>parseInt(elem)))

    const OUTERS:number = ((content[0].length*2)+(content.length*2))-4;
    console.log(OUTERS);
    let visibles :number= OUTERS;
    let inner:number[][] = [];
    //creating a deep copy
    content.forEach(elem=>{
        const copy = Array.from(elem);
        copy.shift();
        copy.pop();
        inner.push(copy);
    })
    inner.shift();
    inner.pop();
    
    console.log("inner",inner)
    console.log("content",content)

    inner.forEach((trees:number[], index:number)=>{
        
        visibles+= trees.reduce((total:number, currtree:number, i:number, trees:number[])=>{
            let isnotvisible = 0; //when equal to 4 the tree is not visible from any direction
            const row = content[index+1];
            console.log("riga",row)
            //checking left
            for (let j = 0; j < i+1; j++) {
                
                if(row[j] >= currtree){
                    // console.log(currtree+" sinistra")
                    isnotvisible++;
                    break;
                }
            }
            //checking right
            for (let j = i+2; j < row.length; j++) {

                if(row[j] >= currtree){
                    // console.log(currtree+" destra")
                    isnotvisible++;
                    break;
                }
            }
            //checking up
            for (let j = 0; j <= index; j++) {

                if(content[j][i+1] >= currtree){
                    // console.log(currtree+" su")
                    isnotvisible++;
                    break;
                }
            }
            //checking down
            for (let j = index+2 ; j < content.length; j++) {

                if(content[j][i+1] >= currtree){
                    // console.log(currtree+" giu")
                    isnotvisible++;
                    break;
                }
            }
            if(isnotvisible != 4){
                
                total++;
            }
            return total;
        }, 0)
    })
    console.log("totale visibili: "+ visibles)
}

// console.log(Treetop('./test.txt'));
console.log(Treetop('./input.txt'));