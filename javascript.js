let playerVsPlayer=document.querySelector('.playerVsPlayer')
let field=document.querySelectorAll('.field')
let newGame=document.querySelector('.newGame')
let whoIsMoving=document.querySelector('.whoIsMoving')
let whoIsTheWinner=document.querySelector('.whoIsTheWinner')

let whoseMove = 0;
let weHaveTheWinner=0;

let gameboard = {
    moves:['','','','','','','','',''],
    players:[]
}


const newPlayer = (name) => {
    const addPlayer = () => gameboard.players.push(name)
    return {addPlayer}
}
const Janusz = newPlayer('Janusz')
const Mariusz = newPlayer('Mariusz')
Janusz.addPlayer();
Mariusz.addPlayer()

const whoVsWho = (function (){
    playerVsPlayer.textContent=`${gameboard.players[0]} vs ${gameboard.players[1]}`
})();

let startingCommand = (function(){
    return {
        command: function(){
            whoIsMoving.textContent=`You are starting ${gameboard.players[0]}!`;
        }
    }
})()
startingCommand.command()

// displays X/O on the gameboard
let displayField = (function(){
    return {
        method: function(){
            field.forEach(action => {
                for (let i=0; i<gameboard.moves.length; i++){
                    if (`field ${i}`==action.classList.value){
                        action.textContent=gameboard.moves[i];
                    }    
                } 
            })
        }
    }
})();

//adds move to "moves" array
field.forEach(action => {
    action.addEventListener('click',() => {
        if (action.textContent==''){
            if (whoseMove==0){
                for (let i=0; i<gameboard.moves.length; i++){
                    if (`field ${i}`==action.classList.value){
                    gameboard.moves.splice(i,1,'O')
                    }
                }
                checkWinner()
                whoseMove=1
                if (weHaveTheWinner==0){
                    whoIsMoving.textContent=`Is your move ${gameboard.players[1]}`
                }
            }
            else if (whoseMove==1){
                for (let i=0; i<gameboard.moves.length; i++){
                    if (`field ${i}`==action.classList.value){
                    gameboard.moves.splice(i,1,'X')
                    }
                }
                checkWinner()
                whoseMove=0  
                if (weHaveTheWinner==0){
                    whoIsMoving.textContent=`Is your move ${gameboard.players[0]}`
                }
            }
        }
        displayField.method()
        gameStop()
    })
})

//checks if game should stop 
function checkWinner(){
    if (gameboard.moves[0]!='' && gameboard.moves[1]!='' && gameboard.moves[2]!='' && gameboard.moves[3]!='' && gameboard.moves[4]!='' && gameboard.moves[5]!='' && gameboard.moves[6]!='' && gameboard.moves[7]!='' && gameboard.moves[28]!=''){
        weHaveTheWinner=2
    }
    if (gameboard.moves[0]==gameboard.moves[1] && gameboard.moves[1]==gameboard.moves[2] && gameboard.moves[0]!=''){
        weHaveTheWinner=1
    }
    if (gameboard.moves[3]==gameboard.moves[4] && gameboard.moves[4]==gameboard.moves[5] && gameboard.moves[3]!=''){
        weHaveTheWinner=1
    }
    if (gameboard.moves[6]==gameboard.moves[7] && gameboard.moves[7]==gameboard.moves[8] && gameboard.moves[6]!=''){
        weHaveTheWinner=1
    }
    if (gameboard.moves[0]==gameboard.moves[3] && gameboard.moves[3]==gameboard.moves[6] && gameboard.moves[0]!=''){
        weHaveTheWinner=1
    }
    if (gameboard.moves[1]==gameboard.moves[4] && gameboard.moves[4]==gameboard.moves[7] && gameboard.moves[1]!=''){
        weHaveTheWinner=1
    }
    if (gameboard.moves[2]==gameboard.moves[5] && gameboard.moves[5]==gameboard.moves[8] && gameboard.moves[2]!=''){
        weHaveTheWinner=1
    }
    if (gameboard.moves[0]==gameboard.moves[4] && gameboard.moves[4]==gameboard.moves[8] && gameboard.moves[0]!=''){
        weHaveTheWinner=1
    }   
    if (gameboard.moves[2]==gameboard.moves[4] && gameboard.moves[4]==gameboard.moves[6] && gameboard.moves[2]!=''){
        weHaveTheWinner=1
    }
    if (weHaveTheWinner==1){
        if(whoseMove==0){
            whoIsTheWinner.textContent=`${gameboard.players[0]} is The Winner!`
        }
        else if(whoseMove==1){
            whoIsTheWinner.textContent=`${gameboard.players[1]} is The Winner!`    
        }
        whoIsMoving.textContent='';
    }
    if (weHaveTheWinner==2){
        whoIsTheWinner.textContent=`DRAW!`
        whoIsMoving.textContent='';
    }
}

function gameStop() {
    if (weHaveTheWinner==1){
    return whoseMove=2}
}


newGame.addEventListener('click', () => {
    gameboard.moves=['','','','','','','','',''];
    weHaveTheWinner=0;
    whoseMove=0;
    whoIsTheWinner.textContent='';
    startingCommand.command()
    displayField.method()

})
