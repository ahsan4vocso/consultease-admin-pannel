import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Box, Flex, SingleSelect, SingleSelectOption, Loader } from '@strapi/design-system';
import PluginLayout from '../components/PluginLayout';
import { useAdminSummary, useAdminGraph } from '../hooks/dashboard';
import StatCard from '../components/stats/StatCard';
import AvailabilityDonut from '../components/stats/AvailabilityDonut';
import GrowthAreaChart from '../components/stats/GrowthAreaChart';
import StatusProgress from '../components/stats/StatusProgress';
import EconomyBalanceCard from '../components/stats/EconomyBalanceCard';
import StatsHeader from '../components/stats/StatsHeader';
import {
  UsersIcon,
  BriefcaseIcon,
  UserCheckIcon,
  ExperimentIcon,
  WalletIcon,
  ReferralIcon,
  TrendingUpIcon
} from '../components/Icons';
import OperationalBadges from '../components/stats/OperationalBadges';
import * as Style from '../components/dashboard/styles';

const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.col || 12}, 1fr);
  gap: 20px;
  width: 100%;
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const CustomGridItem = styled.div`
  grid-column: span ${props => props.col || 12};
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${props => (props.delayIndex || 0) * 0.1}s;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 32px 0 20px 0;
  
  &:first-of-type {
    margin-top: 0;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.neutral200};
  }
`;

const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const StatsDashboardPage = () => {
  const [filter, setFilter] = useState('monthly');

  const { data: summary, isLoading: isSummaryLoading } = useAdminSummary();
  const { data: graph, isLoading: isGraphLoading } = useAdminGraph(filter);


  const {
    total = 0,
    test = 0,
    experts = 0,
    clients = 0,
    expertsByStatus = {},
    clientsByStatus = {},
    availability = {},
    badges = {},
    pendingApprovals = 0,
    pendingVerifications = 0,
    wallet = { totalTopups: 0, referralDistributed: 0, platformEarnings: 0, economy: { audio: 0, video: 0 } }
  } = summary || {};

  const {
    meta = { labels: [] },
    growth = { experts: [], clients: [] },
    wallet: walletGraph = { trend: [] },
    sparklines = { users: [], experts: [], topups: [], referrals: [], earnings: [], test: [], total: [] }
  } = graph || {};

  return (
    <PluginLayout>
      <Style.DashboardContainer>
        <StatsHeader
          total={total}
          online={availability.Online || 0}
          filter={filter}
          onFilterChange={setFilter}
        />

        <Style.Main>
          <Flex direction="column" alignItems="stretch" gap={6}>
            <CustomGridItem col={12} delayIndex={1}>
              <OperationalBadges
                pendingApprovals={pendingApprovals}
                pendingVerifications={pendingVerifications}
              />
            </CustomGridItem>

            {/* User Overview Section */}
            <section>
              <SectionHeader>
                <SectionTitle>
                  <UsersIcon style={{ width: '16px', height: '16px' }} />
                  User Intelligence
                </SectionTitle>
              </SectionHeader>
              <CustomGrid col={12}>
                <CustomGridItem col={3} delayIndex={2}>
                  <StatCard
                    title="Total Users"
                    value={(total || 0).toLocaleString()}
                    chartData={sparklines.total}
                    labels={meta.labels}
                    color="#3b82f6"
                    Icon={UsersIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={3} delayIndex={3}>
                  <StatCard
                    title="Experts"
                    value={(experts || 0).toLocaleString()}
                    chartData={sparklines.experts}
                    labels={meta.labels}
                    color="#8b5cf6"
                    Icon={BriefcaseIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={3} delayIndex={4}>
                  <StatCard
                    title="Clients"
                    value={(clients || 0).toLocaleString()}
                    chartData={sparklines.users}
                    labels={meta.labels}
                    color="#10b981"
                    Icon={UserCheckIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={3} delayIndex={5}>
                  <StatCard
                    title="Test Users"
                    value={(test || 0).toLocaleString()}
                    chartData={sparklines.test}
                    labels={meta.labels}
                    color="#f59e0b"
                    Icon={ExperimentIcon}
                  />
                </CustomGridItem>
              </CustomGrid>
            </section>

            {/* Workflow & Status Row */}
            <CustomGrid col={12}>
              <CustomGridItem col={4} delayIndex={6}>
                <AvailabilityDonut
                  title="Expert Availability"
                  data={availability}
                  Icon={BriefcaseIcon}
                />
              </CustomGridItem>
              <CustomGridItem col={4} delayIndex={7}>
                <StatusProgress
                  title="Expert Status"
                  total={experts}
                  items={expertsByStatus}
                />
              </CustomGridItem>
              <CustomGridItem col={4} delayIndex={8}>
                <StatusProgress
                  title="Client Status"
                  total={clients}
                  items={clientsByStatus}
                />
              </CustomGridItem>
            </CustomGrid>

            {/* Growth & Verification section */}
            <CustomGrid col={12}>
              <CustomGridItem col={8} delayIndex={9}>
                <GrowthAreaChart
                  title="Registration Growth"
                  data={growth}
                  labels={meta.labels}
                  Icon={TrendingUpIcon}
                />
              </CustomGridItem>
              <CustomGridItem col={4} delayIndex={10}>
                <StatusProgress
                  title="Expert Badge Distribution"
                  total={experts}
                  items={badges}
                />
              </CustomGridItem>
            </CustomGrid>

            {/* Financial Overview */}
            <section>
              <SectionHeader>
                <SectionTitle>
                  <WalletIcon style={{ width: '16px', height: '16px' }} />
                  Financial Performance
                </SectionTitle>
              </SectionHeader>
              <CustomGrid col={12}>
                <CustomGridItem col={4} delayIndex={11}>
                  <StatCard
                    title="Total Wallet Topups"
                    value={`₹${(wallet.totalTopups || 0).toLocaleString()}`}
                    chartData={sparklines.topups}
                    labels={meta.labels}
                    color="#10b981"
                    Icon={WalletIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={4} delayIndex={12}>
                  <StatCard
                    title="Referral Expenses"
                    value={`₹${(wallet.referralDistributed || 0).toLocaleString()}`}
                    chartData={sparklines.referrals}
                    labels={meta.labels}
                    color="#f59e0b"
                    Icon={ReferralIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={4} delayIndex={13}>
                  <StatCard
                    title="Platform Earnings"
                    value={`₹${(wallet.platformEarnings || 0).toLocaleString()}`}
                    chartData={sparklines.earnings}
                    labels={meta.labels}
                    color="#3b82f6"
                    Icon={TrendingUpIcon}
                  />
                </CustomGridItem>
              </CustomGrid>
            </section>

            {/* Activity & Trends */}
            <CustomGrid col={12}>
              <CustomGridItem col={6} delayIndex={14}>
                <EconomyBalanceCard
                  economy={wallet.economy}
                />
              </CustomGridItem>
              <CustomGridItem col={6} delayIndex={15}>
                <GrowthAreaChart
                  title="Wallet Topup Trends"
                  data={{
                    experts: walletGraph.trend,
                    clients: walletGraph.trend.map(v => v * 0.8)
                  }}
                  labels={meta.labels}
                  Icon={WalletIcon}
                />
              </CustomGridItem>
            </CustomGrid>
          </Flex>
        </Style.Main>
      </Style.DashboardContainer>
    </PluginLayout>
  );
};

export default StatsDashboardPage;
