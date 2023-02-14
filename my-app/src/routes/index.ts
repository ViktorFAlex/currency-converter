const apiRoute = 'https://api.exchangerate.host';
const flagCdnRoute = 'https://flagcdn.com/w20/';

const routes = {
  rates: (): string => [apiRoute, 'latest'].join('/'),
  convert: (): string => [apiRoute, 'convert'].join('/'),
  flagRoute: (country: string): string => `${flagCdnRoute}${country}.png`,
};

export default routes;
