var randomNumber1 =  Math.floor(Math.random()*6) + 1;
var randomDiceImage = "dice" + randomNumber1 + ".png";
var randomImageSource = "images/" + randomDiceImage;
var diceImage1 = document.querySelectorAll("img")[0];
diceImage1.setAttribute("src",randomImageSource);
var randomNumber2 = Math.floor(Math.random() * 6 ) + 1;
var randomDiceImage2 = "images/dice" + randomNumber2 + ".png";
document.querySelectorAll("img")[1].setAttribute("src",randomDiceImage2);

if(randomNumber1>randomNumber2){
    document.querySelector("h1").innerHTML = "Player 1 won!";
}
else if(randomNumber2>randomNumber1){
    document.querySelector("h1").innerHTML = "Player 2 won!";
}
else{
    document.querySelector("h1").innerHTML = "Draw!";
}