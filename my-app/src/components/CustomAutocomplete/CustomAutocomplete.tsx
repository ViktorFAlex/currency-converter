import { Autocomplete, Box, TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAll,
  selectCurrentCurrencyId,
  actions,
  fetchCurrencies,
  selectCurrentCurrency,
} from '../../slices/currenciesSlice';
import { Currencies } from '../../types/interfaces';
import styles from './CustomAutocomplete.module.css';
import countries from '../../Data/data';
import { AppDispatch } from '../../slices/index';
import routes from '../../routes/index';

const CustomAutocomplete = (): JSX.Element => {
  interface PageChanger {
    (event: React.ChangeEvent<unknown>, currentCurrency: Currencies): void;
  }
  const dispatch = useDispatch<AppDispatch>();
  const rates = useSelector(selectAll);
  const id = useSelector(selectCurrentCurrencyId);
  const currentCurrency = useSelector(selectCurrentCurrency);
  const buildInput = (option: Currencies) => {
    const { country, currency } = countries[option.currency];
    return `${option.currency} - ${country || ''} ${currency}`;
  };

  const handleClick: PageChanger = (event, currentCurrency) => {
    dispatch(actions.setCurrency(currentCurrency));
    dispatch(fetchCurrencies(currentCurrency.currency));
  };
  return (
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
      <span className={styles.autocompleteValue}>1</span>
    </div>
  );
};

export default CustomAutocomplete;
