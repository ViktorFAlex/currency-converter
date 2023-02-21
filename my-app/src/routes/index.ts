const apiRoute = 'https://api.exchangerate.host';
const flagCdnRoute = 'https://flagcdn.com/w20/';

interface Routes {
  rates: (currency: string) => URL;
  convert: (from: string, to: string, amount: string) => URL;
  flagRoute: (country: string) => string;
}

const routes: Routes = {
  rates: (currency) => new URL(`latest?base=${currency}`, apiRoute),
  convert: (from, to, amount) =>
    new URL(`convert?from=${from}&to=${to}&amount=${amount}`, apiRoute),
  flagRoute: (country) => `${flagCdnRoute}${country}.png`,
};

export default routes;
