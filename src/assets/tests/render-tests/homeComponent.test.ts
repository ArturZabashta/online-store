import { describe, expect, it, jest } from '@jest/globals';
import { HomeComponent } from '../../ts/components/homePage';

jest.mock('../../ts/API/api.ts'); 

  describe('Render Shop page:', () => {

    document.body.innerHTML = `
    <main class="main">
            <div id="app" class="wrapper">
            </div>
            <div class="modal"></div>
            
        </main>
    `
    HomeComponent();

    test('uses jest-dom', () => {    
      const resetButton = <HTMLButtonElement>document.querySelector('.reset-btn');    
      expect(resetButton.innerHTML).toBe('Reset filters');
      const copyButton = <HTMLButtonElement>document.querySelector('.copy-btn');
      expect(copyButton.innerHTML).not.toBe('Reset filters');
      expect(copyButton.innerHTML).toBe('Copy link');

    })
  })