import fs from 'fs'
type dir = 'U' | 'D' | 'L' | 'R';
type move = {dir: dir, steps: number}
type Point = {x: number, y: number};

function down({x,y}: Point): Point {
    return {x, y: y-1}
}
function up({x,y}: Point): Point {
    return {x, y: y+1}
}
function left({x,y}: Point): Point {
    return {x: x-1, y}
}
function right({x,y}: Point): Point {
    return {x: x+1, y}
}
function relativePos(head: Point, tail: Point){
    let move:Point = tail;

    if(head.x - tail.x > 0){
        move = right(move);
    }
    else if(head.x - tail.x < 0){
        move = left(move);
    }

    if(head.y - tail.y < 0){
        move = down(move);
    }
    else if(head.y - tail.y > 0){
        move = up(move);
    }

    return move;
}
function pointToString(point:Point):string{

    return ""+point.x+","+point.y;
}
/*
...
.0.
..X = 1.44 SqRt(2)
long side = a
0,0 is at the top of the triangle
|\
| \
|  \
----
(0,1) is the bottom left corner, and (1,1) is the bottom right corner of the triangle
distance is the length of the hypotenuse
solve for c
sqrt(a^2 + b^2) = c
base = b
hypotenuse is c
a^2 + b^2 = c^2
length of the tall side is (y2-y1) = a;
length of the base is (x2-x1) = b

sqrt(a^2 + b^2) = c
==
Math.sqrt( (x2-x1)**2 + (y2-y1)**2 );

*/
//[0,0], [1,1]
function distance(pos1: Point, pos2: Point): number {
    
    return Math.sqrt((pos2.x - pos1.x)**2 + (pos2.y - pos1.y)**2);
}

export function rope(file:string){

    let content:move[] = fs.readFileSync(file, 'utf-8').split("\r\n").map((elem):move=>{
        let [direction, numsteps] = elem.split(" ") as [dir, string];
        return {
            dir: direction,
            steps: parseInt(numsteps)
        }
    });
    console.log(content);
    console.log(distance({x:1,y:1}, {x:0,y:2}))
    // let maxmove = Math.max(...content.map(elem => elem.steps));

    // let currentPos = new Array(maxmove);
    // currentPos.fill([]);
    // for (let i = 0; i < maxmove; i++) {
    //     for (let j = 0; j < maxmove; j++) {
    //         currentPos[i][j] = '.'
    //     }
    // }
    // currentPos[4][1] = 'S';
    // console.log(currentPos)

    const uniquePos = new Set<string>;
    uniquePos.add('0,0');
    let head:Point = {x:0, y:0};
    let tail:Point = {x:0, y:0};

    content.forEach(move=>{
        for (let i = 0; i < move.steps; i++){
            switch(move.dir){
                case 'U':head = up(head); break;
                case 'D':head = down(head); break;
                case 'L':head = left(head); break;
                case 'R':head = right(head); break;
            }

            if(distance(tail, head)>=2){
                tail = relativePos(head, tail);
            }
        
            uniquePos.add(pointToString(tail))
        }
        
         
    })
    console.log(uniquePos)
    return uniquePos.size;
}

// console.log(rope('./test.txt'));
console.log(rope('./input.txt'));