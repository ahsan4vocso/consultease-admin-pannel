import React from 'react';
import styled, { useTheme } from 'styled-components';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  position: relative;
`;

const Title = styled.h3`
  font-size: 14px;
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
  background: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.primary600};
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;

const ChartContainer = styled.div`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  position: relative;
`;

const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
`;

const CenterValue = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral800};
  line-height: 1;
`;

const CenterText = styled.div`
  font-size: 9px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  margin-top: 2px;
`;

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  padding: 4px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
  
  &:last-child {
    border-bottom: none;
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Dot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${props => props.color};
  box-shadow: 0 0 8px ${props => `${props.color}66`};
`;

const Label = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral600};
  white-space: nowrap;
`;

const Count = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
`;

const AvailabilityDonut = ({ data, title, Icon }) => {
  const theme = useTheme();
  const total = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <Container>
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center' }}>
        <Title>
          {Icon && (
            <IconWrapper>
              <Icon style={{ width: 18, height: 18 }} />
            </IconWrapper>
          )}
          {title}
        </Title>
      </div>
      <ContentWrapper>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={32}
                outerRadius={46}
                paddingAngle={4}
                dataKey="value"
                stroke="none"
                cornerRadius={4}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                wrapperStyle={{ zIndex: 1000 }}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: 'none', 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  fontSize: '11px',
                  background: theme.colors.neutral0,
                  color: theme.colors.neutral800
                }} 
                itemStyle={{ color: theme.colors.neutral800 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <CenterLabel>
            <CenterValue>{total}</CenterValue>
            <CenterText>Total</CenterText>
          </CenterLabel>
        </ChartContainer>
        <Legend>
          {data.map((item, index) => (
            <LegendItem key={index}>
              <Badge>
                <Dot color={item.color} />
                <Label>{item.name}</Label>
              </Badge>
              <Count>{item.value.toLocaleString()}</Count>
            </LegendItem>
          ))}
        </Legend>
      </ContentWrapper>
    </Container>
  );
};

export default AvailabilityDonut;
