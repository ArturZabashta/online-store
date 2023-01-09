import { describe, expect, jest } from '@jest/globals';
import { CartComponent } from '../../ts/components/cartPage';

jest.mock('../../ts/API/api.ts'); 

  describe('Render empty Cart page:', () => {

    document.body.innerHTML = `
    <main class="main">
            <div id="app" class="wrapper">
            </div>
            <div class="modal"></div>
            
        </main>
    `
    CartComponent();

    test("if there aren’t products in the cart", () => {    
      const testItem = <HTMLButtonElement>document.querySelector('.cart__empty');    
      expect(testItem.innerHTML).toBe(' There is no products in the cart ');
    }) 
  })

  

  

