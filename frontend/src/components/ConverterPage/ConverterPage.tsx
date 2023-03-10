import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box } from '@mui/material';
import { AppDispatch } from '../../slices/index';
import { selectCurrenciesNames } from '../../slices/currenciesSlice';
import { fetchConvert, selectConverterState } from '../../slices/converterSlice';
import styles from './ConverterPage.module.css';
import ConverterField from '../ConverterField/ConverterField';
import ConverterAutocomplete from '../ConverterAutocomplete/ConverterAutocomplete';
import ConverterSwitchButton from '../ConverterSwitchButton/ConverterSwitchButton';
import ConverterAmountInput from '../ConverterAmountInput/ConverterAmountInput';
import { useTranslation } from 'react-i18next';

const ConverterPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const currencies = useSelector(selectCurrenciesNames);

  const validationSchema = Yup.object().shape({
    from: Yup.string()
      .required(`${t('validation.chooseAnyCurrency')}`)
      .oneOf(currencies, `${t('validation.invalidFormat')}`),
    to: Yup.string()
      .required(`${t('validation.chooseAnyCurrency')}`)
      .oneOf(currencies, `${t('validation.invalidFormat')}`),
    amount: Yup.string()
      .required(`${t('validation.amountRequired')}`)
      .matches(/\d+/, `${t('validation.invalidFormat')}`),
  });

  const { amount } = useSelector(selectConverterState);

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      amount: '',
    },
    onSubmit: async (data) => {
      try {
        await dispatch(fetchConvert(data));
      } catch (e) {
        if (e instanceof Error) {
          throw e;
        }
      }
    },
    validationSchema,
  });

  return (
    <section aria-label='converter-page' className={styles.converterContainer}>
      <Box
        component='form'
        className={styles.converterForm}
        noValidate
        onSubmit={formik.handleSubmit}
      >
        <div className={styles.currenciesSelect}>
          <ConverterAutocomplete formik={formik} field={'from'} />
          <ConverterSwitchButton formik={formik} />
          <ConverterAutocomplete formik={formik} field={'to'} />
        </div>
        <ConverterAmountInput formik={formik} field={'amount'} />

        <Button type='submit' variant='contained' className={styles.converterBtn}>
          {t('elements.convert')}
        </Button>
      </Box>
      {!!amount && <ConverterField />}
    </section>
  );
};

export default ConverterPage;
