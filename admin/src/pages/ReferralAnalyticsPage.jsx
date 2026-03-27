import PluginLayout from '../components/PluginLayout';
import UserReferralTable from '../components/referral/UserReferralTable';
import StatsSection from '../components/referral/StatsSection';
import DashboardHeader from '../components/referral/DashboardHeader';
import * as Style from '../components/referral/styles';

const ReferralAnalyticsPage = () => {
  return (
    <PluginLayout>
        <Style.DashboardContainer>
          <DashboardHeader />

          <Style.DashboardMain>
            <Style.MainContent>
              <StatsSection />
              <Style.TableColumn>
                <UserReferralTable />
              </Style.TableColumn>
            </Style.MainContent>
          </Style.DashboardMain>
          
        </Style.DashboardContainer>
    </PluginLayout>
  );
};

export default ReferralAnalyticsPage;