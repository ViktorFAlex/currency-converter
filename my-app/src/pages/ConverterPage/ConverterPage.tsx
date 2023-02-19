import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Autocomplete } from '@mui/material';
import { AppDispatch } from '../../slices/index';
import { selectCurrenciesNames } from '../../slices/currenciesSlice';
import { fetchConvert, selectConvertState } from '../../slices/convertSlice';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import styles from './ConverterPage.module.css';
import ConvertField from '../../components/ConvertField/ConvertField';
import countries from '../../Data/data';
import routes from '../../routes';

const ConverterPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const currencies = useSelector(selectCurrenciesNames);
  const validationSchema = Yup.object().shape({
    from: Yup.string().required().oneOf(currencies, 'choose any Option'),
    to: Yup.string().required().oneOf(currencies, 'choose any Option'),
    amount: Yup.string().min(3, 'not Enough').required('Low'),
  });
  const defaultProps = {
    options: currencies,
  };
  const { amount: convertAmount } = useSelector(selectConvertState);
  const buildInput = (option: string) => {
    const { country, currency } = countries[option];
    return `${option} - ${country || ''} ${currency}`;
  };
  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      amount: '',
    },
    onSubmit: async (data) => {
      console.log('data', data);
      await dispatch(fetchConvert(data));
    },
    validationSchema,
  });
  const switchCurrencies = (): void => {
    const { from, to } = formik.values;
    formik.setFieldValue('to', from);
    formik.setFieldValue('from', to);
  };
  const handleBlur = (field: string) => formik.setFieldTouched(field);
  return (
    <>
      <Box
        component='form'
        className={styles.converterContainer}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.currenciesSelect}>
          <Autocomplete
            {...defaultProps}
            disablePortal
            autoHighlight
            value={formik.values.from}
            className={`${styles.converterAutocomplete} ${styles.converterLeft}`}
            getOptionLabel={(option) => (option ? buildInput(option) : '')}
            isOptionEqualToValue={(option, value) => value === option || value === ''}
            onChange={(e, value) => formik.setFieldValue('from', value)}
            onBlur={() => handleBlur('from')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                color='success'
                size='small'
                error={!!formik.errors.from && formik.touched.from}
                helperText={(formik.touched.from && formik.errors.from) || ' '}
                sx={{ input: { cursor: 'pointer' } }}
                label='Select currency'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: formik.values.from ? (
                    <img
                      width='20'
                      src={routes.flagRoute(countries[formik.values.from].code)}
                      alt=''
                    />
                  ) : null,
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box
                component='li'
                key={option}
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading='lazy'
                  width='20'
                  src={routes.flagRoute(countries[option].code)}
                  alt=''
                />
                {buildInput(option)}
              </Box>
            )}
          />
          <Button
            variant='outlined'
            type='button'
            startIcon={<CurrencyExchangeIcon />}
            onClick={switchCurrencies}
            className={`${styles.converterSwitchBtn} ${styles.converterCenter}`}
            sx={{ fontSize: '0.8em', marginBottom: '20px' }}
          >
            Switch currencies
          </Button>
          <Autocomplete
            {...defaultProps}
            disablePortal
            autoHighlight
            value={formik.values.to}
            className={`${styles.converterAutocomplete} ${styles.converterRight}`}
            getOptionLabel={(option) => (option ? buildInput(option) : '')}
            isOptionEqualToValue={(option, value) => value === option || value === ''}
            onChange={(e, value) => formik.setFieldValue('to', value)}
            onBlur={() => handleBlur('to')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant='filled'
                color='success'
                size='small'
                error={!!formik.errors.to && formik.touched.to}
                helperText={(formik.touched.to && formik.errors.to) || ' '}
                FormHelperTextProps={{ className: styles.helperText }}
                sx={{ input: { cursor: 'pointer' } }}
                label='Select currency'
                InputProps={{
                  ...params.InputProps,
                  startAdornment: formik.values.to ? (
                    <img
                      width='20'
                      src={routes.flagRoute(countries[formik.values.to].code)}
                      alt=''
                    />
                  ) : null,
                }}
              />
            )}
            renderOption={(props, option) => (
              <Box
                component='li'
                key={option}
                sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                {...props}
              >
                <img
                  loading='lazy'
                  width='20'
                  src={routes.flagRoute(countries[option].code)}
                  alt=''
                />
                {buildInput(option)}
              </Box>
            )}
          />
        </div>
        <TextField
          error={!!formik.errors.amount && formik.touched.amount}
          helperText={(formik.touched.amount && formik.errors.amount) || ' '}
          label='Enter the amount'
          size='small'
          name='amount'
          className={styles.converterAmount}
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={() => handleBlur('amount')}
        />

        <Button type='submit' variant='contained' className={styles.convertBtn}>
          Convert
        </Button>
      </Box>
      {!!convertAmount && <ConvertField />}
    </>
  );
};

export default ConverterPage;
