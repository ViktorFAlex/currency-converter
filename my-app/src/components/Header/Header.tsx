import { Box, Toolbar, AppBar, Typography, Button } from '@mui/material';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import styles from './Header.module.css';
import { useTranslation } from 'react-i18next';

const Header = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { resolvedLanguage } = i18n;
  console.log(resolvedLanguage);
  const handleClick = () => i18n.changeLanguage(resolvedLanguage === 'en' ? 'ru' : 'en');
  return (
    <Box className={styles.headerBox}>
      <AppBar position='static' color='secondary'>
        <Toolbar className={styles.headerToolbar}>
          <MonetizationOnIcon className={styles.headerIcon} />
          <Typography variant='h6' component='div' className={styles.headerTitle}>
            {t('elements.headerTitle')}
          </Typography>
          <Button onClick={handleClick} className={styles.lngSwitch}>
            Hey
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default Header;
