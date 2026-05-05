import { Page } from '@strapi/strapi/admin';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from './HomePage';
import ReferralAnalyticsPage from './ReferralAnalyticsPage';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

import StatsDashboardPage from './StatsDashboardPage';
import SettingsPage from './SettingsPage';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer position="top-right" autoClose={4000} hideProgressBar={false} style={{ width: '450px', fontSize: '16px' }} />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="referral-analytics" element={<ReferralAnalyticsPage />} />
        <Route path="statistics" element={<StatsDashboardPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Page.Error />} />
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
