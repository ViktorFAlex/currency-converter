import { Container, Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import { AppDispatch } from '../../slices';
import { fetchCurrencies, selectAll } from '../../slices/currenciesSlice';
import Header from '../Header/Header';
import NavBar from '../NavBar/NavBar';
import PageCard from '../PageCard/PageCard';
import Footer from '../Footer/Footer';
import styles from './PageLayout.module.css';

const PageLayout = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const rates = useSelector(selectAll);

  return (
    <Container maxWidth='lg' className={styles.pageContainer}>
      <Box className={styles.pageBox}>
        <Header />
        <NavBar />
        <PageCard />
        {!!rates.length && <Outlet />}
        <Footer />
      </Box>
    </Container>
  );
};
export default PageLayout;
