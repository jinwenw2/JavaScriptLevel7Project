var max = 0;
var totalSize = 0;
var maxOrNot = false;
var shipOrNot = false;
var boxSelected = false;
var cost = 0;

const Apple = {Item: "Apple", Size: 1};
const Banana = {Item: "Banana", Size: 1};
const PC = {Item: "PC", Size: 4};
const Novel = {Item: "Novel", Size: 3};
const Keyboard = {Item: "Keyboard", Size: 2};
const Jacket = {Item: "Jacket", Size: 3};
const Desk = {Item: "Desk", Size: 10};
const Watch = {Item: "Watch", Size: 1};
const Toy = {Item: "Toy", Size: 4};
const Scarf = {Item: "Scarf", Size: 2};
const Pillow = {Item: "Pillow", Size: 2};
const Lamp = {Item: "Lamp", Size: 4};
const Hoodie = {Item: "Hoodie", Size: 3};

const items = [Apple, Banana, PC, Novel, Keyboard, Jacket, Desk, Watch, Toy, Scarf, Pillow, Lamp, Hoodie];
var manifest = [];
var shipments = [];

function initialize() {
    manifestList = document.getElementById("manifest");
    shipList = document.getElementById("packages");
    sizeDisplay = document.getElementById("size");
    totalCost = document.getElementById("cost");
    //selectedSize = document.getElementById("size");
    createManifest();
    displayManifest();
    displayShipments();
    console.log(shipments);
}

function item(object) {
    return object.Item;
}

function weight(object) {
    return object.Size;
}

//displays current total size and cost.
function displaySize(){
    sizeDisplay.innerHTML = max;
    totalCost.innerHTML = "$" + cost;
}

//box size selection
function box(maxSize)
{
    if (boxSelected === false)
    {
        if (maxSize === 10)
        {
            max = 10;
            boxSelected = true;
            cost += 25;
            //console.log(max);
            displaySize();
        }
        else if (maxSize === 6)
        {
            max = 6;
            boxSelected = true;
            cost += 13;
            //console.log(max);
            displaySize();
        }
        else
        {
            max = 3;
            boxSelected = true;
            cost += 8;
            //console.log(max);
            displaySize();
        }
    }
}

//Ships the items and clears shipments list. Checks to see if conditions are met for shipment.
function shipOut()
{
    if (boxSelected === true && shipments.length > 0)
    {
        boxSelected = false;
        totalSize = 0;
        max = 0;
        //console.log(boxSelected);
        shipments = [];
        alert("Shipped Successfully!");
        displaySize();
        displayManifest();
        displayShipments();
        if (manifest.length === 0)
        {
            alert("Great work! Clock off now and see you tomorrow!");
        }
    }
    else if (shipments.length === 0)
    {
        alert("There is nothing to ship!");
    }
    else
    {
        boxSelected = true;
        alert("Please select a box before you ship!");
    }
}

//Creates the Manifest List
function createManifest() {
    for (let i = 0; i < 10; i++)
    {
        index = Math.round((Math.random() * 12));
        manifest.push(items[index]);
    }
}

//Displays all the current items ready that need to be packaged
function displayManifest() {
    manifestList.innerHTML = "";
    for (let i = 0; i < manifest.length; i++) 
    {
        index2 = i;
        manifestList.innerHTML += "<button onclick = moveToPackaging(index2);>" + item(manifest[i]) + " | Size " + weight(manifest[i]) + "</button>" + "<br>";
    }
}

//Displays all the current items ready for shipment
function displayShipments() {
    shipList.innerHTML = ""
    for (let i = 0; i < shipments.length; i++) 
    {
        index = i;
        shipList.innerHTML += "<button onclick = moveToManifest(index);>" + item(shipments[i]) + " | Size " + weight(shipments[i]) + "</button>" + "<br>";
    }
}

//Move to Packaging Side
function moveToPackaging(index) {
    temp = totalSize + weight(manifest[index]);
    if (temp <= max && boxSelected === true)
    {
        totalSize = temp;
        shipments.push(manifest[index]);
        manifest.splice(index, 1);
    }
    else if (boxSelected === false)
    {
        alert("Please select a box size!")
    }
    else
    {
        alert("Your item sizes are too large for the current box! Ship it out!")
    }
    //console.log(shipments)
    displayManifest();
    displayShipments();
}

//Move to Manifests Side
function moveToManifest(index) {
    if (totalSize > 0 && boxSelected === true)
    {
        totalSize-= weight(shipments[index]);
        manifest.push(shipments[index]);
        shipments.splice(index, 1);
    }
    console.log(manifest)
    displayManifest();
    displayShipments();
}