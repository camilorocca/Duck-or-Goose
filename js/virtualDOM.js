export let mainTitle = [{
        id: "container",
        elementToAppend: "#startPoint",
        elementToCreate: "div",
        classArray: ["container-md"]
    },
    {
        id: "containerChild",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["mt-5"]
    },
    {
        id: "titleFirstRow",
        elementToAppend: "#containerChild",
        elementToCreate: "h1",
        classArray: ["creepy-font"],
        text: "duck"
    },
    {
        id: "titleSecondtRow",
        elementToAppend: "#containerChild",
        elementToCreate: "h1",
        classArray: ["creepy-font"],
        text: "or"
    },
    {
        id: "titleThirdRow",
        elementToAppend: "#containerChild",
        elementToCreate: "h1",
        classArray: ["creepy-font"],
        text: "goose"
    },
    {
        id: "gridBtn",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["d-grid", "gap-2", "col-md-8", "mx-auto"]
    },
    {
        id: "btn-startKilling",
        elementToAppend: "#gridBtn",
        elementToCreate: "button",
        classArray: ["btn", "btn-orange", "btn-lg", "creepy-font"],
        text: "Start Killing",
        type: "button"
    },
    {
        id: "btn-addSacrifices",
        elementToAppend: "#gridBtn",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "btn-lg", "creepy-font"],
        text: "Add Sacrifices",
        type: "button"
    }
]

export let playView = [
    {
        id: "container",
        elementToAppend: "#startPoint",
        elementToCreate: "div",
        classArray: ["container-md", "fixed-bottom", "mb-5"]
    },
    {
        id: "rowDuckKiller",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["col-6", "mx-auto"]
    },
    {
        id: "duckKiller",
        elementToAppend: "#rowDuckKiller",
        elementToCreate: "img",
        classArray: ["img-fluid"]
    },
    {
        id: "splatter",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["d-none"]
    },
    {
        id: "owlCarousel",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["owl-carousel"]
    },
    {
        id: "rowKill",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["row"]
    },
    {
        id: "listKillCol",
        elementToAppend: "#rowKill",
        elementToCreate: "div",
        classArray: ["col-md-12"]
    },
    {
        id: "listToKill",
        elementToAppend: "#listKillCol",
        elementToCreate: "ul",
        classArray: ["list-group", "list-group-flush", "d-none"]
    },
    {
        id: "btnKillGroup",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["d-grid", "gap-2", "col-md-8", "mx-auto"]
    },
    {
        id: "btn-killSomeone",
        elementToAppend: "#btnKillGroup",
        elementToCreate: "button",
        classArray: ["btn", "btn-orange", "btn-lg", "creepy-font"],
        text: "KillSomeone",
        type: "button"
    },
    {
        id: "btn-play",
        elementToAppend: "#btnKillGroup",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "btn-lg", "creepy-font"],
        text: "Play",
        type: "button"
    },
    {
        id: "btn-pause",
        elementToAppend: "#btnKillGroup",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "btn-lg", "creepy-font"],
        text: "Pause",
        type: "button"
    },
    {
        id: "splatter",
        elementToAppend: ".background-img-container",
        elementToCreate: "div",
        classArray: ["d-none"]
    }
]


export let setData = []