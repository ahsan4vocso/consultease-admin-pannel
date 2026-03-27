import { ReferralLogo } from '../Icons';
import * as Style from './styles';
import { useReferralStats } from '../../hooks/referral';

const DashboardHeader = () => {
  const { data: stats } = useReferralStats();
  const d = stats || {};
  
  const totalRefs = d.referrals?.total || 0;
  const conversions = d.referral_conversion?.total || 0;
  const convRate = d.referral_conversion?.percentage || 0;

  return (
    <Style.Header>
      <Style.HeaderLeft>
        <Style.IconBox>
          <ReferralLogo style={{ width: '38px', height: '38px' }} />
        </Style.IconBox>
        <Style.HeaderTitleBox>
          <Style.HeaderTitle>Referral Analytics</Style.HeaderTitle>
          <Style.HeaderSubtitle>
            Monitor and analyze referral performance across the network
          </Style.HeaderSubtitle>
          <Style.HeaderMetaText>
            {totalRefs} total referrals • {conversions} conversions ({convRate}%)
          </Style.HeaderMetaText>
        </Style.HeaderTitleBox>
      </Style.HeaderLeft>
      <Style.HeaderRight>
        {/* Reservation for future filters like Call Analytics */}
      </Style.HeaderRight>
    </Style.Header>
  );
};

export default DashboardHeader;
