import ReactDOM from 'react-dom/client';
import './assets/index.css';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(await init());
};

app();
