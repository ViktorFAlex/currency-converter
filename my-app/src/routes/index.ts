const apiRoute = 'https://api.exchangerate.host';
const flagCdnRoute = 'https://flagcdn.com/w20/';

const routes = {
  rates: (currency: string): URL => new URL(`latest?base=${currency}`, apiRoute),
  convert: (from: string, to: string, amount: string): URL =>
    new URL(`convert?from=${from}&to=${to}&amount=${amount}`, apiRoute),
  flagRoute: (country: string): string => `${flagCdnRoute}${country}.png`,
};

export default routes;
