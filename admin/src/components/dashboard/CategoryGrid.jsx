import { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { useTheme } from 'styled-components';
import * as Style from "./styles";
import EmptyState from "./EmptyState";
import { useCategoryStats } from "../../hooks/dashboard";
import { formatDurationFromMinutes } from "../../utils/helper";

export default function CategoryGrid({ liveCalls }) {
    const [dateFilter, setDateFilter] = useState('today');
    const { data: categoryStats = [] } = useCategoryStats(dateFilter, liveCalls);
    const theme = useTheme();

    return (
        <Style.Card>
            <Style.CardHeader>
                <div>
                    <Style.CardTitle>Category Mix</Style.CardTitle>
                    <Style.CardSubtitle>Call distribution by topics</Style.CardSubtitle>
                </div>
                <Style.FilterContainer>
                    <Style.FilterButton
                        active={dateFilter === 'today'}
                        onClick={() => setDateFilter('today')}
                    >
                        Today
                    </Style.FilterButton>
                    <Style.FilterButton
                        active={dateFilter === 'yesterday'}
                        onClick={() => setDateFilter('yesterday')}
                    >
                        Yesterday
                    </Style.FilterButton>
                    <Style.FilterButton
                        active={dateFilter === 'week'}
                        onClick={() => setDateFilter('week')}
                    >
                        Week
                    </Style.FilterButton>
                </Style.FilterContainer>
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
                            }[dateFilter]}
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
                <Style.ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryStats} barSize={18}>
                            <XAxis
                                dataKey="name"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontSize: 10, fill: theme.colors.neutral500 }}
                            />
                            <YAxis hide axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: theme.colors.neutral100 }}
                                contentStyle={{
                                    backgroundColor: theme.colors.neutral0,
                                    border: `1px solid ${theme.colors.neutral150}`,
                                    borderRadius: 8,
                                    fontSize: 11,
                                    color: theme.colors.neutral800,
                                }}
                                itemStyle={{ color: theme.colors.neutral800 }}
                                formatter={(value, name) => {
                                    if (name === "totalCalls") return [value, "Total Calls"];
                                    if (name === "calls") return [value, "Calls"];
                                    if (name === "minutes") return [value, "Minutes"];
                                    if (name === "revenue")
                                        return [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"];
                                    if (name === "avgRating") return [value, "Avg rating"];
                                    return [value, name];
                                }}
                            />
                            <Bar dataKey="totalCalls" radius={[6, 6, 0, 0]} fill={theme.colors.success600} />
                        </BarChart>
                    </ResponsiveContainer>
                </Style.ChartContainer>}
        </Style.Card>
    );
}
