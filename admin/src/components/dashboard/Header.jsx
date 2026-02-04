import { useState, useEffect } from "react";
import { PluginIcon } from "../Icons";
import * as Style from "./styles";
import { useDashboardContext } from "../../context/DashboardContext";

export default function Header() {
    const { stats, filter, handleFilterChange, customRange } = useDashboardContext();
    const { voice = {}, video = {} } = stats || {};
    const totalCallsToday = (voice.callsToday || 0) + (video.callsToday || 0);
    const totalDeclinedCalls = (voice.declinedCalls || 0) + (video.declinedCalls || 0);

    const droppedRate = totalCallsToday ? ((totalDeclinedCalls / totalCallsToday) * 100).toFixed(1) : 0;

    const [startDate, setStartDate] = useState(customRange.start);
    const [endDate, setEndDate] = useState(customRange.end);

    // Update local state when context changes (e.g. from localstorage on init)
    useEffect(() => {
        setStartDate(customRange.start);
        setEndDate(customRange.end);
    }, [customRange]);

    // Update context when local dates change
    useEffect(() => {
        if (filter === 'custom' && startDate && endDate) {
            handleFilterChange('custom', { start: startDate, end: endDate });
        }
    }, [startDate, endDate, filter]);

    const handlePresetChange = (preset) => {
        handleFilterChange(preset);
    };

    return (
        <Style.Header>
            <Style.HeaderLeft>
                <Style.IconBox><PluginIcon style={{ width: "32px", height: "32px" }} /></Style.IconBox>
                <Style.TitleBox>
                    <Style.Title>Live Calls Dashboard</Style.Title>
                    <Style.Subtitle>Realtime view of ConsultEase calls, categories & expert load.</Style.Subtitle>
                    <Style.MetaText>
                        {totalCallsToday} {filter === 'live' ? 'calls today' : `calls in this ${filter}`} • {totalDeclinedCalls} declined ({droppedRate}%)
                    </Style.MetaText>
                </Style.TitleBox>
            </Style.HeaderLeft>
            <Style.HeaderRight>
                <Style.FilterContainer>
                    <Style.LiveFilterButton
                        active={filter === 'live'}
                        onClick={() => handlePresetChange('live')}
                    >
                        <Style.LiveDot /> Live
                    </Style.LiveFilterButton>

                    <Style.FilterDivider />

                    {['yesterday', 'week', 'quarter'].map((preset) => (
                        <Style.FilterButton
                            key={preset}
                            active={filter === preset}
                            onClick={() => handlePresetChange(preset)}
                        >
                            {preset.charAt(0).toUpperCase() + preset.slice(1)}
                        </Style.FilterButton>
                    ))}

                    <Style.FilterButton
                        active={filter === 'custom'}
                        onClick={() => handlePresetChange('custom')}
                    >
                        Custom Range
                    </Style.FilterButton>

                    {filter === 'custom' && (
                        <Style.CustomRangeContainer>
                            <Style.DateLabel>From</Style.DateLabel>
                            <Style.DateInput
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <Style.DateLabel>To</Style.DateLabel>
                            <Style.DateInput
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </Style.CustomRangeContainer>
                    )}
                </Style.FilterContainer>
            </Style.HeaderRight>
        </Style.Header>
    )
}
