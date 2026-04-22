import React from 'react';
import styled, { useTheme } from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
`;

const Title = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral700};
  margin: 0 0 16px 0;
`;

const CallActivityChart = ({ data, title }) => {
  const theme = useTheme();

  return (
    <Container>
      <Title>{title}</Title>
      <div style={{ height: '240px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={theme.colors.neutral200}
            />
            <XAxis
              dataKey="type"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: theme.colors.neutral500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: theme.colors.neutral500 }}
            />
            <Tooltip
              cursor={{ fill: theme.colors.neutral100 }}
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                background: theme.colors.neutral0,
                color: theme.colors.neutral800
              }}
              itemStyle={{ color: theme.colors.neutral800 }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{
                fontSize: '11px',
                paddingTop: '10px',
                color: theme.colors.neutral600
              }}
            />
            <Bar dataKey="clientSpent" name="Client Spent" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={24} />
            <Bar dataKey="expertReceived" name="Expert Received" fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default CallActivityChart;
