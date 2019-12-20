var ms = require('./exposed');

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}

var x = ms.initMergeSort(range(0, 100));
while ('$' in x) {
    [a,b] = ms.choices(x.a);
    if (a < b) {
        x = ms.mergeSortStep(ms.LT, x.a);
    }
    else {
        x = ms.mergeSortStep(ms.GT, x.a);
    }
}

console.log(x);