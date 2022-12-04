import fs from 'fs'

type couples = {
    start: number,
    end: number
} 
export function campCleanup(file:string): number{

    let content = fs.readFileSync(file, 'utf-8').split("\r\n").map(elem=>elem.split(","));
    
    let data:couples[] = [];
    content.map((elem)=>elem.forEach((elem) => {
        let dash = elem.indexOf("-");
        data.push({
            start: parseInt(elem.slice(0, dash)),
            end: parseInt(elem.slice(dash+1, elem.length))
        })
    }))
    let overlaps = 0;

    for (let i = 0; i < data.length; i+=2) { 
        if(data[i].start >= data[i+1].start && data[i].end <= data[i+1].end){
            //if el 1 is containend in el 2
            // console.log("case 1")
            // console.log(data[i])
            // console.log(data[i+1])
            overlaps++;
            continue;
        }
        if(data[i+1].start >= data[i].start && data[i+1].end <= data[i].end){
            //if el 2 is containend in el 1
            // console.log("case 2")
            // console.log(data[i])
            // console.log(data[i+1])
            overlaps++;
            continue;
        }
    }

    // return overlaps; //part 1 output

    //part 2
    overlaps = 0;

    //probably did more checks than needed but it worked

    for (let i = 0; i < data.length; i+=2) { 
        if(data[i].start >= data[i+1].end && data[i].end <= data[i+1].end){
            // console.log("case 1")
            // console.log(data[i])
            // console.log(data[i+1])
            overlaps++;
            continue;
        }
        if(data[i].start <= data[i+1].end && data[i].end >= data[i+1].end){
            // console.log("case 2")
            // console.log(data[i])
            // console.log(data[i+1])
            overlaps++;
            continue;
        }
        if(data[i+1].start <= data[i].end && data[i+1].end >= data[i].end){
            // console.log("case 3")
            // console.log(data[i])
            // console.log(data[i+1])
            overlaps++;
            continue;
        }
        if(data[i+1].start <= data[i].end && data[i+1].end >= data[i].end){
            // console.log("case 4")
            // console.log(data[i])
            // console.log(data[i+1])
            overlaps++;
            continue;
        }
    }
    return overlaps;
}

// console.log(campCleanup('./test.txt'));
console.log(campCleanup('./input.txt'));