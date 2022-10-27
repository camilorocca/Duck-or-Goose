import { sacrifices } from "./sacrificesData.js";
import { mainTitle, playView, setData, listData } from "./virtualDOM.js";

//constructor for new DOM element
function DomElement(id, elementToAppend, elementToCreate, ...rest) {
    this.id = id;
    this.elementToAppend = elementToAppend;
    this.elementToCreate = elementToCreate;
    this.classArray = rest[0];
    this.text = rest[1];
}

//constructor for new Sacrifices
function Sacrifice(id, name, surnames, ...rest) {
    this.id = id;
    this.name = name;
    this.surnames = {
        surnameOne: surnames.surnameOne,
        surnameTwo: surnames.surnameTwo
    };
    this.age = rest[0];
    this.born = rest[1];
    this.killed = false;
}

//audio objects
let audioFogHorn = new Audio('../media/audio/fogHorn.mp3');
let audioKnife = new Audio('../media/audio/knife.mp3');
let audioDuck = new Audio('../media/audio/duck.mp3');
let audioParchmentOpens = new Audio('../media/audio/parchmentOpens.mp3');
    let audioParchmentCloses = new Audio('../media/audio/parchmentCloses.mp3');

//checks for main title
let fogSetted = true;
let addPlayersClicked = false;
let killingInProgress = false;

//owl carousel initial variables
let owl;
let owlNames;

/* On load functions
========================================================= */
window.onload = (event) => {
    console.log('Page is fully loaded');
    audioFogHorn.play();            //play initial sound
    audioFogHorn.loop = true;
    
    handleSubmit();         //set submit for form
    searchEl('#mainContainer').addEventListener("click", handleClick(searchEl("#mainContainer")));          //set click for unset fog
    drawScreen(mainTitle);
    listDraw();
};

//draws the elements received from virtualDomJs
const drawScreen = (virtualDom) => {
    virtualDom.forEach(element => {
        addNodes(element)
    });
};

//draws list with all sacrifices
const listDraw = () => {
    searchEl("#listToKill").innerHTML = "";
    listData.length = 0;
    
    orderSacrifices();
    sacrifices.forEach(el => {
        fillList(el);
    });
    drawScreen(listData);
}

//order sacrifices array alphabetically by name
const orderSacrifices = () => {
    sacrifices.sort((a, b) => a.name.localeCompare(b.name)) 
};

//pushes list element to listData array
const fillList = (obj) => {
    listData.push(
        new DomElement(
            "listKillItem" + obj.id, 
            "#listToKill", 
            "li", 
            ["list-group-item", 
            "bg-transparent"], 
            `${obj.name} ${obj.surnames.surnameOne}`.toUpperCase()
        )
    );
}

/* Handle clicks events
================================================== */
const handleClick = (element) => {
    switch (element.id) {           //switch depending on button id
        case "mainContainer":
            return () => {          //unset fog
                if (fogSetted === true) {
                    let removeFog = searchEl('#mainContainer .fog-container');
                    audioFogHorn.pause();
                    removeFog.classList.add("puff-out-hor");            //animation dissipating fog
                    fogSetted = false;
                    setTimeout(() => {
                        removeFog.remove();         //wait animation end for removing overlay div
                    }, 1000);
                }
            };
            
        case "btn-startKilling":
            return () => {          //remove main content and draw playView
                if (addPlayersClicked) {            //check if form is on screen
                    hideForm();
                    addPlayersClicked = false;
                }
                removeContent(searchEl("#startPoint"));
                drawPlayView();
            };
            
        case "btn-killSomeone":
            return () => {          //remove a player at random
                if (killingInProgress) {            //check if a kill is currently playing for carousel reset
                    searchEl("#lastKilled").innerHTML = "";
                    
                    setData.length = 0;         //remove array with carousel data
                    destroyCarousel();
                    destroyCarouselNames();
                    
                    fillInfoCarousel();         //fill array with new carousel elements excludin dead coders
                    drawScreen(setData);
                    
                    setOwlCarousel();            //set carousels info
                    setOwlCarouselNames();
                    searchEl("#duckKiller").classList.remove("wobble-ver-left");            //remove killerDuck animation
                    
                    searchEl("#splatter").classList.add("d-none")           //hide splatter and name of last kill
                    searchEl("#splatter").classList.remove("scale-up-center")
                    searchEl("#formContainer").classList.add("d-none")
                    
                    audioParchmentCloses.play();
                    element.innerHTML = "kill someone";
                    killingInProgress = false;
                } else {
                    searchEl("#duckKiller").classList.add("wobble-ver-left");           //add killerDuck animation
                    killSomeone();         //get next person killed
                    
                    searchEl("#listToKill").innerHTML = "";         //clean list and remove array listData and carousel data elements
                    listData.length = 0;
                    setData.length = 0;
                    
                    orderSacrifices();
                    sacrifices.forEach(el => {
                        if(!el.killed){              //pushes list elements to listData array only if still alive
                            fillList(el);           
                        }
                    });
                    drawScreen(listData);           //renders updated list
                    
                    element.innerHTML = "next kill";
                    killingInProgress = true;
                }
            };
            
        case "btn-addSacrifices":
            return () => {              //show parchment or hide it
                if (addPlayersClicked) {
                    hideForm();
                    element.innerHTML = "add sacrifices";
                    addPlayersClicked = false;
                } else {
                    showForm();
                    element.innerHTML = "end ritual";
                    addPlayersClicked = true;
                }
            };
            
        case "btn-flee":
            return () => {              //go to main view   
                removeContent(searchEl("#startPoint"))          //remove playView virtualDOM elements
                searchEl("#rowKill").remove();
                searchEl("#titleStillAlive").classList.remove("title-still-alive")
                
                if(killingInProgress){           //check if a kill is currently playing to avoid parchment showing on setTimeOut
                    searchEl("#lastKilled").innerHTML = "";
                    searchEl("#formContainer").classList.add("d-none")
                    audioParchmentCloses.play();
                    killingInProgress = false;
                }
                
                sacrifices.forEach(el => {          //return all sacrifices to life
                    el.killed = false;          
                });
                drawScreen(mainTitle);
                listDraw();
            };
    }
};

/* Handle submit event
========================================================= */
const handleSubmit = () => {
    let form = searchEl('#formAddSacrifice');

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const surnames = {              //get surnames from second input
            surnameOne: form[1].value,
            surnameTwo: ""
        }
        sacrifices.push(            //create sacrifice give id given with Date.now()
            new Sacrifice(
                Date.now(), 
                form[0].value, 
                surnames, 
                28, 
                "1994 - ?"
            )
        );
        listDraw();         //draw list with new sacrifice data
    });
}

/* Functions called on start-killing button
========================================================= */
const drawPlayView = () => {
    if (setData.length > 0) {
        setData.length = 0;             //remove DOM elements from previous games
    }
    fillInfoCarousel();          //fill array with new carousel elements excludin dead coders
    drawScreen(playView);
    drawScreen(setData);
    
    searchEl("#duckKiller").setAttribute("src", "./media/icons/killingFloor/DuckTheKiller-Orange.svg");         //set src to duck img
    
    setOwlCarousel();            //set carousels info
    setOwlCarouselNames(); 
}

//pushes carousel dom elements to array with still alive coders
const fillInfoCarousel = () => {
    shuffleArray(sacrifices);           
    sacrifices.forEach(el => {
        if (el.killed != true){
            setData.push(new DomElement("itemCarousel" + el.id, "#owlCarousel", "div", ["item-carousel"]));
            setData.push(new DomElement("imgCarouselL" + el.id, "#owlCarousel .item-carousel:last-of-type", "img", ["img-pumpkin"]));
            setData.push(new DomElement("imgCarouselR" + el.id, "#owlCarousel .item-carousel:last-of-type", "img", ["img-pumpkin"]));
            setData.push(new DomElement("itemCarouselNames" + el.id, "#owlCarouselNames", "div", ["item-carousel"]));
            setData.push(new DomElement("carouselText" + el.id, "#owlCarouselNames .item-carousel:last-of-type", "div", ["centered"],`${el.name}`.toUpperCase()));
        }
    });
}

//shuffle array to get new positions each kill
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/* Functions for setting and destroying owlCarousel
========================================================= */
const setOwlCarousel = () => {
    owl = $("#owlCarousel");
    owl.owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        autoplay: false,
    });
}
const setOwlCarouselNames = () => {
    owlNames = $("#owlCarouselNames");
    owlNames.owlCarousel({
        items: 5,
        loop: true,
        margin: 10,
        autoplay: false,
    });
}
// destroy owlCarousel elements using jquery
const destroyCarousel = () => {          
    owl.trigger('destroy.owl.carousel')
    searchEl("#owlCarousel").innerHTML = "";
    searchEl("#owlCarousel").classList.remove("owl-loaded")
    searchEl("#owlCarousel").classList.remove("owl-drag")
};
// destroy owlCarouselNames elements using jquery
const destroyCarouselNames = () => {   
    owlNames.trigger('destroy.owl.carousel')
    searchEl("#owlCarouselNames").innerHTML = "";
    searchEl("#owlCarouselNames").classList.remove("owl-loaded")
    searchEl("#owlCarouselNames").classList.remove("owl-drag")
};

/* Functions for killing a coder
========================================================= */
const killSomeone = () => {
    audioDuck.play();
    
    for (let i = 0; i < 15; i++) {
        owl.trigger('next.owl.carousel', [400])
        owlNames.trigger('next.owl.carousel', [400])
    }
    
    let coderToKill = document.getElementsByClassName("active")[2];
    let indexToKill = coderToKill.firstElementChild.id.replace(/\D/g, "");
    
    let killedCoder;
    sacrifices.forEach(el => {
        if (el.id == indexToKill) {             //check if carousel item id matches with sacrifice id
            killedCoder = el;
            el.killed = true;
        }
    });
    
    searchEl("#btn-killSomeone").classList.add("disabled");
    searchEl("#btn-flee").classList.add("disabled");
    
    setTimeout(() => {              //wait for carousel animation to stop for starting animations
        coderToKill.firstElementChild.firstElementChild.classList.add("pumpkin-left")
        coderToKill.firstElementChild.lastElementChild.classList.add("pumpkin-right")
        setTimeout(() => {
            coderToKill.firstElementChild.firstElementChild.classList.add("d-none");            //hide pumpkin img
            coderToKill.firstElementChild.lastElementChild.classList.add("d-none");

            audioKnife.play();
            searchEl("#splatter").classList.add("scale-in-center");          //animate splatter
            searchEl("#splatter").classList.remove("d-none");
            setTimeout(() => {
                if(killingInProgress){          //show parchment with still alive list
                    searchEl("#lastKilled").innerHTML = `${killedCoder.name} ${killedCoder.surnames.surnameOne}`
                    searchEl("#rowKill").classList.remove("rowKillAddPlayers")
                    searchEl("#titleStillAlive").classList.add("title-still-alive")
                    searchEl("#rowKill").classList.add("rowKillShowPlayers")
                    searchEl("#formContainer").classList.remove("d-none")
                    audioParchmentOpens.play();
                    searchEl("#btn-killSomeone").classList.remove("disabled");
                    searchEl("#btn-flee").classList.remove("disabled");
                }
            }, 1500);
        }, 1450);
    }, 5200);
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
//function to append node to DOM getting node data from virtualDOM.js 
const addNodes = (obj) => {
    let etc = createEl(obj.elementToCreate);
    let eta = searchEl(obj.elementToAppend);   
    
    eta.appendChild(etc);
    
    eta.lastElementChild.setAttribute("id", obj.id);        //set id
    
    if (obj.classArray) {                                   //if object has classes add to element just created
        for (let i = 0; i < obj.classArray.length; i++) {
            eta.lastElementChild.classList.add(obj.classArray[i]);
            if (obj.classArray[i] == "img-pumpkin") {               //give src if img is a pumpkin
                eta.lastElementChild.setAttribute("src", "./media/images/index/pumpkin.png");
            }
        }
    }  
    
    if(obj.elementToCreate == "li"){            //give handleremove function for li items
        eta.lastElementChild.addEventListener("click", handleRemove(eta.lastElementChild));
    }
    
    if (obj.elementToCreate == "button") {              //if element is abutton set type and eventlistener
        eta.lastElementChild.setAttribute("type", obj.type);
        eta.lastElementChild.addEventListener("click", handleClick(eta.lastElementChild));
    }
    if (obj.text) {
        eta.lastElementChild.innerHTML = obj.text;          //if object has attribute text appendit to element created
    }
}
//function to remove childs of components
const removeContent = (el) => {
    if (el.hasChildNodes()) {
        el.removeChild(el.firstElementChild);
    }
}

//function to show hidden form
const showForm = () => {
    audioParchmentOpens.play();
    let formElement = searchEl("#formContainer")
    formElement.classList.remove("d-none")
    formElement = searchEl(".form-row")
    formElement.classList.remove("d-none")
    formElement = searchEl("#btnAddContainer")
    formElement.classList.remove("d-none")
}
//function to hide form
const hideForm = () => {
    audioParchmentCloses.play();
    let formElement = searchEl("#formContainer")
    formElement.classList.add("d-none")
    formElement = searchEl(".form-row")
    formElement.classList.add("d-none")
    formElement = searchEl("#btnAddContainer")
    formElement.classList.add("d-none")
}

/* Functions for deleting DOM items and sacrifices
========================================================= */

//handle event for list element deleting a sacrifice
const handleRemove = (element) => {
    return() => {
        element.remove()
        let indexToKill = element.id.replace(/\D/g, "");
        deleteSacrifice(indexToKill);
    }
}
//function to delete sacrifices
const deleteSacrifice = (idToRemove) => {
    for (let i = 0; i < sacrifices.length; i++) {
        if (idToRemove == sacrifices[i].id) {
            sacrifices.splice(i, 1);
        }
    }
    cleanVirtualDom(idToRemove);            //we have to delete any elements on the dom for that sacrifice
    cleanList(idToRemove);
}
//clean every virtual DOM element with an id eqaul to deleted sacrifice
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
//clean list element related to the deleted sacrifice
const cleanList = (id) => {
    for (let i = 0; i < listData.length; i++) {
        if(`listKillItem${id}` == listData[i].id){
            setData.splice(i, 1);
        }
    }
}