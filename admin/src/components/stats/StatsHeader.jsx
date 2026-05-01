import React from 'react';
import { Flex, SingleSelect, SingleSelectOption, Box } from '@strapi/design-system';
import * as Style from '../dashboard/styles';
import { ChartIcon } from '../Icons';

const StatsHeader = ({ total = 0, online = 0, filter, onFilterChange, customRange, onCustomRangeChange }) => {

  const presets = [
    { label: 'All Time', value: 'all_time' },
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Last Month', value: 'last_month' },
    { label: 'Last 3 Months', value: 'last_3_months' },
    { label: 'Year', value: 'year' },
    { label: 'Custom', value: 'custom' },
  ];

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
        <Style.FilterContainer style={{ gap: '4px' }}>
          {presets.map((p) => (
            <Style.FilterButton
              key={p.value}
              active={filter === p.value}
              onClick={() => onFilterChange(p.value)}
              style={{ padding: '6px 12px', fontSize: '11px' }}
            >
              {p.label}
            </Style.FilterButton>
          ))}
          
          {filter === 'custom' && (
            <Flex gap={2} style={{ marginLeft: '12px' }}>
              <input 
                type="date" 
                value={customRange?.start} 
                onChange={(e) => onCustomRangeChange({ ...customRange, start: e.target.value })}
                style={{ border: '1px solid #dcdce4', borderRadius: '4px', padding: '4px 8px', fontSize: '12px' }}
              />
              <input 
                type="date" 
                value={customRange?.end} 
                onChange={(e) => onCustomRangeChange({ ...customRange, end: e.target.value })}
                style={{ border: '1px solid #dcdce4', borderRadius: '4px', padding: '4px 8px', fontSize: '12px' }}
              />
            </Flex>
          )}
        </Style.FilterContainer>
      </Style.HeaderRight>
    </Style.Header>
  );
};

export default StatsHeader;
