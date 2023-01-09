// import { IRangeAction } from "./interfaces/rangeInterfaces";
import { returnMinMaxPrice, returnMinMaxStock} from "./utilities/utilities"
let minPriceG: number;
let maxPriceG: number;
let minStockG: number;
let maxStockG: number;

export async function getPriceAndStock():Promise<void> {
  const minmaxPrice = await returnMinMaxPrice();
  const minmaxStock = await returnMinMaxStock();
  [minPriceG,maxPriceG] = [...minmaxPrice];
  [minStockG,maxStockG] = [...minmaxStock];
}
getPriceAndStock()

export function updateSlider(min: string, max: string, minSlider: HTMLInputElement, maxSlider: HTMLInputElement): void {
  const minPrice = minPriceG;
  const maxPrice = maxPriceG;
  const minStock = minStockG;
  const maxStock = maxStockG;
  const minV = (min.indexOf('€') === -1)? Number(min) : Number(min.slice(1, min.length));
  const maxV = (min.indexOf('€') === -1)? Number(max) : Number(max.slice(1, max.length));
  minSlider.value = (min.indexOf('€') === -1)? `${minV*100/(maxStock - minStock)}`: `${minV*100/(maxPrice - minPrice)}`;
  maxSlider.value = (min.indexOf('€') === -1)? `${maxV*100/(maxStock - minStock)}`: `${maxV*100/(maxPrice - minPrice)}`;
}

function updatePrice(min: HTMLElement, max: HTMLElement, minSlider: HTMLInputElement, maxSlider: HTMLInputElement): void {
    const minPrice = minPriceG;
    const maxPrice = maxPriceG;
    
    min.textContent = `€${Math.floor((maxPrice - minPrice) * (Number(minSlider.value)) / 100 + minPrice)}` ;
    max.textContent   = `€${Math.floor((maxPrice - minPrice) * (Number(maxSlider.value)) / 100 + minPrice)}`;
  }

  function updateStock(min: HTMLElement, max: HTMLElement, minSlider: HTMLInputElement, maxSlider: HTMLInputElement): void {
    const minStock = minStockG;
    const maxStock = maxStockG;
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