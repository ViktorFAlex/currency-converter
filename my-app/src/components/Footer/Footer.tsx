import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className={styles.footer}>
      <span>{t('elements.footer')}</span>
      <a
        href='https://exchangerate.host/'
        rel='noreferrer'
        target='_blank'
        className={styles.footerLink}
      >
        {t('elements.footerLink')}
      </a>
    </div>
  );
};
export default Footer;
