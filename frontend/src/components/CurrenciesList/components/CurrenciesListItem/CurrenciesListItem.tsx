import { Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import codes from '../../../../data/codes';
import routes from '../../../../routes';
import { AppDispatch } from '../../../../slices';
import { fetchCurrencies, actions } from '../../../../slices/currenciesSlice';
import { CurrenciesListBodyProps } from '../../../../types/interfaces';
import styles from './CurrenciesListItem.module.css';

const CurrenciesListBody = ({ currency, value }: CurrenciesListBodyProps): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const handleClick = (currency: string) => (): void => {
    dispatch(fetchCurrencies(currency));
    dispatch(actions.setCurrency(currency));
  };

  return (
    <div className={styles.currenciesListRow} key={currency}>
      <div className={`${styles.currenciesListCell} ${styles.cellLeft}`}>
        <img loading='lazy' width='20' height='15' src={routes.flagRoute(codes[currency])} alt='' />
        <Tooltip title={`${t(`countries.${currency}`)}`} disableInteractive followCursor arrow>
          <button className={styles.currenciesListBtn} onClick={handleClick(currency)}>
            <Typography noWrap className={styles.currenciesListElement}>
              {t(`countries.${currency}`)}
            </Typography>
          </button>
        </Tooltip>
      </div>
      <Tooltip title={`${value}`} disableInteractive followCursor arrow>
        <div className={`${styles.currenciesListCell} ${styles.cellRight}`}>
          <Typography noWrap>{value}</Typography>
        </div>
      </Tooltip>
    </div>
  );
};

export default CurrenciesListBody;
