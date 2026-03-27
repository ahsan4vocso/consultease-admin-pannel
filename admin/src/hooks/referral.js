import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useFetchClient } from '@strapi/strapi/admin';
import { PLUGIN_ID } from '../pluginId';

// Hook for fetching global platform statistics (for KPI cards)
export const useReferralStats = () => {
    const { get } = useFetchClient();
    return useQuery({
        queryKey: ['referral_stats'],
        queryFn: async () => {
            const response = await get(`/${PLUGIN_ID}/referral-stats`);
            return response.data.data;
        }
    });
};

// Hook for fetching paginated user referral statistics (for the table)
export const useReferralUserStats = (params) => {
    const { get } = useFetchClient();
    return useQuery({
        queryKey: ['referral_table_stats', params],
        queryFn: async () => {
            const response = await get(`/${PLUGIN_ID}/referral-table-data`, { params });
            return response.data;
        },
        placeholderData: keepPreviousData
    });
};

// Shortcut for backward compatibility
export const useReferral = useReferralUserStats;