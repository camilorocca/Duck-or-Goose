export let mainTitle = [
    {
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
        classArray: ["d-grid", "gap-2", "col-md-8" , "mx-auto"]
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
        classArray: ["container-md"]
    },
    {
        id: "rowKill",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["row"]
    },
    {
        id: "firstCol-rowKill",
        elementToAppend: "#rowKill",
        elementToCreate: "div",
        classArray: ["col-md-6"]
    },
    {
        id: "secondCol-rowKill",
        elementToAppend: "#rowKill",
        elementToCreate: "div",
        classArray: ["col-md-6"]
    },
    {
        id: "listToKill",
        elementToAppend: "#firstCol-rowKill",
        elementToCreate: "ul",
        classArray: ["list-group", "list-group-flush"]
    },
    {
        id: "btn-killSomeone",
        elementToAppend: "#secondCol-rowKill",
        elementToCreate: "button",
        classArray: ["btn", "btn-orange", "creepy-font"],
        text: "KillSomeone",
        type: "button"
    },
    {
        id: "btn-play",
        elementToAppend: "#secondCol-rowKill",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "creepy-font"],
        text: "Play",
        type: "button"
    },
    {
        id: "btn-pause",
        elementToAppend: "#secondCol-rowKill",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "creepy-font"],
        text: "Pause",
        type: "button"
    },
    {
        id: "owlCarousel",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["owl-carousel"]
    },
    {
        id: "rowDuckKiller",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: ["row"]
    },
    {
        id: "duckKiller",
        elementToAppend: "#rowDuckKiller",
        elementToCreate: "img",
        classArray: ["img-fluid"]
    },
]
