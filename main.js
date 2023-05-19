var activeTechViewElement = "flow-chart";
document.getElementById("flow-chart").style.display = "block";

const techViewElements = document.getElementById("tech-view").getElementsByClassName("tech-view-element");

//map the buttons to the id of the elements they show
const techButtonMap = new Map();

LoadButtonMap(techButtonMap);
function LoadButtonMap(map) {
    //add first premade element
    map.set("show-flowchart", "flow-chart");

    let viewElements = document.getElementById("tech-view").getElementsByClassName("tech-view-element");
    let keys = [];

    LoadKeys(keys);
    function LoadKeys(keyList) {
        //get all id base names
        //EX "show-flowchart", base = "flowchart"
        let elementList = document.getElementById("tech-buttons").getElementsByClassName("selectable-text");
        
        for(let i = 1; i < elementList.length; i++){
            let id = elementList[i].id;
            keyList.push(id.split('-')[1]);
        }

        return keyList;
    };

    //map matching view elements to buttons with the same id base name
    for(let i = 1; i < viewElements.length; i++){
        let id = viewElements[i].getElementsByTagName("h2")[0].innerHTML.replaceAll(' ', '');

        viewElements[i].id = "view-" + id;
        if(keys.includes(id)){
            map.set(("show-" + id), viewElements[i].id);
        }
    }
};


for (const [key, value] of techButtonMap) {
    document.getElementById(key).addEventListener("click", function(){SetTechViewElementActive(value)});    
}



function SetTechViewElementActive(id){
    if(id != activeTechViewElement){
        for(let i = 0; i < techViewElements.length; i++){
            if(techViewElements[i].id == id){
                document.getElementById(activeTechViewElement).style.display = "none";
                techViewElements[i].style.display = "block";
                activeTechViewElement = id;
                return;
            }
        }
    }
}

var hiedWindowButtons = document.getElementsByClassName("fullscreen-hidden-window-button");
for(let i = 0; i < hiedWindowButtons.length; i++){
    hiedWindowButtons[i].addEventListener("click", ToggleHiddenWindow);
}

function ToggleHiddenWindow(event){
    let target = event.target;
    if(!target.parentElement.classList.contains("minimize-hidden-window")){
        target.parentElement.classList.add("minimize-hidden-window");

        target.children[0].classList.add("fa-light", "fa-square");
        target.children[0].classList.remove("fa-regular", "fa-window-restore", "fa-xs");
    }
    else{
        target.parentElement.classList.remove("minimize-hidden-window");
        
        target.children[0].classList.remove("fa-light", "fa-square");
        target.children[0].classList.add("fa-regular", "fa-window-restore", "fa-xs");
    }
}

var flowChart = document.getElementById("flow-chart");
function ToggleFlowChartSize(){
    if(flowChart.style.width != "150%"){
        flowChart.style.cursor = "zoom-out";
        flowChart.style.width = "150%";
    }
    else{
        flowChart.style.cursor = "zoom-in";
        flowChart.style.width = "100%";
    }
};
flowChart.onclick = ToggleFlowChartSize;