import fs from 'fs';

const elevations: {[key: string]: number} = {}
    for(let i = 0; i<26; i++){
        elevations[String.fromCharCode(97+i)] = i+1;
    }
elevations['S'] = 1;
elevations['E'] = 27;
//S (my starting position) has elevation a, E (goal) has elevation z


class mapNode {

    public isEnd:boolean;

    public up:mapNode | null;
    public down:mapNode | null;
    public left:mapNode | null;
    public right:mapNode | null;

    constructor(public elevation:number)
    {
        this.elevation = elevation;
        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;

        this.isEnd = false;
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

    //this will be the node x:-1, y:0
    const root = new mapNode(-1);
    let currnode: mapNode | null = root;

    let starting:mapNode;
    hillMapChars.forEach((row, ir) =>{ //ir = row

        // current node selector after each row
        if(ir>0) currnode = root.right;

        row.forEach((hill, ih)=>{ //ih = column
            if(currnode == root){ //just on the first cycle, referencing hill (0,0)
                root.right = new mapNode(elevations[hill]);
                currnode = root.right;
                console.log("root ",root);
            }
            else currnode = new mapNode(elevations[hill]);
            if(hill == 'S') starting = currnode;
            if(hill == 'E') currnode.isEnd = true;
            let up:mapNode | null, down:mapNode | null, left:mapNode | null, right:mapNode | null;
            up = down = left = right = null;
            let char;
            if(ir != 0){
                char = hillMapChars[ir-1][ih];
                if(elevations[char] <= elevations[hill]+1) up = new mapNode(elevations[char]);
            } 
            if(ir != columnslength-1){
                char = hillMapChars[ir+1][ih];
                console.log("down", char)
                if(elevations[char] <= elevations[hill]+1) down = new mapNode(elevations[char]);
            } 
            if(ih != 0){
                char = hillMapChars[ir][ih-1];
                if(elevations[char] <= elevations[hill]+1) left = new mapNode(elevations[char]);
            } 
            if(ih != rowlength){
                char = hillMapChars[ir][ih+1];
                if(elevations[char] <= elevations[hill]+1) right = new mapNode(elevations[char]);
            }
            currnode!.up = up;
            currnode!.down = down;
            currnode!.left = left;
            currnode!.right = right;
        })
    })

    console.log(root)
    
}

console.log(hillClimbing('./test.txt'));
// console.log(hillClimbing('./input.txt'));