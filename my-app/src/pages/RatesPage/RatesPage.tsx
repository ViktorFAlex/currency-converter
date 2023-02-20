import styles from './RatesPage.module.css';
import CurrenciesList from '../../components/CurrenciesList/CurrenciesList';
import CustomAutocomplete from '../../components/CustomAutocomplete/CustomAutocomplete';
import { useTranslation } from 'react-i18next';

const RatesPage = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={styles.tableContainer} aria-label='rates-table'>
      <section className={styles.ratesTable}>
        <div className={styles.gridHeader}>
          <div className={styles.headers}>
            <div className={`${styles.headerCell} ${styles.headerCellLeft}`}>
              {t('elements.convert')}
            </div>
            <span className={`${styles.headerCell} ${styles.headerCellRight}`}>
              {t('elements.amount')}
            </span>
          </div>
          <CustomAutocomplete />
        </div>
        <CurrenciesList />
      </section>
    </div>
  );
};

export default RatesPage;
