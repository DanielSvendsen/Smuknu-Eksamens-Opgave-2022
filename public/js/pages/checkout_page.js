const checkoutBtn = document.querySelectorAll('.checkoutBtn')

/* get products to the checkout page */

const containerItem = document.querySelector('.itemContainer')

/* product template */

const templateCheckout = (id, title, image, price, discountInPercent, total, oldPrice) => {
    containerItem.innerHTML +=
        `
        <div class="item" data-id="${id}">
            <div class="row">

                <div class="column colImg">
                    <img class='productImg' src="${image}" alt="">
                </div>

                <div class="column colLast">
                    <p class="title">${title}</p>
                </div>

                <div class="discountAndAmountContainer">
                    <p class='discountText'>${discountInPercent}</p>
                    <div class='amountContainer'>
                        <button class='amountAdd'>+</button>
                        <p class='amount'>${total}</p>
                        <button class='amountTake'>-</button>
                    </div>
                </div>

                <div class="priceContainer">
                    <p class="priceOld">${discountInPercent ? oldPrice + ' kr.' : ''}</p>
                    <p class="priceNew">${price} kr.</p>
                </div>

            </div>
        </div>
        <div class="color"></div>
`
}

const templateTotalPrice = (totalPrice, totalPriceOld) => {
    containerItem.insertAdjacentHTML("beforeend",
        `
        <div class='totalPriceContainer'>
            <p class='textTotal'>Ialt</p>
            <div class='textPriceTotal'>
                <p class='priceOld'>${totalPriceOld} kr.</p>
                <p class='priceNew'>${totalPrice} kr.</p>
            </div>
        </div>
`
    )
}

const cart = localStorage.getItem('cart')

if (!cart) {

    containerItem.innerHTML = 
    `
        <div class='emty'>
            <p>Der er ingen produkter I kurven</p>
        </div>
    `

} else {
    
    containerItem.innerHTML = ''

    let beforeDisCount
    let price = 0;
    let priceTotal = 0;
    let oldPriceTotal = 0;
    
    JSON.parse(cart).forEach(product => {
        
        price = parseFloat(product.price)
        priceTotal += price * product.total
        
        if (product.discountInPercent) {
            let beforeDiscountPrice = price / (1 - parseFloat(product.discountInPercent) / 100)
            beforeDisCount = Math.round(beforeDiscountPrice * 100 / 100)
            
            oldPriceTotal += beforeDisCount * product.total
            console.log(beforeDisCount)
            
        } else {
            
        oldPriceTotal += price * product.total
        
    }
    
    
    templateCheckout(product.id, product.name, product.img, price.toFixed(2), product.discountInPercent, product.total, beforeDisCount.toFixed(2))
});

templateTotalPrice(priceTotal.toFixed(2), oldPriceTotal.toFixed(2))

}


/* save product in storge and change total price but only when reload :/ */

const btnAdd = document.querySelectorAll('.amountAdd')
const btnTake = document.querySelectorAll('.amountTake')


btnAdd.forEach(elm => {
    elm.addEventListener('click', () => {
        addOrTake(elm, 'add')
})
})

btnTake.forEach(elm => {
    elm.addEventListener('click', () => {
        addOrTake(elm, 'take')
    })
})


const addOrTake = (elm, addOrTake) => {

    
                const cart = JSON.parse(localStorage.getItem('cart'))

                    cart.find(x => {
    
                        if (x.id === elm.parentElement.parentElement.parentElement.parentElement.dataset.id) {

                            
                            if (addOrTake == 'add') {
                                
                                x.total += 1
                                
                            } else {
                                
                                x.total -= 1
                                
                            }
                            
                            elm.parentElement.querySelector('.amount').innerHTML = x.total
    
                            localStorage.setItem('cart', JSON.stringify(cart))
    
                        }
                    
                    })
    
    
}