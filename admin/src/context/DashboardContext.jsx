import React, { createContext, useContext, useState } from "react";
import { useStreamData, useCategoryStats, useCompletedCalls, useDashboardStats } from "../hooks/dashboard";

const DashboardContext = createContext();

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboardContext must be used within a DashboardProvider");
    }
    return context;
};

export const DashboardProvider = ({ children }) => {
    const [timeFilter, setTimeFilter] = useState('live');
    const [customRange, setCustomRange] = useState({
        start: localStorage.getItem('dashboard_start_date') || new Date().toISOString().split('T')[0],
        end: localStorage.getItem('dashboard_end_date') || new Date().toISOString().split('T')[0]
    });

    // SSE Stream Data
    const {
        stats: liveStats = {},
        liveCalls = [],
        recentCalls: liveRecentCalls = [],
        categoryStats: liveCategoryStats = []
    } = useStreamData() || {};

    const [recentCallsPage, setRecentCallsPage] = useState(1);
    const [recentCallsStatuses, setRecentCallsStatuses] = useState([]);

    // Historical Data Queries (only enabled if NOT 'live')
    const { data: fetchedStats } = useDashboardStats(
        timeFilter,
        customRange
    );

    const { data: fetchedCategoryStats = [] } = useCategoryStats(
        timeFilter,
        customRange
    );

    const { data: fetchedRecentCalls = [], meta: fetchedRecentMeta = {} } = useCompletedCalls(
        recentCallsPage,
        timeFilter,
        customRange,
        recentCallsStatuses
    );

    // Simplified Live vs Historical stats
    const stats = timeFilter === 'live' ? liveStats : (fetchedStats || {});

    const categoryStats = timeFilter === 'live' ? liveCategoryStats : fetchedCategoryStats;

    const recentCalls = timeFilter === 'live'
        ? { data: liveRecentCalls, meta: { pagination: { total: liveRecentCalls.length, pageCount: 1 } } }
        : { data: fetchedRecentCalls, meta: fetchedRecentMeta };

    const handleFilterChange = (filter, range) => {
        setTimeFilter(filter);
        if (range) {
            setCustomRange(range);
            localStorage.setItem('dashboard_start_date', range.start);
            localStorage.setItem('dashboard_end_date', range.end);
        }
    };

    const value = {
        filter: timeFilter,
        customRange,
        handleFilterChange,
        stats,
        liveCalls,
        categoryStats,
        recentCalls,
        recentCallsPage,
        setRecentCallsPage,
        recentCallsStatuses,
        setRecentCallsStatuses,
    };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};
