// import { IRangeAction } from "./interfaces/rangeInterfaces";
import { returnMinMaxPrice, returnMinMaxStock} from "./utilities/utilities"
let MIN_PRICE: number;
let MAX_PRICE: number;
let MIN_STOCK: number;
let MAX_STOCK: number;

async function getPriceAndstock():Promise<void> {
  const minmaxPrice = await returnMinMaxPrice();
  const minmaxStock = await returnMinMaxStock();
  [MIN_PRICE,MAX_PRICE] = [...minmaxPrice];
  [MIN_STOCK,MAX_STOCK] = [...minmaxStock];
}
getPriceAndstock()

function updatePrice(min: HTMLElement, max: HTMLElement, minSlider: HTMLInputElement, maxSlider: HTMLInputElement): void {
    const minPrice = MIN_PRICE;
    const maxPrice = MAX_PRICE;
    console.log(MIN_PRICE,MAX_PRICE)
    min.textContent = `€${Math.floor((maxPrice - minPrice) * (Number(minSlider.value)) / 100 + minPrice)}` ;
    max.textContent   = `€${Math.floor((maxPrice - minPrice) * (Number(maxSlider.value)) / 100 + minPrice)}`;
  }

  function updateStock(min: HTMLElement, max: HTMLElement, minSlider: HTMLInputElement, maxSlider: HTMLInputElement): void {
    const minStock = MIN_STOCK;
    const maxStock = MAX_STOCK;
    min.textContent= `${Math.floor((maxStock - minStock) * (Number(minSlider.value)) / 100 + minStock)}`;
    max.textContent   = `${Math.floor((maxStock - minStock) * (Number(maxSlider.value)) / 100 + minStock)}`;
  }

  function getParsed(currentFrom: HTMLInputElement, currentTo: HTMLInputElement): number[] {
    const from: number = parseInt(currentFrom.value, 10);
    const to: number = parseInt(currentTo.value, 10);
    return [from, to];
  }

  export function controlFromRange(from: HTMLElement, to: HTMLElement, fromSlider: HTMLInputElement, toSlider: HTMLInputElement, action: string): void  {
    const [minValue, maxValue] = getParsed(fromSlider, toSlider); 
    if (maxValue < minValue + 1) {
      fromSlider.value = `${maxValue - 1}`
        
      if (minValue === parseInt(fromSlider.min)) {
        toSlider.value = '1'
      }
    }
    if(action === 'updatePrice') updatePrice(from, to, fromSlider, toSlider);
    if(action === 'updateStock') updateStock(from, to, fromSlider, toSlider);
  }

  export function controlToRange(from: HTMLElement, to: HTMLElement, fromSlider: HTMLInputElement, toSlider: HTMLInputElement, action: string): void {
  const [minValue, maxValue] = getParsed(fromSlider, toSlider); 
  
    if (minValue > maxValue - 1) {
      if(toSlider) toSlider.value = `${minValue + 1}`
        
      if (maxValue === parseInt(toSlider.max)) {
        fromSlider.value = `${parseInt(toSlider.max) - 1}`
      }
    }
    if(action === 'updatePrice') updatePrice(from, to, fromSlider, toSlider);
    if(action === 'updateStock') updateStock(from, to, fromSlider, toSlider);
  }