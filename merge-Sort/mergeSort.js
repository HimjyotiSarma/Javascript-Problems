const mergeSort = function(arr){
    if(arr.length < 2){
        return arr
    }
    let median = Math.floor(arr.length / 2);
    let leftSort = mergeSort(arr.slice(0, median));
    let rigthSort = mergeSort(arr.slice(median));
    return mergeArr(leftSort, rigthSort)
}

let mergeArr = function(leftSort, rigthSort){
    let resultArr = [];
    while(leftSort.length > 0 && rigthSort.length > 0){
        if(leftSort[0]<= rigthSort[0]){
            resultArr.push(leftSort.shift())
        }else{
            resultArr.push(rigthSort.shift())
        }
    }
    return [...resultArr, ...leftSort, ...rigthSort]
    
}

console.log(mergeSort([3, 2, 1, 13, 8, 5, 0, 1]));