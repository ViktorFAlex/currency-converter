import { Card } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectConvertState } from '../../slices/convertSlice';
import routes from '../../routes';
import styles from './ConvertField.module.css';
import codes from '../../data/codes';

const ConvertField = (): JSX.Element => {
  const { t } = useTranslation();
  const { from, to, amount, result } = useSelector(selectConvertState);
  return (
    <Card variant='outlined' className={styles.convertOutput}>
      <div className={styles.convertFrom}>
        <img width='40' className={styles.convertImg} src={routes.flagRoute(codes[from])} alt='' />
        {amount} {t(`countries.${from}`)} =
      </div>
      <div className={styles.convertTo}>
        <img width='40' className={styles.convertImg} src={routes.flagRoute(codes[to])} alt='' />
        {result} {t(`countries.${to}`)}
      </div>
    </Card>
  );
};
export default ConvertField;
