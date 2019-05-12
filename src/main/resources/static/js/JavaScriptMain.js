function showTrade(event) {
    document.getElementById("_trade").classList.add("show-text");
}

function hideTrade(event) {
    document.getElementById("_trade").classList.remove("show-text");
}

function showGrow(event) {
    document.getElementById("_grow").classList.add("show-text");
}

function hideGrow(event) {
    document.getElementById("_grow").classList.remove("show-text");
}

function showCompare(event) {
    document.getElementById("_compare").classList.add("show-text");
}

function hideCompare(event) {
    document.getElementById("_compare").classList.remove("show-text");
}

function showCompete(event) {
    document.getElementById("_compete").classList.add("show-text");
}

function hideCompete(event) {
    document.getElementById("_compete").classList.remove("show-text");
}


function darkTheme() {
    var isOn = $('#dark_Switch').is(':checked');
    if (isOn) {
        var els = document.getElementsByClassName('lite');
        while (els.length) {
            els[0].classList.add("dark","text-dark");
            els[0].classList.remove("lite","text-lite");
        }
        els = document.getElementsByClassName('nav-lite');
        while (els.length) {
            els[0].classList.add("nav-dark","text-dark");
            els[0].classList.remove("nav-lite","text-lite");
        }
    } else {
        var els = document.getElementsByClassName('dark');
        while (els.length) {
            els[0].classList.add("lite","text-lite");
            els[0].classList.remove("dark","text-dark");
        }
        els = document.getElementsByClassName('nav-dark');
        while (els.length) {
            els[0].classList.add("nav-lite","text-lite");
            els[0].classList.remove("nav-dark","text-dark");
        }
    }
}

function devMode() {
    var isOn = $('#dev_Switch').is(':checked');
    console.log(isOn);
    if (isOn) {
        document.getElementById("dev_nav").classList.remove("hide");
        // document.getElementById("dev_nav").load(document.URL +  ' #dev_nav');
    } else {
        document.getElementById("dev_nav").classList.add("hide");
        // $('#dev_nav').load(document.URL +  ' #dev_nav');
    }
}