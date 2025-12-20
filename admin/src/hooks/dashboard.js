import { useQuery } from "@tanstack/react-query";
import { useFetchClient } from "@strapi/strapi/admin";
import { useEffect, useState } from "react";

const getDateRange = (filter) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (filter === '60min') {
        start = new Date(now.getTime() - 60 * 60 * 1000);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'yesterday') {
        start.setDate(now.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        return { start: start.toISOString(), end: end.toISOString() };
    }

    if (filter === 'week') {
        start.setDate(now.getDate() - 7);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    // Default: Today
    start.setHours(0, 0, 0, 0);
    return { start: start.toISOString(), end: now.toISOString() };
};

export const useCompletedCalls = (page = 1, filter = '60min', liveCalls) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter);

    // Filters based on createdAt to capture calls MADE in that window
    const api = `/api/recent-calls?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}&pagination[page]=${page}&pagination[pageSize]=20`;

    const { data, ...rest } = useQuery({
        queryKey: ["completed-calls", page, filter, liveCalls],
        enabled: liveCalls !== undefined,
        queryFn: async () => {
            const { data } = await get(api);
            return data;
        },
    });

    return { data: data?.data, meta: data?.meta || {}, ...rest };
};

export const useCategoryStats = (filter = 'today', liveCalls) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter);
    const api = `/api/category-stats?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}`;

    return useQuery({
        queryKey: ["category-stats", filter, liveCalls],
        enabled: liveCalls !== undefined,
        queryFn: async () => {
            const { data } = await get(api);
            return data;
        }
    });
};




export const useStreamData = () => {
    const [liveData, setLiveData] = useState();

    useEffect(() => {
        const eventSource = new EventSource(`${window.strapi?.backendURL}/api/stream`);

        eventSource.onmessage = function (event) {
            const data = JSON.parse(event.data);
            setLiveData(data);
        };

        eventSource.onerror = function (error) {
            console.error('SSE connection error:', error);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    return liveData;
};