import { describe, expect, test, beforeEach } from '@jest/globals';
import { getAllFilters, getSearchByInput, getSortedProducts } from "../../ts/utilities/utilities";
import { IProduct  } from "../../ts/interfaces/api-interfaces";

beforeEach(() => {
  localStorage.setItem('brandsArray', JSON.stringify(['Apple', 'Samsung']));   
});

describe('Test of utilities functions:', () => {
  const productList: IProduct[] = [
    {
      brand: "Apple",
      category: "smartphones",
      description: "An apple",
      discountPercentage: 12.96,
      id: 1,
      images: [''],
      price: 500,
      rating: 4.69,
      stock: 94,
      thumbnail: "",
      title: "iPhone 9",
    },
    {
      brand: "Samsung",
      category: "smartphones",
      description: "A samsung",
      discountPercentage: 12.96,
      id: 2,
      images: [''],
      price: 600,
      rating: 4.79,
      stock: 99,
      thumbnail: "",
      title: "A 71",
      }
  ];

  test('all filters from LS', () => {
    const result = getAllFilters();
    expect(result).toEqual([ [ 'Apple', 'Samsung' ], [], [], '', '', '' ]);
  }),

  test('check search input', () => {
    let result = getSearchByInput(productList, 'apple');
    expect(result.length).toEqual(1);
    result = getSearchByInput(productList, 'a');
    expect(result.length).toEqual(2);
  }),
  
  test('check sorting', () => {
    let result = getSortedProducts(productList, 'priceUp');
    expect(result).toEqual(productList);
    result = getSortedProducts(productList, 'priceDown');
    expect(result).toEqual(productList.reverse());
  })
})