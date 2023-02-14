import { Box, Toolbar, AppBar, Typography } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import styles from './Header.module.css';

const Header = (): JSX.Element => (
  <Box>
    <AppBar position='static' color='secondary'>
      <Toolbar className={styles.headerToolbar}>
        <CurrencyExchangeIcon className={styles.headerIcon} />
        <Typography variant='h6' component='div'>
          Currency Converter and exchange rates
        </Typography>
        <p className={styles.p}>Hey</p>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;
