import { Card, CardContent, Typography } from '@mui/material';
import styles from './PageCard.module.css';

const PageCard = (): JSX.Element => (
  <Card className={styles.pageCard}>
    <CardContent>
      <Typography variant='h3' color='text.secondary' gutterBottom>
        Currency converter
      </Typography>
      <Typography variant='body2'>
        Here you can choose and calculate from any currency to another
      </Typography>
    </CardContent>
  </Card>
);

export default PageCard;
