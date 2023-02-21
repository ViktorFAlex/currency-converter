import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import styles from './HeaderButton.module.css';
import routes from '../../../../routes';

const HeaderButton = (): JSX.Element => {
  const { t, i18n } = useTranslation();
  const { resolvedLanguage } = i18n;

  const newLanguage = resolvedLanguage === 'en' ? 'ru' : 'en';
  const newFlagIcon = resolvedLanguage === 'en' ? 'ru' : 'gb';

  const handleClick = () => i18n.changeLanguage(newLanguage);

  return (
    <Button
      onClick={handleClick}
      className={styles.headerLngSwitch}
      startIcon={<img width='20' src={routes.flagRoute(newFlagIcon)} alt='' />}
    >
      <span className={styles.headerLngName}>{t('elements.lang')}</span>
    </Button>
  );
};

export default HeaderButton;
