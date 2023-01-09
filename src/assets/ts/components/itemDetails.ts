
import { returnOneProduct } from "../utilities/utilities"
import { ICart } from "../interfaces/cart-interfaces"
import { returnCurtSum } from "../utilities/cart-utilities";

export const ItemComponent = async():Promise<void> => {
    const product = await returnOneProduct();

    const main: HTMLElement | null = document.getElementById('app');
    (<HTMLElement>main).innerHTML  =`
    <nav class="breadcrumb">
        <ul class="breadcrumb__list">
            <li class="breadcrumb__text"><a href="#/shop">Store</a></li>
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
                    <button class="item__addcart btn" id="btnadd"></button>
                    <button class="item__details btn" id="btnbuy">Buy now</button>  
                </div>
                <div class="product-details__features">
                    <ul class="features">
                        <li class="feature">Description: <span>${product?.description}</span></li>
                        <li class="feature">Discount Percentage:<span>${product?.discountPercentage}%</span></li>
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

    const btnAdd: HTMLInputElement = document.querySelector('#btnadd') as HTMLInputElement;
    const btnBuy: HTMLInputElement = document.querySelector('#btnbuy') as HTMLInputElement;

    if(product)checkBtnName(product.id)

    function checkBtnName(id: number){
        const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
        // console.log(cartList)
        if (cartList) {
            const reNewCartLis = cartList.every((item)=> item.id !== id)
            btnAdd.innerHTML = reNewCartLis? 'Add to Cart' : 'Drop from cart';
        }
    }

    if (btnAdd) {
      btnAdd.addEventListener('click', ()=> {
        const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
        const id = Number(product?.id);
        const cartItem = {
          'id': id,
          'count': 1,
          'price': Number(product?.price)
        }
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

    if(btnBuy)btnBuy.onclick = function(){ 
        const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList'))) || [];
        const id = Number(product?.id);
        const cartItem = {
          'id': id,
          'count': 1,
          'price': Number(product?.price)
        }

        if (btnAdd.innerHTML == 'Add to Cart') {
            btnAdd.innerHTML = 'Drop from cart'; 
            console.log('Add to Cart');
            if (cartList) {
              cartList.push(cartItem);
              
              localStorage.setItem('cartList', JSON.stringify(cartList))
              returnCurtSum();
            }
        }
        location.href=`#/curt`;

        const modal: HTMLElement | null = document.querySelector('.modal') as HTMLElement;
        modal.style.display = "flex";
    }
    

   
    returnCurtSum();
}

//add and listen images
export function addAllImages(images:string[] | undefined){
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

export function checkImage(images:string[] | undefined){
    const imgSize: Array<string> =[]

    if(images){
        images.map((image,i) =>{
            const url = image;
            const req = new XMLHttpRequest();
            req.open("GET", url, false);
            req.send();
            const size: string = req.getResponseHeader('content-length') as string;

            if(imgSize.includes(size as string)){
                images.splice(i, 1);
            }else{
                imgSize.push(size)
            }
        })
        addAllImages(images)
    }
    return images;
}


function setQueryToURL(){
        const currentItem: number = Number(localStorage.getItem('currentId')) as number;
        const refresh = window.location.protocol + "//" + window.location.host + `#/product-details`+ `?${currentItem}`  ;  
        window.history.pushState({ path: refresh }, '', refresh); 

}
