
/* get products to the products page */

let api = 'https://smuknu.webmcdm.dk/products'

const container = document.querySelector('.itemContainer')

/* product template */

const template = (id, title, price, image, discountInPercent) => {
    container.innerHTML +=
        `
    <div class="item" data-id="${id}">
        <div>
            <img class='productImg' src="${image}" alt="">
            ${discountInPercent == '' || discountInPercent == undefined || discountInPercent == null ? '' : `
            <div class="discount">
                <p>SPAR</p>
                <p class='discountText'>${discountInPercent}%</p>
            </div>`}
        </div>
        <div class="color"></div>
        <p class="title">${title}</p>
        <p class="price">${price},00 kr.</p>
        <button class="checkoutBtn">Læg i kurven</button>
    </div>
`
}

/* fetch api products */

fetch(api, {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
}).then(response => response.json()).then((products) => {

    /* forEach product make a new template */

    products.forEach(product => {
        template(product.id, product.title, product.price, product.image, product.discountInPercent)
    });

    /* save product in storge when click on a item to checkout */

    const checkoutBtn = document.querySelectorAll('.checkoutBtn')

    checkoutBtn.forEach(elm => {
        elm.addEventListener('click', () => {
            const nameProductElm = elm.parentElement.querySelector('.title')
            const imgProductElm = elm.parentElement.querySelector('.productImg')
            const priceProductElm = elm.parentElement.querySelector('.price')
            const discountProductElm = elm.parentElement.querySelector('.discountText')

            const cart = JSON.parse(localStorage.getItem('cart') || '[]')

            const addProduct = {
                'id': elm.parentElement.dataset.id,
                'name': nameProductElm.textContent,
                'img': imgProductElm.src,
                'price': priceProductElm.textContent,
                'discountInPercent': '',
                'total': 1
            }

            if (discountProductElm) {

                addProduct.discountInPercent = discountProductElm.textContent

            }

            console.log(addProduct)


            if (cart.length !== 0) {
                cart.forEach(element => {
                    if (element.id == elm.parentElement.dataset.id) {
                        addProduct.total += 1
                    }
                });
            }

            /* if this is the first time click item */

            if (addProduct.total == 1) {
    
                cart.push(addProduct)
    
                localStorage.setItem('product', JSON.stringify(addProduct))
    
                localStorage.setItem('cart', JSON.stringify(cart))

            } else {

                cart.find(x => {

                    if (x.id === addProduct.id) {

                        x.total += 1

                        localStorage.setItem('product', JSON.stringify(addProduct))

                        localStorage.setItem('cart', JSON.stringify(cart))

                    }
                
                })

            }




        })
    });

});
 