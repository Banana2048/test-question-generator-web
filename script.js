let questionNum = 2;
let test = [];
let answerKey = [];

function newQuestionButtonClick()
{
    // save previous answers
    const allPrevQuestions = document.querySelectorAll('.js-question-textbox');
    const allPrevAnswers = document.querySelectorAll('.js-answer-textbox');

    let allSavedQuestions = [];
    let allSavedAnswers = [];

    for (let i = 0; i < allPrevQuestions.length; i++) {
        allSavedQuestions.push(allPrevQuestions[i].value);
    }

    for (let i = 0; i < allPrevAnswers.length; i++) {
        allSavedAnswers.push(allPrevAnswers[i].value);
    }

    // create new question & answer input section
    const newQuestionElement = document.querySelector('.js-questions-and-answers');

    const newQuestionHTML = `
        <div class = 'question-and-answers-input-div'>
            <div class = 'question-heading-div'>
                    <p> Question ${questionNum} </p>
                </div>
            <div class = 'question-input-div'>
                <input class = 'question-textbox js-question-textbox' type = "text" placeholder = "Enter question"/>
            </div>
            
            <div class = 'answer-input-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-input-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-input-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-input-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>
        </div>
    `;

    questionNum += 1;
    newQuestionElement.innerHTML += newQuestionHTML;

    const allQuestions = document.querySelectorAll('.js-question-textbox');
    const allAnswers= document.querySelectorAll('.js-answer-textbox');


    // fill out previously filled inputs
    for (let i = 0; i < allPrevQuestions.length; i++) {
        allQuestions[i].value = allSavedQuestions[i];
    }

    for (let i = 0; i < allPrevAnswers.length; i++) {
        allAnswers[i].value = allSavedAnswers[i];
    }
}

function convertInputsToTestArray()
{
    test = [];
    answerKey = [];

    const allQuestions = document.querySelectorAll('.js-question-textbox');
    const allAnswers = document.querySelectorAll('.js-answer-textbox');
    const allCheckboxes = document.querySelectorAll('.js-correct-checkbox');
    let curAnswerIndex = 0;

    // add questions
    for (let i = 0; i < allQuestions.length; i++)
    {
        let newQuestion = {
            'question': "",
            'answers': []
        };
        
        newQuestion['question'] = allQuestions[i].value;
        
        // add answer choices for each question
        let tempAnswerIndex = curAnswerIndex;
        for (let j = curAnswerIndex; j < tempAnswerIndex + 4 && curAnswerIndex < allAnswers.length; j++)
        {
            let isCorrectAnswer = false;
            if (allCheckboxes[j].checked)
                isCorrectAnswer = true;

            newQuestion['answers'].push({'answer': allAnswers[j].value, 'isCorrect': isCorrectAnswer});
            curAnswerIndex++;
        }

        test.push(newQuestion);
    }

    //return test;
}

function generateTestButtonClick()
{
    let test = convertInputsToTestArray();
    //generateTest(test);
    generateTest();
}

function pickRandom(possibleIndicies)
{
    let randIndex = Math.floor(Math.random() * possibleIndicies.length);
    let listIndex = possibleIndicies[randIndex];
    possibleIndicies.splice(randIndex, 1); // remove index from possible indicies
    return listIndex;
}

function createIndiciesList(size)
{
    let indiciesList = [];
    let curNum = 0;
    for (let i = 0; i < size; i++)
    {
        indiciesList.push(curNum);
        curNum++;
    }

    return indiciesList;
}

function generateTest(/*test*/)
{
    const bodyElement = document.querySelector('body');
    bodyElement.innerHTML = `
        <div class = 'printed-test-div js-printed-test-div'>
        
        </div>

        <div class = 'answer-key-button-div js-answer-key-button-div'>
            <button class = 'back-to-input-button' onclick = 'backToInputsKey();'>
                Back
            </button>
            <button class = 'show-answer-key-button' onclick = 'generateAnswerKey();'>
                Show Answer Key
            </button>
        </div>

        <div class = 'answer-key-div js-answer-key-div'>

        </div>
    `;
    let testIndicies = createIndiciesList(test.length);
    const displayTestElement = document.querySelector('.js-printed-test-div');
    displayTestElement.innerHTML = ``;
    displayTestHTML = ``;

    let questionNum = 1;

    for (let i = 0; i < test.length; i++)
    {
        let curQuestion = test.at(pickRandom(testIndicies));

        // create new question & answer div
        displayTestElement.innerHTML += `
            <div class = 'printed-question-and-answer-div'> </div>
        `;

        let curQuestionAndAnswerElement = (document.querySelectorAll('.printed-question-and-answer-div'))[i];

        // add current question into the question & answer div
        let displayQuestionHTML = `
            <div class = 'printed-question-div'> <p> ${questionNum}. ${curQuestion['question']} </p> </div>
        `;

        curQuestionAndAnswerElement.innerHTML += displayQuestionHTML;

        // add answer choices to the question & answer div
        let curAnswers = curQuestion['answers'];
        let answerIndicies = createIndiciesList(curAnswers.length);
        let answerOptions = ['A', 'B', 'C', 'D'];

        let displayAnswersHTML = ``;

        for (let i = 0; i < curAnswers.length; i++)
        {
            let curAnswerIndex = pickRandom(answerIndicies);
            //let curAnswer = curAnswers.at(curAnswerIndex).answer;
            let curAnswer = curAnswers.at(curAnswerIndex);

            if (curAnswer.isCorrect) {
                answerKey.push(answerOptions.at(i));
            }

            displayAnswersHTML += `
                <div class = 'printed-answer-div'> <p> ${answerOptions.at(i)}. ${curAnswer.answer} </p> </div>
            `;
        }

        curQuestionAndAnswerElement.innerHTML += displayAnswersHTML;
        questionNum++;
    }

}

function backToInputsKey()
{
    questionNum = 2;
    const bodyElement = document.querySelector('body');
    bodyElement.innerHTML = `
        <div class = 'title-input-div'>
            <input class = 'title-textbox js-title-textbox' type = 'text' placeholder = "Enter title"/>
        </div>
        <div class = 'new-question-button-div'>
            <button
                class = 'new-question-button js-new-question' onclick = 'newQuestionButtonClick();'> + </button>
        </div>

        <div class = 'questions-and-answers-div js-questions-and-answers'>
            <div class = 'question-and-answers-input-div'>
                <div class = 'question-heading-div'>
                    <p> Question 1 </p>
                </div>
                <div class = 'question-input-div'>
                    <input class = 'question-textbox js-question-textbox' type = "text" placeholder = "Enter question"/>
                </div>
            
                <div class = 'answer-input-div'>
                    <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                    <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
                </div>

                <div class = 'answer-input-div'>
                    <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                    <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
                </div>

                <div class = 'answer-input-div'>
                    <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                    <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
                </div>

                <div class = 'answer-input-div'>
                    <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                    <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
                </div>

            </div>
        </div>

        <div class = 'generate-test-button-div'>
            <button class = 'generate-test-button' onclick = 'generateTestButtonClick();'> Generate Test </button>
        </div>
    `;
}

function generateAnswerKey()
{
    console.log("generating answer key...");
    console.log(answerKey);

    const answerKeyElement = document.querySelector('.js-answer-key-div');

    let answerKeyHTML = ``;

    for (let i = 0; i < answerKey.length; i++)
    {
        answerKeyHTML += `
            <div> <p> ${i+1}. ${answerKey[i]} </p> </div>
        `;
    }

    answerKeyElement.innerHTML = answerKeyHTML;
}
