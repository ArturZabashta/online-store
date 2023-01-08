import { describe, expect, it, jest } from '@jest/globals';
import { returnCurtSum, returnDiscountSumma, reFreshCartList } from "../../ts/utilities/cart-utilities";

jest.mock('../../ts/API/api.ts');

  const testLS = [{id: 1, count: 1, price: 549}, {id: 3, count: 1, price: 1249}];
  localStorage.removeItem('cartList');
  localStorage.setItem('cartList', JSON.stringify(testLS));  

  const startSettings = {
    perPage: 3,
    currPage: 1,
    promo: ["ts", "js"]
  }
  localStorage.setItem('cartSettings', JSON.stringify(startSettings))

  describe('When there are products in cart:', () => {
    it('summa and count of products in cart', () => {
      
      const result = returnCurtSum();
      const expected = [1798, 2];

      expect(result).toEqual(expected);
    }),
    it('summa of discount', () => {
      
      const result = returnDiscountSumma();
      const expected = 20;

      expect(result).toEqual(expected);
    }),
    it("update product's count in cart", () => {
      reFreshCartList(1,3);
      const result = JSON.parse(String(localStorage.getItem('cartList')));
      const expected = [{id: 1, count: 3, price: 549}, {id: 3, count: 1, price: 1249}];
      expect(result).toEqual(expected);
    })
  })