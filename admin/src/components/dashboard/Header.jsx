import { useState, useEffect } from "react";
import { PluginIcon } from "../Icons";
import * as Style from "./styles";

export default function Header({ stats, filter, onFilterChange }) {
    const droppedRate = stats.callsToday ? ((stats.declinedCalls / stats.callsToday) * 100).toFixed(1) : 0;

    // Local state for custom dates
    const today = new Date().toISOString().split('T')[0];
    const savedStart = localStorage.getItem('dashboard_start_date');
    const savedEnd = localStorage.getItem('dashboard_end_date');

    console.log('📅 [Header] Initializing dates:', {
        from: savedStart || today,
        to: savedEnd || today,
        source: savedStart ? 'localStorage' : 'default'
    });

    const [startDate, setStartDate] = useState(savedStart || today);
    const [endDate, setEndDate] = useState(savedEnd || today);

    // Update localStorage when dates change
    useEffect(() => {
        if (startDate) localStorage.setItem('dashboard_start_date', startDate);
        if (endDate) localStorage.setItem('dashboard_end_date', endDate);
    }, [startDate, endDate]);

    // Update parent when custom dates change
    useEffect(() => {
        if (filter === 'custom' && startDate && endDate) {
            onFilterChange('custom', { start: startDate, end: endDate });
        }
    }, [startDate, endDate, filter]);

    const handlePresetChange = (preset) => {
        onFilterChange(preset);
    };

    return (
        <Style.Header>
            <Style.HeaderLeft>
                <Style.IconBox><PluginIcon style={{ width: "32px", height: "32px" }} /></Style.IconBox>
                <Style.TitleBox>
                    <Style.Title>Live Calls Dashboard</Style.Title>
                    <Style.Subtitle>Realtime view of ConsultEase calls, categories & expert load.</Style.Subtitle>
                    <Style.MetaText>
                        {stats.callsToday} calls today • {stats.declinedCalls} declined ({droppedRate}%)
                    </Style.MetaText>
                </Style.TitleBox>
            </Style.HeaderLeft>
            <Style.HeaderRight>
                <Style.FilterContainer>
                    {['60min', 'today', 'yesterday', 'week'].map((preset) => (
                        <Style.FilterButton
                            key={preset}
                            active={filter === preset}
                            onClick={() => handlePresetChange(preset)}
                        >
                            {preset === '60min' ? '60 Minutes' : preset.charAt(0).toUpperCase() + preset.slice(1)}
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
