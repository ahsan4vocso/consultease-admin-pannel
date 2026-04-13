import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from '@strapi/design-system';
import PluginLayout from '../components/PluginLayout';
import { dummyStats } from '../utils/dummyStats';
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
import * as Style from '../components/dashboard/styles';

const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.col || 12}, 1fr);
  gap: 20px;
  width: 100%;
`;

const CustomGridItem = styled.div`
  grid-column: span ${props => props.col || 12};
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
  const { userSummary, growth, wallet, callActivity, sparklines } = dummyStats;

  return (
    <PluginLayout>
      <Style.DashboardContainer>
        <StatsHeader />

        <Style.Main>
          <Flex direction="column" alignItems="stretch" gap={6}>
            {/* User Overview Section */}
            <section>
              <SectionHeader>
                <SectionTitle>
                  <UsersIcon style={{ width: '16px', height: '16px' }} />
                  User Intelligence
                </SectionTitle>
              </SectionHeader>
              <CustomGrid col={12}>
                <CustomGridItem col={3}>
                  <StatCard
                    title="Total Users"
                    value={(userSummary.total - userSummary.test).toLocaleString()}
                    trend="12.5%"
                    chartData={sparklines.users}
                    color="#3b82f6"
                    Icon={UsersIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={3}>
                  <StatCard
                    title="Experts"
                    value={userSummary.experts.toLocaleString()}
                    trend="8.2%"
                    chartData={sparklines.experts}
                    color="#8b5cf6"
                    Icon={BriefcaseIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={3}>
                  <StatCard
                    title="Clients"
                    value={userSummary.clients.toLocaleString()}
                    trend="15.1%"
                    chartData={sparklines.users.map(d => ({ ...d, value: d.value * 0.7 }))}
                    color="#10b981"
                    Icon={UserCheckIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={3}>
                  <StatCard
                    title="Test Users"
                    value={userSummary.test.toLocaleString()}
                    trend="-2.4%"
                    chartData={sparklines.users.map((d, i) => ({ name: d.name, value: [80, 75, 78, 70, 72, 68, 64][i] }))}
                    color="#f59e0b"
                    Icon={ExperimentIcon}
                  />
                </CustomGridItem>
              </CustomGrid>
            </section>

            {/* Workflow & Status Row */}
            <CustomGrid col={12}>
              <CustomGridItem col={4}>
                <AvailabilityDonut
                  title="Expert Availability"
                  data={userSummary.availability}
                  Icon={BriefcaseIcon}
                />
              </CustomGridItem>
              <CustomGridItem col={4}>
                <StatusProgress
                  title="Expert Status"
                  total={userSummary.experts}
                  items={userSummary.expertsByStatus}
                />
              </CustomGridItem>
              <CustomGridItem col={4}>
                <StatusProgress
                  title="Client Status"
                  total={userSummary.clients}
                  items={userSummary.clientsByStatus}
                />
              </CustomGridItem>
            </CustomGrid>

            {/* Growth & Verification section */}
            <CustomGrid col={12}>
              <CustomGridItem col={8}>
                <GrowthAreaChart
                  title="Registration Growth"
                  data={growth}
                  Icon={TrendingUpIcon}
                />
              </CustomGridItem>
              <CustomGridItem col={4}>
                <StatusProgress
                  title="Expert Badge Distribution"
                  total={userSummary.experts}
                  items={userSummary.badges.map(b => ({
                    name: b.name,
                    value: b.count,
                    color: '#8b5cf6'
                  }))}
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
                <CustomGridItem col={4}>
                  <StatCard
                    title="Total Wallet Topups"
                    value={`₹${wallet.totalTopups.toLocaleString()}`}
                    trend="22.4%"
                    chartData={sparklines.topups}
                    color="#10b981"
                    Icon={WalletIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={4}>
                  <StatCard
                    title="Referral Expenses"
                    value={`₹${wallet.referralDistributed.toLocaleString()}`}
                    trend="5.8%"
                    chartData={sparklines.referrals}
                    color="#f59e0b"
                    Icon={ReferralIcon}
                  />
                </CustomGridItem>
                <CustomGridItem col={4}>
                  <StatCard
                    title="Platform Earnings"
                    value={`₹${wallet.platformEarnings.toLocaleString()}`}
                    trend="18.2%"
                    chartData={sparklines.topups.map(d => ({ ...d, value: d.value * 0.15 }))}
                    color="#3b82f6"
                    Icon={TrendingUpIcon}
                  />
                </CustomGridItem>
              </CustomGrid>
            </section>

            {/* Activity & Trends */}
            <CustomGrid col={12}>
              <CustomGridItem col={6}>
                <EconomyBalanceCard
                  economy={wallet.economy}
                />
              </CustomGridItem>
              <CustomGridItem col={6}>
                <GrowthAreaChart
                  title="Wallet Transaction Trends"
                  data={wallet.trend.map(t => ({
                    date: t.date,
                    experts: t.amount,
                    clients: t.amount * 0.8
                  }))}
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
