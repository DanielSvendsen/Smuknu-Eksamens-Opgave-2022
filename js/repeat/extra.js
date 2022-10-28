
/* burger menu */

function burger() {
    const burger = document.querySelector(".Menu").style
    if (burger.display !== "block") {
        burger.display = "block"
    }
    else if (burger.display == "block") {
        burger.display = "none"
    }
}