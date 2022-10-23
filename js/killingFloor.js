import { sacrifices } from "./variables.js";
import { mainTitle, playView } from "./virtualDOM.js";

//constructor for new sacrifices
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

//constructor for new DOM element
function DomElement(id, elementToAppend, elementToCreate, ...rest) {
    this.id = id;
    this.elementToAppend = elementToAppend;
    this.elementToCreate = elementToCreate;
    this.classArray = rest[0];
    this.text = rest[1];
}

//checks for main title
let audioFogHorn = new Audio('../media/audio/fogHorn.mp3');
let fogSetted = true;
let addPlayersClicked =false;

//owl carousel initial variables
let owl;
let btnTimeID;

/* On load functions
========================================================= */
window.onload = (event) => {
    console.log('Page is fully loaded');

    audioFogHorn.play();            //play initial sound
    audioFogHorn.loop = true; 

    setFormEventListener();         //set submit for form

    searchEl('#mainContainer').addEventListener("click", handleClick(searchEl("#mainContainer")));          //set click for unset fog

    drawScreen(mainTitle);
};

//draws the elements received from virtualDomJs
const drawScreen = (virtualDom) => {
    virtualDom.forEach(element => {
        addNodes(element)
    });
};

/* Handle clicks and called functions
========================================================= */
const handleClick = (element) => { 
    switch (element.id){            //switch depending on button id
        case "mainContainer":
            return () => {          //unset fog
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
            return () => {          //remove previous content and draw playView
                if(addPlayersClicked){
                    hideForm();
                    addPlayersClicked=false;
                }
                removeContent(searchEl("#startPoint"));   
                startKilling();                
            };
            
        case "btn-killSomeone":
            return () => {          //remove a player at random
                let deadPerson = killSomeone();
                crossDead(deadPerson);               
            };
        
        case "btn-addSacrifices":
            return () => {          //show parchment or hide it
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
            return () => {          //play carousel       
                owl.trigger('play.owl.autoplay',[1000])              
            };

        case "btn-pause":
            return () => {          // pause carousel       
                owl.trigger('stop.owl.autoplay')             
            };
    } 
};

/* Handle sumbits and called functions
========================================================= */
/*const handleSubmit = (element) => { // higher order function
    console.log(element)
    e.preventDefault();
    switch (element.id){
        case "formAddSacrifice":
            return () => {  
                addSacrifice(element);
            };
    };
};*/
const setFormEventListener = () => {
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
}

//function for starting game 
const startKilling = () => {
    let count = 0;

    sacrifices.forEach(el => {          //create dom elements with the data from sacrifices
        playView.push(new DomElement("listKillItem" + count, "#listToKill", "li", ["list-group-item"], `${el.name} ${el.surnames.surnameOne}`));
        playView.push(new DomElement("itemCarousel" + count, "#owlCarousel", "div"));
        playView.push(new DomElement("imgCarousel" + count, "#owlCarousel div:last-of-type", "img", ["img-fluid"]));
        count++;
    });

    drawScreen(playView);

    searchEl("#duckKiller").setAttribute("src", "../media/icons/killingFloor/DuckTheKiller-Orange.svg")

    setOwlCarousel();           //set carousel info
}

const setOwlCarousel = () => {
    owl = $('#owlCarousel');

    owl.owlCarousel({
        items:4,
        loop:true,
        margin:10,
        autoplay:false,
        autoplayTimeout:1000,
        autoplayHoverPause:true
    });
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
const addNodes = (obj) => {
    let etc= createEl(obj.elementToCreate);
    let eta = searchEl(obj.elementToAppend);

    eta.appendChild(etc);

    eta.lastElementChild.setAttribute("id", obj.id);

    if(obj.classArray){
        for (let i = 0; i < obj.classArray.length; i++) {
            eta.lastElementChild.classList.add(obj.classArray[i]);
        }
    }
    
    if(obj.elementToCreate == "button"){
        eta.lastElementChild.setAttribute("type", obj.type);
        eta.lastElementChild.addEventListener("click", handleClick(eta.lastElementChild));
    }
    else if(obj.elementToCreate == "img"){
        eta.lastElementChild.setAttribute("src", "./media/images/index/pumpkin.png");
    }

    if(obj.text){
        eta.lastElementChild.innerHTML = obj.text;
    }
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

//function delete coders
const deleteSacrifice = (object) => {
    for (let i = 0; i < sacrifices.length; i++) {
        if(object.id == sacrifices[i].id){
            console.log (sacrifices)
            sacrifices.splice(i, 1);            
        }        
    }        
}