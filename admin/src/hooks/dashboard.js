import { useQuery } from "@tanstack/react-query";
import { useFetchClient } from "@strapi/strapi/admin";
import { useEffect, useState } from "react";

// const getDateRange = (filter, customRange) => {
//     const now = new Date();
//     let start = new Date();
//     let end = new Date();

//     // Handle 'custom' filter with start and end range
//     if (filter === 'custom' && customRange?.start && customRange?.end) {
//         return {
//             start: new Date(customRange.start).toISOString(),
//             end: new Date(new Date(customRange.end).setHours(23, 59, 59, 999)).toISOString() // Set end to the last moment of the day
//         };
//     }

//     // For '60min', set the start to 60 minutes ago and the end to now
//     if (filter === '60min') {
//         start = new Date(now.getTime() - 60 * 60 * 1000); // 60 minutes ago
//         return { start: start.toISOString(), end: now.toISOString() };
//     }

//     // For 'yesterday', set the start to midnight of the previous day and end to 23:59:59 of the same day
//     if (filter === 'yesterday') {
//         start.setDate(now.getDate() - 1);
//         start.setHours(0, 0, 0, 0);
//         end.setDate(now.getDate() - 1);
//         end.setHours(23, 59, 59, 999);
//         return { start: start.toISOString(), end: end.toISOString() };
//     }

//     // For 'week', set the start to 7 days ago and the end to now
//     if (filter === 'week') {
//         start.setDate(now.getDate() - 7);
//         return { start: start.toISOString(), end: now.toISOString() };
//     }

//     // Default: 'today' filter logic
//     start.setHours(0, 0, 0, 0);
//     return { start: start.toISOString(), end: now.toISOString() };
// };

const getDateRange = (filter, customRange) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    // Handle 'today' filter
    if (filter === 'today') {
        start.setHours(0, 0, 0, 0);  // Set start to midnight (beginning of today)
        end.setHours(23, 59, 59, 999); // Set end to 23:59:59.999 (end of today)
        return { start: start.toISOString(), end: end.toISOString() };
    }

    // For '60min', set the start to 60 minutes ago and the end to now
    if (filter === '60min') {
        start = new Date(now.getTime() - 60 * 60 * 1000); // 60 minutes ago
        return { start: start.toISOString(), end: now.toISOString() };
    }

    // For 'yesterday', set the start to midnight of the previous day and end to 23:59:59 of the same day
    if (filter === 'yesterday') {
        start.setDate(now.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        return { start: start.toISOString(), end: end.toISOString() };
    }

    // For 'week', set the start to 7 days ago and the end to now
    if (filter === 'week') {
        start.setDate(now.getDate() - 7);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    // Default: 'custom' filter logic can be handled here (if needed)
    if (filter === 'custom' && customRange?.start && customRange?.end) {
        return {
            start: new Date(customRange.start).toISOString(),
            end: new Date(new Date(customRange.end).setHours(23, 59, 59, 999)).toISOString() // Set end to the last moment of the day
        };
    }
    return { start: start.toISOString(), end: now.toISOString() };
};


export const useCompletedCalls = (page = 1, filter = '60min', liveCalls, customRange, statuses = []) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter, customRange);
    // Build the query string with multiple status filters if provided
    let statusFilter = '';
    if (statuses.length > 0) {
        statusFilter = statuses.map((status, index) => `&filters[callStatus][$in][${index}]=${status}`).join('');
    } else {
        // Default: exclude pending and ongoing
        statusFilter = '&filters[callStatus][$notIn][0]=pending&filters[callStatus][$notIn][1]=ongoing';
    }

    const api = `/admin-pannel/recent-calls?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}${statusFilter}&pagination[page]=${page}&pagination[pageSize]=20`;

    const { data, ...rest } = useQuery({
        queryKey: ["completed-calls", page, filter, liveCalls, customRange, statuses],
        enabled: liveCalls !== undefined,
        queryFn: async () => {
            const { data } = await get(api);
            return data;
        },
    });

    return { data: data?.data, meta: data?.meta || {}, ...rest };
};



export const useCategoryStats = (filter = 'today', liveCalls, customRange) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter, customRange);
    const api = `/admin-pannel/category-stats?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}`;

    return useQuery({
        queryKey: ["category-stats", filter, liveCalls, customRange],
        enabled: liveCalls !== undefined,
        queryFn: async () => {
            const { data } = await get(api);
            return data;
        }
    });
};




export const useStreamData = () => {
    const [liveData, setLiveData] = useState();
    console.log(window.strapi?.backendURL);
    useEffect(() => {
        const eventSource = new EventSource(`${window.strapi?.backendURL}/admin-pannel/stream`);
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