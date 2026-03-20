import { useState, useEffect, useRef } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useFetchClient } from '@strapi/strapi/admin';
import { PLUGIN_ID } from '../pluginId';

const useReferral = () => {
    const { get } = useFetchClient();
    const lastFetchedSearch = useRef('');

    // State management
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('total_referrals');
    const [sortOrder, setSortOrder] = useState('desc');
    const [roleFilter, setRoleFilter] = useState('Expert');
    const pageSize = 10;

    // Debounce search query
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1); // Reset to first page on search
        }, 300);

        return () => clearTimeout(handler);
    }, [searchQuery]);

    // Fetch data using React Query
    const { data, isLoading, isFetching, isPlaceholderData, error } = useQuery({
        queryKey: ['referralStats', currentPage, sortBy, sortOrder, roleFilter, debouncedSearch],
        queryFn: async () => {
            const response = await get(`/${PLUGIN_ID}/referral-stats`, {
                params: {
                    page: currentPage,
                    pageSize,
                    sort: `${sortBy}:${sortOrder}`,
                    role: roleFilter,
                    search: debouncedSearch
                }
            });
            return response.data;
        },
        placeholderData: keepPreviousData
    });

    // Update lastFetchedSearch when a query completes
    useEffect(() => {
        if (!isFetching && data) {
            lastFetchedSearch.current = debouncedSearch;
        }
    }, [isFetching, data, debouncedSearch]);

    // Determine if the current fetch is strictly a search-driven fetch
    const isSearching = isFetching && debouncedSearch !== lastFetchedSearch.current;

    const paginatedUsers = data?.data || [];
    const globalStats = data?.meta?.globalStats || {
        totalReferrals: 0,
        expertReferrals: 0,
        clientReferrals: 0,
        totalProgramSpend: 0
    };
    const pagination = data?.meta?.pagination || {
        page: currentPage,
        pageSize,
        total: 0,
        pageCount: 0
    };

    // Toggle sort order for a column
    const toggleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('desc');
        }
        setCurrentPage(1);
    };

    // Reset to first page when role filter changes
    const setRole = (role) => {
        setRoleFilter(role);
        setCurrentPage(1);
    };

    return {
        users: paginatedUsers,
        globalStats,
        pagination,
        searchQuery,
        setSearch: setSearchQuery,
        currentPage,
        setPage: setCurrentPage,
        sortBy,
        sortOrder,
        toggleSort,
        roleFilter,
        setRoleFilter: setRole,
        isLoading,
        isFetching,
        isSearching,
        isPlaceholderData,
        error,
        totalUsers: pagination.total,
        filteredCount: pagination.total
    };
};

export default useReferral;
