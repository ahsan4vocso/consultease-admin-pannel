import { Main, Box, Typography } from '@strapi/design-system';

import PluginLayout from '../components/PluginLayout';

import ReferralDashboard from '../components/referral/ReferralDashboard';

const ReferralAnalyticsPage = () => {
  return (
    <PluginLayout>
      <ReferralDashboard />
    </PluginLayout>
  );
};

export default ReferralAnalyticsPage;
