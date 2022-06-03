// in milliseconds
let sortingspeed = 250;
let arraySet = false;
let running = false;
let container = document.getElementById("app");
function updateSliderValue(value){
    let txt = document.getElementById("sliderValue");
    txt.innerHTML = value;
}
function updateSortingSpeed(value){
    let txt = document.getElementById("speedValue");
    sortingspeed = value;
    txt.innerHTML = value;
}

function makeArray() {
    
    if(!arraySet){
        
        arraySet = true;
        let arrSize = document.getElementById("arrSlider").value;
        for(let i = 0; i<arrSize; i++){
            // generate random 10-100 value for a specified div
            let value = Math.floor(Math.random() * 90)+10;
            // create a new div, our array element
            let arrayBlock = document.createElement("div");
            let id = `ID${i}`;
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

async function bubbleSort(delay = sortingspeed) {
    if(running) {return false;}

    running = true;
    // get all blocks with the class arrayItem and store them in an array
    let arrItems = document.querySelectorAll(".arrayItem");

    let length = arrItems.length;
    for(let i=0; i<length; i++) {
        for(let j=0; j<length-i-1; j++) {
            // change color of blocks which are currently being compared to red
            arrItems[j].style.backgroundColor = "#E0115F";
            arrItems[j+1].style.backgroundColor = "#E0115F";

            // 100ms delay to highlight blocks which are not being swapped
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
            arrItems[j].style.backgroundColor = "#4CE0D2";
            arrItems[j+1].style.backgroundColor = "#4CE0D2";
        }
            arrItems[arrItems.length - i - 1].style.backgroundColor = "green";
    }
    running=false;
}

function swapDivs(div1, div2) {
    return new Promise((resolve) => {
            // get the size of flexbox gap and flex elements in pixels and assign them to a variable
            let gapSize = Number(($("#app").css("gap").slice(0,-2)));
            let blockWidth = div1.offsetWidth;
            // calculate the distance which a block need to transform in order to complete the animation
            let distance = gapSize + blockWidth;
            // this just works and apparently it does an animation
            document.body.style.setProperty('--distance', distance+"px");
            $(div1).css({
                animation: `${sortingspeed}ms swapForward forwards`
            });

            $(div2).css({
                animation: `${sortingspeed}ms swapBackward forwards`
            });
            
            setTimeout(() => {
                container.insertBefore(div2,div1);
                $(div1).css({animation: `none`});
                $(div2).css({animation: `none`});
                resolve();
            }, sortingspeed); 
            
    });
}