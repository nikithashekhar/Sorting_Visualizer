let randomize_array = document.getElementById("generate-array");
let sort = document.getElementById("sort");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let speed = document.getElementById("speed");
let size_slider = document.getElementById("size_slider");
let minRange = 1;
let maxRange = size_slider.value;
let numOfBars = size_slider.value;
let heightFactor = 4;
let speedFactor = 100;
let unsorted_array = new Array(numOfBars);

size_slider.addEventListener("input", function() {
    numOfBars = size_slider.value;
    maxRange = size_slider.value;
    bars_container.innerHTML = " ";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

let algoToUse = " ";

select_algo.addEventListener("change", function() {
    algoToUse = select_algo.value;
});

function randomNum(min, max) {
    return Math.floor(Math.random()*(max-min+1))+min;
}

function createRandomArray() {
    let array = new Array(numOfBars);
    for(i=0;i<numOfBars;i++) {
      array[i] = randomNum(minRange, maxRange);
    }

    return array;
}

document.addEventListener("DOMContentLoaded", function() {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    for(let i=0;i<numOfBars;i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i]*heightFactor+"px";
        bars_container.appendChild(bar);
    }
}

randomize_array.addEventListener("click", function() {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = " ";
    renderBars(unsorted_array);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for(let i=0;i<array.length;i++) {
        for(let j=0;j<array.length-i-1;j++) {
            if(array[j] > array[j + 1]) {
                for(let k=0;k<bars.length;k++) {
                    if(k !== j && k !== j+1) {
                        bars[k].style.backgroundColor = "aqua";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                await sleep(speedFactor);
            }
        }
        await sleep(speedFactor);
    }
    return array;
}

async function swap(items, leftIndex, rightIndex, bars){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * heightFactor+"px";
    bars[leftIndex].style.backgroundColor = "lightgreen";
    bars[rightIndex].style.height = items[rightIndex] * heightFactor+"px";
    bars[rightIndex].style.backgroundColor = "lightgreen";
    await sleep(speedFactor);
}

async function partition(items, left, right) {
    let bars = document.getElementById("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex];
    bars[pivotIndex].style.backgroundColor = "red";

    for(let i=0;i<bars.length;i++) {
        if(i != pivotIndex) {
            bars[i].style.backgroundColor = "aqua";
        }
    }

    (i = left), (j = right);
    while(i <= j) {
        while(items[i] < pivot) {
            i++;
        }
        while(items[j] > pivot) {
            j--;
        }
        if(i <= j) {
            await swap(items, i, j, bars);
            i++;
            j--;
        }
    }
    return i;
}

async function QuickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if(items.length > 1) {
        index = await partition(items, left, right);
        if(left < index - 1) {
            await QuickSort(items, left, index - 1);
        }
        if(right > index) {
            await QuickSort(items, index, right);
        }
    }
    for(let i=0;i<bars.length;i++) {
        bars[i].style.backgroundColor = "aqua";
    }
    return items;
}

async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for(let i=1;i<array.length;i++) {
        let key = array[i];
        let j = i-1;
        while(j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "red";
            await sleep(speedFactor);

            for(let k=0;k<bars.length;k++) {
                if(k != j + 1) {
                    bars[k].style.backgroundColor = "aqua";
                }
            }
            j = j - 1;
        }
        array[ j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
    }

    for(let k=0;k<bars.length;k++) {
        bars[k].style.backgroundColor = "aqua";
    }
    return array;
}

async function HeapSort(array) {
    let bars = document.getElementsByClassName("bar");
    for(let i=Math.floor(array.length/2);i>=0;i--) {
        await heapify(array, array.length, i);
    }
    for(let i=array.length-1;i>=0;i--) {
        await swap(array, 0, i, bars);
        await heapify(array, i, 0);
    }
    for(let k=0;k<bars.length;k++) {
        bars[k].style.backgroundColor = "aqua";
        await sleep(speedFactor);
    }
    return array;
}

async function heapify(array, n, i) {
    let bars = document.getElementsByClassName("bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if(left < n && array[left] > array[largest]) {
        largest = left;
    }
    if(right < n && array[right] > array[largest]) {
        largest = right;
    }
    if(largest != i) {
        await swap(array, i, largest, bars);
        await heapify(array, n, largest);
    }
}

async function swap(array, i, j, bars) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    bars[i].style.height = array[i] * heightFactor + "px";
    bars[j].style.height = array[j] * heightFactor + "px";
    bars[i].style.backgroundColor = "red";
    bars[j].style.backgroundColor = "red";
    await sleep(speedFactor);

    for(let k=0;k<bars.length;k++) {
        if(k != i && k != j) {
            bars[k].style.backgroundColor = "aqua";
        }
    }
    return array;
}

sort.addEventListener("click", function() {
    switch(algoToUse) {
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "insertion":
            InsertionSort(unsorted_array);
            break;
        // case "merge":
        //     MergeSort(unsorted_array);
        //     break;
        case "quick":
            console.log(unsorted_array.length);
            QuickSort(unsorted_array, 0, unsorted_array.length - 1);
        case "heap":
            HeapSort(unsorted_array);
            break;
        default:
            bubbleSort(unsorted_array);
            break;
    }
});
