import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { RouterProvider } from 'react-router';
import router from './routes/Router'
import { NotificationProvider } from './components/notifications/NotificationProvider';
import { NotifyingErrorBoundary } from './components/notifications/ErrorBoundary';

function App() {

  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  return (
    <ThemeProvider theme={theme}>
      <NotificationProvider>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <NotifyingErrorBoundary>
            <RouterProvider router={router} />
          </NotifyingErrorBoundary>
        </RTL>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App
