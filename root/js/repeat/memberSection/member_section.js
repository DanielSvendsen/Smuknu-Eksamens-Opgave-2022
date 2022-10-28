
/* get member img */

api = 'https://smuknu.webmcdm.dk/reviews'

const memberContainer = document.querySelector('.memberImg')

const templateMember = (members) => {

    memberContainer.innerHTML += ` 
    
        <div class="column">
            <img src=${members[0].image} alt="">
            <img src="${members[1].image}" alt="">
        </div>
        <div class="column">
            <img src="${members[2].image}" alt="">
            <img src="${members[3].image}" alt="">
        </div>
    
    `

}

/* fetch api reviews (to get member img to member section) */

fetch(api, {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
}).then(response => response.json()).then((members) => {
    
    /* forEach member make a new template */

    templateMember(members)

});