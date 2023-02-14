import { Container, Box } from '@mui/material';
import { Outlet } from 'react-router';
import NavBar from '../NavBar/NavBar';
import PageCard from '../PageCard/PageCard';
import styles from './PageLayout.module.css';

const PageLayout = (): JSX.Element => (
  <Container maxWidth='lg' className={styles.pageContainer}>
    <Box className={styles.pageBox}>
      <NavBar />
      <PageCard />
      <Outlet />
    </Box>
  </Container>
);

export default PageLayout;
