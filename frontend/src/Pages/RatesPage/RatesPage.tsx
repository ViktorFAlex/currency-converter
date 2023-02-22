import { useTranslation } from 'react-i18next';
import CurrenciesList from '../../components/CurrenciesList/CurrenciesList';
import RatesAutocomplete from '../../components/RatesAutocomplete/RatesAutocomplete';
import styles from './RatesPage.module.css';

const RatesPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className={styles.ratesPageContainer} aria-label='rates-table'>
      <section className={styles.ratesPageTable}>
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
    </div>
  );
};

export default RatesPage;
