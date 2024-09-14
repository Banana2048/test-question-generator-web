let questionNum = 2;

function handleNewQuestion()
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
        <div class = 'input-div js-input-div'>
            <div class = 'question-heading-div'>
                    Question ${questionNum}
                </div>
            <div class = 'question-entry-div'>
                <input class = 'question-textbox js-question-textbox' type = "text" placeholder = "Enter question"/>
            </div>
            
            <div class = 'answer-entry-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
                <input class = 'is-correct-checkbox js-correct-checkbox' type = "checkbox"/>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
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
    let test = [];

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

    return test;
}

function doneButtonClick()
{
    let test = convertInputsToTestArray();

    generateTest(test);
}

function pickRandomQuestion(test, testIndicies)
{
    let randIndex = Math.floor(Math.random() * testIndicies.length);
    let questionIndex = testIndicies[randIndex];
    let question = test.at(questionIndex);
    testIndicies.splice(randIndex, 1); // remove index from possible indicies

    return question;
}

function generateTest(test)
{
    let testIndicies = [];
    let curNum = 0;

    // create array of possible indicies
    for (let i = 0; i < test.length; i++)
    {
        testIndicies.push(curNum);
        curNum++;
    }

    for (let i = 0; i < test.length; i++)
    {
        let curQuestion = pickRandomQuestion(test, testIndicies);
        console.log(curQuestion);
    }
}
