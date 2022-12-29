
import {returnOneProduct} from "../utilities/utilities"
import { ICart } from "../interfaces/cart-interfaces"
import { returnCurtSum } from "../utilities/cart-utilities";

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
                    <button class="item__addcurt btn" id="btnadd"></button>
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

    const btnAdd: HTMLInputElement = document.querySelector('#btnadd') as HTMLInputElement;

    if(product)checkBtnName(product.id, product.price)
    // if(product)btnAddHandler(product.id, product.price)

    function checkBtnName(id: number, price: number){
        const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
        console.log(cartList)
        if (cartList) {
            const reNewCartLis = cartList.every((item)=> item.id !== id)
            btnAdd.innerHTML = reNewCartLis? 'Add to Cart' : 'Drop from cart';
    
        }
        //btnAddHandler(id, price, cartList)
    }


    if (btnAdd) {
      btnAdd.addEventListener('click', ()=> {
        const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
        // localStorage.removeItem('cartList');
        // handler of addToCart button
        const id = Number(product?.id);
        const cartItem = {
          'id': id,
          'count': 1,
          'price': Number(product?.price)
        }
        //console.log(this.innerHTML)
        if (btnAdd.innerHTML == 'Add to Cart') {
          btnAdd.innerHTML = 'Drop from cart'; 
          console.log('Add to Cart');
          if (cartList) {
            cartList.push(cartItem);
            
            localStorage.setItem('cartList', JSON.stringify(cartList))
            returnCurtSum();
          }
          return;
        }
        if (btnAdd.innerHTML == 'Drop from cart') {
          btnAdd.innerHTML = 'Add to Cart'; 
          console.log('Drop from cart');
          
          if (cartList) {
            
            const reNewCartLis = cartList.filter((item)=> item.id !== id)
            localStorage.setItem('cartList', JSON.stringify(reNewCartLis))
            returnCurtSum();
          }
          return;
        }
      })
      

    }

    /*
    function btnAddHandler(id: number, price: number, oldcartList: Array<ICart>){
        const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList')));
        localStorage.removeItem('cartList');
        if(btnAdd)btnAdd.onclick = function(){
    
            console.log(cartList)
            // localStorage.removeItem('cartList');
            const cartItem = {
                    'id': id,
                    'count': 1,
                    'price': price
                }
    
                if (btnAdd.innerHTML == 'Add to Cart') {
                    btnAdd.innerHTML = 'Drop from cart'; 
                    console.log('Add to Cart');

                    if (cartList) {
                        cartList.push(cartItem);
                        // cartList = [...new Set(cartList)]
                        const json_array = cartList.map(el => JSON.stringify(el));
                        console.log(json_array)
                        const set = new Set(json_array);
                        const new_array = Array.from(set);
                        console.log(new_array)
                        
                        localStorage.setItem('cartList', JSON.stringify(new_array))
                        
                        // console.log(cartList)
                    }
            
                    return;
                } 
                
                if (btnAdd.innerHTML == 'Drop from cart') {
                    btnAdd.innerHTML = 'Add to Cart'; 
                    console.log('Drop from cart');
                    
                    if (cartList) {
                        const reNewCartLis = cartList.filter((item)=> item.id !== id)
                        
                        localStorage.setItem('cartList', JSON.stringify(reNewCartLis))
                        console.log(reNewCartLis)
                    }
                    return;
                }
            // cartList.splice(0); 
        
        }
        // cartList.splice(0); 
    }

    */
    returnCurtSum();
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