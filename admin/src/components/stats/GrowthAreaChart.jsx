import React from 'react';
import styled, { useTheme } from 'styled-components';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: 600;
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
  background: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.primary600};
`;

const Legend = styled.div`
  display: flex;
  gap: 16px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral600};
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.color};
`;

const GrowthBarChart = ({ data = {}, labels = [], title, Icon }) => {
  const theme = useTheme();

  // Reconstruct data if experts/clients are numeric arrays
  const formattedData = Array.isArray(data.experts) && Array.isArray(data.clients)
    ? labels.map((label, i) => ({
        date: label,
        experts: data.experts[i] || 0,
        clients: data.clients[i] || 0
      }))
    : data;

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
        <Legend>
          <LegendItem>
            <Dot color="#3b82f6" /> Experts
          </LegendItem>
          <LegendItem>
            <Dot color="#10b981" /> Clients
          </LegendItem>
        </Legend>
      </Header>

      <div style={{ height: '240px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={6}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false} 
              stroke={theme.colors.neutral200} 
            />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: theme.colors.neutral500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 11, fill: theme.colors.neutral500 }}
            />
            <Tooltip 
              cursor={{ fill: theme.colors.neutral100, radius: 4 }}
              contentStyle={{ 
                borderRadius: '12px', 
                border: 'none', 
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                padding: '12px',
                background: theme.colors.neutral0,
                color: theme.colors.neutral800
              }}
              itemStyle={{ fontSize: '12px', fontWeight: 600 }}
            />
            <Bar 
              dataKey="experts" 
              name="Experts" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]} 
              barSize={12}
            />
            <Bar 
              dataKey="clients" 
              name="Clients" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]} 
              barSize={12}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Container>
  );
};

export default GrowthBarChart;
