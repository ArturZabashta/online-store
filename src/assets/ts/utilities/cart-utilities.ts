import { ICart } from "../interfaces/cart-interfaces";
import { totalCount, totalSum } from "../add-base-html";
import { PROMO_LIST } from "../constants/constants";

export function returnCurtSum(): Array<number> {
  const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList')));
  let summa = 0;
  let count = 0;
  if (cartList && cartList.length > 0) {
    cartList.forEach(element => {
      summa += element.price * element.count;
      count += element.count;
    });
  }          
  if (totalSum) totalSum.innerHTML = `${summa}`;
  if (totalCount) totalCount.innerHTML = `${count}`;
  
  return [summa, count];
}


export function reFreshCartList(id: number, count: number){
  const cartList: Array<ICart> = JSON.parse(String(localStorage.getItem('cartList')));
  localStorage.removeItem('cartList')
  if (cartList && cartList.length > 0) {
    const newCartList = cartList
    .map(element => {
      if (element.id == id) {
        element.count = count;
      }
      return element;
    })
    .filter(element => element.count !== 0);
    localStorage.setItem('cartList', JSON.stringify(newCartList));    
  }
  returnCurtSum();
}


export function changeCartProductCount(id: number, price:number, step: number, stock: number, countSpan: HTMLElement, summaSpan: HTMLElement): boolean {
  //console.log('id=', id, 'step=', step, 'stock=', stock)
  let isDelete = false;
  const count = Number(countSpan.innerHTML) + step;
  const summa = count * price;
  if (count == 0 ) {
    isDelete = true; 
    countSpan.innerHTML = `0`;
    summaSpan.innerHTML = `0`;
  }  
  if (count >= 1 && count <= stock) {
    countSpan.innerHTML = `${count}`;
    summaSpan.innerHTML = `${summa}`;
  }
  if (count > stock) {
    countSpan.innerHTML = `${stock}`;
    summaSpan.innerHTML = `${stock * price}`;
  }
  reFreshCartList(id, count)
  return isDelete;
}

export function returnDiscountSumma():number {
  let discountSum = 0;
  const promoArray: Array<string> = JSON.parse(localStorage.cartSettings).promo;
  promoArray.map(element => {
    discountSum += PROMO_LIST[element][1];
    return;
  })
  return discountSum;
}