import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConverterProps, FormikConverterValues } from '../../types/interfaces';
import handleBlur from '../../utils/handleBlur';
import styles from './ConverterAmountInput.module.css';

const ConverterAmountInput = ({ formik, field }: ConverterProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <TextField
      disabled={formik.isSubmitting}
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
      label={t('elements.enterAmount')}
      size='small'
      name='amount'
      className={styles.converterAmount}
      value={formik.values[field as keyof FormikConverterValues]}
      onChange={formik.handleChange}
      onBlur={() => handleBlur(formik, field)}
    />
  );
};

export default ConverterAmountInput;
