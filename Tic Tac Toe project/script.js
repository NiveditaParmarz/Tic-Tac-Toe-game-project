let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbutton");
let newGmBtn = document.querySelector("#newGmBtn");
let msgContainer = document.querySelector(".msgContainer");
let msg = document.querySelector("#msg");

let turnO = true; 
let count = 0;
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = () =>{
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    
}


const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const drawMatch = () =>{

    msg.innerText = "Draw Match 🤜🏻🤛🏻";
    
    msgContainer.classList.remove("hide");
    disableBoxes();

}

boxes.forEach((box)=>{
    
    box.addEventListener("click", ()=>{
        count++;
        //console.log("box was clicked");
        if(turnO){ //turn of player O
            box.innerText = "O"; 
            turnO = false;
        }
        else{ //turn of player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        let isWinner = checkWinner();
        if(count==9 && !isWinner){
            drawMatch();
        }
    })
})

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, winner is ${winner} 💖`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val!= "" && pos3val != ""){
            if(pos1val==pos2val && pos2val == pos3val){
                disableBoxes();
                showWinner(pos1val);
            }
        }
    }
    
};

resetBtn.addEventListener("click", resetGame);
newGmBtn.addEventListener("click",resetGame);
