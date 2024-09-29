import ReactDOM from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import './index.css';
import ErrorBoundary from './Error.Boundary';
import ContextProvider from './contexts';
import { ToastContainer } from 'react-toastify';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorBoundary>
    <Router>
      <ContextProvider>
        <App />
        <ToastContainer/>
      </ContextProvider>
    </Router>
  </ErrorBoundary>
);
