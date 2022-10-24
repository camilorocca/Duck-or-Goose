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
                    id: sacrifices.length,
                    name: form[0].value,
                    surnames,
                    age: 0,
                    born: "",
                    killed: false
                };
                sacrifices.push(obj);

                console.log(sacrifices)
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
        setData.push(new DomElement("listKillItem" + el.id, "#listToKill", "li", ["list-group-item"], `${el.name} ${el.surnames.surnameOne}`));
        setData.push(new DomElement("itemCarousel" + el.id, "#owlCarousel", "div"));
        setData.push(new DomElement("imgCarousel" + el.id, "#owlCarousel div:last-of-type", "img", ["img-fluid"], `${el.name}`));
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

function callback(event) {
    position = event.item.index;
    console.log(event.item.count);
}

//function to kill a coder at random
const killSomeone = () => {
    let movements = Math.floor(Math.random() * (7 - 2) + 2);

    for (let i = 0; i < movements; i++) {
        owl.trigger('next.owl.carousel')
    }

    let coderToKill = searchEl("#owlCarousel .active div");
    console.log(coderToKill.id)
    let indexToKill = coderToKill.id.slice(-1);

    sacrifices[indexToKill].killed = true

    owl.trigger('remove.owl.carousel', [position]).trigger('refresh.owl.carousel');

    return sacrifices[indexToKill];
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
        }
    }

    if (obj.elementToCreate == "button") {
        eta.lastElementChild.setAttribute("type", obj.type);
        eta.lastElementChild.addEventListener("click", handleClick(eta.lastElementChild));
    }
    else if(obj.elementToCreate == "img"){
        eta.lastElementChild.setAttribute("src", "../media/images/index/pumpkin.png");
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
const deleteSacrifice = (object) => {
    for (let i = 0; i < sacrifices.length; i++) {
        if (object.id == sacrifices[i].id) {
            console.log(sacrifices)
            sacrifices.splice(i, 1);
        }
    }
}