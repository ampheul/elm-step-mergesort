# Step Sorter

Elm Step Sorter is Elm code you can use to sort a list in your web application.


`mergeSortStep` returns a Result of either the sorted list, or an intermittent step. You can call `choices` on an intermittent step to get a pair of elements that are currently being sorted. You must provide an `Ord` to your calls to mergeSort, ordering that pair, in order to progress sorting.

## Demo
There is also a demo app showcasing the algorithm. It is deployed on github [here](https://ampheul.github.io/elm-step-sorter/), or you can clone and build the demo with `elm-make`.

### Step 1: upload pictures
![](pic1.png)

### Step 2: Pick your favorite option
![](pic2.png)

### Step 3: Get an ordered list of your favorites!
![](pic3.png)