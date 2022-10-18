import { sacrifices } from "./variables.js";

console.log(sacrifices);

const main = document.getElementById("mainContainer");
let elementToCreate;
let elementToAppend;


window.onload = (event) => {
    console.log('Page is fully loaded');
    
    createContainer(main);

    elementToCreate = createEl("button");
    elementToAppend = searchEl('#mainContainer div')
    elementToAppend.appendChild(elementToCreate);

    elementToAppend = searchEl("#mainContainer .container-md button");

    setButton(elementToAppend, "btn-startKilling", "button", "Start Killing")
};


const handleClick = (element) => { // higher order function
    switch (element.id){
        case "btn-startKilling":
            return () => {  
                removeContent(searchEl("#mainContainer"))  ;   
                startKilling();                
            };
            

        case "btn-killSomeone":
            return () => {       
                let deadPerson = killSomeone();
                crossDead(deadPerson);               
            };
    } 
};

const searchEl = (selector) => {
    return document.querySelector(selector);
}

const createEl = (selector) => {
    return document.createElement(selector);
}

const startKilling = () => {
    createContainer(main);

    elementToAppend = searchEl("#mainContainer div");
    elementToCreate = createEl("div");

    elementToAppend.appendChild(elementToCreate);
    elementToAppend.lastElementChild.classList.add("row");

    elementToAppend = searchEl("#mainContainer .row");
    elementToCreate = createEl("div");
    elementToAppend.appendChild(elementToCreate);
    elementToAppend.lastElementChild.classList.add("col-md-6");

    elementToCreate = createEl("div");
    elementToAppend.appendChild(elementToCreate);
    elementToAppend.lastElementChild.classList.add("col-md-6");

    elementToCreate = createEl("ul");
    elementToAppend = searchEl("#mainContainer .row div:first-of-type");

    console.log(elementToAppend)

    elementToAppend.appendChild(elementToCreate);
    elementToAppend = searchEl("#mainContainer .row div:first-of-type ul");

    elementToAppend.classList.add("list-group");
    elementToAppend.classList.add("list-group-flush");
    
    sacrifices.forEach(el => {
        elementToCreate = createEl("li");
        elementToAppend.appendChild(elementToCreate);
        elementToAppend.lastElementChild.classList.add('list-group-item');;
        elementToAppend.lastElementChild.innerHTML = `${el.name} ${el.surnames.surnameOne}`;
    });

    elementToAppend = searchEl("#mainContainer .row div:last-of-type");
    elementToCreate = createEl("button");

    setButton(elementToAppend, "btn-killSomeone", "button", "Kill Someone");

}

const createContainer = (el) => {
    el.appendChild(createEl("div"));
    searchEl("#mainContainer div").classList.add( "container-md" );
}

const setButton = (el, id, type, text) => {
    el.classList.add("btn");
    el.classList.add("btn-danger");
    el.setAttribute("id", id);
    el.setAttribute("type", type);
    el.innerHTML = text;
    el.addEventListener("click", handleClick(el));
}

const removeContent = (el) => {
    if(el.hasChildNodes()){
        el.removeChild(el.firstElementChild);
    }
}

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

const crossDead = (obj) => {
    let liElements = document.querySelectorAll("#mainContainer li");
    console.log(liElements)
    liElements.forEach(el => {
        if(el.innerHTML == `${obj.name} ${obj.surnames.surnameOne}`){
            el.setAttribute('style', 'text-decoration: line-through');
        }
    });
}

/*function waitUntilElementLoad(selector,  delay) {
    if(document.querySelector(selector) != null){
        // element found; do something
    } else setTimeout(()=>waitUntilElementLoad(selector, delay), delay);
}*/