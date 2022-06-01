// in milliseconds
const sortingSpeed = 50;
let arraySet = false;
let container = document.getElementById("app");
function updateSliderValue(value){
    let txt = document.getElementById("sliderValue");
    txt.innerHTML = value;
}

function makeArray() {
    if(!arraySet){
        arraySet = true;
        let arrSize = document.getElementById("arrSlider").value;
        for(let i = 0; i<arrSize; i++){
            // generate random 1-100 value for a specified div
            let value = Math.ceil(Math.random() * 100);
            // create a new div, our array element
            let arrayBlock = document.createElement("div");
            arrayBlock.classList.add("arrayItem");
            arrayBlock.style.height = `${value}%`;
            // creating a label element to display value inside of a block, later used for sorting
            let arrayText = document.createElement("label");
            arrayText.classList.add("array_value");
            arrayText.innerText = value;
            arrayBlock.id = `ID${i}`;
            // add labels and divs into the DOM
            arrayBlock.appendChild(arrayText);
            container.appendChild(arrayBlock);
        }
    }
}

async function bubbleSort(delay = 100) {
    // get all blocks with the class arrayItem and store them in an array
    let arrItems = document.querySelectorAll(".arrayItem");

    let length = arrItems.length;
    for(let i=0; i<length; i++) {
        for(let j=0; j<length-i-1; j++) {
            // change color of blocks which are currently being compared to red
            arrItems[j].style.backgroundColor = "red";
            arrItems[j+1].style.backgroundColor = "red";
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            // grab values of each compared blocks, store them in integers
            var value1 = Number(arrItems[j].childNodes[0].innerHTML);
            var value2 = Number(arrItems[j + 1].childNodes[0].innerHTML);
            // if left block is bigger than right block, swap them
            if(value1 > value2) {
                await swapDivs(arrItems[j],arrItems[j+1]);
                // update the table of all array items with the new positions
                arrItems = document.querySelectorAll(".arrayItem");
            }
            // revert colors to default
            arrItems[j].style.backgroundColor = "lightblue";
            arrItems[j+1].style.backgroundColor = "lightblue";
        }
            arrItems[arrItems.length - i - 1].style.backgroundColor = "green";
    }
}

function swapDivs(div1, div2) {
    return new Promise((resolve) => {
        setTimeout(() => {
            container.insertBefore(div2,div1);
            resolve();
        }, 250);
    });
}