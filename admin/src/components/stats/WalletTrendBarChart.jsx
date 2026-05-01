import React from 'react';
import styled, { useTheme } from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
  position: relative;
  overflow: hidden;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.primary100};
  color: ${({ theme }) => theme.colors.primary600};
`;

const CustomTooltip = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
`;

const TooltipLabel = styled.div`
  font-size: 10px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  margin-bottom: 4px;
`;

const TooltipValue = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral800};
`;

const WalletTrendBarChart = ({ data = [], labels = [], title, Icon }) => {
  const theme = useTheme();

  const formattedData = labels.map((label, i) => ({
    date: label,
    amount: data[i] || 0
  }));

  const CustomTooltipContent = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <TooltipLabel>{label}</TooltipLabel>
          <TooltipValue>₹{(payload[0].value).toLocaleString()}</TooltipValue>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <Container>
      <Header>
        <Title>
          {Icon && (
            <IconWrapper>
              <Icon style={{ width: 18, height: 18 }} />
            </IconWrapper>
          )}
          {title}
        </Title>
      </Header>

      <div style={{ height: '240px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0.4} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={theme.colors.neutral200} 
              opacity={0.5}
            />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600, fill: theme.colors.neutral500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: 600, fill: theme.colors.neutral500 }}
              tickFormatter={(value) => `₹${value >= 1000 ? (value / 1000).toFixed(1) + 'k' : value}`}
            />
            <Tooltip content={<CustomTooltipContent />} cursor={{ fill: theme.colors.neutral100, radius: 8 }} />
            <Bar 
              dataKey="amount" 
              fill="url(#barGradient)"
              radius={[6, 6, 0, 0]}
              barSize={20}
              animationBegin={0}
              animationDuration={1500}
            >
              {formattedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fillOpacity={0.8 + (index / formattedData.length) * 0.2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default WalletTrendBarChart;
