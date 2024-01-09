import { createRoot } from 'react-dom/client';
import axios from 'axios';
import App from './App';

const isProduction = process.env.NODE_ENV === 'production';

(async () => {
  const devBaseUrl = '/local/backoffice';
  const container = document.getElementById('root') as HTMLDivElement;
  const defaultHeaders: { [key: string]: string } = {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json'
  };

  axios.defaults.headers.common = defaultHeaders;

  if (!isProduction) {
    axios.defaults.baseURL = devBaseUrl;
  } else {
    axios.defaults.baseURL = '/';
  }

  const root = createRoot(container);
  root.render(<App />);
})();
