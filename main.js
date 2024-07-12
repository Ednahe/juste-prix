const userInteraction = document.querySelectorAll('.user-interaction');
const button = document.querySelector('.button-chek');
const message = document.querySelector('.message');
const counter = document.querySelector('.count');
const historique = document.querySelector('.historique');
const userInputKey = document.getElementById('1');
const imgArray = ["./images/1.jpg", "./images/2.jpg", "./images/3.jpg", "./images/4.jpg", "./images/5.jpg", "./images/6.jpg"];
const randomImg = document.getElementById('random-img');

const randomImage = Math.floor(Math.random() * imgArray.length);
randomImg.src = imgArray[randomImage];

const randomNumber = Math.floor(Math.random() * 100) + 1;

let tryIt = 0;
let timer = 30;

counter.textContent = timer;

const devine = () => {
    const userInput = parseInt(userInteraction[0].value);
    if(isNaN(userInput) || userInput < 1 || userInput > 100) {
        message.textContent = "Veuillez entrez un nombre valide entre 1 et 100"
    } else {
        tryIt++;
        const result = (userInput === randomNumber) ? "Bravo !" : (userInput < randomNumber) ? "Le nombre est plus grand" : "Le nombre est plus petit";
        message.textContent = result;
        historyDevine(userInput, result);
        if (userInput === randomNumber) {
            button.disable = true;
            setTimeout(() => {
                clearInterval(intervalId);
            }, 1000);
        }
    }
}

const historyDevine = (userInput, result) => {
    const devinItem = document.createElement('li');
    devinItem.textContent = `Votre Proposition : ${userInput}, Résultat : ${result}`;
    historique.appendChild(devinItem);
}

const activeTimer = () => {
    timer--;
    counter.textContent = timer;
    if(timer === 0) {
        button.disable = true;
        message.textContent = "Le temps est écoulé, vous avez échoué";
        const audio = document.getElementById('audio');
        audio.play();
    }
}
const intervalId = setInterval(activeTimer, 1000);

setTimeout(() => {
    clearInterval(intervalId);
    button.disable = true;
}, 30000);

button.addEventListener('click', devine);

userInputKey.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        devine();
    }
});