const loader =  document.querySelector('.loader')

loader.style.display = 'flex'

setTimeout(() => {
    loader.style.display = 'none'
}, 2000);

/* send new subscribes to api from members page */

let api = 'https://smuknu.webmcdm.dk/subscribe'

const form = document.querySelector('.membersForm')

/* form btn click on submit */

form.addEventListener('submit', (e) => {

    e.preventDefault()

    const obj = {
        "name": form.elements['name'].value,
        "email": form.elements['email'].value,
        "message": form.elements['message'].value
    }

    /* fetch api new subscribe */

    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(obj)

    }).then(response => response.json()).then((response) => {


        const errorMessage = document.querySelector('.errorText')
        const formContainer = document.querySelector('.formContainer')
        const popup = document.querySelector('.popupMemberContainer')
        const popupName = document.querySelector('.popupName')

        /* if succes then print name out on page */

        if (response.result.name) {

            popupName.innerHTML = response.result.name
            formContainer.style.display = 'none'
            popup.style.display = 'flex'
            errorMessage.parentElement.style.display = 'none'

        } else {

            /* else print error result out on page */

            errorMessage.innerHTML = response.result
            errorMessage.parentElement.style.display = 'block'

        }

    });
})