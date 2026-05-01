import React from 'react';
import styled from 'styled-components';
import { ActivityIcon } from '../Icons';
import { Flex } from '@strapi/design-system';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary100};
  color: ${({ theme }) => theme.colors.primary600};
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ItemLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

const ItemValue = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
`;

const ProgressTrack = styled.div`
  height: 7px;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 10px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: ${props => props.color};
  width: ${props => props.width}%;
  border-radius: 10px;
  box-shadow: 0 0 6px ${props => `${props.color}33`};
`;

const PercentageBadge = styled.span`
  font-size: 10px;
  font-weight: 800;
  padding: 1px 6px;
  border-radius: 4px;
  background: ${props => `${props.color}15`};
  color: ${props => props.color};
  border: 1px solid ${props => `${props.color}30`};
  margin-left: 8px;
  display: inline-flex;
  align-items: center;
  height: 18px;
`;

const StatusProgress = ({ title, items = {}, total }) => {
  // Convert object to array for mapping
  const dataEntries = Object.entries(items).map(([name, value]) => ({ name, value }));

  return (
    <Container>
      <Header>
        <IconBox>
          <ActivityIcon style={{ width: '14px', height: '14px' }} />
        </IconBox>
        <Title>{title}</Title>
      </Header>
      {dataEntries.map((item, index) => {
        const percentage = total > 0 ? (item.value / total) * 100 : 0;

        // Inline color mapping
        const barColor = {
          'Approved': '#10b981',
          'Active': '#10b981',
          'Online': '#10b981',
          'Pending': '#f59e0b',
          'Busy': '#f59e0b',
          'Blocked': '#ef4444',
          'Deleted': '#6b7280',
          'Offline': '#6b7280'
        }[item.name] || '#8b5cf6';

        return (
          <StatItem key={index}>
            <ItemHeader>
              <ItemLabel>{item.name}</ItemLabel>
              <Flex align="center">
                <ItemValue>{(item.value || 0).toLocaleString()} / {(total || 0).toLocaleString()}</ItemValue>
                <PercentageBadge color={barColor}>{Math.round(percentage)}%</PercentageBadge>
              </Flex>
            </ItemHeader>
            <ProgressTrack>
              <ProgressBar width={percentage} color={barColor} />
            </ProgressTrack>
          </StatItem>
        );
      })}
    </Container>
  );
};

export default StatusProgress;
