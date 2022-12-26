
import {returnOneProduct} from "../utilities/utilities"

export const ItemComponent = async():Promise<void> => {
    const product = await returnOneProduct();

    const main: HTMLElement | null = document.getElementById('app');
    (<HTMLElement>main).innerHTML  =`
    <nav class="breadcrumb">
        <ul class="breadcrumb__list">
            <li class="breadcrumb__text"><a href="#">Store</a></li>
            <li class="breadcrumb__symbol"></li>
            <li class="breadcrumb__text"><a>${product?.category}</a></li>
            <li class="breadcrumb__symbol"></li>
            <li class="breadcrumb__text"><a>${product?.brand}</a></li>
            <li class="breadcrumb__symbol"></li>
            <li class="breadcrumb__text"><a>${product?.title}</a></li>
        </ul>
    </nav>
    <div class="product-details">
        <h3 class="product-details__title">${product?.title}</h3>
        <div class="product-details__wrapper">
            <div class="product-details__images">
                <div class="small-images">

                </div>
                <div class="big-image" style="background-image: url('${product?.images[0]}')"></div>

            </div>
            <div class="product-details__info">
                <div class="product-details__price">Price: <span>${product?.price}€</span></div>
                <div class="product-details__buttons">
                    <button class="item__addcurt btn">Drop from Cart</button>
                    <button class="item__details btn" id="btnbuy">Buy now</button>  
                </div>
                <div class="product-details__features">
                    <ul class="features">
                        <li class="feature">Description: <span>${product?.description}</span></li>
                        <li class="feature">Discount Percentage:<span>${product?.discountPercentage}</span></li>
                        <li class="feature">Rating: <span>${product?.rating}</span></li>
                        <li class="feature">Stock: <span>${product?.stock}</span></li>
                        <li class="feature">Brand: <span>${product?.brand}</span></li>
                        <li class="feature">Category:<span>${product?.category}</span></li>
                    </ul>

                </div>

            </div>

        </div>
    </div>
    `;
    checkImage(product?.images)
    // addAllImages(product?.images)
    setQueryToURL()
    btnBuyHandler()
    
}

//add and listen images
function addAllImages(images:string[] | undefined){
    // console.log(images)
    const smallImages = document.querySelector('.small-images')
    const bigImage = document.querySelector('.big-image')
    if(images){
        images.map((image) =>{

            // console.log(checkImage(image))
            const div = document.createElement('div');
            div.classList.add('image');
            div.style.backgroundImage = `url(${image})`;
            if(smallImages)smallImages.append(div);

            if(smallImages){
                smallImages.addEventListener("click", function(e){
                    const el: HTMLElement = e.target as HTMLElement;
                    // console.log(el)
                    if(bigImage && el) bigImage.setAttribute('style', el.getAttribute('style') as string)
                })
            }
        })
    }
}



// let imgSize: number[]

function checkImage(images:string[] | undefined){
    const imgSize: Array<number> =[]
    // const imgArray:  Array<string> = []

    if(images){
        // console.log(images)
        images.map((image,i) =>{
            const img = new Image();
            img.src = image;

            // img.onload = function() {

                if(imgSize.includes(img.height)){
                    // console.log(false)
                    images.splice(i, 1);
                    // console.log(images) 

                }else{
                    // console.log(true)
                    imgSize.push(img.height)
                    // imgArray.push(image)
                }
            // }
        })
        addAllImages(images)
    }
     

}

function setQueryToURL(){
        const currentItem: number = Number(localStorage.getItem('currentId')) as number;
        const refresh = window.location.protocol + "//" + window.location.host + `#/product-details`+ `?${currentItem}`  ;  
        window.history.pushState({ path: refresh }, '', refresh); 

}

function btnBuyHandler(){
    const btnBuy: HTMLInputElement | null = document.querySelector('#btnbuy');
    if(btnBuy)btnBuy.onclick = function(){
        const modal: HTMLElement = document.querySelector('.modal') as HTMLElement;
        modal.style.display = "flex";
    }
}