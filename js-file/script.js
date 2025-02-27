const phtoDirctiry = "images/";
const ringButton = document.querySelectorAll(".ring-button");
for (const ringBtn of ringButton) {
    ringBtn.addEventListener("click", function (event) {
        const color = event.target.id.split("-")[0];
        for (let i = 0; i < ringButton.length; i++) {
            const element = ringButton[i];
            element.classList.remove("border-purple-500");
            element.classList.add("border-gray-300")

        }
        event.target.classList.add("border-purple-500");
        event.target.classList.remove("border-gray-300");
        const photo = document.getElementById('product-image');
        // photo.src=`images/${color}.png`
        photo.src = `${phtoDirctiry}${color}.png`
    })
}
const sizeButton = document.querySelectorAll(".size-button");
for (let i = 0; i < sizeButton.length; i++) {
    const sizeBtn = sizeButton[i];
    sizeBtn.addEventListener("click", function (event) {
        for (let i = 0; i < sizeButton.length; i++) {
            const element = sizeButton[i];
            element.classList.remove("border-purple-600");
            element.classList.add("border-gray-300")

        }
        event.target.classList.add("border-purple-600");
        event.target.classList.remove("border-gray-300");
        const productPriceDisplay = document.getElementById("product-price");
        const productPrice = event.target.innerText.split("$")[1];
        productPriceDisplay.innerText = productPrice;


    })

}
// oneclickfunction 
function selectSize(size) {
    const sizeR = ["S", "M", "L", "XL"];
    for (let i = 0; i < sizeR.length; i++) {
        const element = sizeR[i];
        const accesBtn = document.getElementById("size-" + element);
        if (size === element) {
            accesBtn.classList.add("border-purple-500");
            accesBtn.classList.remove("border-gray-300");
        }

    }
}
// quantityButtons 
const quantityButtons = document.querySelectorAll(".quantity-button");
const currentQuantity = 0;
for (let i = 0; i < quantityButtons.length; i++) {
    const quantityBtn = quantityButtons[i];
    quantityBtn.addEventListener("click", function (event) {
        const setAmount = event.target.innerText === "+" ? 1 : -1;
        const quantity = getElementByIdText("quantity");
        const newQuantity = Math.max(0, quantity + setAmount);
        changeInnerText("quantity", newQuantity);
    })
}
let totalCart = 0;
let checkoutItmes = [];
const cartButton = document.getElementById("add-to-cart");
cartButton.addEventListener("click", function (event) {
    const quantity = getElementByIdText("quantity");
    // console.log(quantity);
    if (quantity > 0) {
        const checkout = document.getElementById("checkout-container");
        checkout.classList.remove("hidden");
        const cartCount = document.getElementById("cart-count");
        totalCart += quantity;
        cartCount.innerText = totalCart;
        // img get with selct color
        // click kora button er color purple er jonno querryselector e border purple deoya hoise
        const selectColorbtn = document.querySelector(".border-purple-500");
        const color = selectColorbtn.id.split("-")[0];
        console.log(color);
        // access size button  
        const selectSizebtn = document.querySelector(".border-purple-600");
        const size = selectSizebtn.id.split("-")[1];
        const setPrice = selectSizebtn.innerText.split("$")[1];
        const convetrPrice = parseFloat(setPrice);
        const totalPrice = quantity * convetrPrice;

        checkoutItmes.push({
            Image: `${phtoDirctiry}${color}.png`,
            title: " Classy Modern Smart Watch",
            color: color,
            size: size,
            quantity: quantity,
            price: totalPrice
        })




        changeInnerText("quantity","0")
    }

    else {
        alert("Please select quantity")
    }
})
const checkoutButton = document.getElementById("checkout-btn");
checkoutButton.addEventListener("click", function (event) {
    // alert   ("Thank you for shopping with us")
    // this.hidden section
    const checkoutList = document.getElementById("cart-modal");
    // parent node
    const addedCartItems = document.getElementById("cart-items");
    // loop arry checkoutItmes
    let totalCartPrice = 0
    for (const item of checkoutItmes) {
        totalCartPrice += item.price;


        const row = document.createElement("tr");
        row.classList.add("border-b");
        row.innerHTML = `
        <td class="py-2 px-2"><img src="${item.Image}" alt="product" class="w-16 h-16 rounded-lg"></td>
        <td class="py-2 px-2">${item.title}</td>
        <td class="py-2 px-2">${item.color}</td>
        <td class="py-2 px-2">${item.size}</td>
        <td class="py-2 px-2">${item.quantity}</td>
        <td class="py-2 px-2">$${item.price}</td>
        `;

        addedCartItems.appendChild(row);


    }
    const row2 = document.createElement("tr")
    row2.innerHTML = `
        <td class="py-2 px-2 font-bold text-xl text-center " colspan="5">Total</td>
        <td class="py-2 px-2 font-bold " colspan="2">$${totalCartPrice}</td>
        `
    addedCartItems.appendChild(row2)
    checkoutList.classList.remove("hidden");
});
// chekout last button 
document.getElementById("checkout").addEventListener("click", function (event) {
    const checkoutList = document.getElementById("cart-modal");
    alert("Thank you for shopping with us")
    checkoutList.classList.add("hidden");

}
)
document.getElementById("continue-shopping").addEventListener("click", function (event) {
    const checkoutList = document.getElementById("cart-modal");
    checkoutList.classList.add("hidden");
})

