import React from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { Typography } from '@strapi/design-system';
import { Expert as ExpertIcon, UniqueIcon as VerifyIcon } from '../Icons';

const pulse = keyframes`
  0% { transform: scale(0.9); box-shadow: 0 0 0 0 ${props => props.color}80; }
  70% { transform: scale(1.1); box-shadow: 0 0 0 4px ${props => props.color}00; }
  100% { transform: scale(0.9); box-shadow: 0 0 0 0 ${props => props.color}00; }
`;

const BadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: -2px;
  margin-bottom: 18px;
`;

const MiniBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${props => props.color}80;
  border-radius: 100px;
  transition: all 0.2s ease-in-out;
  user-select: none;
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};
  cursor: pointer;

  &:hover {
    background: ${({ theme, color }) => `${color}10`};
    border-color: ${props => props.color};
    transform: translateY(-1px);
  }
`;

const Nucleus = styled.div`
  width: 5px;
  height: 5px;
  background-color: ${props => props.color};
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const Count = styled.span`
  font-weight: 800;
  font-size: 13px;
  margin-left: 2px;
  color: ${({ theme }) => theme.colors.neutral800};
`;

const Label = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral600};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

import { Box } from '@strapi/design-system';

const GraphFilterContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.neutral100};
  padding: 2px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  margin-left: auto;
`;

const GraphFilterButton = styled.button`
  padding: 4px 12px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  background: ${props => props.active ? props.theme.colors.neutral0 : 'transparent'};
  color: ${props => props.active ? props.theme.colors.primary600 : props.theme.colors.neutral600};
  box-shadow: ${props => props.active ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'};
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.primary600};
  }
`;

const OperationalBadges = ({ pendingApprovals = 0, pendingVerifications = 0, filter = 'monthly', onFilterChange }) => {
  const theme = useTheme();

  const handleApprovalsClick = () => {
    window.open('/admin/content-manager/collection-types/api::expert-profile-approval.expert-profile-approval?page=1&pageSize=10&sort=createdAt:DESC&filters[$and][0][is_approved][$eq]=false', '_blank');
  };

  const handleVerificationsClick = () => {
    window.open('/admin/content-manager/collection-types/api::expert-verification.expert-verification?page=1&pageSize=100&sort=createdAt:DESC&filters[$and][0][is_form_submitted][$eq]=true', '_blank');
  };

  return (
    <Box display="flex" alignItems="center" width="100%">
      <BadgeRow style={{ marginBottom: 0, marginTop: 0 }}>
        <Typography variant="sigma" textColor="neutral500" style={{ marginRight: '4px' }}>
          Pending Expert:
        </Typography>

        <MiniBadge color="#f59e0b" onClick={handleApprovalsClick}>
          <Nucleus color="#f59e0b" />
          <ExpertIcon style={{ width: '14px', height: '14px', color: theme.colors.neutral800 }} />
          <Label>Approvals</Label>
          <Count>{pendingApprovals}</Count>
        </MiniBadge>

        <MiniBadge color="#3b82f6" onClick={handleVerificationsClick}>
          <Nucleus color="#3b82f6" />
          <VerifyIcon style={{ width: '14px', height: '14px', color: theme.colors.neutral800 }} />
          <Label>Verifications</Label>
          <Count>{pendingVerifications}</Count>
        </MiniBadge>
      </BadgeRow>

      <GraphFilterContainer>
        <Typography variant="sigma" textColor="neutral500" style={{ padding: '0 8px', fontSize: '10px' }}>
          Graph Period:
        </Typography>
        {['day wise', 'monthly', 'quarterly', 'yearly'].map((period) => (
          <GraphFilterButton
            key={period}
            active={filter === period}
            onClick={() => onFilterChange(period)}
          >
            {period === 'day wise' ? 'Day' : period.charAt(0).toUpperCase() + period.slice(1)}
          </GraphFilterButton>
        ))}
      </GraphFilterContainer>
    </Box>
  );
};

export default OperationalBadges;