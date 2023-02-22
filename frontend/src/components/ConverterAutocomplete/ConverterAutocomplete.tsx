import { Autocomplete, TextField, Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import codes from '../../data/codes';
import { selectCurrenciesNames } from '../../slices/currenciesSlice';
import { ConverterProps, FormikConverterValues } from '../../types/interfaces';
import buildOutput from '../../utils/buildOutput';
import handleBlur from '../../utils/handleBlur';
import routes from '../../routes';
import styles from './ConverterAutocomplete.module.css';

const ConverterAutocomplete = ({ formik, field }: ConverterProps): JSX.Element => {
  const currencies = useSelector(selectCurrenciesNames);
  const { t } = useTranslation();
  const fieldStyle = field === 'from' ? 'converterLeft' : 'converterRight';

  return (
    <Autocomplete
      {...{ options: currencies }}
      disabled={formik.isSubmitting}
      disablePortal
      autoHighlight
      value={formik.values[field as keyof FormikConverterValues]}
      className={`${styles.converterAutocomplete} ${styles[fieldStyle]}`}
      getOptionLabel={buildOutput(t)}
      isOptionEqualToValue={(option, value) => value === option || value === ''}
      onChange={(e, value) => formik.setFieldValue(field, value)}
      onBlur={() => handleBlur(formik, field)}
      renderInput={(params) => (
        <TextField
          {...params}
          variant='filled'
          color='success'
          size='small'
          error={
            !!formik.errors[field as keyof FormikConverterValues] &&
            formik.touched[field as keyof FormikConverterValues]
          }
          helperText={
            (formik.touched[field as keyof FormikConverterValues] &&
              formik.errors[field as keyof FormikConverterValues]) ||
            ' '
          }
          FormHelperTextProps={{ className: styles.helperText }}
          sx={{ input: { cursor: 'pointer' } }}
          label={t('elements.userLabel')}
          InputProps={{
            ...params.InputProps,
            startAdornment: formik.values[field as keyof FormikConverterValues] ? (
              <img
                width='20'
                src={routes.flagRoute(codes[formik.values[field as keyof FormikConverterValues]])}
                alt=''
              />
            ) : null,
          }}
        />
      )}
      renderOption={(props, option) => (
        <Box component='li' key={option} sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img loading='lazy' width='20' src={routes.flagRoute(codes[option])} alt='' />
          {buildOutput(t)(option)}
        </Box>
      )}
    />
  );
};

export default ConverterAutocomplete;
