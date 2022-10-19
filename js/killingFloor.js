import { sacrifices } from "./variables.js";

//sacrifices from variables.js
console.log(sacrifices);

//Global variables
let elementToCreate;
let elementToAppend;

let classArray = [];
let elementArray = [];

let audioFogHorn = new Audio('../media/audio/fogHorn.mp3');

/* On load functions
========================================================= */
window.onload = (event) => {
    console.log('Page is fully loaded');

    audioFogHorn.play();
    audioFogHorn.loop = true; 

    elementToAppend = searchEl('main');
    elementToAppend.addEventListener("click", handleClick(elementToAppend));

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint');
    addNode(elementToAppend, elementToCreate, ["container-md"]);

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint div');
    addNode(elementToAppend, elementToCreate, []);

    elementToCreate = createEl("h1");
    elementToAppend = searchEl('#startPoint div div');
    addNode(elementToAppend, elementToCreate, ["text-dark"]);
    elementToAppend.lastElementChild.innerHTML = "DUCK OR GOOSE";

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint div');
    addNode(elementToAppend, elementToCreate, ["d-grid", "gap-2", "col-md-8" , "mx-auto"]);

    elementToCreate = createEl("button");
    elementToAppend = searchEl('#startPoint div div:last-of-type');
    addNode(elementToAppend, elementToCreate, ["btn", "btn-orange", "btn-lg"]);
    setButton(elementToAppend.lastElementChild, "btn-startKilling", "button", "Start Killing");

    elementToCreate = createEl("button");
    addNode(elementToAppend, elementToCreate, ["btn", "btn-purple", "btn-lg" ]);
    setButton(elementToAppend.lastElementChild, "btn-addSacrifices", "button", "Add Sacrifices");

    elementToCreate = createEl("div");
    addNode(elementToAppend, elementToCreate, ["mx-auto"]);
    
    elementToCreate = createEl("p");
    elementToAppend = searchEl('#startPoint div div:last-of-type div');
    addNode(elementToAppend, elementToCreate, ["text-color-moon"]);
    elementToAppend.lastElementChild.innerHTML = "Coders still Alive";

    addClasses();
};

/* Handle clicks and called functions
========================================================= */
const handleClick = (element) => { // higher order function
    switch (element.id){
        case "mainContainer":
            return () => {  
                elementToAppend = searchEl('#mainContainer .wrapper-2');
                audioFogHorn.pause();
                elementToAppend.classList.add("puff-out-hor");
                setTimeout(() => {
                    elementToAppend.remove();
                }, 1000);
                
            };

        case "btn-startKilling":
            return () => {  
                removeContent(searchEl("#startPoint"))  ;   
                startKilling();                
            };
            
        case "btn-killSomeone":
            return () => {       
                let deadPerson = killSomeone();
                crossDead(deadPerson);               
            };
    } 
};

//function for starting game 
const startKilling = () => {
    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint');
    addNode(elementToAppend, elementToCreate, ["container-md"]);

    elementToCreate = createEl("div");
    elementToAppend = searchEl("#startPoint div");
    addNode(elementToAppend, elementToCreate, ["row"]);

    elementToCreate = createEl("div");
    elementToAppend = searchEl("#startPoint div div");
    addNode(elementToAppend, elementToCreate, ["col-md-6"])
    elementToCreate = createEl("div");
    addNode(elementToAppend, elementToCreate, ["col-md-6"])

    elementToCreate = createEl("ul");
    elementToAppend = searchEl("#startPoint div div div:first-of-type");
    addNode(elementToAppend, elementToCreate, ["list-group", "list-group-flush"]);

    elementToAppend = searchEl("#startPoint div div div:first-of-type ul");
    sacrifices.forEach(el => {
        elementToCreate = createEl("li");
        addNode(elementToAppend, elementToCreate, ["list-group-item"])
        elementToAppend.lastElementChild.innerHTML = `${el.name} ${el.surnames.surnameOne}`;
    });

    elementToCreate = createEl("button");
    elementToAppend = searchEl("#startPoint div div div:last-of-type");
    addNode(elementToAppend, elementToCreate, ["btn", "btn-danger"]);

    setButton(elementToAppend.firstElementChild  , "btn-killSomeone", "button", "Kill Someone");

    addClasses();
}

//function to kill a coder at random
const killSomeone = () => {
    let stillAlive = 0;
    sacrifices.forEach(el => {
        if(el.killed === false){
            stillAlive++;
        }
    });
    let indexToKill = Math.floor(Math.random() * (stillAlive + 1));
    let stillAliveArray = sacrifices.filter(obj => obj.killed === false);
    
    let kill = stillAliveArray[indexToKill]["id"];

    sacrifices.forEach(el => {
        if(el.id === kill){
            el.killed = true;
        }
    });

    return stillAliveArray[indexToKill];
}

/* Functions to alter DOM
========================================================= */

//function to create node
const createEl = (selector) => {
    return document.createElement(selector);
}

//function to search node
const searchEl = (selector) => {
    return document.querySelector(selector);
}

//function to append node to DOM and store in classes at array
const addNode = (eta, etc, stringClass) => {
    eta.appendChild(etc);
    for (let i = 0; i < stringClass.length; i++) {
        classArray.push(stringClass[i]);
        elementArray.push(elementToAppend.lastElementChild);
    }
}

//function to add all stored classes
const addClasses = () => {
    for (let i = 0; i < elementArray.length; i++) {
        elementArray[i].classList.add(classArray[i]);
    }
    elementArray.length = 0;
    classArray.length = 0;
}

//function to give attributes to button components
const setButton = (el, id, type, text) => {
    el.setAttribute("id", id);
    el.setAttribute("type", type);
    el.innerHTML = text;
    el.addEventListener("click", handleClick(el));
}

//function to remove childs of components
const removeContent = (el) => {
    if(el.hasChildNodes()){
        el.removeChild(el.firstElementChild);
    }
}

//function to cross names in list
const crossDead = (obj) => {
    let liElements = document.querySelectorAll("#startPoint li");
    console.log(liElements)
    liElements.forEach(el => {
        if(el.innerHTML == `${obj.name} ${obj.surnames.surnameOne}`){
            el.setAttribute('style', 'text-decoration: line-through');
        }
    });
}

/* Functions to wait to element creation
========================================================= */

/*function waitUntilElementLoad(selector,  delay) {
    if(document.querySelector(selector) != null){
        // element found; do something
    } else setTimeout(()=>waitUntilElementLoad(selector, delay), delay);
}*/