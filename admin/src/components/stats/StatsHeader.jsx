import React from 'react';
import { Flex, SingleSelect, SingleSelectOption, Box } from '@strapi/design-system';
import * as Style from '../dashboard/styles';
import { ChartIcon } from '../Icons';

const StatsHeader = ({ total = 0, online = 0, filter, onFilterChange }) => {

  return (
    <Style.Header>
      <Style.HeaderLeft>
        <Style.IconBox>
          <ChartIcon style={{ width: "32px", height: "32px" }} />
        </Style.IconBox>
        <Style.TitleBox>
          <Style.Title>Platform Statistics</Style.Title>
          <Style.Subtitle>
            Comprehensive overview of users, growth, and financial metrics.
          </Style.Subtitle>
          <Style.MetaText>
            {(total || 0).toLocaleString()} total users registered • {online || 0} experts currently available
          </Style.MetaText>
        </Style.TitleBox>
      </Style.HeaderLeft>
      <Style.HeaderRight>
        <Style.FilterContainer>
          {['day wise', 'monthly', 'quarterly', 'yearly'].map((period) => (
            <Style.FilterButton
              key={period}
              active={filter === period}
              onClick={() => onFilterChange(period)}
            >
              {period === 'day wise' ? 'Day Wise' : period.charAt(0).toUpperCase() + period.slice(1)}
            </Style.FilterButton>
          ))}
        </Style.FilterContainer>
      </Style.HeaderRight>
    </Style.Header>
  );
};

export default StatsHeader;
