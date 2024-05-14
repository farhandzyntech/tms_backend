input = [1,2,3,4,5]
size = 2
[[1,2],[3,4],[5]] // expected input

function packageArray(array, size){
    let res = [];
    for (let i = 0; i < array.length; i++) {
        console.log(res);
        res.push(array.slice(i, i+size))
    }
    return res
}

const output = packageArray(input, size)
console.log(output);
