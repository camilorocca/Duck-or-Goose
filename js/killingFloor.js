import { sacrifices } from "./variables.js";
import { mainTitle, playView, setData } from "./virtualDOM.js";


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
let addPlayersClicked = false;

//owl carousel initial variables
let owl;
let btnTimeID;

let position;

/* On load functions
========================================================= */
window.onload = (event) => {
    console.log('Page is fully loaded');

    audioFogHorn.play(); //play initial sound
    audioFogHorn.loop = true;

    setFormEventListener(); //set submit for form

    searchEl('#mainContainer').addEventListener("click", handleClick(searchEl("#mainContainer"))); //set click for unset fog
    searchEl('#btn-remove').addEventListener("click", handleClick( searchEl('#btn-remove')));

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
    switch (element.id) { //switch depending on button id
        case "mainContainer":
            return () => { //unset fog
                if (fogSetted === true) {
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
            return () => { //remove previous content and draw playView
                if (addPlayersClicked) {
                    hideForm();
                    addPlayersClicked = false;
                }
                removeContent(searchEl("#startPoint"));
                startKilling();
            };

        case "btn-killSomeone":

            return () => {          //remove a player at random
                searchEl("#duckKiller").classList.add("wobble-ver-left");
                let deadPerson = killSomeone();
                crossDead(deadPerson);
                searchEl("#splatter").classList.remove("d-none");
                setTimeout(() => {
                    searchEl("#duckKiller").classList.remove("wobble-ver-left");
                }, 5000);
            };

        case "btn-addSacrifices":
            return () => { //show parchment or hide it
                if (addPlayersClicked) {
                    element.innerHTML = "add sacrifices";
                    hideForm();
                    addPlayersClicked = false;
                } else {
                    element.innerHTML = "end ritual";
                    showForm();
                    addPlayersClicked = true;
                }

            };

        case "btn-play":
            return () => { //play carousel   
                removeContent(searchEl("#startPoint"))
                drawScreen(mainTitle)
            };

        case "btn-pause":
            return () => { // pause carousel       
                owl.trigger('prev.owl.carousel')
            };
        
        case "btn-remove":
            return () => {        
                deleteSacrifice(1666682362204)
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

        switch (form.id) {
            case "formAddSacrifice":
                const surnames = {
                    surnameOne: form[1].value,
                    surnameTwo: ""
                }

                const obj = {
                    id: Date.now(),
                    name: form[0].value,
                    surnames,
                    age: 0,
                    born: "",
                    killed: false
                };
                sacrifices.push(obj);

                break;
        };
    });
}

//function for starting game 
const startKilling = () => {
    if (setData.length > 0) {
        setData.length = 0;
    }
    //create dom elements with the data from sacrifices


    sacrifices.forEach(el => {
        setData.push(new DomElement("itemCarousel" + el.id, "#owlCarousel", "div"));
        setData.push(new DomElement("listKillItem" + el.id, "#listToKill", "li", ["list-group-item"], `${el.name} ${el.surnames.surnameOne}`));
        setData.push(new DomElement("imgCarousel" + el.id, "#owlCarousel div:last-of-type", "img", ["img-fluid", "img-pumpking"], `${el.name}`));
    });


    drawScreen(playView);

    drawScreen(setData);
    searchEl("#duckKiller").setAttribute("src", "./media/icons/killingFloor/DuckTheKiller-Orange.svg")

    setOwlCarousel(); //set carousel info
}

const setOwlCarousel = () => {
    owl = $('#owlCarousel');

    owl.owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        autoplay: false,
        onTranslated: callback
    });
}

function callback(event){
    position = event.item.index;    
    console.log(event.item.index);
}

//function to kill a coder at random
const killSomeone = () => {
    let movements = Math.floor(Math.random() * (7 - 2) + 2);
    let positionSound 
    for (let i = 0; i < movements; i++) {
        owl.trigger('next.owl.carousel');
        positionSound = Math.floor(Math.random() * (24 - 2) + 2);
        let duckSound = []
        for (let j = 0; j < positionSound; j++) {
            duckSound[j]  = new Audio(`../media/audio/pato${positionSound}.mp3`);
            console.log (duckSound[j]);
            setTimeout (() => {
                duckSound[j].play()
            }, 5000);
        };
        }

    let coderToKill = searchEl("#owlCarousel .active div");

    let indexToKill = coderToKill.id.replace(/\D/g, "");
    
    console.log(indexToKill)
    let killedCoder;
    sacrifices.forEach(el => {
        if (el.id == indexToKill) {
            killedCoder = el;
            el.killed = true;
        }
    });

    owl.trigger('remove.owl.carousel', [position]).trigger('refresh.owl.carousel');

    return killedCoder;
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
    let etc = createEl(obj.elementToCreate);
    let eta = searchEl(obj.elementToAppend);

    eta.appendChild(etc);

    eta.lastElementChild.setAttribute("id", obj.id);

    if (obj.classArray) {
        for (let i = 0; i < obj.classArray.length; i++) {
            eta.lastElementChild.classList.add(obj.classArray[i]);
            if (obj.classArray[i] == "img-pumpking") {
                eta.lastElementChild.setAttribute("src", "./media/images/index/pumpkin.png");
            }

        }
    }

    if (obj.elementToCreate == "button") {
        eta.lastElementChild.setAttribute("type", obj.type);
        eta.lastElementChild.addEventListener("click", handleClick(eta.lastElementChild));

    
    }
    if (obj.text) {
        eta.lastElementChild.innerHTML = obj.text;
    }
}

//function to remove childs of components
const removeContent = (el) => {
    if (el.hasChildNodes()) {
        el.removeChild(el.firstElementChild);
    }
}

//function to cross names in list
const crossDead = (obj) => {
    let liElements = document.querySelectorAll("#startPoint li");
    liElements.forEach(el => {
        if (el.innerHTML == `${obj.name} ${obj.surnames.surnameOne}`) {
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
const deleteSacrifice = (idToRemove) => {
    for (let i = 0; i < sacrifices.length; i++) {
        if (idToRemove == sacrifices[i].id) {
            sacrifices.splice(i, 1);
        }
    }

    console.log(setData)

    for (let i = 0; i < setData.length; i++) {
        if (`itemCarousel${idToRemove}` == setData[i].id) {
            setData.splice(i, 1);
        }
        if(`listKillItem${idToRemove}` == setData[i].id){
            setData.splice(i, 1);
        }
        if(`imgCarousel${idToRemove}` == setData[i].id){
            setData.splice(i, 1);
        }
    };

    console.log(setData)
    
}