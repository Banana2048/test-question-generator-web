let test = [];

let questionNum = 2;

function handleNewQuestion()
{
    const newQuestionElement = document.querySelector('.js-questions-and-answers');

    const newQuestionHTML = `
        <div class = 'input-div js-input-div'>
            <div class = 'question-heading-div'>
                    question ${questionNum}
                </div>
            <div class = 'question-entry-div'>
                <input class = 'question-textbox js-question-textbox' type = "text" placeholder = "Enter question"/>
            </div>
            
            <div class = 'answer-entry-div'>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
                <input class = 'answer-textbox js-answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>
        </div>
    `;

    questionNum += 1;
    newQuestionElement.innerHTML += newQuestionHTML;
}

function doneButtonClick()
{
    const allQuestions = document.querySelectorAll('.js-question-textbox');
    const allAnswers = document.querySelectorAll('.js-answer-textbox');
    let curAnswerIndex = 0;

    // add questions
    for (let i = 0; i < allQuestions.length; i++)
    {
        let newQuestion = {
            'question': "",
            'answers': []};
        
        newQuestion['question'] = allQuestions[i].value;
        
        // add answer choices for each question
        let tempAnswerIndex = curAnswerIndex;
        for (let j = curAnswerIndex; j < tempAnswerIndex + 4 && curAnswerIndex < allAnswers.length; j++)
        {
            newQuestion['answers'].push(allAnswers[j].value);
            curAnswerIndex++;
        }

        test.push(newQuestion);
    }

    console.log(test);
}
