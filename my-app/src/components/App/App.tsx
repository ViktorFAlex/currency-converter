import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import RatesPage from '../../pages/RatesPage/RatesPage';
import ConverterPage from '../../pages/ConverterPage/ConverterPage';
import PageLayout from '../PageLayout/PageLayout';
import store from '../../slices/index';
import Footer from '../Footer/Footer';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<PageLayout />}>
            <Route index element={<ConverterPage />} />
            <Route path={'/rates'} element={<RatesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
