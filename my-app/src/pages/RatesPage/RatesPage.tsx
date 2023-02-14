import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, TextField, Box } from '@mui/material';
import { AppDispatch } from '../../slices/index';
import styles from './RatesPage.module.css';
import {
  selectAll,
  fetchCurrencies,
  selectCurrentCurrencyId,
  actions,
  Currencies,
  selectCurrentCurrency,
} from '../../slices/currenciesSlice';
import CurrenciesList from '../../components/CurrenciesList/CurrenciesList';
import countries from '../../Data/data';
import routes from '../../routes';

const RatesPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);
  interface PageChanger {
    (event: React.ChangeEvent<unknown>, currentCurrency: Currencies): void;
  }
  const handleClick: PageChanger = (event, currentCurrency) => {
    dispatch(actions.setCurrency(currentCurrency));
    dispatch(fetchCurrencies(currentCurrency.currency));
  };
  const rates = useSelector(selectAll);
  const id = useSelector(selectCurrentCurrencyId);
  const currentCurrency = useSelector(selectCurrentCurrency);
  const buildInput = (option: Currencies) => {
    const country = countries[option.currency].country;
    const currency = countries[option.currency].currency;
    return `${option.currency} ${country ? `${country} ` : ''}${currency}`;
  };

  return (
    <>
      {rates.length && (
        <div className={styles.tableContainer} aria-label='rates-table'>
          <section className={styles.ratesTable}>
            <div className={styles.gridHeader}>
              <div className={styles.headers}>
                <div className={styles.headerCell}>Currency</div>
                <span className={styles.headerCell}>Amount</span>
              </div>
              <div className={styles.current}>
                <Autocomplete
                  disablePortal
                  disableClearable
                  autoHighlight
                  options={rates}
                  sx={{ width: '48%' }}
                  getOptionLabel={(option) => buildInput(option)}
                  className={styles.autocomplete}
                  value={rates[id]}
                  onChange={handleClick}
                  renderOption={(props, option) => (
                    <Box
                      component='li'
                      key={option.id}
                      sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <img
                        loading='lazy'
                        width='20'
                        src={routes.flagRoute(countries[option.currency].code)}
                        alt=''
                      />
                      {buildInput(option)}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant='filled'
                      color='success'
                      sx={{ input: { cursor: 'pointer' } }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <img
                            width='20'
                            src={routes.flagRoute(countries[currentCurrency.currency].code)}
                            alt=''
                          />
                        ),
                      }}
                      label='Select currency'
                    />
                  )}
                />
                <span className={styles.headerCell}>1</span>
              </div>
            </div>
            <CurrenciesList />
          </section>
        </div>
      )}
    </>
  );
};

export default RatesPage;
