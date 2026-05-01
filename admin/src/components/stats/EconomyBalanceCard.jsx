import React from 'react';
import styled, { useTheme } from 'styled-components';
import { VoiceCall, VideoCall, TrendingUpIcon, WalletIcon, ActivityIcon } from '../Icons';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.primary600};
`;

const BreakdownTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 90px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const TypeInfo = styled.div`
  display: flex;
  align-items: center;
`;

const IconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => `${props.color}15`};
  color: ${props => props.color};
`;

const MetricCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${props => props.align || 'flex-start'};
`;

const MetricSubLabel = styled.span`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.neutral500};
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
  letter-spacing: 0.02em;
`;

const MetricMainVal = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
`;

const PayIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const RatioLabel = styled.div`
  font-size: 10px;
  font-weight: 800;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MiniTrack = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 2px;
  overflow: hidden;
`;

const MiniBar = styled.div`
  height: 100%;
  width: ${props => props.percentage}%;
  background: #10b981;
  border-radius: 2px;
`;

const FooterSummary = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;

const SummaryGrid = styled.div`
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 12px;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
  }
`;

const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-align: center;
`;

const SummaryLabel = styled.div`
  font-size: 8px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

const SummaryVal = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: ${props => props.accent || props.theme.colors.neutral800};
`;

const formatCurrency = (val) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const EconomyBalanceCard = ({ economy }) => {
  const voice = economy?.voiceCall || { clientSpend: 0, expertReceived: 0, platformEarning: 0 };
  const video = economy?.videoCall || { clientSpend: 0, expertReceived: 0, platformEarning: 0 };

  const totals = {
    spent: voice.clientSpend + video.clientSpend,
    earned: voice.expertReceived + video.expertReceived,
    commission: voice.platformEarning + video.platformEarning
  };

  const renderRow = (label, data, icon, color) => {
    return (
      <TableRow>
        <TypeInfo>
          <IconBox color={color}>
            {icon}
          </IconBox>
        </TypeInfo>

        <MetricCell>
          <MetricSubLabel>Client Spend</MetricSubLabel>
          <MetricMainVal>{formatCurrency(data.clientSpend)}</MetricMainVal>
        </MetricCell>

        <MetricCell>
          <MetricSubLabel>Expert Receive</MetricSubLabel>
          <MetricMainVal>{formatCurrency(data.expertReceived)}</MetricMainVal>
        </MetricCell>

        <MetricCell align="flex-end">
          <MetricSubLabel>Co. Earning</MetricSubLabel>
          <MetricMainVal style={{ color: '#3b82f6' }}>{formatCurrency(data.platformEarning)}</MetricMainVal>
        </MetricCell>
      </TableRow>
    );
  };

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title>
          <IconWrapper>
            <ActivityIcon style={{ width: 18, height: 18 }} />
          </IconWrapper>
          Revenue & Payout Distribution
        </Title>
      </div>

      <BreakdownTable>
        {renderRow(
          'Voice Call',
          voice,
          <VoiceCall style={{ width: 14 }} />,
          '#3b82f6'
        )}
        {renderRow(
          'Video Call',
          video,
          <VideoCall style={{ width: 14 }} />,
          '#10b981'
        )}
      </BreakdownTable>

      <FooterSummary>
        <SummaryGrid>
          <SummaryItem>
            <SummaryLabel>
              <WalletIcon style={{ width: 10 }} />
              Total Client Spend
            </SummaryLabel>
            <SummaryVal>{formatCurrency(totals.spent)}</SummaryVal>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>
              <TrendingUpIcon style={{ width: 10 }} />
              Total Expert Receive
            </SummaryLabel>
            <SummaryVal accent="#10b981">{formatCurrency(totals.earned)}</SummaryVal>
          </SummaryItem>

          <SummaryItem>
            <SummaryLabel>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
              Total Co. Earning
            </SummaryLabel>
            <SummaryVal accent="#3b82f6">{formatCurrency(totals.commission)}</SummaryVal>
          </SummaryItem>
        </SummaryGrid>
      </FooterSummary>
    </Container>
  );
};

export default EconomyBalanceCard;
