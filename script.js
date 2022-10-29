
const cards = document.querySelectorAll('.card')
const resetGameBtn = document.querySelector('button')

let matchedCard = 0;
let firstCard, secondCard;
let disableCard = false;
let timer,
    maxTime = 30,
    timeLeft = maxTime;
let isPlaying = false;
let flipCount = 0;

function flipCard(e) {
    let clickedCard = e.target;
    if (!isPlaying) {
        timer = setInterval(initTime, 1000)
        isPlaying = true;
    }
    if (clickedCard !== firstCard && !disableCard) {
        clickedCard.classList.add('flip')
        if (!firstCard) {
            return firstCard = clickedCard;
        }
        secondCard = clickedCard;
        disableCard = true;
        flipCount++;
        let firstCardImg = firstCard.querySelector('img').src;
        let secondCardImg = secondCard.querySelector('img').src;

        matchCards(firstCardImg, secondCardImg);
    }
    document.querySelector(".flip-count span").innerText = flipCount;
}


function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        let timeLeftTag = document.querySelector(".time-left b")
        timeLeftTag.innerText = timeLeft;
    } else {
        timeLeft = 0;
        clearInterval(timer)
        disableCard = true;
        cards.forEach(card => {
            card.removeEventListener('click', flipCard)
        })
    }
}
function matchCards(img1, img2) {
    if (img1 === img2) {
        matchedCard++;
        if (matchedCard == 8) {
            setTimeout(() => {
                shuffeCards();
            }, 1200);
        }
        firstCard.removeEventListener('click', flipCard)
        secondCard.removeEventListener('click', flipCard)
        firstCard = secondCard = '';
        disableCard = false;
    } else {
        setTimeout(() => {
            firstCard.classList.add('shake')
            secondCard.classList.add('shake')
        }, 400)
        setTimeout(() => {
            firstCard.classList.remove('flip', 'shake')
            secondCard.classList.remove('flip', 'shake')
            firstCard = secondCard = '';
            disableCard = false;
        }, 1200)
    }
}


function shuffeCards() {
    firstCard = secondCard = '';
    disableCard = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, index) => {
        card.classList.remove('flip')
        card.querySelector('img').src = `assets/img/img-${arr[index]}.png`
        card.addEventListener('click', flipCard)
    })
}

shuffeCards()



function resetGame() {
    clearInterval(timer)
    timeLeft = maxTime;
    flipCount = 0;
    isPlaying = false;
    document.querySelector(".time-left b").innerText = timeLeft;
    document.querySelector(".flip-count span").innerText = flipCount;
    shuffeCards()
}

resetGameBtn.addEventListener("click", resetGame)

cards.forEach(card => {
    card.addEventListener('click', flipCard)
})