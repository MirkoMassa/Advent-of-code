import fs from 'fs'

type signal = {
    type: string,
    value: number
}
export function cathode(file:string){

    let content = fs.readFileSync(file, 'utf-8').split("\r\n").map((elem):signal=>{
        let [type, value] = elem.split(" ");
        return {
            type: type,
            value: parseInt(value)
        }
    })
    console.log(content)
    let strengthSum = 0;
    let registerVal = 1;
    let cycle = 1;

    // should have filled an array with all the values at every cycle but
    // instead I've done a check every 40 cycles, so if the cycle is skipped
    // there is no way to check the value (just hardcoding)


    // for (let i = 0; i < content.length; i++) {
    //     if(cycle == 20 || cycle == 60 || cycle == 100 || cycle == 140 || cycle == 180 || cycle == 220){
    //         strengthSum += registerVal*cycle;
    //         console.log ("cycle ",cycle, " - sum ",strengthSum)
    //     }
    //     if(content[i].type == 'noop'){
    //         cycle++;
    //     }
    //     if(content[i].type == 'addx'){ 
    //         registerVal += content[i].value;
    //         cycle+=2
    //     }
    //     console.log(registerVal,"  ", cycle);
    // }

    type cpu = {cycle: number, value: number};
    let signals:cpu[] = [];
    signals.push({cycle:cycle, value:registerVal})
    for (let i = 0; i < content.length; i++) {
        
        if(content[i].type == 'noop'){
            cycle++;
            signals.push({cycle:cycle, value:registerVal})
        }
        if(content[i].type == 'addx'){ 
            cycle++;
            signals.push({cycle:cycle, value:registerVal})
            cycle++;
            registerVal += content[i].value;
            signals.push({cycle:cycle, value:registerVal})
            
        }  
    }
    // console.log(JSON.stringify(signals, null, 2));

    for (let i = 20; i <= 220; i+=40){
        strengthSum+= i*signals[i-1].value;
        console.log(signals[i-1])
    }
    return strengthSum;
}

console.log(cathode('./input.txt'))
// console.log(cathode('./test.txt'))