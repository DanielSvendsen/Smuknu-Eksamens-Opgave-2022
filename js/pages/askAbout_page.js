const loader =  document.querySelector('.loader')

loader.style.display = 'flex'

/* get QA to the askAbout page */

let api = 'https://smuknu.webmcdm.dk/questions'

const container = document.querySelector('.QAContainer')

/* QA template */

const template = (question, answer) => {
    container.innerHTML +=
        `
        <div class="question">
            <br>
            <i class="fa-solid fa-question"></i>
            <div>
                <p>${question}</p>
                <p>${answer}</p>
            </div>
            <br>
        </div>
        <div class="color"></div>
`
}

/* fetch api QA */

fetch(api, {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }

}).then(response => response.json()).then((questions) => {

    /* forEach QA make a new template */

    questions.forEach(question => {
        template(question.question, question.answer)
    });

    const QA = document.querySelectorAll('.question')

    /* forEach QA element make a addEventListener so you can click on each question (.question is from above from template) */
    
    QA.forEach(elm => {
        elm.addEventListener('click', (e) => {
            
            elm.classList.toggle('questionActive')

        })

    });

    setTimeout(() => {
        loader.style.display = 'none'
    }, 2100);

});