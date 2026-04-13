import React, { useState } from 'react';
import styled, { keyframes, useTheme } from 'styled-components';
import { AreaChart, Area, ResponsiveContainer, Tooltip as ReTooltip } from 'recharts';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 16px;
  padding: 18px 16px 8px 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
  min-height: 140px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${props => props.color};
    opacity: 0.8;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const LabelSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: ${props => `${props.color}10`};
  color: ${props => props.color};
  flex-shrink: 0;
`;

const Title = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
`;

const TrendContainer = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.positive ? '#10b981' : '#ef4444'};
  display: flex;
  align-items: center;
  gap: 2px;
`;

const ValueRow = styled.div`
  margin-bottom: 8px;
`;

const Value = styled.h4`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1;
`;

const ChartWrapper = styled.div`
  height: 60px;
  width: 100%;
  margin-left: -16px;
  margin-right: -16px;
  width: calc(100% + 32px);
  margin-top: auto;
  opacity: 0.9;
  position: relative;
`;

const HoverLabel = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 800;
  color: ${props => props.color};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  pointer-events: none;
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 100;
  background: ${({ theme }) => theme.colors.neutral0};
  padding: 2px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

const StatCard = ({ title, value, trend, chartData, color = '#3b82f6', Icon }) => {
  const theme = useTheme();
  const [hoveredLabel, setHoveredLabel] = useState(null);
  
  const isPositive = !trend?.startsWith('-');
  const gradientId = `color-premium-${title.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <Card color={color}>
      <TopRow>
        <LabelSection>
          {Icon && (
            <IconWrapper color={color}>
              <Icon style={{ width: '18px', height: '18px' }} />
            </IconWrapper>
          )}
          <Title>{title}</Title>
        </LabelSection>
        {trend && (
          <TrendContainer positive={isPositive}>
            {isPositive ? '↑' : '↓'} {trend.replace(/[+-]/, '')}
          </TrendContainer>
        )}
      </TopRow>
      
      <ValueRow>
        <Value>{value}</Value>
      </ValueRow>
      
      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={chartData}
            onMouseMove={(e) => {
              if (e && e.activePayload && e.activePayload.length > 0) {
                setHoveredLabel(e.activePayload[0].payload.name);
              } else if (e && e.activeTooltipIndex !== undefined && chartData[e.activeTooltipIndex]) {
                setHoveredLabel(chartData[e.activeTooltipIndex].name);
              }
            }}
            onMouseLeave={() => setHoveredLabel(null)}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.4}/>
                <stop offset="100%" stopColor={color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <ReTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div style={{
                      backgroundColor: theme.colors.neutral0,
                      padding: '4px 10px',
                      borderRadius: '8px',
                      fontSize: '11px',
                      fontWeight: '800',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: `1px solid ${color}`,
                      color: theme.colors.neutral800
                    }}>
                      {payload[0].value.toLocaleString()}
                    </div>
                  );
                }
                return null;
              }}
              cursor={{ stroke: color, strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              isAnimationActive={true}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0, fill: color }}
            />
          </AreaChart>
        </ResponsiveContainer>
        {hoveredLabel && (
          <HoverLabel color={color}>
            {hoveredLabel}
          </HoverLabel>
        )}
      </ChartWrapper>
    </Card>
  );
};

export default StatCard;
