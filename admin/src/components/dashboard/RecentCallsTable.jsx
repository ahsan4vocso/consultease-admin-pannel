import React, { useState } from 'react';
import * as Style from "./styles";
import EmptyState from "./EmptyState";
import { useCompletedCalls } from "../../hooks/dashboard";
import { formatTimeAMPM, formatDurationFromMinutes } from "../../utils/helper";

export default function RecentCallsTable() {
    const [page, setPage] = useState(1);
    const [callsFilter, setCallsFilter] = useState('60min');

    const { data: recentCalls = [], meta = {} } = useCompletedCalls(page, callsFilter) || {};

    const handleNextPage = () => {
        if (page < (meta.pagination?.pageCount || 1)) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    return (
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
            </Style.TableHeader>
            <Style.TableContainer maxHeight="450px" minHeight="200px">
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
    );
}
