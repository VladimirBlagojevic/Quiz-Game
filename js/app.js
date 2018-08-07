
//***** QUESTION CONTROLLER *****//

var QuestionController= (function(){
    var Question,question1,question2,question3,question4,question5;

    //* Function constructor for questions
    Question=function(question,answers,correctAnswer){
        this.question=question;
        this.answers=answers;
        this.correctAnswer=correctAnswer;
    }

    question1=new Question("In which year of First World War Germany declared war on Russia and France?",["1914","1915","1916","1917"],"1914");

    question2=new Question("Joule is the unit of?",["Temperature","Preassure","Energy","Heat"],"Energy");

    question3=new Question("Karoline Mikkelsen was the first woman to?",["reach North Pole","reach South Pole","climb Mt. Everest","set foot on the moon"],"reach South Pole");

    question4=new Question("Track and field star Carl Lewis won how many gold medals at the 1984 Olympic games?",["Two","Three","Four","Eight"],"Four");

    question5=new Question("The landmass of which of the following continents is the least?",["Africa","Asia","Australia","Europe"],"Australia");

    question6=new Question("The highest average salinity amongst the following seas is reported from",["Dead Sea","Red Sea","Black Sea","Yellow Sea"],"Dead Sea");

    question7=new Question("Compact discs, (according to the original CD specifications) hold how many minutes of music?",["74 mins","56 mins","60 mins","90 mins"],"74 mins");

    question8=new Question("Changing computer language of 1's and 0's to characters that a person can understand is...?",["Highlight","Clip Art","Decode","Execute"],"Decode");

    question9=new Question("For galvanizing iron which of the following metals is used?",["Aluminium","Copper","Lead","Zinc"],"Zinc");

    question10=new Question("Name the instrument used to measure relative humidity?",["Hydrometer","Hygrometer","Barometer"," Thermometer"],"Hygrometer");
    
    var data={
        ordinalNumber:0,
        score:0,
        questionsArray:[question1,question2,question3,question4,question5,question6,question7,question8,question9,question10],
        correctAnswers:0 
    }

    function singleQuestion(){ 
        var question;
        
        if(data.ordinalNumber === 0){
            question=data.questionsArray[0];
            data.ordinalNumber++;
            
        } else  {
            question=data.questionsArray[data.ordinalNumber];
            data.ordinalNumber++;
        } 
        return question;
    };

    return {
        returnSingleQuestion:function(){
            return singleQuestion();
        },

        returnData:function(){
            return {
                ordinal:data.ordinalNumber,
                score:data.score,
                questionsArray:data.questionsArray,
                correctAnswers:data.correctAnswers
            }
        },

        updateScore:function(e){
            if(e.target.classList.contains("card__green")){
                data.score+=15;
                data.correctAnswers++;
            } else {
                data.score-=5;
            }
        },

        playAgain:function(){
            data.ordinalNumber=0;
            data.score=0;
            data.correctAnswers=0;
        },
            
    }
})();

//***** UI CONTROLLER *****//

var UIController= (function(){ 
    var countdown;
    
    var domStrings={
        newPercentage:0,
        startBtnBox:".card__start-btn",
        newGameBtn:".card__btn--start",
        nextQuestionBtn:".card__btn--next",
        startText:".card__start-text",
        bottomBox:".card__bottom-box",
        card:".card--1",
        questionBox:".card__question-box",
        answersBox:".card__answers-box",
        audioCorrect:"myAudio--1",
        audioWrong:"myAudio--2",
        displayScore:".header__score-text",
        tadaScore:"card__answer--tada",
        coin:".header__user-box--2",
        coinTada:"card__answer--tada",
        countdownNumber:".header__countdown-number",
        countdownBox:".header__countdown-box",
        progressBar:".card__progress-bar",
        endPlayerBox:".header__user-box--3",
        endResultsBox:".card__results-box",
        endBtnBox:".card__btn--end"


    }
    
    return {
        getDomStrings:function(){
            return domStrings
        },

        removeCurrentScreen:function(selector1,selector2,selector3){
          var elements, elementsArray;

          elements=document.querySelectorAll(selector1 + ',' + selector2 + ',' + selector3);

          elementsArray=Array.prototype.slice.call(elements); //* turn node-list into array
          
          elementsArray.forEach(function(curent){
              curent.classList.remove("card__flipInX")
              curent.classList.add("card__flipOutX"); 

              setTimeout(() => {
                curent.remove();  //* removes curent element for each iteration
              }, 1500);
          });

        },

        displayNextQuestion:function(arr){
            var html,newHtml;

            html='<div class="card__question-box card__flipInX"><h4 class="card__question">%Q%</h4></div><div class="card__answers-box card__flipInX"><a class="card__answer" href="#">%A1%</a><a class="card__answer"href="#">%A2%</a><a class="card__answer" href="#">%A3%</a><a class="card__answer" href="#">%A4%</a></div><div class="card__bottom-box card__flipInX"><div class="card__progress-box"><div class="card__progress-bar"></div></div><div class="card__nextBtn-box"><a href="#" class="card__btn card__btn--next">next</a></div></div>';

            newHtml=html.replace("%Q%",arr.question);
            newHtml=newHtml.replace("%A1%",arr.answers[0]);
            newHtml=newHtml.replace("%A2%",arr.answers[1]);
            newHtml=newHtml.replace("%A3%",arr.answers[2]);
            newHtml=newHtml.replace("%A4%",arr.answers[3]); 

            setTimeout(() => {
                // insert our builded newHtml string 
                document.querySelector(domStrings.card).insertAdjacentHTML("beforeend", newHtml);
                //reset countdown border for each new question
                document.querySelector(domStrings.countdownBox).style.border="1.6rem solid var(--color-white)";
            }, 1200);
        },

        displayEndGameScreen:function(obj){
            var html,newHtml;

            html='<div class="header__user-box header__user-box--1 header__user-box--3 card__flipInX ">&nbsp;</div><div class="card__results-box card__flipInX"><div class="card__accuracy-box"><h4 class="card__accuracy">Accuracy</h4><h2 class="card__percentage">$P$%</h2><p class="card__answered-questions">$R$ of $Q$ correct answers</p></div><div class="card__points-box"><h4 class="card__score">Your score</h4><h2 class="card__points">$S$</h2><p  class="card__points-text">Points earned</p></div> </div><div class="card__start-btn card__flipInX "><a href="#" class="card__btn card__btn--end">Play Again</a></div>';

            newHtml=html.replace("$P$",Math.round((obj.correctAnswers * 100)/obj.questionsArray.length));
            newHtml=newHtml.replace("$R$",obj.correctAnswers);
            newHtml=newHtml.replace("$Q$",obj.questionsArray.length);
            newHtml=newHtml.replace("$S$",obj.score);
            setTimeout(() => {
                document.querySelector(domStrings.card).insertAdjacentHTML("beforeend", newHtml);
            }, 1200);
    
        },

        displayScore:function(obj){
            document.querySelector(domStrings.displayScore).textContent=obj.score;
            document.querySelector(domStrings.displayScore).classList.add(domStrings.tadaScore);
           
            setTimeout(() => {
                document.querySelector(domStrings.displayScore).classList.remove(domStrings.tadaScore);
            }, 1000);  
        },

        correctAnswer:function(e){
            var audioCorrect=document.getElementById(domStrings.audioCorrect);
            e.target.classList.add("card__green");
            e.target.classList.add("card__answer--tada");
            audioCorrect.play();
        },

        wrongAnswer:function(e){
            var audioWrong=document.getElementById(domStrings.audioWrong);
            e.target.classList.add("card__red");
            e.target.classList.add("card__answer--shake");
            audioWrong.play();
        },

        countDown:function(seconds){
            var countdownValue;
            clearInterval(countdown); 

            countdown=setInterval(()=>{

                if(seconds <= 0) {
                    clearInterval(countdown);
                    return;
                }

            seconds--;
            document.querySelector(domStrings.countdownNumber).textContent=seconds;

            // grab countdownNumber value every second and pass it as parameter to countdownBorder function, then call it.
            countdownValue=document.querySelector(domStrings.countdownNumber).textContent;
            countdownBorder(countdownValue);
            },1000)
        },

        updateProgressBar:function(questionArray){
            var percentage;
            var el=document.querySelector(domStrings.progressBar);

            // calculate percentage of one question from whole array and then aplay that percentage to progress bar width
            percentage=100/questionArray.length
            domStrings.newPercentage+=percentage;
            el.style.width=domStrings.newPercentage + '%';
        }
    }
    //Change borders while countDown running, its hard coded and not best solution
    function countdownBorder(countValue){
        if(countValue <= 9){
            document.querySelector(domStrings.countdownBox).style.borderTop="1.6rem solid var(--color-primary-dark)";
        }
        if(countValue <= 6){
            document.querySelector(domStrings.countdownBox).style.borderRight="1.6rem solid var(--color-primary-dark)";
        }
        if(countValue <= 3){
            document.querySelector(domStrings.countdownBox).style.borderBottom="1.6rem solid var(--color-primary-dark)";
        }
        if(countValue <= 0){
            document.querySelector(domStrings.countdownBox).style.border="1.6rem solid var(--color-primary-dark)";
        }
    }
})();

//***** APP CONTROLLER *****//

var AppController= (function(UICtrl,QCtrl){
    var newQuestion,appDomStrings,appData;
    appDomStrings=UICtrl.getDomStrings();

    function startNewGame(){
        nextQuestion(appDomStrings.startText,appDomStrings.startBtnBox);
        UICtrl.countDown(13);
    };

    function nextQuestion(removeFirst,removeSecond,removeThird){

        //TODO 1:Build new question
        newQuestion=QCtrl.returnSingleQuestion();
        appData=QCtrl.returnData();
        UICtrl.displayScore(appData,appDomStrings);
        
        if(appData.ordinal <= appData.questionsArray.length){

            //TODO 2:Remove start screen   
            UICtrl.removeCurrentScreen(removeFirst,removeSecond,removeThird);
    
            //TODO 3:Display new question
            UICtrl.displayNextQuestion(newQuestion);

            //TODO 4:Run Countdown and update progress bar
            UICtrl.countDown(13);

            setTimeout(() => {
                UICtrl.updateProgressBar(appData.questionsArray);
            }, 1500);
            
            //TODO 5: Add again event delegation eventListener 
            //* In newQuestionLogic function we remove it to resolve game breaking bug where u can click on multiple answers and next btn before removing that question,here we adding it again under setTimeout to give time animation to happen
            setTimeout(() => {
                document.querySelector(appDomStrings.card).addEventListener("click",newQestionLogic);
            }, 2000);
                
        } else{
            //TODO 1:Remove curent screen 
            UICtrl.removeCurrentScreen(appDomStrings.questionBox,appDomStrings.answersBox,appDomStrings.bottomBox);

            //TODO 2: Set countdown to zero 
            UICtrl.countDown(1);

            //TODO 3:Display play again and statistic screen 
            UICtrl.displayEndGameScreen(appData);

            //TODO 4:Add again event delegation eventListener 
            setTimeout(() => {
                document.querySelector(appDomStrings.card).addEventListener("click",newQestionLogic);
            }, 2000);
            
        }        
    }
  
    function newQestionLogic(event){
       var countdownNumber=document.querySelector(appDomStrings.countdownNumber).textContent;
         
       if(event.target.classList.contains("card__answer")){

            //*check is clicked answer correct and if time for answer is active
           if(event.target.textContent === newQuestion.correctAnswer && countdownNumber > 0){

                UICtrl.correctAnswer(event);
                QCtrl.updateScore(event);
                document.querySelector(appDomStrings.card).removeEventListener("click",newQestionLogic);
                
                setTimeout(() => {
                    nextQuestion(appDomStrings.questionBox,appDomStrings.answersBox,appDomStrings.bottomBox);
                }, 1000);
            //*check is clicked answer wrong and if time for answer is active
           } else if(event.target.textContent !== newQuestion.correctAnswer && countdownNumber > 0) {

                UICtrl.wrongAnswer(event);
                QCtrl.updateScore(event)
                document.querySelector(appDomStrings.card).removeEventListener("click",newQestionLogic);
    
                setTimeout(() => {
                     nextQuestion(appDomStrings.questionBox,appDomStrings.answersBox,appDomStrings.bottomBox);
                }, 1000);
           } 
       }

       if(event.target.classList.contains("card__btn--next")) {
            //* Pass to the new question
            nextQuestion(appDomStrings.questionBox,appDomStrings.answersBox,appDomStrings.bottomBox);
            document.querySelector(appDomStrings.card).removeEventListener("click",newQestionLogic);   
       }
       //* Reset all data and start new game from the first question
       if(event.target.classList.contains("card__btn--end")) {  
        QCtrl.playAgain();
        appDomStrings.newPercentage=0;
        UICtrl.removeCurrentScreen(appDomStrings.endPlayerBox,appDomStrings.endResultsBox,appDomStrings.endBtnBox);
        nextQuestion(appDomStrings.questionBox,appDomStrings.answersBox,appDomStrings.bottomBox);
        document.querySelector(appDomStrings.card).removeEventListener("click",newQestionLogic);   
       }
       
    }

    function setupEventListeners(){
        document.querySelector(appDomStrings.newGameBtn).addEventListener("click",startNewGame);
        document.querySelector(appDomStrings.card).addEventListener("click",newQestionLogic);
    }
    
    return {
        init:function(){
            console.log("start game");
            setupEventListeners();
        }
    }
})(UIController, QuestionController);

AppController.init();