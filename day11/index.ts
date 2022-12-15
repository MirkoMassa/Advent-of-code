import fs from 'fs';

type monkey = {
    worries:number[],
    sign:string, //operation sign
    multiplier:number | 'old',
    test:number,
    //what monkey should get the item if the test is true or false 
    trueM:number,
    falseM:number,
    nInspections:number
}

//finding the 2 most active monkeys (how many times they have inspected items)
function monkeyWorry(file:string){
    
    let monkeysUnparsed = fs.readFileSync(file, 'utf-8').split('\r\n');
    let monkeys:monkey[] = [];

    for (let i = 1; i < monkeysUnparsed.length; i+=7) {
        const monkeyTemp:string[] = monkeysUnparsed.slice(i, i+5).map(strings=>strings.trim());

        //worries
        monkeyTemp[0] = monkeyTemp[0].slice(monkeyTemp[0].indexOf(':')+1);
        let worries:number[] = monkeyTemp[0].split(',').map(item=>parseInt(item))

        //operation
        monkeyTemp[1] = monkeyTemp[1].slice(monkeyTemp[1].indexOf('=')+6);
        const sign = monkeyTemp[1][0];
        let multiplier:number | 'old';
        const value:string = monkeyTemp[1].slice(2, monkeyTemp[1].length);
        if(value === 'old') multiplier = value;
        else multiplier = parseInt(value);

        //test
        const test = parseInt(monkeyTemp[2].slice(monkeyTemp[2].length-2, monkeyTemp[2].length))

        //true/false
        const trueM = parseInt(monkeyTemp[3].slice(monkeyTemp[3].length-1, monkeyTemp[3].length))
        const falseM = parseInt(monkeyTemp[4].slice(monkeyTemp[4].length-1, monkeyTemp[4].length))
        
        monkeys.push({
            worries,
            sign,
            multiplier,
            test,
            trueM,
            falseM,
            nInspections: 0
        })
    }
    // console.log(monkeys);
    /*
    //rounds
    for (let i = 0; i < 20; i++) {
        console.log("round: ",i+1);
        //monkeys
        monkeys.forEach(monkey => {
            //items
            monkey.worries.forEach((worry) =>{
                let res:number = monkey.multiplier == 'old' ? worry : monkey.multiplier;
                
                switch(monkey.sign){
                    case '+':
                        res += worry;
                        break;
                    case '*':
                        res *= worry;
                        break;
                }
                res = Math.floor(res/3);
                //removing the item from the monkey
                //giving it to another monkey
                if(res%monkey.test == 0){
                    monkeys[monkey.trueM].worries.unshift(res);
                    // console.log("divisibile ", res)
                }
                else{
                    monkeys[monkey.falseM].worries.unshift(res);
                    // console.log("non divisibile ", res)
                }
                monkey.nInspections++;
            })
            monkey.worries = [];
        });
    }
    
    let inspections:number[] = [];
    monkeys.forEach(monkey=>{
        inspections.push(monkey.nInspections);
    })
    console.log(Math.max(...inspections))
    let max = Math.max(...inspections);
    inspections.splice(inspections.indexOf(max, 1));
    console.log(Math.max(...inspections))
    // return max*= Math.max(...inspections); // part 1 output
    */
    // part 2 is just not dividing by 3 and going for 10000 rounds
    // x % a = (x % (a*b * c * ..) ) % a

    let tests = monkeys.reduce((res, monkey)=>{
        return monkey.test * res;
    }, 1)

    for (let i = 0; i < 10_000; i++) {
        console.log("round: ",i+1);
        //monkeys
        monkeys.forEach(monkey => {
            //items
            monkey.worries.forEach((worry) =>{
                let res:number = monkey.multiplier == 'old' ? worry : monkey.multiplier;
                
                switch(monkey.sign){
                    case '+':
                        res += worry;
                        break;
                    case '*':
                        res *= worry;
                        break;
                }
                res = res%tests;
                // res = Math.floor(res/3);
                //removing the item from the monkey
                //giving it to another monkey
                if(res%monkey.test == 0){
                    monkeys[monkey.trueM].worries.unshift(res);
                    // console.log("divisibile ", res)
                }
                else{
                    monkeys[monkey.falseM].worries.unshift(res);
                    // console.log("non divisibile ", res)
                }
                monkey.nInspections++;
            })
            monkey.worries = [];
        });
    }

    let inspections:number[] = [];
    monkeys.forEach(monkey=>{
        inspections.push(monkey.nInspections);
    })
    let max = Math.max(...inspections);
    inspections.splice(inspections.indexOf(max, 1));

    return max*= Math.max(...inspections);
}

// console.log(monkeyWorry('./test.txt'));
console.log(monkeyWorry('./input.txt'));