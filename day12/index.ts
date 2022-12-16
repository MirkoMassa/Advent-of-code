import fs from 'fs';

const elevations: {[key: string]: number} = {}
    for(let i = 0; i<26; i++){
        elevations[String.fromCharCode(97+i)] = i+1;
    }
elevations['S'] = 1;
elevations['E'] = 27;
//S (my starting position) has elevation a, E (goal) has elevation z

type coordinates = {x:number, y:number};

class mapNode {

    public isEnd:boolean;

    public up:mapNode | null;
    public down:mapNode | null;
    public left:mapNode | null;
    public right:mapNode | null;
    public distance:number;

    constructor(public elevation:number, public coordinates:coordinates)
    {
        this.elevation = elevation;
        this.coordinates = coordinates;
        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;

        this.isEnd = false;
        this.distance = Infinity;
    }
}

function hillClimbing(file:string){

    // parsing
    let hillMapUnparsed = fs.readFileSync(file, 'utf-8').split('');
    hillMapUnparsed = hillMapUnparsed.filter(elem => elem != '\r');
    const rowlength = hillMapUnparsed.indexOf('\n');
    const columnslength = hillMapUnparsed.reduce((dups, char) =>{
        if (char == '\n') dups++;
        return dups;
    }, 1)

    hillMapUnparsed = hillMapUnparsed.filter(elem => elem != '\n');
    let hillMapChars:string[][] = [];
    for (let i = 0; i < columnslength*rowlength; i+=rowlength) {
        // console.log(JSON.stringify(hillMapUnparsed.slice(i, rowlength+i)));
        hillMapChars.push(hillMapUnparsed.slice(i, rowlength+i));
    }

    // that part is useless I guess, since I can do it while creating the nodes 
    // and I don't need the x y positions, S and E values have been saved in the
    //elevations object

    // //creating start and end nodes
    // //saving starting and ending pos as [x, y] tuples
    // let startpos:number[] = [];
    // let endpos:number[] = [];
    // hillMapChars.forEach((row, index1) =>{
    //     row.forEach((hill, index2)=>{
    //         if(hill === 'S'){
    //             startpos.push(index1, index2)
    //         }
    //         if(hill === 'E'){
    //             endpos.push(index1, index2)
    //         }
    //     })
    // })

    let starting:mapNode;
    let currnode:mapNode;
    let nodemap = hillMapChars.map((row, ir) =>{ //ir = row
        // current node selector after each row

        return row.map((hill, ih)=>{ //ih = column

            currnode = new mapNode(elevations[hill], {x:ir, y:ih});
            if(hill == 'S') starting = currnode;
            if(hill == 'E') currnode.isEnd = true;
            
            return currnode;
        })
    })
    nodemap.forEach((row, ir)=>{
        row.forEach((hill, ih)=>{
            //Check the neighboring nodemap node if its height is no more than 1 above
            //if so then add a connection, otherwise move on
            
            if(ir != 0){
                if(nodemap[ir-1][ih].elevation <= hill.elevation+1) hill.up = nodemap[ir-1][ih];
            }
            if(ir != columnslength-1){
                if(nodemap[ir+1][ih].elevation <= hill.elevation+1) hill.down = nodemap[ir+1][ih];
            }
            if(ih != 0){
                if(nodemap[ir][ih-1].elevation <= hill.elevation+1) hill.left = nodemap[ir][ih-1];
            }
            if(ih != rowlength-1){
                if(nodemap[ir][ih+1].elevation <= hill.elevation+1) hill.right = nodemap[ir][ih+1];
            }
        })
    })
    let visited = new Set();
    starting!.distance = 0;
    let queue:mapNode[] = [];
    let endnode:mapNode;
    queue.push(starting!);

    while(queue.length!=0){
        const currnode:mapNode = queue.shift()!;
        if(currnode.isEnd){
            endnode = currnode;
        }
        if(currnode.up){
            if(!visited.has(currnode.up)){
                queue.push(currnode.up);
                visited.add(currnode.up);
            } 
            currnode.up.distance = Math.min(currnode.distance+1, currnode.up.distance);
            
        }
        if(currnode.down){
            if(!visited.has(currnode.down)){
                queue.push(currnode.down);
                visited.add(currnode.down);
            }
            currnode.down.distance = Math.min(currnode.distance+1, currnode.down.distance);
            
        }
        if(currnode.left){
            if(!visited.has(currnode.left)){
                queue.push(currnode.left);
                visited.add(currnode.left);
            } 
            currnode.left.distance = Math.min(currnode.distance+1, currnode.left.distance);
           
        }
        if(currnode.right){
            if(!visited.has(currnode.right)){
                queue.push(currnode.right);
                visited.add(currnode.right);
            }
            currnode.right.distance = Math.min(currnode.distance+1, currnode.right.distance);
            
        }

    }
    return endnode!.distance;
}

// console.log(hillClimbing('./test.txt'));
console.log(hillClimbing('./input.txt'));