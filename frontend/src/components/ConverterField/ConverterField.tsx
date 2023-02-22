import { Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import codes from '../../data/codes';
import routes from '../../routes';
import { selectConverterState } from '../../slices/converterSlice';
import styles from './ConverterField.module.css';

const ConvertField = (): JSX.Element => {
  const { t } = useTranslation();
  const { from, to, amount, result } = useSelector(selectConverterState);

  return (
    <Card variant='outlined' className={styles.convertFieldOutput}>
      <div className={styles.convertFieldFrom}>
        <img
          width='40'
          className={styles.convertFieldIcon}
          src={routes.flagRoute(codes[from])}
          alt=''
        />
        {amount} {t(`countries.${from}`)} =
      </div>
      <div className={styles.convertFieldTo}>
        <img
          width='40'
          className={styles.convertFieldIcon}
          src={routes.flagRoute(codes[to])}
          alt=''
        />
        {result} {t(`countries.${to}`)}
      </div>
    </Card>
  );
};
export default ConvertField;
