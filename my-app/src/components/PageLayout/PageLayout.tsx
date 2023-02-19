import { Container, Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router';
import NavBar from '../NavBar/NavBar';
import PageCard from '../PageCard/PageCard';
import { fetchCurrencies, selectAll } from '../../slices/currenciesSlice';
import { AppDispatch } from '../../slices';
import styles from './PageLayout.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

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
