import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RatesPage from '../../Pages/RatesPage/RatesPage';
import ConverterPage from '../../Pages/ConverterPage/ConverterPage';
import PageLayout from '../PageLayout/PageLayout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path={'/'} element={<PageLayout />}>
        <Route index element={<ConverterPage />} />
        <Route path={'/rates'} element={<RatesPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
