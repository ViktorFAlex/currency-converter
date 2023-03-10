import { Button } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { ConverterFormikProps } from '../../types/interfaces';
import styles from './ConverterSwitchButton.module.css';
import { useTranslation } from 'react-i18next';

const ConverterSwitchButton = ({ formik }: ConverterFormikProps): JSX.Element => {
  const { t } = useTranslation();

  const switchCurrencies = (): void => {
    const { from, to } = formik.values;
    formik.setFieldValue('from', to);
    formik.setFieldValue('to', from);
  };

  return (
    <Button
      variant='outlined'
      type='button'
      startIcon={<CurrencyExchangeIcon />}
      onClick={switchCurrencies}
      className={styles.converterSwitchBtn}
      sx={{ fontSize: '0.8em', marginBottom: '20px' }}
    >
      {t('elements.switchCurrencies')}
    </Button>
  );
};

export default ConverterSwitchButton;
