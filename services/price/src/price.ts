let currentPrice: number = 274.11

export const getPrice = () => currentPrice
export const updatePrice: (price: number) => number = (price) => {
  currentPrice = price
  return currentPrice
}
