// fullscreen stuff

document.getElementById("text").addEventListener("click", () => {
    document.documentElement.requestFullscreen().catch((e) => {
        console.log(e);
    });
});

function isFS(){
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullscreenElement || document.msFullscreenElement;
}

function zenMode(){
    if (isFS() === undefined) {
        console.log("~~ zen mode disabled ~~");
        document.getElementsByClassName("panel-L")[0].style.display = "flex";
        document.getElementsByClassName("panel-R")[0].style.display = "flex";

    } else {
        console.log("~~ zen mode active ~~");
        document.getElementsByClassName("panel-L")[0].style.display = "none";
        document.getElementsByClassName("panel-R")[0].style.display = "none";
    }
}

document.addEventListener("fullscreenchange", () => {
    zenMode();
})

