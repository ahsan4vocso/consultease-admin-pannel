import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { getTranslation } from '../utils/getTranslation';
import LiveCallsDashboard from '../components/dashboard/LiveCallsDashboard';
import PluginLayout from '../components/PluginLayout';

const queryClient = new QueryClient();

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <PluginLayout>
      <Main>
        <QueryClientProvider client={queryClient}>
          <LiveCallsDashboard />
        </QueryClientProvider>
      </Main>
    </PluginLayout>
  );
};

export { HomePage };
