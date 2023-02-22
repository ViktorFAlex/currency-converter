import { Autocomplete, Box, TextField, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import codes from '../../data/codes';
import routes from '../../routes/index';
import { AppDispatch } from '../../slices/index';
import {
  actions,
  fetchCurrencies,
  selectCurrentCurrency,
  selectCurrenciesNames,
} from '../../slices/currenciesSlice';
import { AutocompleteHandler } from '../../types/interfaces';
import buildOutput from '../../utils/buildOutput';
import styles from './RatesAutocomplete.module.css';

const RatesAutocomplete = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector(selectCurrenciesNames);
  const currency = useSelector(selectCurrentCurrency);

  const handleChange: AutocompleteHandler = (event, currency) => {
    dispatch(actions.setCurrency(currency));
    dispatch(fetchCurrencies(currency));
  };

  return (
    <div className={styles.ratesAutocomplete}>
      <Tooltip title={buildOutput(t)(currency)} disableInteractive arrow followCursor>
        <Autocomplete
          {...{ options: currencies }}
          disablePortal
          disableClearable
          autoHighlight
          sx={{ width: '48%' }}
          value={currency}
          className={styles.ratesAutocompleteSelect}
          getOptionLabel={buildOutput(t)}
          onChange={handleChange}
          renderOption={(props, option) => (
            <Box
              component='li'
              key={option}
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img loading='lazy' width='20' src={routes.flagRoute(codes[option])} alt='' />
              {buildOutput(t)(option)}
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
                startAdornment: <img width='20' src={routes.flagRoute(codes[currency])} alt='' />,
              }}
              label={t('elements.userLabel')}
            />
          )}
        />
      </Tooltip>
      <span className={styles.ratesAutocompleteValue}>{t('elements.1')}</span>
    </div>
  );
};

export default RatesAutocomplete;
