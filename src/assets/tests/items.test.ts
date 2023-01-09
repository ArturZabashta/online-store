import { describe, expect, it, jest } from '@jest/globals';
import { checkImage } from "../ts/components/itemDetails";

jest.mock('../ts/API/api.ts');

describe('itmes test', () => {
    it('check dublicate image', () => {
        const arr = ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 
        'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg']
        const result = ['https://i.dummyjson.com/data/products/2/1.jpg', 'https://i.dummyjson.com/data/products/2/2.jpg', 
        'https://i.dummyjson.com/data/products/2/3.jpg', 'https://i.dummyjson.com/data/products/2/thumbnail.jpg'] 
        expect(checkImage(arr)).toEqual(result);

    })
})