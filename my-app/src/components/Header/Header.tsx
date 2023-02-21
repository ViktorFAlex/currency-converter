import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box, Toolbar, AppBar, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderButton from './components/HeaderButton/HeaderButton';
import styles from './Header.module.css';

const Header = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Box className={styles.headerBox}>
      <AppBar position='static' color='secondary'>
        <Toolbar className={styles.headerToolbar}>
          <MonetizationOnIcon className={styles.headerIcon} />
          <Typography variant='h6' component='div' className={styles.headerTitle}>
            {t('elements.headerTitle')}
          </Typography>
          <HeaderButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
