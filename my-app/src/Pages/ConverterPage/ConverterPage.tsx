import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Box } from '@mui/material';
import { AppDispatch } from '../../slices/index';
import { selectCurrenciesNames } from '../../slices/currenciesSlice';
import { fetchConvert, selectConverterState } from '../../slices/converterSlice';
import styles from './ConverterPage.module.css';
import ConverterField from '../../components/ConverterField/ConverterField';
import ConverterAutocomplete from '../../components/ConverterAutocomplete/ConverterAutocomplete';
import ConverterSwitchButton from '../../components/ConverterSwitchButton/ConverterSwitchButton';
import ConverterAmountInput from '../../components/ConverterAmountInput/ConverterAmountInput';
import { useTranslation } from 'react-i18next';

const ConverterPage = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const currencies = useSelector(selectCurrenciesNames);

  const validationSchema = Yup.object().shape({
    from: Yup.string().required('Required field!').oneOf(currencies, 'choose any Option'),
    to: Yup.string().required('Required field!').oneOf(currencies, 'choose any Option'),
    amount: Yup.string().matches(/\d+/, 'Incorrect value').required('Required field!'),
  });

  const { amount } = useSelector(selectConverterState);

  const formik = useFormik({
    initialValues: {
      from: '',
      to: '',
      amount: '',
    },
    onSubmit: async (data) => {
      await dispatch(fetchConvert(data));
    },
    validationSchema,
  });

  return (
    <>
      <Box
        component='form'
        className={styles.converterContainer}
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
    </>
  );
};

export default ConverterPage;
