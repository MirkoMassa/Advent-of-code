import fs from 'fs'

class files {
    constructor(public dim:number, public parent: dir, public elem:string){
        this.dim = dim;
        this.parent = parent;
        this.elem = elem;
    }
}
//just noticed the name was useless in the final output so this type is heavier
//than it should be
type simpledir = {dim:number, name:string}

class dir {
    public files: files[] | null;
    public next: dir[];
    public localsize:number;
    constructor(public elem:string, public prev:dir|null = null){
        this.localsize = 0;
        this.elem = elem;
        this.prev = prev;
        this.files = [];
        this.next = [];
    }

    
    allDir(accum:simpledir[] = [{dim: this.localsize, name:this.elem}]):simpledir[]{

        for(let nextdir of this.next){
            accum.push({
                dim: nextdir.localsize,
                name: nextdir.elem
            })
            if(nextdir.next != null){
                nextdir.allDir(accum)
            }
        }
        return accum;
        
            
    }
    setSize(){
        //setting inner dir size recursively 
        for(let nextdir of this.next){
            nextdir.setSize();
            //adding up child dir sizes iteratively
            this.localsize+= nextdir.localsize;
        }

        //setting size of local dir iteratively
        for(let file of this.files!){
            this.localsize+= file.dim;
        }
        
    }

    // getRoot(currdir:dir):dir | undefined{
    //     if(currdir.prev == null){
    //         return currdir;
    //     }
    //     this.getRoot(currdir.prev)
    // }
}

export function noSpaceLeft(file:string){

    let content = fs.readFileSync(file, 'utf-8').split("\r\n");
    console.log(content);
    let root:dir = new dir('/');
    let currentdir: dir;

    
    content.forEach((elem, index)=>{
        // console.log("cycle - "+index)
        // console.log(elem.slice(5, 8))
        if(elem.slice(0, 4) === '$ cd'){
            if(elem.slice(5, 7) === '..'){
                let olddir = currentdir;
                currentdir = currentdir.prev!;
                if(currentdir == null) {
                    // console.log(JSON.stringify(root,(key, value) => key == "prev" || key == "parent" ? undefined : value ,2));
                    // console.log(olddir.elem, elem)
                    throw new Error("Directory is null");
                }
            }
            if(elem.slice(5, 7) === '/'){
                currentdir = root;
            }
            else{
                // console.log(elem.slice(5, elem.length))
                currentdir.next.forEach(dir => {
                    if(dir.elem === elem.slice(5, elem.length)){   
                        currentdir = dir;
                    }
                });
                
                
            }
        }

        //reading directories and files of the current folder
        if(elem.slice(0, 4) === '$ ls'){}

        // console.log("pronti "+elem)
        if(elem.slice(0, 3) === 'dir'){ //dir creation
            // console.log("DIR")
            currentdir.next.push(new dir(elem.slice(4, elem.length), currentdir));
        }
        else if(elem.match(/^\d/)){ //file creation (if starts with numbers)
            const dimension: number = parseInt(elem);
            const filename: string = elem.replace(dimension+"", "").trim() 
            // console.log("elem ",filename+" dimension "+dimension);
            currentdir.files?.push(new files(dimension, currentdir, filename));
            
        }
        
        
    })
    //logging entire list
    root.setSize();
    // console.log(JSON.stringify(root,(key, value) => key == "prev" || key == "parent" ? undefined : value ,2));

    const dirs = root.allDir();
    let sum = 0;

    dirs.forEach(elem => {
        if(elem.dim<=100000){
            sum+=elem.dim;
        }
    });
    
    // return sum; // part 1 output 
}

//console.log(noSpaceLeft('./test.txt'));
console.log(noSpaceLeft('./input.txt'));