import axios from 'axios';
import { Card } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectConvertState } from '../../slices/convertSlice';
import routes from '../../routes';
import styles from './ConvertField.module.css';
import countries from '../../Data/data';
const ConvertField = (): JSX.Element => {
  const { from, to, amount, result } = useSelector(selectConvertState);
  return (
    <Card variant='outlined' className={styles.convertOutput}>
      <div className={styles.convertFrom}>
        <img
          width='40'
          className={styles.convertImg}
          src={routes.flagRoute(countries[from].code)}
          alt=''
        />
        {amount} {countries[from].country} {countries[from].currency} =
      </div>
      <div className={styles.convertTo}>
        <img
          width='40'
          className={styles.convertImg}
          src={routes.flagRoute(countries[to].code)}
          alt=''
        />{' '}
        {result} {countries[to].country} {countries[to].currency}
      </div>
    </Card>
  );
};
export default ConvertField;
