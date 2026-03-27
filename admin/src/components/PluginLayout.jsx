import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  Box,
  Flex,
  SubNav,
  Typography,
  Divider
} from '@strapi/design-system';
import { PluginIcon, ReferralLogo } from './Icons';
import { PLUGIN_ID } from '../pluginId';

const StyledSubNav = styled(SubNav)`
  width: 200px;
  flex-shrink: 0;
`;

const NavButton = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 2px;
  text-decoration: none;
  border-radius: 12px;
  margin: 4px 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme }) => theme.colors.neutral700};
  background-color: transparent;
  position: relative;
  border: 1px solid transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral150};
    color: ${({ theme }) => theme.colors.primary600};
    transform: translateX(4px);
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary700};
    font-weight: 600;
    
    &::before {
      content: "";
      position: absolute;
      left: -12px;
      top: 20%;
      height: 60%;
      width: 4px;
      background-color: ${({ theme }) => theme.colors.primary600};
      border-radius: 0 4px 4px 0;
    }

    /* Target Icon inside active link */
    svg {
      color: ${({ theme }) => theme.colors.primary600};
    }
  }

  span {
    font-size: 1.3rem;
    transition: color 0.2s;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.neutral500};
  transition: color 0.2s;
`;

const PluginLayout = ({ children }) => {

  return (
    <Flex alignItems="stretch">
      <StyledSubNav aria-label="Analytics navigation">
        <Box paddingLeft={4} paddingTop={3} paddingBottom={3}>
          <Typography variant="beta" fontWeight="bold" textColor="neutral800">
            Dashboards
          </Typography>
        </Box>
        <Divider />
        <Box paddingTop={2}>
          {/* Calling Dashboard */}
          <NavButton
            to={`/plugins/${PLUGIN_ID}`}
            end
          >
            <IconWrapper>
              <PluginIcon style={{ width: '2rem', height: '2rem' }} />
            </IconWrapper>
            <Typography variant="beta">Call Analytics</Typography>
          </NavButton>

          {/* Referral Analytics */}
          <NavButton
            to={`/plugins/${PLUGIN_ID}/referral-analytics`}
          >
            <IconWrapper>
              <ReferralLogo style={{ width: '2rem', height: '2rem' }} />
            </IconWrapper>
            <Typography variant="beta">Referral Analytics</Typography>
          </NavButton>
        </Box>
      </StyledSubNav>
      <Box flex="1" background="neutral100">
        {children}
      </Box>
    </Flex>
  );
};

export default PluginLayout;
