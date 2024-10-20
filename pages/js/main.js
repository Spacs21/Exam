const BASE_URL = "https://fakestoreapi.com";
const layout = document.querySelector(".layout")
const gallery = document.querySelector(".gallery")
const details = document.querySelector(".details")
const mainImg = document.querySelector(".main-image")
const burger = document.querySelector(".header__burger")
const menu = document.querySelector(".menu")
const loader = document.querySelector(".lds-roller")
const path = document.querySelector(".path-info")

async function GetData() {
    let query = new URLSearchParams(window.location.search)
    let id = query.get("id")
    

    const response = await fetch(`${BASE_URL}/products/${id}`);
    response
        .json()
        .then(res => createProducts(res))
        .finally(()=>{
            loader.style.display = "none";
        })
        .catch(err => console.log(err));
}

GetData()

function createProducts(data){
    console.log(data);
    let empty = "https://i.pinimg.com/564x/24/f3/a5/24f3a59624eda48066884455d981b57e.jpg"
    let review = Math.ceil(data.rating.rate);

    path.innerHTML = `
    <div class="history">
        <h4>Home / ${data.category} / <span>${data.title}</span></h4>
    </div>
    `
    details.innerHTML = `
    <h1>${data.title}</h1>
    <div class="rating">
        <span class="stars">
         ${`<i class="fa-solid fa-star"></i>`.repeat(review)}
        ${`<i class="fa-regular fa-star"></i>`.repeat(5 - review)}
        </span>
        <span class="reviews">(${data.rating.count} Reviews)</span>
        <span class="stock-status">In Stock</span>
    </div>
    <div class="price">$${data.price}</div>
    <p class="description">${data.description}</p>
    <div class="colors">
    <span>Colours:</span>
    <label><span class="circle blue"></span></label>
    <label><span class="circle red"></span></label>
</div>

<div class="sizes">
    <span>Size:</span>
    <button class="size-option">XS</button>
    <button class="size-option">S</button>
    <button class="size-option selected">M</button>
    <button class="size-option">L</button>
    <button class="size-option">XL</button>
</div>

<div class="quantity">
    <button class="minus">-</button>
    <input type="text" value="2">
    <button class="plus">+</button>
</div>
<div class="btn">
    <button class="buy-now">Buy Now</button>
</div>

<div class="delivery-info">
    <div class="delivery-item">
        <strong>Free Delivery</strong>
        <p>Enter your postal code for Delivery Availability</p>
    </div>
    <div class="delivery-item">
        <strong>Return Delivery</strong>
        <p>Free 30 Days Delivery Returns. <a href="#">Details</a></p>
    </div>
</div>
    `

    gallery.innerHTML = `
     <div class="thumbnail">
    <img src="${empty}">
    </div>
    <div class="thumbnail">
        <img src="${empty}">
    </div>
    <div class="thumbnail">
        <img src="${empty}">
    </div>
    <div class="thumbnail">
        <img src="${empty}">
    </div>
`   
    mainImg.innerHTML = `
    <img src="${data.image}">
    `
}


burger.addEventListener("click", ()=>{
    if(menu.style.display == "none"){
        menu.style.display = "block"
    }else{
        menu.style.display = "none"
    }
})