import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Sector, Cell } from "recharts";
import { useTheme } from 'styled-components';
import * as Style from "./styles";
import EmptyState from "./EmptyState";
import { useCategoryStats } from "../../hooks/dashboard";
import { formatDurationFromMinutes } from "../../utils/helper";

const CHART_COLORS = {
    voice: '#7476f1ff',
    video: '#48ecbbff',
};

const RADIAN = Math.PI / 180;

const CustomTooltip = ({ active, payload, label, theme }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div style={{
                backgroundColor: theme.colors.neutral0,
                border: `1px solid ${theme.colors.neutral150}`,
                padding: '12px',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                minWidth: '150px'
            }}>
                <p style={{
                    fontWeight: 600,
                    marginBottom: '8px',
                    fontSize: '12px',
                    color: theme.colors.neutral800,
                    borderBottom: `1px solid ${theme.colors.neutral150}`,
                    paddingBottom: '4px'
                }}>{label}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <p style={{ color: CHART_COLORS.voice, fontSize: '11px', fontWeight: 600 }}>
                        Voice Calls: {data.calls}
                    </p>
                    <p style={{ color: CHART_COLORS.video, fontSize: '11px', fontWeight: 600 }}>
                        Video Calls: {data.videoCalls}
                    </p>
                    <p style={{ color: theme.colors.neutral600, fontSize: '11px', marginTop: '4px', borderTop: `1px solid ${theme.colors.neutral100}`, paddingTop: '4px' }}>
                        Total: {data.totalCalls}
                    </p>
                    <p style={{ color: theme.colors.neutral600, fontSize: '11px' }}>
                        Minutes: {data.minutes}
                    </p>
                    <p style={{ color: theme.colors.neutral600, fontSize: '11px' }}>
                        Avg Rating: {data.avgRating} ★
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function CategoryGrid({ liveCalls, filter, customRange }) {
    const { data: categoryStats = [] } = useCategoryStats(filter, liveCalls, customRange);
    const theme = useTheme();

    return (
        <Style.Card>
            <Style.CardHeader>
                <div>
                    <Style.CardTitle>Calls by Category</Style.CardTitle>
                    <Style.CardSubtitle>Call distribution by topics</Style.CardSubtitle>
                </div>
            </Style.CardHeader>

            <Style.CategoryGrid>
                {categoryStats.length === 0 ? (
                    <div style={{ gridColumn: '1 / -1' }}>
                        <EmptyState
                            title="No categories found"
                            subtitle={{
                                today: "There are no calls for today.",
                                yesterday: "There are no calls for yesterday.",
                                week: "There are no calls for this week."
                            }[filter]}
                            icon="📊"
                        />
                    </div>
                ) : (
                    categoryStats.map((row) => (
                        <Style.CategoryItem key={row.name}>
                            <Style.CategoryName title={row.name}>{row.name}</Style.CategoryName>
                            {row.calls > 0 && <Style.CategoryStats>Voice calls: {row.calls}</Style.CategoryStats>}
                            {row.videoCalls > 0 && <Style.CategoryStats>Video calls: {row.videoCalls}</Style.CategoryStats>}
                            <Style.CategoryStats>Total: {formatDurationFromMinutes(row.minutes)}</Style.CategoryStats>

                            <div style={{ position: 'absolute', bottom: '4px', right: '4px' }}>
                                <Style.CategoryRating>
                                    <span>★</span>
                                    <span>{row.avgRating.toFixed(2)}</span>
                                </Style.CategoryRating>
                            </div>
                        </Style.CategoryItem>
                    )))}
            </Style.CategoryGrid>


            {categoryStats.length > 1 &&
                <Style.ChartContainer style={{ height: '350px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryStats} barSize={25} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 10, fill: theme.colors.neutral500, angle: -45, textAnchor: 'end' }}
                                height={60}
                                interval={0}
                            />
                            <YAxis hide axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: theme.colors.neutral100 }} />
                            <Bar dataKey="calls" radius={[6, 6, 0, 0]} fill={CHART_COLORS.voice} />
                            <Bar dataKey="videoCalls" radius={[6, 6, 0, 0]} fill={CHART_COLORS.video} />
                        </BarChart>
                    </ResponsiveContainer>
                </Style.ChartContainer>}
        </Style.Card>
    );
}
