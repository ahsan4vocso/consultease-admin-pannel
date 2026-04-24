import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex, Typography } from '@strapi/design-system';
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
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid ${props => props.color};
  border-radius: 100px;
  transition: all 0.2s ease;
  user-select: none;
  box-shadow: 0 2px 8px ${props => props.color}15;

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateY(-0.5px);
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

const OperationalBadges = ({ pendingApprovals = 0, pendingVerifications = 0 }) => {
  return (
    <BadgeRow>
      <Typography variant="sigma" textColor="neutral500" style={{ marginRight: '4px' }}>
        Pending Expert:
      </Typography>

      <MiniBadge color="#f59e0b">
        <Nucleus color="#f59e0b" />
        <ExpertIcon style={{ width: '14px', height: '14px', color: "#3e3d3dff" }} />
        <Label>Approvals</Label>
        <Count>{pendingApprovals}</Count>
      </MiniBadge>

      <MiniBadge color="#3b82f6">
        <Nucleus color="#3b82f6" />
        <VerifyIcon style={{ width: '14px', height: '14px', color: "#3c3c3dff" }} />
        <Label>Verifications</Label>
        <Count>{pendingVerifications}</Count>
      </MiniBadge>
    </BadgeRow>
  );
};

export default OperationalBadges;
