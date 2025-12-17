import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import * as Style from "./styles";
import Header from "./Header";
import {
    useCompletedCalls,
    useCategoryStats,
    useStreamData
} from "../../hooks/dashboard";
import { useEffect, useState } from "react";
import { buildCategoryStats, formatDurationFromMinutes, formatTimeAMPM, minutesToMMSS, numberShortner } from "../../utils/helper";
import { VideoCall, VoiceCall } from "../Icons";



const expertPresence = [
    { name: "GST / Indirect Tax", online: 8, inCall: 5 },
    { name: "Income Tax", online: 6, inCall: 3 },
    { name: "Company Law / ROC", online: 4, inCall: 2 },
    { name: "Litigation / Tribunal", online: 3, inCall: 1 },
    { name: "Startup Advisory", online: 3, inCall: 1 },
];

const topConsultants = [
    {
        name: "CA Mehul Shah",
        category: "GST / Indirect Tax",
        minutes: 186,
        calls: 14,
        rating: 4.8,
    },
    {
        name: "Adv. Ritu Gupta",
        category: "Litigation / Tribunal",
        minutes: 164,
        calls: 11,
        rating: 4.7,
    },
    {
        name: "CA Nivedita",
        category: "Income Tax",
        minutes: 149,
        calls: 10,
        rating: 4.6,
    },
    {
        name: "CS Ankit Jain",
        category: "Company Law / ROC",
        minutes: 132,
        calls: 9,
        rating: 4.5,
    },
    {
        name: "CA Rohan",
        category: "GST / Indirect Tax",
        minutes: 121,
        calls: 8,
        rating: 4.4,
    },
];


export default function CallsLiveDashboard() {
    const [page, setPage] = useState(1);
    const [dateFilter, setDateFilter] = useState('today');
    const [callsFilter, setCallsFilter] = useState('60min');

    const { data: recentCalls = [], meta = {} } = useCompletedCalls(page, callsFilter) || {};
    const categoryQuery = useCategoryStats(dateFilter);

    const categoryStats = categoryQuery.data || [];

    // Stream data
    const { stats = {}, liveCalls = [] } = useStreamData() || {};

    const handleNextPage = () => {
        if (page < (meta.pagination?.pageCount || 1)) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };


    return (
        <Style.DashboardContainer>
            <Header stats={stats} />

            <Style.Main>
                {/* Two-column layout: Left = stats, Right = records */}
                <Style.GridContainer>
                    {/* LEFT COLUMN: All statistics / analytical views */}
                    <Style.Column>
                        <Style.KpiSection>
                            <Style.KpiGrid>
                                <KpiCard
                                    label="Ongoing calls"
                                    value={stats.liveCalls}
                                    tone="emerald"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => stats.liveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                                        `?filters[$and][0][callStatus][$eq]=ongoing` +
                                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                                        `&page=1`, '_blank')}
                                />
                                <KpiCard
                                    label="Total calls today"
                                    value={stats.callsToday}
                                    chip="Including free & paid"
                                    tone="sky"
                                />
                            </Style.KpiGrid>


                            <Style.KpiGrid>
                                <KpiCard
                                    label="Declined calls"
                                    value={stats.declinedCalls}
                                    tone="amber"
                                    style={{ cursor: stats.declinedCalls && 'pointer' }}
                                    onClick={() => stats.declinedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                                        `?filters[$and][0][callStatus][$eq]=declined` +
                                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                                        `&page=1`, '_blank')}
                                />
                                <KpiCard
                                    label="Completed calls"
                                    value={stats.completedCalls}
                                    tone="amber"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => stats.completedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                                        `?filters[$and][0][callStatus][$eq]=completed` +
                                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                                        `&page=1`, '_blank')}
                                />

                            </Style.KpiGrid>
                            <Style.KpiGrid>
                                <KpiCard
                                    label="Experts online"
                                    value={stats.expertsOnline}
                                    tone="rose"
                                    onClick={() =>
                                        stats.expertsOnline > 0 &&
                                        window.open(
                                            `/admin/content-manager/collection-types/api::expert-profile.expert-profile` +
                                            `?filters[$and][0][isActive][$eq]=true` +
                                            `&sort=createdAt:DESC` +
                                            `&page=1` +
                                            `&pageSize=100`,
                                            "_blank"
                                        )
                                    }
                                />
                                <KpiCard
                                    label="Total call duration"
                                    value={minutesToMMSS(stats.avgDuration)}
                                    tone="emerald"
                                />
                                {/* <KpiCard
                                    label="Avg call revenue"
                                    value={`${numberShortner(stats.avgCallRevenue)} ₹`}
                                    tone="sky"
                                /> */}
                            </Style.KpiGrid>
                            {/* <Style.KpiGrid>
                                <KpiCard
                                    label="Avg rating (overall)"
                                    value={`${stats.avgRating.toFixed(2)} ★`}
                                    tone="amber"
                                />
                                <KpiCard
                                    label="Avg rating across categories"
                                    value={`${avgCategoryRating} ★`}
                                    tone="rose"
                                />
                            </Style.KpiGrid> */}
                        </Style.KpiSection>



                        {/* Call Count by Category chart */}
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
                                            {/* <Style.CategoryRevenue>₹{numberShortner(row.revenue)}</Style.CategoryRevenue>* */}

                                            <div style={{ position: 'absolute', bottom: '4px', right: '4px' }}>
                                                <Style.CategoryRating>
                                                    <span>★</span>
                                                    <span>{row.avgRating.toFixed(2)}</span>
                                                </Style.CategoryRating>
                                            </div>
                                            {/* <Style.CategoryRevenue>₹{numberShortner(row.revenue)}</Style.CategoryRevenue> */}
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
                                                tick={{ fontSize: 10, fill: "#64748b" }}
                                            />
                                            <YAxis hide axisLine={false} tickLine={false} />
                                            <Tooltip
                                                cursor={{ fill: "#f8fafc" }}
                                                contentStyle={{
                                                    backgroundColor: "#ffffff",
                                                    border: "1px solid #e2e8f0",
                                                    borderRadius: 8,
                                                    fontSize: 11,
                                                    color: "#0f172a",
                                                }}
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
                                            <Bar dataKey="totalCalls" radius={[6, 6, 0, 0]} fill="#22c594ff" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Style.ChartContainer>}
                        </Style.Card>

                        {/* Experts snapshot */}
                        {/* <Style.Card>
                            <Style.CardHeader>
                                <div>
                                    <Style.CardTitle>Experts snapshot</Style.CardTitle>
                                    <Style.CardSubtitle>Online vs in-call across practice areas.</Style.CardSubtitle>
                                </div>
                                <Style.CardMeta>India time</Style.CardMeta>
                            </Style.CardHeader>
                            <div>
                                {expertPresence.map((row) => {
                                    const total = row.online || 1;
                                    const inCallPct = Math.min((row.inCall / total) * 100, 100);

                                    return (
                                        <Style.ExpertRow key={row.name}>
                                            <Style.ExpertInfo>
                                                <Style.ExpertName>{row.name}</Style.ExpertName>
                                                <Style.ExpertStats>
                                                    {row.inCall} in call • {row.online - row.inCall} online
                                                </Style.ExpertStats>
                                            </Style.ExpertInfo>
                                            <Style.ProgressBarContainer>
                                                <Style.ProgressTrack>
                                                    <Style.ProgressBar width={`${inCallPct}%`} />
                                                </Style.ProgressTrack>
                                                <Style.BusyBadge>{inCallPct.toFixed(0)}% busy</Style.BusyBadge>
                                            </Style.ProgressBarContainer>
                                        </Style.ExpertRow>
                                    );
                                })}
                            </div>
                        </Style.Card> */}

                        {/* Top consultants */}
                        {/* <Style.Card>
                            <Style.CardHeader>
                                <div>
                                    <Style.CardTitle>Top consultants (today)</Style.CardTitle>
                                    <Style.CardSubtitle>Ranked by minutes, calls & rating.</Style.CardSubtitle>
                                </div>
                                <Style.ConsultantHeaderLabels>
                                    <Style.HeaderBadge>Minutes</Style.HeaderBadge>
                                    <Style.HeaderBadge bg="#f8fafc">Calls</Style.HeaderBadge>
                                    <Style.HeaderBadge bg="#f8fafc">Rating</Style.HeaderBadge>
                                </Style.ConsultantHeaderLabels>
                            </Style.CardHeader>

                            <div>
                                {topConsultants.map((c, index) => (
                                    <Style.ConsultantRow key={c.name}>
                                        <Style.ConsultantInfo>
                                            <Style.Rank>#{index + 1}</Style.Rank>
                                            <Style.Avatar>
                                                {c.name
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .slice(0, 2)}
                                            </Style.Avatar>
                                            <Style.ConsultantDetails>
                                                <Style.ConsultantName>{c.name}</Style.ConsultantName>
                                                <Style.ConsultantCategory>{c.category}</Style.ConsultantCategory>
                                            </Style.ConsultantDetails>
                                        </Style.ConsultantInfo>
                                        <Style.ConsultantStats>
                                            <Style.StatBlock>
                                                <Style.StatLabel>Minutes</Style.StatLabel>
                                                <Style.StatValue>{c.minutes}</Style.StatValue>
                                            </Style.StatBlock>
                                            <Style.StatBlock>
                                                <Style.StatLabel>Calls</Style.StatLabel>
                                                <Style.StatValue>{c.calls}</Style.StatValue>
                                            </Style.StatBlock>
                                            <Style.StatBlock>
                                                <Style.StatLabel>Rating</Style.StatLabel>
                                                <Style.StatValue color="#d97706">{c.rating.toFixed(1)} ★</Style.StatValue>
                                            </Style.StatBlock>
                                        </Style.ConsultantStats>
                                    </Style.ConsultantRow>
                                ))}
                            </div>
                        </Style.Card> */}
                    </Style.Column>

                    {/* RIGHT COLUMN: Records (live + recent calls) */}
                    <Style.Column>
                        {/* Live calls table */}
                        <Style.TableSection>
                            <Style.TableHeader>
                                <div>
                                    <Style.CardTitle>Live calls</Style.CardTitle>
                                    <Style.CardSubtitle>Monitor ongoing calls.</Style.CardSubtitle>
                                </div>
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <Style.ActiveBadge><Style.LiveDot /> {stats.liveCalls} ongoing</Style.ActiveBadge>
                                    {/* <Style.CompactButton>Compact</Style.CompactButton> */}
                                </div>
                            </Style.TableHeader>
                            <Style.TableContainer maxHeight="350px">
                                <Style.Table>
                                    <Style.Thead>
                                        <tr>
                                            <Style.Th>Call ID</Style.Th>
                                            <Style.Th>Type</Style.Th>
                                            <Style.Th>Caller</Style.Th>
                                            <Style.Th>Expert</Style.Th>
                                            <Style.Th>Start Time</Style.Th>
                                            <Style.Th>Category</Style.Th>
                                            <Style.Th>Status</Style.Th>
                                        </tr>
                                    </Style.Thead>
                                    <tbody>
                                        {liveCalls.length === 0 ? (
                                            <tr>
                                                <td colSpan="7">
                                                    <EmptyState
                                                        title="No live calls"
                                                        subtitle="Ongoing consultations will appear here."
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            liveCalls.map((call) => (
                                                <Style.Tr
                                                    key={call.id}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, '_blank')}
                                                >
                                                    <Style.Td fontFamily="monospace" color="#64748b" >{call.id}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.type == "voiceCall" ? <VoiceCall style={{ width: "20px", height: "20px", color: "#5272a3ff" }} /> : <VideoCall style={{ width: "20px", height: "20px", color: "#219bacff" }} />}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.caller}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.expert}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{formatTimeAMPM(call.startTime)}</Style.Td>
                                                    <Style.Td> <Style.CategoryBadge>{call.category}</Style.CategoryBadge></Style.Td>

                                                    <Style.Td>
                                                        <Style.StatusBadge status={call.status}>
                                                            <span
                                                                style={{
                                                                    width: 6,
                                                                    height: 6,
                                                                    borderRadius: "50%",
                                                                    backgroundColor: "currentColor",
                                                                }}
                                                            />
                                                            {call.status === "pending" ? "Ringing" : call.status}
                                                        </Style.StatusBadge>
                                                    </Style.Td>
                                                    {/* <Style.Td fontSize="1.4rem" align="center" color="#1e293b">
                                                    {minutesToMMSS(call.duration)}
                                                </Style.Td> */}
                                                </Style.Tr>
                                            )))}
                                    </tbody>
                                </Style.Table>
                            </Style.TableContainer>
                        </Style.TableSection>

                        {/* Recent calls */}
                        <Style.TableSection>
                            <Style.TableHeader>
                                <div>
                                    <Style.CardTitle>Completed calls</Style.CardTitle>
                                    <Style.CardSubtitle>Duration & rating snapshot.</Style.CardSubtitle>
                                </div>
                                <Style.FilterContainer>
                                    <Style.FilterButton
                                        active={callsFilter === '60min'}
                                        onClick={() => setCallsFilter('60min')}
                                    >
                                        60 Min
                                    </Style.FilterButton>
                                    <Style.FilterButton
                                        active={callsFilter === 'today'}
                                        onClick={() => setCallsFilter('today')}
                                    >
                                        Today
                                    </Style.FilterButton>
                                    <Style.FilterButton
                                        active={callsFilter === 'yesterday'}
                                        onClick={() => setCallsFilter('yesterday')}
                                    >
                                        Yesterday
                                    </Style.FilterButton>
                                    <Style.FilterButton
                                        active={callsFilter === 'week'}
                                        onClick={() => setCallsFilter('week')}
                                    >
                                        Week
                                    </Style.FilterButton>
                                </Style.FilterContainer>
                                {/* <Style.CompactButton>Export CSV</Style.CompactButton> */}
                            </Style.TableHeader>
                            <Style.TableContainer maxHeight="450px">
                                <Style.Table>
                                    <Style.Thead>
                                        <tr>
                                            <Style.Th>Caller</Style.Th>
                                            <Style.Th>Expert</Style.Th>
                                            <Style.Th>Category</Style.Th>
                                            <Style.Th>Start Time</Style.Th>
                                            <Style.Th>Duration</Style.Th>
                                            <Style.Th>Rating</Style.Th>
                                        </tr>
                                    </Style.Thead>
                                    <tbody>
                                        {recentCalls.length === 0 ? (
                                            <tr>
                                                <td colSpan="6">
                                                    <EmptyState
                                                        title="No completed calls"
                                                        subtitle={{
                                                            '60min': "No calls in the last 60 minutes.",
                                                            'today': "No calls completed today.",
                                                            'yesterday': "No calls completed yesterday.",
                                                            'week': "No calls completed this week."
                                                        }[callsFilter]}
                                                    />
                                                </td>
                                            </tr>
                                        ) : (
                                            recentCalls.map((call) => (
                                                <Style.Tr
                                                    key={call.id}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, '_blank')}
                                                >
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.caller}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.expert}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">
                                                        <Style.CategoryBadge>{call.category || 'Other'}</Style.CategoryBadge>
                                                    </Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#334155">{formatTimeAMPM(call.time)}</Style.Td>
                                                    <Style.Td fontSize="1.4rem" color="#1e293b">{formatDurationFromMinutes(call.duration)}</Style.Td>
                                                    <Style.Td fontSize="1.4rem">
                                                        {call.rating ? <Style.RatingStars>{"★".repeat(call.rating)}</Style.RatingStars> : <span style={{ fontSize: "1.2rem" }}>---</span>}
                                                    </Style.Td>
                                                </Style.Tr>
                                            )))}
                                    </tbody>
                                </Style.Table>
                            </Style.TableContainer>
                            {meta.pagination?.pageCount > 1 &&
                                <Style.PaginationContainer>
                                    <Style.PaginationButton
                                        disabled={page === 1}
                                        onClick={handlePrevPage}
                                    >
                                        Previous
                                    </Style.PaginationButton>
                                    <Style.PaginationInfo>
                                        Page {page} of {meta.pagination?.pageCount || 1}
                                    </Style.PaginationInfo>
                                    <Style.PaginationButton
                                        disabled={page >= (meta?.pagination?.pageCount || 1)}
                                        onClick={handleNextPage}
                                    >
                                        Next
                                    </Style.PaginationButton>
                                </Style.PaginationContainer>}
                        </Style.TableSection>
                    </Style.Column>
                </Style.GridContainer>
            </Style.Main>
        </Style.DashboardContainer>
    );
}

function KpiCard({ label, value, tone = "emerald", ...rest }) {
    return (
        <Style.KpiCardContainer {...rest}>
            <Style.KpiTop>
                <Style.KpiInfo>
                    <Style.KpiLabel>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {label}
                            {label === "Ongoing calls" && <Style.StatusBadge status='ongoing'>
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        backgroundColor: "currentColor",
                                    }}
                                />
                                <span style={{ paddingX: "0.8rem" }}>Live</span>
                            </Style.StatusBadge>}
                        </div>
                    </Style.KpiLabel>
                    <Style.KpiValue>{value}</Style.KpiValue>
                </Style.KpiInfo>
                <Style.KpiIconBox tone={tone}>⚡</Style.KpiIconBox>
            </Style.KpiTop>
        </Style.KpiCardContainer>
    );
}

function EmptyState({ title, subtitle, icon = "📭" }) {
    return (
        <Style.EmptyStateContainer>
            <Style.EmptyStateIcon>{icon}</Style.EmptyStateIcon>
            <Style.EmptyStateText>{title}</Style.EmptyStateText>
            {subtitle && <Style.EmptyStateSubText>{subtitle}</Style.EmptyStateSubText>}
        </Style.EmptyStateContainer>
    );
}
