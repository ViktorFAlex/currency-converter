import { Box, Toolbar, AppBar, Typography } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import styles from './Header.module.css';

const Header = (): JSX.Element => (
  <Box className={styles.headerBox}>
    <AppBar position='static' color='secondary'>
      <Toolbar className={styles.headerToolbar}>
        <MonetizationOnIcon className={styles.headerIcon} />
        <Typography variant='h6' component='div' className={styles.headerTitle}>
          Currency converter and exchange rates
        </Typography>
        <p className={styles.p}>Hey</p>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Header;
