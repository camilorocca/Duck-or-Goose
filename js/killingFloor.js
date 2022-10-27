import { sacrifices } from "./variables.js";
import { mainTitle, playView, setData, listData } from "./virtualDOM.js";


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
let killingInProgress = false;
let showListClicked = false;

//owl carousel initial variables
let owl;
let owlNames;
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

    fillList();

    

    drawScreen(listData);
};

//draws the elements received from virtualDomJs
const drawScreen = (virtualDom) => {
    virtualDom.forEach(element => {
        addNodes(element)
    });
};

const fillList = () => {
    sacrifices.forEach(el => {
        listData.push(new DomElement("listKillItem" + el.id, "#listToKill", "li", ["list-group-item", "bg-transparent"], `${el.name} ${el.surnames.surnameOne}`));
    });
};


const handleRemove = (element) => {
    return() => {
        element.remove()
        let indexToKill = element.id.replace(/\D/g, "");
        deleteSacrifice(indexToKill);
    }
}
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
                if (killingInProgress) {
                    setData.length = 0;
                owl.trigger('destroy.owl.carousel')
                searchEl("#owlCarousel").innerHTML = ""
                searchEl("#owlCarousel").classList.remove("owl-loaded")
                searchEl("#owlCarousel").classList.remove("owl-drag")

                owlNames.trigger('destroy.owl.carousel')
                searchEl("#owlCarouselNames").innerHTML = ""
                searchEl("#owlCarouselNames").classList.remove("owl-loaded")
                searchEl("#owlCarouselNames").classList.remove("owl-drag")
        
                fillInfoCarousel();
        
            drawScreen(setData);
        
            setOwlCarousel(); //set carousel info
            setOwlNames(); //set carousel info
                    searchEl("#duckKiller").classList.remove("wobble-ver-left");
                    element.innerHTML = "kill someone";
                    killingInProgress = false;
                    searchEl("#splatter").classList.add("d-none")
                    searchEl("#splatter").classList.remove("scale-up-center")
                    searchEl("#formContainer").classList.add("d-none")
                } else {
                    searchEl("#duckKiller").classList.add("wobble-ver-left");
                    let deadPerson = killSomeone();
                   
                    crossDead(deadPerson);
                    
                    element.innerHTML = "next kill";
                    killingInProgress = true;
                }

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

        case "btn-flee":
            return () => { //play carousel   
                removeContent(searchEl("#startPoint"))
                searchEl("#rowKill").remove();

                if(killingInProgress){
                    searchEl("#formContainer").classList.add("d-none")
                    killingInProgress = false;
                }

                sacrifices.forEach(el => {
                    el.killed = false;
                })

                drawScreen(mainTitle)
                drawScreen(listData)
            };

        case "btn-showList":
            return () => { //show list   
                if (showListClicked) {
                    element.innerHTML = "sacrifices";
                    searchEl("#rowKill").classList.add("d-none")
                    showListClicked = false;
                } else {
                    element.innerHTML = "close";
                    searchEl("#rowKill").classList.remove("d-none")
                    showListClicked = true;
                }
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

                listData.length = 0;

                sacrifices.sort((a, b) => a.name.localeCompare(b.name))

                searchEl("#listToKill").innerHTML = "";
                fillList();

                drawScreen(listData);

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

    fillInfoCarousel()



    drawScreen(playView);

    drawScreen(setData);
    searchEl("#duckKiller").setAttribute("src", "./media/icons/killingFloor/DuckTheKiller-Orange.svg")

    setOwlCarousel(); //set carousel info
    setOwlNames(); //set carousel info
}

const setOwlCarousel = () => {
    owl = $("#owlCarousel");

    owl.owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        autoplay: false,
        onTranslated: callback
    });
}

const setOwlNames = () => {
    owlNames = $("#owlCarouselNames");

    owlNames.owlCarousel({
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

    for (let i = 0; i < movements; i++) {
        owl.trigger('next.owl.carousel', [300])
        owlNames.trigger('next.owl.carousel', [300])
    }

   
    let coderToKill = document.getElementsByClassName("active")[2];

    let indexToKill = coderToKill.firstElementChild.id.replace(/\D/g, "");
    
    let killedCoder;
    sacrifices.forEach(el => {
        if (el.id == indexToKill) {
            killedCoder = el;
            el.killed = true;
        }        
    });
    
    setTimeout(() => {
        coderToKill.firstElementChild.firstElementChild.classList.add("pumpkin-left")
        coderToKill.firstElementChild.lastElementChild.classList.add("pumpkin-right")
        setTimeout(() => {
            coderToKill.firstElementChild.firstElementChild.classList.add("d-none")
            coderToKill.firstElementChild.lastElementChild.classList.add("d-none")
            searchEl("#splatter").classList.add("scale-up-center")
            searchEl("#splatter").classList.remove("d-none")
            setTimeout(() => {
                if(killingInProgress){
                    searchEl("#lastKilled").innerHTML = `${killedCoder.name} ${killedCoder.surnames.surnameOne}`
                searchEl("#formContainer").classList.remove("d-none")
                }
                
            }, 1500);
        }, 1500);
    }, 250 * movements);

   
    owl.trigger('remove.owl.carousel', [position]).trigger('refresh.owl.carousel');
 

    searchEl("#rowTombs").classList.remove("d-none");


    return killedCoder;
}

const fillInfoCarousel = () => {

    shuffleArray(sacrifices)
    sacrifices.forEach(el => {
        if (el.killed != true){
            setData.push(new DomElement("itemCarousel" + el.id, "#owlCarousel", "div", ["item-carousel"]));
            setData.push(new DomElement("imgCarouselL" + el.id, "#owlCarousel .item-carousel:last-of-type", "img", ["img-pumpkin"]));
            setData.push(new DomElement("imgCarouselR" + el.id, "#owlCarousel .item-carousel:last-of-type", "img", ["img-pumpkin"]));
            setData.push(new DomElement("itemCarouselNames" + el.id, "#owlCarouselNames", "div", ["item-carousel"]));
            setData.push(new DomElement("carouselText" + el.id, "#owlCarouselNames .item-carousel:last-of-type", "div", ["centered"],`${el.name}`));
        }
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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
            if (obj.classArray[i] == "img-pumpkin") {
                eta.lastElementChild.setAttribute("src", "./media/images/index/pumpkin.png");
            }

        }
    }

    if(obj.elementToCreate == "li"){
        eta.lastElementChild.addEventListener("click", handleRemove(eta.lastElementChild));
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
    let liElements = document.querySelectorAll("#rowKill li");
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
    formElement = searchEl("#formAddSacrifice")
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

    

    cleanVirtualDom(idToRemove)

    cleanList(idToRemove);
    

}

const cleanVirtualDom = (id) => {
    for (let i = 0; i < setData.length; i++) {
        if (`itemCarousel${id}` == setData[i].id) {
            setData.splice(i, 1);
        }
        if(`imgCarouselL${id}` == setData[i].id){
            setData.splice(i, 1);
        }
        if(`imgCarouselR${id}` == setData[i].id){
            setData.splice(i, 1);
        }
        if(`carouselText${id}` == setData[i].id){
            setData.splice(i, 1);
        }
        if(`itemCarouselNames${id}` == setData[i].id){
            setData.splice(i, 1);
        }
    };
}

const cleanList = (id) => {
    for (let j = 0; j < listData.length; j++) {
        if(`listKillItem${id}` == listData[j].id){
            setData.splice(i, 1);
        }
    }
}
