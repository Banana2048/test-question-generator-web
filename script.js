//console.log("test");

function handleNewQuestion()
{
    const newQuestionElement = document.querySelector('.js-questions-and-answers');

    const newQuestionHTML = `
        <div class = 'input-div js-input-div'>
            <div class = 'question-entry-div'>
                <input class = 'question-textbox' type = "text" placeholder = "Enter question"/>
            </div>
            
            <div class = 'answer-entry-div'>
                <input class = 'answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>

            <div class = 'answer-entry-div'>
                <input class = 'answer-textbox' type = "text" placeholder = "Enter answer"/>
            </div>
        </div>
    `;

    newQuestionElement.innerHTML += newQuestionHTML;
}
