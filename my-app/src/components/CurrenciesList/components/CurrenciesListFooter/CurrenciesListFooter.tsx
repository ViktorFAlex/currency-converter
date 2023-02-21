import { Pagination } from '@mui/material';
import { PageHandler, CurrenciesListFooterProps } from '../../../../types/interfaces';
import styles from './CurrenciesListFooter.module.css';

const CurrenciesListFooter = ({ page, setPage, count }: CurrenciesListFooterProps): JSX.Element => {
  const handleChange: PageHandler = (event, page) => setPage(page);

  return (
    <div className={styles.currenciesListFooter}>
      <Pagination
        page={page}
        color='secondary'
        onChange={handleChange}
        count={count}
        shape='rounded'
        siblingCount={1}
        boundaryCount={1}
      />
    </div>
  );
};

export default CurrenciesListFooter;
