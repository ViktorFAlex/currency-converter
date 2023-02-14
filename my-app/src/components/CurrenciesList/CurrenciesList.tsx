import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@mui/material';
import {
  Currencies,
  actions,
  selectAll,
  fetchCurrencies,
  selectCurrentRates,
} from '../../slices/currenciesSlice';
import styles from './CurrenciesList.module.css';
import { useState } from 'react';
import countries from '../../Data/data';
import routes from '../../routes';
import { AppDispatch } from '../../slices/index';

interface PageChanger {
  (event: React.ChangeEvent<unknown>, page: number): void;
}
const CurrenciesList = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const defaultPage = 1;
  const ratesPerPage = 10;
  const [page, setPage] = useState(1);
  const rates = useSelector(selectCurrentRates);
  const getCurrentPages = (rates: Currencies[]): Currencies[] => {
    const startToShow = defaultPage - 1 + ratesPerPage * (page - 1);
    const endToShow = ratesPerPage * page - 1;
    return rates.slice(startToShow, endToShow + 1);
  };
  const handleClick = (option: Currencies) => (): void => {
    dispatch(actions.setCurrency(option));
    dispatch(fetchCurrencies(option.currency));
  };
  const handleChange: PageChanger = (event, page) => setPage(page);
  const buildInput = (option: Currencies) => {
    const country = countries[option.currency].country;
    const currency = countries[option.currency].currency;
    return `${country ? `${country} ` : ''}${currency}`;
  };
  const pagesCount = Math.ceil(rates.length / ratesPerPage);
  const currentRates = getCurrentPages(rates);

  return (
    <>
      <div className={styles.gridMain}>
        {currentRates.map((option) => (
          <div className={styles.currencyRow} key={option.currency}>
            <div className={styles.currencyCell}>
              <img
                loading='lazy'
                width='20'
                src={routes.flagRoute(countries[option.currency].code)}
                alt=''
              />
              <span className={styles.item}>
                <button className={styles.currenciesBtn} onClick={handleClick(option)}>
                  {buildInput(option)}
                </button>
              </span>
            </div>
            <div className={styles.currencyCell}>{option.value}</div>
          </div>
        ))}
      </div>
      <div className={styles.gridFooter}>
        <Pagination
          page={page}
          color='secondary'
          onChange={handleChange}
          count={pagesCount}
          shape='rounded'
        />
      </div>
    </>
  );
};

export default CurrenciesList;
