import { useState, useEffect, useRef } from 'react';
import * as Style from "./styles";
import EmptyState from "./EmptyState";
import { useCompletedCalls } from "../../hooks/dashboard";
import { formatTimeAMPM, minutesToMMSS, formatDateTime } from "../../utils/helper";
import { ChevronDown, Tick, VideoCall, VoiceCall } from "../../components/Icons";
import { StarRating } from "./Rating";

const STATUS_OPTIONS = [
    { label: 'Completed', value: 'completed' },
    { label: 'Declined', value: 'declined' },
    { label: 'Missed', value: 'missed' },
    { label: 'Busy', value: 'busy' },
    { label: 'Force Completed', value: 'force complete by admin' }
];

export default function RecentCallsTable({ liveCalls, filter, customRange }) {
    const [page, setPage] = useState(1);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    useEffect(() => { setPage(1) }, [filter]);

    const { data: recentCalls = [], meta = {} } = useCompletedCalls(
        page,
        filter,
        liveCalls,
        customRange,
        selectedStatuses
    ) || {};

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNextPage = () => {
        if (page < (meta.pagination?.pageCount || 1)) setPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage((prev) => prev - 1);
    };

    const toggleStatus = (status) => {
        setPage(1); // Reset to first page on filter change
        setSelectedStatuses(prev =>
            prev.includes(status)
                ? prev.filter(s => s !== status)
                : [...prev, status]
        );
    };

    return (
        <Style.TableSection>
            <Style.TableHeader>
                <div>
                    <Style.CardTitle>Call Activity</Style.CardTitle>
                    <Style.CardSubtitle>All closed calls snapshot. {meta.pagination?.total ? `Total calls: ${meta.pagination?.total}` : ''}</Style.CardSubtitle>
                </div>

                <Style.DropdownContainer ref={filterRef}>
                    <Style.DropdownButton onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        Filter {selectedStatuses.length > 0 && `(${selectedStatuses.length})`}
                        <ChevronDown />
                    </Style.DropdownButton>

                    {isFilterOpen && (
                        <Style.DropdownMenu>
                            {STATUS_OPTIONS.map(opt => (
                                <Style.DropdownItem
                                    key={opt.value}
                                    onClick={() => toggleStatus(opt.value)}
                                >
                                    {opt.label}
                                    {selectedStatuses.includes(opt.value) && (
                                        <Style.TickIcon>
                                            <Tick />
                                        </Style.TickIcon>
                                    )}
                                </Style.DropdownItem>
                            ))}
                        </Style.DropdownMenu>
                    )}
                </Style.DropdownContainer>
            </Style.TableHeader>

            <Style.TableContainer maxHeight="450px" minHeight="200px">
                <Style.Table>
                    <Style.Thead>
                        <tr>
                            <Style.Th>Call Id</Style.Th>
                            <Style.Th>Type</Style.Th>
                            <Style.Th>Caller</Style.Th>
                            <Style.Th>Expert</Style.Th>
                            <Style.Th>Category</Style.Th>
                            <Style.Th>Start Time</Style.Th>
                            <Style.Th>Duration</Style.Th>
                            <Style.Th>Status</Style.Th>
                            <Style.Th>Rating</Style.Th>
                        </tr>
                    </Style.Thead>
                    <tbody>
                        {recentCalls.length === 0 ? (
                            <tr>
                                <td colSpan="9">
                                    <EmptyState
                                        title="No completed calls"
                                        subtitle={{
                                            '60min': "No calls in the last 60 minutes.",
                                            'today': "No calls completed today.",
                                            'yesterday': "No calls completed yesterday.",
                                            'week': "No calls completed this week.",
                                            'custom': "No calls found for the selected range and criteria."
                                        }[filter]}
                                    />
                                </td>
                            </tr>
                        ) : (
                            recentCalls.map((call, idx) => (
                                <Style.Tr
                                    key={idx}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, '_blank')}
                                >
                                    <Style.Td fontSize="1.4rem">{call.id}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.type == "voiceCall" ? <VoiceCall style={{ width: "20px", height: "20px", color: "#5272a3ff" }} /> : <VideoCall style={{ width: "20px", height: "20px", color: "#219bacff" }} />}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.caller}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.expert}</Style.Td>
                                    <Style.Td fontSize="1.4rem">
                                        <Style.CategoryBadge>{call.category || 'Other'}</Style.CategoryBadge>
                                    </Style.Td>
                                    <Style.Td fontSize="1.4rem">{formatDateTime(call.time)}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{minutesToMMSS(call.duration)}</Style.Td>
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
                                            {call.status === "pending" ? "Calling" : call.status}
                                        </Style.StatusBadge>
                                    </Style.Td>
                                    <Style.Td fontSize="1.4rem">
                                        <Style.RatingStars>
                                            <StarRating rating={call.rating} size={10} />
                                        </Style.RatingStars>
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
