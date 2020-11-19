//detecting button press

for(i=0;i<document.querySelectorAll(".drum").length;i++){

document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var instrument = "";
    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    animateButton(buttonInnerHTML);
});
}

//detecting key press
document.addEventListener("keydown", function(){
    makeSound(event.key);
    animateButton(event.key);
});

function makeSound(key){
    switch(key){
        case "w":
            instrument = "sounds/tom-1.mp3";
            break;
        case "a":
            instrument = "sounds/tom-2.mp3";
            break;
        case "s":
            instrument = "sounds/tom-3.mp3";
            break;
        case "d":
            instrument = "sounds/tom-4.mp3";
            break;
        case "j":
            instrument = "sounds/snare.mp3";
            break;
        case "k":
            instrument = "sounds/crash.mp3";
            break;
        case "l":
            instrument = "sounds/kick-bass.mp3";
            break;
        default:
            console.log(butttonInnerHTML);
    }
    var sound = new Audio(instrument);
    sound.play();

}

function animateButton(currentKey){
     var activeButton = document.querySelector('.'+ currentKey);
     activeButton.classList.add("pressed");
     setTimeout(function(){
         activeButton.classList.remove("pressed");
     },100);
}