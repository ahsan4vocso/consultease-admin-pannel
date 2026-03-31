import React, { useState } from 'react';
import { useTheme } from 'styled-components';
import { AreaChart, Area, Tooltip as ReTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useReferralStats } from '../../hooks/referral';
import * as Style from './styles';
import { formatCurrency } from '../../utils/helper';
import { ReferralIcon, WalletIcon, UniqueIcon, ConversionIcon } from '../Icons';

const Sparkline = ({ data, color, theme }) => {
    const [hoveredName, setHoveredName] = useState(null);
    if (!data || data.length < 2) return null;

    return (
        <React.Fragment>
            <ResponsiveContainer width="100%" height="85%">
                <AreaChart
                    data={data}
                    onMouseMove={(e) => {
                        if (e && e.activePayload && e.activePayload.length > 0) {
                            setHoveredName(e.activePayload[0].payload.name);
                        } else if (e && e.activeTooltipIndex !== undefined) {
                            setHoveredName(data[e.activeTooltipIndex].name);
                        }
                    }}
                    onMouseLeave={() => setHoveredName(null)}
                >
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                            <stop offset="95%" stopColor={color} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <ReTooltip
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div style={{
                                        backgroundColor: theme.colors.neutral0,
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '10px',
                                        fontWeight: '700',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        border: `1px solid ${color}`,
                                        color: theme.colors.neutral800
                                    }}>
                                        <div>{payload[0].value}</div>
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
                        fillOpacity={1}
                        fill={`url(#gradient-${color})`}
                        isAnimationActive={false}
                    />
                </AreaChart>
            </ResponsiveContainer>
            {hoveredName && (
                <Style.HoverDate color={color}>
                    {hoveredName}
                </Style.HoverDate>
            )}
        </React.Fragment>
    );
};

const MiniPieChart = ({ expert, client, theme }) => {
    const data = [
        { name: 'Expert', value: expert || 0 },
        { name: 'Client', value: client || 0 }
    ];
    const COLORS = [
        theme.name === 'dark' ? theme.colors.warning400 : '#eab308', // Expert
        theme.name === 'dark' ? theme.colors.primary400 : '#3b82f6'  // Client
    ];

    if (expert === 0 && client === 0) return null;

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    innerRadius="60%"
                    outerRadius="100%"
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

const ProgressRing = ({ percent, color, theme }) => {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percent / 100) * circumference;
    return (
        <svg width="55" height="55" viewBox="0 0 55 55">
            <circle cx="27.5" cy="27.5" r={radius} stroke={theme.colors.neutral150} strokeWidth="4.5" fill="none" />
            <circle
                cx="27.5" cy="27.5" r={radius}
                stroke={color} strokeWidth="4.5" fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                transform="rotate(-90 27.5 27.5)"
            />
            <text x="50%" y="54%" textAnchor="middle" fontSize="11" fontWeight="800" fill={theme.colors.neutral600}>{percent}%</text>
        </svg>
    );
};

const StatCard = ({ title, value, expertVal, clientVal, icon: Icon, delay, color: colorProp, bg: bgProp, variant, chartData, sparkData }) => {
    const theme = useTheme();
    const color = typeof colorProp === 'function' ? colorProp({ theme }) : colorProp;
    const bg = typeof bgProp === 'function' ? bgProp({ theme }) : bgProp;

    return (
        <Style.StatCardPremium delay={delay}>
            <Style.StatTop>
                <Style.StatTitle>
                    <Style.StatIconBox bg={bg} color={color}>
                        <Icon style={{ width: '18px', height: '18px' }} />
                    </Style.StatIconBox>
                    {title}
                </Style.StatTitle>
                {variant === 'chart' ? (
                    <Style.SparklineWrapper>
                        <Sparkline data={sparkData} color={color} theme={theme} />
                    </Style.SparklineWrapper>
                ) : (
                    <Style.ProgressRingWrapper>
                        <ProgressRing percent={chartData?.percentage || 0} color={color} theme={theme} />
                    </Style.ProgressRingWrapper>
                )}
            </Style.StatTop>

            <Style.StatMainValue>{value}</Style.StatMainValue>

            <Style.StatFooterPremium>
                <Style.FooterItem>
                    <Style.FooterLabel>Expert</Style.FooterLabel>
                    <Style.FooterValue color={theme.name === 'dark' ? theme.colors.warning400 : '#eab308'}>
                        {typeof expertVal === 'number' ? expertVal : formatCurrency(expertVal, true)}
                    </Style.FooterValue>
                </Style.FooterItem>
                <Style.FooterItem>
                    <Style.FooterLabel>Client</Style.FooterLabel>
                    <Style.FooterValue color={theme.name === 'dark' ? theme.colors.primary400 : '#3b82f6'}>
                        {typeof clientVal === 'number' ? clientVal : formatCurrency(clientVal, true)}
                    </Style.FooterValue>
                </Style.FooterItem>
                <Style.PieChartWrapper>
                    <MiniPieChart
                        expert={typeof expertVal === 'number' ? expertVal : expertVal}
                        client={typeof clientVal === 'number' ? clientVal : clientVal}
                        theme={theme}
                    />
                </Style.PieChartWrapper>
            </Style.StatFooterPremium>
        </Style.StatCardPremium>
    );
};

const PlatformExpendsCard = ({ data, delay, formattedSparkData }) => {
    const theme = useTheme();
    const expertColor = theme.name === 'dark' ? theme.colors.warning400 : '#eab308';
    const clientColor = theme.name === 'dark' ? theme.colors.primary400 : '#3b82f6';

    return (
        <Style.ExpendsCardWrapper delay={delay}>
            <Style.StatTop>
                <Style.ExpendsMain>
                    <Style.StatTitle>
                        <Style.StatIconBox bg={theme.colors.success100} color={theme.colors.success600}>
                            <WalletIcon style={{ width: '18px', height: '18px' }} />
                        </Style.StatIconBox>
                        Platform Expends
                    </Style.StatTitle>
                    <Style.StatMainValue style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>
                        {formatCurrency(data.total, true)}
                    </Style.StatMainValue>
                </Style.ExpendsMain>
                <Style.SparklineWrapper>
                    <Sparkline data={formattedSparkData} color={theme.colors.success600} theme={theme} />
                </Style.SparklineWrapper>
            </Style.StatTop>

            <Style.ExpendsGrid>
                <Style.DataPanel color={theme.colors.primary500}>
                    <Style.PanelTitle>
                        Referrer
                    </Style.PanelTitle>
                    <Style.PanelRow>
                        <Style.PanelLabel>Expert</Style.PanelLabel>
                        <Style.PanelValue color={expertColor}>{formatCurrency(data.referrer.expert, true)}</Style.PanelValue>
                    </Style.PanelRow>
                    <Style.PanelRow>
                        <Style.PanelLabel>Client</Style.PanelLabel>
                        <Style.PanelValue color={clientColor}>{formatCurrency(data.referrer.client, true)}</Style.PanelValue>
                    </Style.PanelRow>
                </Style.DataPanel>

                <Style.DataPanel color={theme.colors.secondary500}>
                    <Style.PanelTitle>
                        Receiver
                    </Style.PanelTitle>
                    <Style.PanelRow>
                        <Style.PanelLabel>Expert</Style.PanelLabel>
                        <Style.PanelValue color={expertColor}>{formatCurrency(data.reciever.expert, true)}</Style.PanelValue>
                    </Style.PanelRow>
                    <Style.PanelRow>
                        <Style.PanelLabel>Client</Style.PanelLabel>
                        <Style.PanelValue color={clientColor}>{formatCurrency(data.reciever.client, true)}</Style.PanelValue>
                    </Style.PanelRow>
                </Style.DataPanel>
            </Style.ExpendsGrid>
        </Style.ExpendsCardWrapper>
    );
};

const StatsSection = () => {
    const { data: stats } = useReferralStats();
    const d = stats || {};

    // Map Backend Data
    const refs = d.referrals || { total: 0, expert: 0, client: 0, graph: [0, 0, 0, 0, 0] };
    const expends = d.platform_expends || { total: 0, referrer: { expert: 0, client: 0 }, reciever: { expert: 0, client: 0 }, graph: [0, 0, 0, 0, 0] };
    const conv = d.referral_conversion || { total: 0, expert: 0, client: 0, percentage: 0 };
    const direct = d.direct_conversion || { total: 0, expert: 0, client: 0, percentage: 0 };

    // Format Sparkline Data with Month Names
    const formatSparkData = (graph) => graph.map((v, i) => ({
        name: d.meta?.months?.[i] || '',
        value: v
    }));

    return (
        <Style.StatsGrid>
            <StatCard
                title="Total Referrals"
                value={refs.total}
                expertVal={refs.expert}
                clientVal={refs.client}
                icon={ReferralIcon}
                color={({ theme }) => theme.colors.primary600}
                bg={({ theme }) => theme.colors.primary100}
                variant="chart"
                sparkData={formatSparkData(refs.graph)}
                delay="0s"
            />
            <StatCard
                title="Referral Conversion"
                value={conv.total}
                expertVal={conv.expert}
                clientVal={conv.client}
                icon={ConversionIcon}
                color={({ theme }) => theme.colors.secondary600}
                bg={({ theme }) => theme.colors.secondary100}
                variant="ring"
                chartData={{ percentage: conv.percentage }}
                delay="0.2s"
            />
            <StatCard
                title="Direct Conversion"
                value={direct.total}
                expertVal={direct.expert}
                clientVal={direct.client}
                icon={UniqueIcon}
                color={({ theme }) => theme.colors.warning600}
                bg={({ theme }) => theme.colors.warning100}
                variant="ring"
                chartData={{ percentage: direct.percentage }}
                delay="0.3s"
            />
            <PlatformExpendsCard
                data={expends}
                delay="0.1s"
                formattedSparkData={formatSparkData(expends.graph)}
            />
        </Style.StatsGrid>
    );
};

export default StatsSection;
