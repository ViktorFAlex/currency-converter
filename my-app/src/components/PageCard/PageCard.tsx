import { Card, CardContent, Typography } from '@mui/material';
import styles from './PageCard.module.css';

const PageCard = (): JSX.Element => (
  <Card className={styles.pageCard}>
    <CardContent className={styles.pageCardContent}>
      <Typography variant='h3' color='text.secondary' gutterBottom className={styles.pageCardTitle}>
        Currency converter
      </Typography>
      <Typography variant='body2' className={styles.pageCardDescription}>
        Here you can choose and calculate from any currency to another
      </Typography>
    </CardContent>
  </Card>
);

export default PageCard;
