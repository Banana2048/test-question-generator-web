let questionNum = 2;
let testInfo = {
    title: "",
    test: [],
    answerKey: []
};

function saveQuestions()
{
    const allPrevQuestions = document.querySelectorAll('.js-question-textbox');
    let allSavedQuestions = [];

    for (let i = 0; i < allPrevQuestions.length; i++) {
        allSavedQuestions.push(allPrevQuestions[i].value);
    }

    return allSavedQuestions;
}

function saveAnswers()
{
    const allPrevAnswers = document.querySelectorAll('.js-answer-textbox');
    let allSavedAnswers = [];

    for (let i = 0; i < allPrevAnswers.length; i++) {
        allSavedAnswers.push(allPrevAnswers[i].value);
    }

    return allSavedAnswers;
}

function fillQuestionInputs(questions)
{
    const allQuestionInputs = document.querySelectorAll('.js-question-textbox');

    for (let i = 0; i < questions.length; i++) {
        allQuestionInputs[i].value = questions[i];
    }
}

function fillAnswerInputs(answers)
{
    const allAnswerInputs = document.querySelectorAll('.js-answer-textbox');

    for (let i = 0; i < answers.length; i++) {
        allAnswerInputs[i].value = answers[i];
    }
}

function newQuestionButtonClick()
{
    // save previous answers
    let allSavedQuestions = saveQuestions();
    let allSavedAnswers = saveAnswers();

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

    // fill out previously filled inputs
    fillQuestionInputs(allSavedQuestions);
    fillAnswerInputs(allSavedAnswers);
}

function convertInputsToTestArray()
{
    // reset test data
    testInfo['test'] = [];

    // add title
    const titleElement = document.querySelector('.js-title-textbox');
    testInfo['title'] = titleElement.value;

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
            if (allCheckboxes[j].checked) {
                isCorrectAnswer = true;
            }

            newQuestion['answers'].push({'answer': allAnswers[j].value, 'isCorrect': isCorrectAnswer});
            curAnswerIndex++;
        }

        testInfo['test'].push(newQuestion);
    }
}

function generateTestButtonClick()
{
    convertInputsToTestArray();
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

function generateTest()
{
    const titleElement = document.querySelector('.js-title-textbox');

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
    `;

    let testIndicies = createIndiciesList(testInfo['test'].length);
    const displayTestElement = document.querySelector('.js-printed-test-div');
    displayTestElement.innerHTML = ``;
    displayTestHTML = ``;

    displayTestElement.innerHTML = `
        <div class = 'printed-title-div'> <p> ${titleElement.value} </p> </div>
    `;

    let curQuestionNum = 1;

    for (let i = 0; i < testInfo['test'].length; i++)
    {
        let curQuestion = testInfo['test'].at(pickRandom(testIndicies));

        // create new question & answer div
        displayTestElement.innerHTML += `
            <div class = 'printed-question-and-answer-div'> </div>
        `;

        let curQuestionAndAnswerElement = (document.querySelectorAll('.printed-question-and-answer-div'))[i];

        // add current question into the question & answer div
        let displayQuestionHTML = `
            <div class = 'printed-question-div'> <p> ${curQuestionNum}. ${curQuestion['question']} </p> </div>
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
                testInfo['answerKey'].push(answerOptions.at(i));
            }

            displayAnswersHTML += `
                <div class = 'printed-answer-div'> <p> ${answerOptions.at(i)}. ${curAnswer.answer} </p> </div>
            `;
        }

        curQuestionAndAnswerElement.innerHTML += displayAnswersHTML;
        curQuestionNum++;
    }

    // store generated test into local storage
    const itemName = (testInfo['title']).split(' ').join('_');
    localStorage.setItem(itemName, JSON.stringify(testInfo));
}

function backToInputsKey()
{
    questionNum = 2; // reset questionNum
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
    const bodyElement = document.querySelector('body');
    bodyElement.innerHTML += `
        <div class = 'answer-key-div js-answer-key-div'> </div>
    `;

    const answerKeyElement = document.querySelector('.js-answer-key-div');

    let answerKeyHTML = `
        <div class = 'answer-key-title-div'> <p> Answer Key </p> </div>
    `;

    for (let i = 0; i < testInfo['answerKey'].length; i++)
    {
        answerKeyHTML += `
            <div> <p> ${i+1}. ${testInfo['answerKey'][i]} </p> </div>
        `;
    }

    answerKeyElement.innerHTML = answerKeyHTML;
}
