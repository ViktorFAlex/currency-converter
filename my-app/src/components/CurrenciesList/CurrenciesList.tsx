import { useSelector, useDispatch } from 'react-redux';
import { Pagination, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { actions, fetchCurrencies, selectCurrentRates } from '../../slices/currenciesSlice';
import styles from './CurrenciesList.module.css';
import { useState } from 'react';
import codes from '../../data/codes';
import routes from '../../routes';
import { AppDispatch } from '../../slices/index';
import { Currencies, PageHandler } from '../../types/interfaces';

const CurrenciesList = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const defaultPage = 1;
  const ratesPerPage = 10;
  const [page, setPage] = useState(defaultPage);
  const rates = useSelector(selectCurrentRates);

  const getCurrentPages = (rates: Currencies[]): Currencies[] => {
    const startToShow = defaultPage - 1 + ratesPerPage * (page - 1);
    const endToShow = ratesPerPage * page - 1;
    return rates.slice(startToShow, endToShow + 1);
  };

  const handleClick = (currency: string) => (): void => {
    dispatch(actions.setCurrency(currency));
    dispatch(fetchCurrencies(currency));
  };

  const handleChange: PageHandler = (event, page) => setPage(page);

  const pagesCount = Math.ceil(rates.length / ratesPerPage);

  const currentRates = getCurrentPages(rates);

  return (
    <>
      <div className={styles.gridMain}>
        {currentRates.map(({ currency, value }) => (
          <div className={styles.currencyRow} key={currency}>
            <div className={`${styles.currencyCell} ${styles.currencyCellLeft}`}>
              <img loading='lazy' width='20' src={routes.flagRoute(codes[currency])} alt='' />
              <button
                className={styles.currenciesBtn}
                onClick={handleClick(currency)}
                title={`${t(`countries.${currency}`)}`}
              >
                <Typography noWrap className={styles.item}>
                  {t(`countries.${currency}`)}
                </Typography>
              </button>
            </div>
            <div
              className={`${styles.currencyCell} ${styles.currencyCellRight}`}
              title={`${value}`}
            >
              <Typography noWrap>{value}</Typography>
            </div>
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
          siblingCount={1}
          boundaryCount={1}
        />
      </div>
    </>
  );
};

export default CurrenciesList;
