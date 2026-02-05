import { useQuery } from "@tanstack/react-query";
import { useFetchClient } from "@strapi/strapi/admin";
import { useEffect, useState } from "react";
import { getDateRange } from "../utils/helper";


export const useCompletedCalls = (page = 1, filter = '60min', customRange, statuses = []) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter, customRange);
    // filter call activity by status
    const params = {
        filters: {
            createdAt: {
                $gte: start,
                $lte: end
            }
        },
        pagination: {
            page,
            pageSize: 20
        }
    };

    if (statuses.length > 0) {
        params.filters.callStatus = { $in: statuses };
    } else {
        params.filters.callStatus = {
            $notIn: ['pending', 'ongoing']
        };
    }

    const query = useQuery({
        queryKey: ["completed-calls", page, filter, customRange, statuses],
        queryFn: async () => {
            const { data } = await get("/admin-pannel/recent-calls", { params });
            return data;
        },
    });

    return { ...query, data: query.data?.data, meta: query.data?.meta || {} };
};



export const useDashboardStats = (filter = 'today', customRange) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter, customRange);

    return useQuery({
        queryKey: ["dashboard-stats", filter, customRange],
        enabled: filter !== 'live',
        queryFn: async () => {
            const { data } = await get("/admin-pannel/stats", {
                params: {
                    filters: {
                        createdAt: {
                            $gte: start,
                            $lte: end
                        }
                    }
                }
            });
            return data;
        },
        initialData: {
            voice: { liveCalls: 0, callsToday: 0, declinedCalls: 0, missedCalls: 0, completedCalls: 0, avgDuration: 0 },
            video: { liveCalls: 0, callsToday: 0, declinedCalls: 0, missedCalls: 0, completedCalls: 0, avgDuration: 0 },
            expertsOnline: 0
        }
    });
};



export const useCategoryStats = (filter = 'today', customRange) => {
    const { get } = useFetchClient();
    const { start, end } = getDateRange(filter, customRange);

    return useQuery({
        queryKey: ["category-stats", filter, customRange],
        enabled: true,
        queryFn: async () => {
            const { data } = await get("/admin-pannel/category-stats", {
                params: {
                    filters: {
                        createdAt: {
                            $gte: start,
                            $lte: end
                        }
                    }
                }
            });
            return data;
        }
    });
};




export const useStreamData = () => {
    const [liveData, setLiveData] = useState({
        stats: {},
        liveCalls: [],
        recentCalls: [],
        categoryStats: []
    });

    useEffect(() => {
        const eventSource = new EventSource(`${window.strapi?.backendURL}/admin-pannel/stream`);
        eventSource.onmessage = function (event) {
            try {
                const data = JSON.parse(event.data);
                console.log('📡 [SSE] Received chunk:', Object.keys(data));

                if (data && typeof data === 'object') {
                    setLiveData(prev => ({
                        ...prev,
                        ...data
                    }));
                }
            } catch (error) {
                console.error('SSE data parsing error:', error);
            }
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