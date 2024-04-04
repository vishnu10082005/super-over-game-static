//strike button
var strikeButton = document.querySelector("#strike")
//reset button
var resetButton = document.querySelector("#reset")
//score for teams
var team1score_tag = document.getElementById("score-team1")
var team2score_tag = document.getElementById("score-team2")
//selecting wickets ids to change afterwards
var team1Wicket_tag = document.getElementById("wicket-team1")
var team2Wicket_tag = document.getElementById("wicket-team2")
//aaudio variables
var strikeAudio = new Audio("http://bit.ly/so-ball-hit")
var gameOverAudio = new Audio("http://bit.ly/so-crowd-cheer")
//variables to keep track of game
var team1Score = 0
var team2Score = 0
var team1Wicket = 0
var team2Wicket = 0
var team1BallsFaced = 0
var team2BallsFaced = 0
var turn = 1

var possibleOutcomes = [0,1,2,3,4,6,"W"];
console.log(possibleOutcomes)

// console.log(Math.floor());

strikeButton.addEventListener("click",strikeButtonclicked);

function strikeButtonclicked(){
     //Audioplay
     strikeAudio.pause() //pause the previous playing audio
     strikeAudio.currentTime = 0;//bring the time to 0 second
     strikeAudio.play()
 
     //Choosing random score
     var randomness = Math.random();
     var random1 = randomness*possibleOutcomes.length;
    //flooring the value of random to avoid decimals and to get int
     var randomIndex = Math.floor(random1);
     console.log("randomIndex:", randomIndex);
     //selecting randomvalues from array of possibleoutcomes
     var randomValue = possibleOutcomes[randomIndex];
     console.log("randomValue:" , randomValue);

    //PAk batting
    if(turn==2){
        team2BallsFaced++;
        var ball2 = document.querySelector(`#team2-superover div:nth-child(${team2BallsFaced})`)
        ball2.innerHTML = randomValue;
            //if random value is wicket increase wicket count by 1 or just add that random value to the total team1score
        if(randomValue=='W'){
            team2Wicket++;
        }else{
        //teamScore= teamScore + randomvalue    
            team2Score+=randomValue;
        }

        if(team2Score>team1Score || team2Wicket==2 || team2BallsFaced==6){
            turn = 3;
        
            setTimeout(() => {
                gameOver();
            },10);
        }
        
        updateScore()  
        
}  



    //India batting
     if(turn==1){
        team1BallsFaced++;
        var balls = document.querySelector(`#team1-superover div:nth-child(${team1BallsFaced})`)
        balls.innerHTML = randomValue;
        //if random value is wicket increase wicket count by 1 or just add that random value to the total team1score
        if(randomValue=='W'){
            team1Wicket++;
        }else{
        //teamScore= teamScore + randomvalue    
            team1Score+=randomValue;
        }

        if(team1BallsFaced==6 || team1Wicket==2){
            turn = 2;
        }
        updateScore()
     }
    }


function updateScore(){
    team1score_tag.innerHTML = team1Score;
    team1Wicket_tag.innerHTML = team1Wicket;
    team2score_tag.innerHTML = team2Score;
    team2Wicket_tag.innerHTML = team2Wicket;
}  

function gameOver(){
    if(team1Score>team2Score){
        alert("INDIA WINS");
    }else if(team2Score>team1Score){
        alert("PAKISTAN WINS")
    }else{
        alert("IT's A TIE")
 
 
    }
    
      gameOverAudio.pause(); //pause the previuos playing audio
      gameOverAudio.currentTime = 0; // bring the time to 0
      gameOverAudio.play();
}


resetButton.addEventListener("click",resetFunction)
function resetFunction(){
    window.location.reload()
}