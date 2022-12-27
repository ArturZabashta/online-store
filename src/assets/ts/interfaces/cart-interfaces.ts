export interface ICart {
  id: number,
  count: number,
  price: number
}

export interface ICartSettings {
  perPage: number,
  currPage: number,
  promo: Array<string>
}

export interface IPromo {
  [key: string] : [string, number]
}