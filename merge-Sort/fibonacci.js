// Loop Approach
const Fibonacci = function(num){
    let result = []
    for(let i = 0 ; i< num; i++){
        if(i < 2){
            result.push(i)
        }else{
            let first = result[i-2];
            let second = result[i-1];
            let sum = first+ second;
            result.push(sum);
        }
    }
    return result
}

console.log(Fibonacci(8))

// Recursive Approach


const fibonacciRecu = function(num, resultArr=[]){
    if(resultArr?.length >= num){
        return resultArr
    }
    else{
        if(resultArr.length == 0){
            return fibonacciRecu(num, [0])
        }else if(resultArr.length ==  1){
            return fibonacciRecu(num, [0, 1])
        }else {
            let nextNum  = resultArr[resultArr.length - 1]+ resultArr[resultArr.length - 2];
            return fibonacciRecu(num, [...resultArr, nextNum])
        }
    }
}

const fibonacciRecuTwo = function(num, resultArr=[]){
    if(num == 0 && resultArr.length==0 ){
        return []
    }else if(num == 1 && resultArr.length==1 ){
        return [0]
    }else if(num == 2 && resultArr.length==2 ){
        return [0, 1]
    }else {
        resultArr = resultArr.length ? [...resultArr] : [0, 1]
        if(num > 2){
            let nextNum = resultArr[resultArr.length - 1] + resultArr[resultArr.length - 2];
            return fibonacciRecuTwo(num - 1, [...resultArr, nextNum])
        }
        return resultArr
    }
}



console.log(fibonacciRecuTwo(8))