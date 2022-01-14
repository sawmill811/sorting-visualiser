
var itrs = document.getElementById("itrs");
var range = document.getElementById("speed-selector");
var startBtn = document.getElementById("start-btn");
var startText = document.getElementById("start-text");
var stopBtn = document.getElementById("stop-btn");
var sortSelector = document.getElementById("sortAlgo");
var shufBtn = document.getElementsByClassName("shuffle-btn")[0];
var shufText = document.getElementById("shuffle-text");



// fullscreen stuff

document.getElementById("text").addEventListener("click", () => {
    document.documentElement.requestFullscreen().catch((e) => {
        // console.log(e);
    });
});

function isFS(){
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;
}

function zenMode(){
    if (isFS() === undefined) {
        // console.log("~~ zen mode disabled ~~");
        document.getElementsByClassName("panel-L")[0].style.display = "flex";
        document.getElementsByClassName("panel-R")[0].style.display = "flex";
        document.getElementsByClassName("panel-M")[0].style.width = "50%";
        for(let i=1;i<5;i++){
            let rname = "row-" + i;
            document.getElementsByClassName(rname)[0].style.height = "18%";
        }
        // document.getElementsByClassName("panel-M")[0].style.justifyContent = "flex-start";
        // document.getElementsByClassName("homepage")[0].style.display = "block";
        document.getElementsByClassName("navbar")[0].style.display = "flex";
        // document.getElementById("about").style.display = "block";
        document.getElementsByClassName("panel")[0].style.height = "90vh";
        document.getElementsByClassName("panel")[0].style.margin = "0";
    } else {
        // console.log("~~ zen mode active ~~");
        document.getElementsByClassName("panel-L")[0].style.display = "none";
        document.getElementsByClassName("panel-R")[0].style.display = "none";
        document.getElementsByClassName("panel-M")[0].style.width = "75.2%";
        for(let i=1;i<5;i++){
            let rname = "row-" + i;
            document.getElementsByClassName(rname)[0].style.height = "18.8%";
        }
        // document.getElementsByClassName("panel-M")[0].style.justifyContent = "center";
        // document.getElementsByClassName("homepage")[0].style.display = "none";
        // document.getElementById("about").style.display = "none";
        document.getElementsByClassName("navbar")[0].style.display = "none";
        document.getElementsByClassName("panel")[0].style.height = "99vh";
        document.getElementsByClassName("panel")[0].style.margin = "1vh 0 0 0";
    }
}

document.addEventListener("fullscreenchange", () => {
    zenMode();
})

// placing our image
var folderName = ["IITJ1","IITJ2","IITJ3","IITJ4"];
var folder = folderName[Math.floor(Math.random()*folderName.length)];
window.onload = loadImages();
// var dir = ["IITJ1"];

function loadImages(){
    let loading = document.getElementsByClassName("loading")[0];
    loading.style.opacity = 1;
    startBtn.style.display = "none";
    startText.style.display = "none";
    shufBtn.style.display = "none";
    shufText.style.display = "none";
    var imgArray = [];
    for(let i=1;i<=25;i++) {
        let imgObj = new Image();
        imgObj.src = "sortingImages/"+folder+"/"+i+".png";
        imgArray.push(imgObj);
    }
    imgArray[24].onload = function(){
        startBtn.style.display = "block";
        startText.style.display = "block";
        shufBtn.style.display = "block";
        shufText.style.display = "block";
        for(let i=1;i<=5;i++){
            let currRow = document.getElementsByClassName("row-"+i)[0];
            currRow.style.opacity = 1;
        }    
        loading.style.opacity = 0;
        placeImage(imgArray);
    };

    
}

function placeImage(imgArray){
    
    
    for(let i = 0; i<25; i++){
        let cname = "col-" + JSON.stringify(i+1);
        let currBox = document.getElementById(cname);
        currBox.style.backgroundImage = "url("+imgArray[24-i].src+")";
        // currBox.style.backgroundImage = "url(/sortingImages/IITJ1/"+(25-i)+".png)";
        currBox.style.backgroundRepeat = "no-repeat";
        currBox.style.backgroundSize = "100% 100%";
        currBox.style.backgroundPosition = "center";
        
    }
}


// shuffler

var myArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

function shuffleArray() {
    "use strict";
    stopSort();
    let array = [...myArray];
    // // console.log("hey");
    let current = array.length;
    while(current!=0) {
        let randomIndex = Math.floor(Math.random()*current);
        current--;
        [array[current], array[randomIndex]] = [array[randomIndex], array[current]];
        // // console.log(col1.childNodes[1].inner);
    }

    document.getElementsByClassName("panel-M")[0].style.opacity = 0;

    // console.log(JSON.stringify(array));

    
    setTimeout(()=> {
        for(var i = 1; i <= 25; i++) {
            let colName = "col-" + JSON.stringify(i);
            let currentBox = document.getElementById(colName);
            let numField = currentBox.childNodes;
            // // console.log(numField[0].innerHTML);
            numField[1].innerHTML = array[i-1];
            currentBox.style.backgroundImage = "url(sortingImages/"+folder+"/"+JSON.stringify(26-array[i-1])+".png)";
            // currentBox.innerText = array[i-1];
            // currentBox.innerHTML = "${array[i]}";
        }
        document.getElementsByClassName("panel-M")[0].style.opacity = 1;
    }, 200);
    
    myArray = [...array];
}

// sorting

// border colour options: 0C1E7F, 7900FF, 9145B6, B000B9, 3D2C8D


var delay = 200;
var stop = false;


stopBtn.style.display = "none";

async function startSort(){   
    stop = false;
    startBtn.style.display = "none";
    stopBtn.style.display = "block";
    startText.innerText = "stop!";
    startText.style.left = "24%";
    // startBtn.onclick = function(){return;}
    
    algo = sortSelector.value;
    sortSelector.disabled = "true";
    if(algo == 0){
        itrs.innerText = 0;
        await selectionSort();
        
    }
    else if(algo == 1) {
        itrs.innerText = 0;
        await bubbleSort();
    }
    else if(algo == 2) {
        itrs.innerText = 0;
        for(let ele = 0; ele<25; ele++){
            darken(ele);
        }
        await quickSort(0,24);
        for(let ele = 0;ele<25;ele++){
            brighten(ele);
        }
        // then(()=>{
        //     for(let ele = 0;ele<25;ele++){
        //     brighten(ele);
        //     // console.log("hello");
        // }
        // });
        
    }
    else if(algo == 3) {
        itrs.innerText = 0;
        // for(let ele = 0; ele<25; ele++){
        //     darken(ele);
        // }
        await mergeSort(0,24);
        for(let ele = 0;ele<25;ele++){
            brighten(ele);
        }
        // then(()=>{
        //     for(let ele = 0;ele<25;ele++){
        //     brighten(ele);
        //     // console.log("hello");
        // }
        // });
        // console.log(JSON.stringify(myArray));
        
    }
    stopSort();
    // startBtn.onclick = startSort();
}

function stopSort(){
    stop = true;
    sortSelector.disabled = false;
    stopBtn.style.display = "none";
    startBtn.style.display = "block";
    startText.innerText = "sort!";
    startText.style.left = "22%";
    return;

}

function visualise(...currentIndex){
    currentIndex.forEach(element => {
        // console.log(element)
        let currBox = document.getElementById("col-"+JSON.stringify(element+1));
        currBox.style.borderWidth = "min(3px, 0.3vw)";
        currBox.childNodes[1].style.background = "#0C1E7F";
        currBox.childNodes[1].style.color = "#FFF9F9";
        // currBox.style.width = "20%";
        // currBox.style.height = "95%";
        currBox.style.borderColor = "#3D2C8D";
        currBox.style.borderStyle = "solid";
    });
}

function visualise2(...currentIndex){
    currentIndex.forEach(element => {
        let currBox = document.getElementById("col-"+JSON.stringify(element+1));
        currBox.style.borderColor = "#B000B9";
        currBox.style.borderWidth = "min(3px, 0.3vw)";
        currBox.childNodes[1].style.background = "#0C1E7F";
        currBox.childNodes[1].style.color = "#FFF9F9";
        currBox.style.borderStyle = "solid";
    });
}

function visualise3(...currentIndex){
    currentIndex.forEach(element => {
        let currBox = document.getElementById("col-"+JSON.stringify(element+1));
        currBox.style.borderColor = "#24A19C";
        currBox.style.borderWidth = "min(3px, 0.3vw)";
        currBox.childNodes[1].style.background = "#570530";
        currBox.childNodes[1].style.color = "#FFF9F9";
        currBox.style.borderStyle = "solid";
    });
}

function darken(element){
    
    let currBox = document.getElementById("col-"+JSON.stringify(element+1));
    currBox.style.opacity = 0.25;
    
}

function brighten(element){
    
    let currBox = document.getElementById("col-"+JSON.stringify(element+1));
    currBox.style.opacity = 1;
    
}


function visualiseEnd(...currentIndex){
    currentIndex.forEach(element => {
        let currBox = document.getElementById("col-"+JSON.stringify(element+1));
        currBox.style.borderWidth = "0";
        // currBox.style.width = "20%";
        // currBox.style.height = "100%";
        // console.log(element);
        currBox.childNodes[1].style.background = "#FFF9F9";
        currBox.childNodes[1].style.color = "black";
        currBox.style.borderColor = "none";
        currBox.style.borderStyle = "none";
    });
}


const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

function swap(i1, i2) {
    // console.log("swapping "+i1+" and "+i2);
    let box1 = document.getElementById("col-"+JSON.stringify(i1+1));
    let box2 = document.getElementById("col-"+JSON.stringify(i2+1));
    [box1.childNodes[1].innerHTML, box2.childNodes[1].innerHTML] = [box2.childNodes[1].innerHTML, box1.childNodes[1].innerHTML];
    [box1.style.backgroundImage, box2.style.backgroundImage] = [box2.style.backgroundImage, box1.style.backgroundImage];
}


// sorting algos

async function selectionSort(index = 0){
    if(index == 25){
        return;
    }
    let i = index
    
    let currMin = i;
    for(let k=i; k<25 && !stop; k++) {
        var speed = range.value;
        visualise(k, i);
        visualise2(currMin);
        let temp = currMin;
        if(myArray[currMin]>myArray[k]) {
            currMin = k;
        }
        itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
        await sleep(delay*1.5/(speed));
        visualiseEnd(k, temp, currMin);
        
    }

    if (currMin!=index) {
        visualise2(currMin, index);
        await sleep(delay*2/speed);
        swap(currMin, index);
        await sleep(delay*2/speed);
        visualiseEnd(currMin, index);
        [myArray[currMin], myArray[index]] = [myArray[index], myArray[currMin]];
    }

    // console.log(JSON.stringify(myArray));

    await sleep(delay/speed);

    await selectionSort(index+1);
    
    
}

async function bubbleSort(size = 25){


    if(size==1) {
        return;
    }

    let swaps = 0;

    for(let i = 0; i < size - 1 && !stop; i++) {
        var speed = range.value;
        visualise(i, i+1);
        if(myArray[i]>myArray[i+1]){
            await sleep(delay*2/speed);
            swap(i, i+1);
            swaps+=1;
            visualise2(i, i+1);
            [myArray[i], myArray[i+1]] = [myArray[i+1], myArray[i]];
        }
        itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
        await sleep(delay*2/(speed));
        visualiseEnd(i, i+1);
    }
    await sleep(delay/speed);
    // console.log(JSON.stringify(myArray));
    if(swaps==0){
        return;
    }
    await bubbleSort(size-1);
}

async function partition(start, end){
    // // console.log("partioning...");
    let pivot = end;
    visualise3(pivot);
    let i = start-1;
    for(let j=start; j<=end && !stop;j++){
        visualise(j);
        let speed = range.value;
        await sleep(delay*1.5/speed);
        if(myArray[j]<=myArray[pivot]){
            visualise2(j);
            i++;
            visualise2(i);
            if(j!=i){
                await sleep(delay*2/speed);
                swap(j,i);
                [myArray[i], myArray[j]] = [myArray[j], myArray[i]];
                await sleep(delay*2/speed);
            }
            else{
                await sleep(delay*2/speed);
            }
            visualiseEnd(i);
        }
        visualiseEnd(j);
        itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
    }
    // // console.log("partioning done.");
    visualiseEnd(pivot);
    return i;
}

async function quickSort(start, end){
    
    let speed = range.value;
    if(start<end && !stop){

        for(let ele=start;ele<=end;ele++){
            brighten(ele);
        }


        let pivot = await partition(start, end);
        // cout<<"start = "<<start<<"end = "<<end<<"pivot = "<<pivot<<"\n";
        // print(myArray,n);
            await sleep(delay/speed);
            for(let ele=start;ele<=end;ele++){
                darken(ele);
            }
            await quickSort(start,pivot-1);
            await sleep(delay/speed);
            await quickSort(pivot,end);
            // // console.log(pivot);
        
    }
    // // console.log("done with main func");
}

async function merge(l, m, r){
    
    for(let ele=l;ele<=r;ele++){
        brighten(ele);
    }
    // // console.log("merging: " + JSON.stringify(myArray.slice(l,m+1)) +" "+ JSON.stringify(myArray.slice(m+1,r+1)));
    // // Create temp arrays
    // let L = new Array(n1); 
    // let R = new Array(n2);
  
    // // Copy data to temp arrays L[] and R[]
    // for (let i = 0; i < n1; i++)
    //     L[i] = myArray[l + i];
    // for (let j = 0; j < n2; j++)
    //     R[j] = myArray[m + 1 + j];
  
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    let i = l;
    let left = 0;

    // Initial index of second subarray
    let j = m+1;
    let right = 0;
    // Initial index of merged subarray
    let k = l;

    // for(let ele=l;ele<=r;ele++){
    //     brighten(ele);
    // }
  
    while (left<m-l+1 && right<r-m && !stop) {
        // // console.log("main loop: "+i+" "+j+" "+k);
        let speed = range.value;
        await sleep(delay/speed);
        visualise2(k);
        visualise(i,j);
        if (myArray[i] <= myArray[j]) {
            itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
            await sleep(delay/speed);
            myArray[k] = myArray[i];
            visualiseEnd(i);
            i++;
            left++;
        }
        else {
            // let toBeStored = myArray[j];
            itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);

            for(let it = j; it>i; it--){
                // itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
                visualise2(it, it-1);
                await sleep(delay*2/speed);
                [myArray[it], myArray[it-1]] = [myArray[it-1], myArray[it]];
                swap(it-1,it);
                await sleep(delay/speed);
                visualiseEnd(it, it-1);
            }
            visualiseEnd(i,j);
            right++;
            i++;
            j++;
        }
        visualiseEnd(k);
        k++;
        // // console.log("main wala loop" + JSON.stringify(myArray.slice(l,r+1)));
        // // console.log("main loop: "+i+" "+j+" "+k);
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (left<m-l+1 && !stop) {
        itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
        let speed = range.value;
        visualise2(k,i);
        await sleep(delay/speed);
        myArray[k] = myArray[i];
        // swap(k,l+i);
        visualiseEnd(k,i);
        left++;
        i++;
        k++;
        // // console.log("i wala loop" + JSON.stringify(myArray.slice(l,r+1)));
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (right<r-m && !stop) {
        itrs.innerText = JSON.stringify(parseInt(itrs.innerText)+1);
        let speed = range.value;
        visualise2(k,j);
        await sleep(delay/speed);
        myArray[k] = myArray[j];
        // swap(k,m+1+j)
        visualiseEnd(k,j);
        right++;
        j++;
        k++;
        // // console.log("j wala loop" + JSON.stringify(myArray.slice(l,r+1)));

    }

    for(let ele=0;ele<25;ele++){
        darken(ele);
    }
    
    // // console.log("merged: "+JSON.stringify(myArray.slice(l,r+1)));
}


async function mergeSort(l, r){
    if(l>=r || stop){
        return;
    }
    
    
    
    let speed = range.value;
    let m =l+ parseInt((r-l)/2);
    
    await sleep(delay/speed);
    await mergeSort(l,m);
    await sleep(delay/speed);
    await mergeSort(m+1,r);
    await sleep(delay/speed);
    await merge(l,m,r);
}