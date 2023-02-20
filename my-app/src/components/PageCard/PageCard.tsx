import { Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';
import styles from './PageCard.module.css';

const PageCard = (): JSX.Element => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const page = pathname === '/' ? 'converter' : 'rates';

  return (
    <Card className={styles.pageCard}>
      <CardContent className={styles.pageCardContent}>
        <Typography
          variant='h3'
          color='text.secondary'
          gutterBottom
          className={styles.pageCardTitle}
        >
          {t(`elements.${page}Title`)}
        </Typography>
        <Typography variant='body2' className={styles.pageCardDescription}>
          {t(`elements.${page}Description`)}
        </Typography>
      </CardContent>
    </Card>
  );
};
export default PageCard;
