import { sacrifices } from "./variables.js";

//sacrifices from variables.js
console.log(sacrifices);

let btnTimeID;

function Sacrifice(id, name, surnames, age, born) {
    this.id = id;
    this.name = name;
    this.surnames = { 
        surnameOne: surnames.surnameOne,
        surnameTwo: surnames.surnameTwo,
    };
    this.age = age;
    this.born = born;
    this.killed = false;
}

let audioFogHorn = new Audio('../media/audio/fogHorn.mp3');

let fogSetted = true;
let addPlayersClicked =false;

let owl;

/* On load functions
========================================================= */
window.onload = (event) => {
    console.log('Page is fully loaded');

    $(".owl-carousel").owlCarousel();

    audioFogHorn.play();
    audioFogHorn.loop = true; 

    let form = searchEl('#formAddSacrifice');


    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        switch (form.id){
            case "formAddSacrifice":
                let id = sacrifices.length; //this method will give problems in delete function
                let surnames = {
                    surnameOne: form[1].value,
                    surnameTwo: ""
                    }
    
                sacrifices.push(new Sacrifice(id, form[0].value, surnames, 0, ""));

                console.log(sacrifices)
            break;
        };
    });

    searchEl('#mainContainer').addEventListener("click", handleClick(searchEl("#mainContainer")));

    drawTitleScreen();
};

const drawTitleScreen = () => {
    let elementToCreate;
    let elementToAppend;

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint');
    addNode(elementToAppend, elementToCreate, ["container-md"]);

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint div');
    addNode(elementToAppend, elementToCreate, ["mt-5"]);

    elementToCreate = createEl("h1");
    elementToAppend = searchEl('#startPoint div div');
    addNode(elementToAppend, elementToCreate, ["creepy-font"]);
    elementToAppend.lastElementChild.innerHTML = "duck";
    elementToCreate = createEl("h1");
    addNode(elementToAppend, elementToCreate, ["creepy-font"]);
    elementToAppend.lastElementChild.innerHTML = "or";
    elementToCreate = createEl("h1");
    addNode(elementToAppend, elementToCreate, ["creepy-font"]);
    elementToAppend.lastElementChild.innerHTML = "goose";

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint div');
    addNode(elementToAppend, elementToCreate, ["d-grid", "gap-2", "col-md-8" , "mx-auto"]);

    elementToCreate = createEl("button");
    elementToAppend = searchEl('#startPoint div div:last-of-type');
    addNode(elementToAppend, elementToCreate, ["btn", "btn-orange", "btn-lg", "creepy-font"]);
    setButton(elementToAppend.lastElementChild, "btn-startKilling", "button", "Start Killing");

    elementToCreate = createEl("button");
    addNode(elementToAppend, elementToCreate, ["btn", "btn-purple", "btn-lg", "creepy-font" ]);
    setButton(elementToAppend.lastElementChild, "btn-addSacrifices", "button", "Add Sacrifices");

    elementToCreate = createEl("div");
    addNode(elementToAppend, elementToCreate, ["mx-auto"]);
    
    elementToCreate = createEl("p");
    elementToAppend = searchEl('#startPoint div div:last-of-type div');
    addNode(elementToAppend, elementToCreate, ["text-color-moon"]);
    elementToAppend.lastElementChild.innerHTML = "Coders still Alive";

};

/* Handle clicks and called functions
========================================================= */
const handleClick = (element) => { // higher order function
    switch (element.id){
        case "mainContainer":
            return () => {  
                if(fogSetted === true){
                    let removeFog = searchEl('#mainContainer .fog-container');
                    audioFogHorn.pause();
                    removeFog.classList.add("puff-out-hor");
                    fogSetted = false;
                    setTimeout(() => {
                        removeFog.remove();
                    }, 1000);
                }  
            };

        case "btn-startKilling":
            return () => {  
                if(addPlayersClicked){
                    hideForm();
                    addPlayersClicked=false;
                }
                removeContent(searchEl("#startPoint"));   
                startKilling();                
            };
            
        case "btn-killSomeone":
            return () => {       
                let deadPerson = killSomeone();
                crossDead(deadPerson);               
            };
        
        case "btn-addSacrifices":
            return () => {   
                if(addPlayersClicked){
                    element.innerHTML = "add sacrifices";
                    hideForm();
                    addPlayersClicked=false;
                }
                else{
                    element.innerHTML = "end ritual";
                    showForm();
                    addPlayersClicked=true;
                }
                
            };

        case "btn-play":
            return () => {       
                owl.trigger('play.owl.autoplay',[1000])              
            };

        case "btn-pause":
            return () => {       
                owl.trigger('stop.owl.autoplay')             
            };
    } 
};

/* Handle sumbits and called functions
========================================================= */
const handleSubmit = (element) => { // higher order function
    console.log(element)
    e.preventDefault();
    switch (element.id){
        case "formAddSacrifice":
            return () => {  
                addSacrifice(element);
            };
    };
};

//function for starting game 
const startKilling = () => {
    let elementToCreate;
    let elementToAppend;

    elementToCreate = createEl("div");
    elementToAppend = searchEl('#startPoint');
    addNode(elementToAppend, elementToCreate, ["container-md"]);

    elementToCreate = createEl("div");
    elementToAppend = searchEl("#startPoint .container-md");
    addNode(elementToAppend, elementToCreate, ["row"]);

    elementToCreate = createEl("div");
    elementToAppend = searchEl("#startPoint .container-md .row");
    addNode(elementToAppend, elementToCreate, ["col-md-6"])
    elementToCreate = createEl("div");
    addNode(elementToAppend, elementToCreate, ["col-md-6"])

    elementToCreate = createEl("ul");
    elementToAppend = searchEl("#startPoint .container-md .row .col-md-6:first-of-type");
    
    addNode(elementToAppend, elementToCreate, ["list-group", "list-group-flush"]);

    elementToAppend = searchEl("#startPoint .container-md .row .col-md-6:first-of-type ul");
    sacrifices.forEach(el => {
        elementToCreate = createEl("li");
        addNode(elementToAppend, elementToCreate, ["list-group-item"])
        elementToAppend.lastElementChild.innerHTML = `${el.name} ${el.surnames.surnameOne}`;
    });

    elementToCreate = createEl("button");
    elementToAppend = searchEl("#startPoint .container-md .row .col-md-6:last-of-type");
    addNode(elementToAppend, elementToCreate, ["btn", "btn-orange", "creepy-font"]);

    setButton(elementToAppend.lastElementChild , "btn-killSomeone", "button", "Kill Someone");

    elementToCreate = createEl("button");
    elementToAppend = searchEl("#startPoint .container-md .row .col-md-6:last-of-type");
    addNode(elementToAppend, elementToCreate, ["btn", "btn-purple", "creepy-font"]);

    setButton(elementToAppend.lastElementChild , "btn-play", "button", "Play");

    elementToCreate = createEl("button");
    elementToAppend = searchEl("#startPoint .container-md .row .col-md-6:last-of-type");
    addNode(elementToAppend, elementToCreate, ["btn", "btn-orange", "creepy-font"]);

    setButton(elementToAppend.lastElementChild , "btn-pause", "button", "Stop");

    elementToCreate = createEl("div");
    elementToAppend = searchEl("#startPoint .container-md");
    addNode(elementToAppend, elementToCreate, ["owl-carousel"]);

    let imgToAppend;
    elementToAppend = searchEl("#startPoint .container-md .owl-carousel");
    sacrifices.forEach(el => {
        elementToCreate = createEl("div");
        addNode(elementToAppend, elementToCreate, [])

        imgToAppend = searchEl("#startPoint .container-md .owl-carousel div:last-of-type");
        elementToCreate = createEl("img");
        addNode(imgToAppend, elementToCreate, ["img-fluid"])
        imgToAppend.lastElementChild.setAttribute("src", "./media/images/index/pumpkin.png");
    });

    owl = $('.owl-carousel');

    owl.owlCarousel({
        items:4,
        loop:true,
        margin:10,
        autoplay:false,
        autoplayTimeout:1000,
        autoplayHoverPause:true
    });

    elementToCreate = createEl("div");
    elementToAppend = searchEl("#startPoint div");
    addNode(elementToAppend, elementToCreate, ["row"]);

    elementToCreate = createEl("img");
    elementToAppend = searchEl("#startPoint div .row:last-of-type");
    addNode(elementToAppend, elementToCreate, ["img-fluid"]);
    elementToAppend.firstElementChild.setAttribute("src", "../media/icons/killingFloor/DuckTheKiller-Orange.svg")
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
        eta.lastElementChild.classList.add(stringClass[i]);
    }
}

//function to give attributes to button components
const setButton = (el, id, type, text) => {
    el.setAttribute("id", id);
    el.setAttribute("type", type);
    el.innerHTML = text;
    el.addEventListener("click", handleClick(el));
    
    
}

//function to give popover attribute to button
/*const setPopOver = (el) => {
    el.setAttribute("data-bs-container", "body");
    el.setAttribute("data-bs-toggle", "popover");
    el.setAttribute("data-bs-placement", "top");
    el.setAttribute("data-html", "true");
}*/

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

//function to show hidden form
const showForm = () => {
    let audioParchmentOpens = new Audio('../media/audio/parchmentOpens.mp3');
    audioParchmentOpens.play();
    let formElement = searchEl("#formContainer")
    formElement.classList.remove("d-none")
}

const hideForm = () => {
    let audioParchmentCloses = new Audio('../media/audio/parchmentCloses.mp3');
    audioParchmentCloses.play();
    let formElement = searchEl("#formContainer")
    formElement.classList.add("d-none")
}




/* Functions to wait to element creation
========================================================= */

/*function waitUntilElementLoad(selector,  delay) {
    if(document.querySelector(selector) != null){
        // element found; do something
    } else setTimeout(()=>waitUntilElementLoad(selector, delay), delay);
}*/


//function delete coders

const deleteSacrifice = (object) => {
    for (let i = 0; i < sacrifices.length; i++) {
        if(object.id == sacrifices[i].id){
            console.log (sacrifices)
            sacrifices.splice(i, 1);            
        }        
    }        
}

//function animation jumping duck 


