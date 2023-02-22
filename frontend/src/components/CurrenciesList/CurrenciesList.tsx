import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentRates } from '../../slices/currenciesSlice';
import { Currencies } from '../../types/interfaces';
import CurrenciesListFooter from './components/CurrenciesListFooter/CurrenciesListFooter';
import CurrenciesListItem from './components/CurrenciesListItem/CurrenciesListItem';
import styles from './CurrenciesList.module.css';

const CurrenciesList = (): JSX.Element => {
  const defaultPage = 1;
  const ratesPerPage = 10;
  const [page, setPage] = useState(defaultPage);
  const rates = useSelector(selectCurrentRates);

  const getCurrentRates = (rates: Currencies[]): Currencies[] => {
    const startToShow = defaultPage - 1 + ratesPerPage * (page - 1);
    const endToShow = ratesPerPage * page - 1;
    return rates.slice(startToShow, endToShow + 1);
  };

  const pagesCount = Math.ceil(rates.length / ratesPerPage);

  const currentRates = getCurrentRates(rates);

  return (
    <>
      <div className={styles.currenciesListMain}>
        {currentRates.map(({ currency, value }) => (
          <CurrenciesListItem key={currency} currency={currency} value={value} />
        ))}
      </div>
      <CurrenciesListFooter page={page} setPage={setPage} count={pagesCount} />
    </>
  );
};

export default CurrenciesList;
