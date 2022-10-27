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
        classArray: ["btn", "btn-orange", "btn-lg", "creepy-font", "btn-general"],
        text: "start Killing",
        type: "button"
    },
    {
        id: "btn-addSacrifices",
        elementToAppend: "#gridBtn",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "btn-lg", "creepy-font", "btn-general"],
        text: "add Sacrifices",
        type: "button"
    },
    {
        id: "rowKill",
        elementToAppend: "#formAddSacrifice",
        elementToCreate: "div",
        classArray: ["rowKillAddPlayers", "text-center"]
    },
    {
        id: "listToKill",
        elementToAppend: "#rowKill",
        elementToCreate: "ul",
        classArray: ["list-group", "bg-transparent"]
    }
]

export let playView = [{
        id: "container",
        elementToAppend: "#startPoint",
        elementToCreate: "div",
        classArray: ["container-md"]
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
        id: "carouselControls",
        elementToAppend: "#container",
        elementToCreate: "div",
        classArray: []
    },
    {
        id: "owlCarousel",
        elementToAppend: "#carouselControls",
        elementToCreate: "div",
        classArray: ["owl-carousel", "pb-1"]
    },
    {
        id: "owlCarouselNames",
        elementToAppend: "#carouselControls",
        elementToCreate: "div",
        classArray: ["owl-carousel", "pb-1"]
    },
    {
        id: "btnKillGroup",
        elementToAppend: "#carouselControls",
        elementToCreate: "div",
        classArray: ["d-grid", "gap-2", "mx-auto"]
    },
    {
        id: "btn-killSomeone",
        elementToAppend: "#btnKillGroup",
        elementToCreate: "button",
        classArray: ["btn", "btn-orange", "btn-lg", "creepy-font", "btn-general"],
        text: "killSomeone",
        type: "button"
    },
    {
        id: "btn-flee",
        elementToAppend: "#btnKillGroup",
        elementToCreate: "button",
        classArray: ["btn", "btn-purple", "btn-lg", "creepy-font", "btn-general"],
        text: "flee",
        type: "button"
    },
    {
        id: "rowTombs",
        elementToAppend: ".spooky-container",
        elementToCreate: "div",
        classArray: ["d-none"]
    },
    {
        id: "rowTombsName",
        elementToAppend: "#rowTombs",
        elementToCreate: "div",
        classArray: ["creepy-font"]
    },
    {
        id: "rowTombsSurname",
        elementToAppend: "#rowTombs",
        elementToCreate: "div",
        classArray: ["creepy-font"]
    },
    {
        id: "rowTombsDate",
        elementToAppend: "#rowTombs",
        elementToCreate: "div",
        classArray: ["creepy-font"]
    }
]

export let setData = [];

export let listData = []