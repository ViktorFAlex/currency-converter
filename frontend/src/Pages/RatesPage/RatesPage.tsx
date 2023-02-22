import { useTranslation } from 'react-i18next';
import CurrenciesList from '../../components/CurrenciesList/CurrenciesList';
import RatesAutocomplete from '../../components/RatesAutocomplete/RatesAutocomplete';
import styles from './RatesPage.module.css';

const RatesPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={styles.ratesPageTable} aria-label='rates-page'>
      <div className={styles.ratesPageHeader}>
        <div className={styles.ratesPageHeaderDescription}>
          <div className={`${styles.ratesPageHeaderCell} ${styles.cellLeft}`}>
            {t('elements.convert')}
          </div>
          <span className={`${styles.ratesPageHeaderCell} ${styles.cellRight}`}>
            {t('elements.amount')}
          </span>
        </div>
        <RatesAutocomplete />
      </div>
      <CurrenciesList />
    </section>
  );
};

export default RatesPage;
