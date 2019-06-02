function showUAS() {
    var isOn = $('#uas_Switch').is(':checked');
    if(isOn){
        document.getElementById("UAS-Content").classList.remove("hideUAS");
    } else {
        document.getElementById("UAS-Content").classList.add("hideUAS");
    }
}
