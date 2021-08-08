let deckId;
let computer = 0;
let me = 0;

let img1 = document.getElementById("image1");
let img2 = document.getElementById("image2");



document.getElementById("draw-cards").classList.add('disable');
document.getElementById("draw-cards").disabled = true;
// document.getElementById("img1").children[0].style.display = "none";
// document.getElementById("img2").children[1].style.display = "none";
document.getElementById("remaining").style.display = "none";

function handleClick() {
    document.getElementById("head").textContent = `Game of WAR`;
    img1.setAttribute('src' , '');
    img2.setAttribute('src' , '');
    document.getElementById("draw-cards").disabled = false;
    document.getElementById("draw-cards").classList.add('pointer');
    document.getElementById("draw-cards").classList.remove('disable');
    document.getElementById('img1').children[0].innerHTML = `Computer Score: 0`;
    document.getElementById('img2').children[1].innerHTML = `My Score: 0`;


    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            document.getElementById("remaining").style.display = "inline-block";
            document.getElementById("remaining").innerHTML = `Remaining Cards : ${data.remaining}`;
            deckId = data.deck_id;
        })
}


document.getElementById("new-deck").addEventListener("click", handleClick)
document.getElementById("draw-cards").addEventListener("click" , () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        
        // document.getElementById("remaining").style.display = "inline-block";
        document.getElementById("remaining").innerHTML = `Remaining Cards : ${data.remaining}`;
        document.getElementById("img1").children[0].style.display = "block";
        document.getElementById("img2").children[1].style.display = "block";
        
        img1.setAttribute('src' , data.cards[0].image);
        img2.setAttribute('src' , data.cards[1].image);

        const winnerText = determineCardWinner(data.cards[0],data.cards[1]);
        document.getElementById("head").textContent = winnerText
        document.getElementById('img1').children[0].innerHTML = `Computer Score: ${computer}`;
        document.getElementById('img2').children[1].innerHTML = `My Score : ${me}`;
   
        if(data.remaining === 0) { 
            document.getElementById("draw-cards").disabled = true;
            document.getElementById("draw-cards").classList.add("disable");
            document.getElementById("draw-cards").classList.remove('pointer');
            if(computer > me) {
                document.getElementById("head").textContent = "The Computer Won the Game!😔";
            }
            else if(me > computer) document.getElementById("head").textContent = "You Won the Game!🎉🥳";
            else document.getElementById("head").textContent = "It's a Tie Game";
        }
   
    })

})
function determineCardWinner(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    
    if (card1ValueIndex > card2ValueIndex) {
        computer++;
        return "Card 1 wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        me++;
        return "Card 2 wins!"
    } else {
        return "War!"
    } 
}