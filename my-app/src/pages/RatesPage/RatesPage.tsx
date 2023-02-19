import styles from './RatesPage.module.css';
import CurrenciesList from '../../components/CurrenciesList/CurrenciesList';
import CustomAutocomplete from '../../components/CustomAutocomplete/CustomAutocomplete';

const RatesPage = (): JSX.Element => {
  return (
    <div className={styles.tableContainer} aria-label='rates-table'>
      <section className={styles.ratesTable}>
        <div className={styles.gridHeader}>
          <div className={styles.headers}>
            <div className={`${styles.headerCell} ${styles.headerCellLeft}`}>Currency</div>
            <span className={`${styles.headerCell} ${styles.headerCellRight}`}>Amount</span>
          </div>
          <CustomAutocomplete />
        </div>
        <CurrenciesList />
      </section>
    </div>
  );
};

export default RatesPage;
