import React from 'react';
import * as Style from '../dashboard/styles';
import { ChartIcon } from '../Icons';
import { dummyStats } from '../../utils/dummyStats';

const StatsHeader = () => {
  const { userSummary } = dummyStats;
  const totalUsers = userSummary.total.toLocaleString();
  const activeNow = userSummary.availability.find(a => a.name === 'Available')?.value || 0;

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
            {totalUsers} total users registered • {activeNow} experts currently available
          </Style.MetaText>
        </Style.TitleBox>
      </Style.HeaderLeft>
      <Style.HeaderRight>
        {/* Reservation for future platform-wide filters */}
      </Style.HeaderRight>
    </Style.Header>
  );
};

export default StatsHeader;
