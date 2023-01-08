import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import { returnCurtSum } from "../../ts/utilities/cart-utilities";


jest.mock('../../ts/API/api.ts');

  const testLS = [{id: 1, count: 1, price: 549}, {id: 3, count: 1, price: 1249}];
  localStorage.removeItem('cartList');
  localStorage.setItem('cartList', JSON.stringify(testLS));

  // Подменяем  на стаб:

  // beforeEach(() => {

  //   document.body.innerHTML =`
  //     <div>
  //       <span class="total-sum"></span> 
  //       <span class="total-count"></span>
  //     </div>`;

  //     const totalSum = document.querySelector('.total-sum');
  //     const totalCount = document.querySelector('.total-count')
  // }) 

  describe('When there are products in cart', () => {
    it('summa of products in cart', () => {
      
      const result = returnCurtSum();
      console.log(returnCurtSum())
      const expected = [1798, 2];

      expect(result).toEqual(expected);
    })
  })