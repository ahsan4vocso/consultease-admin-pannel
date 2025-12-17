import * as Style from "./styles";

export default function Header({ stats }) {
    const droppedRate = stats.callsToday ? ((stats.declinedCalls || 0 / stats.callsToday) * 100).toFixed(1) : 0;

    return (
        <Style.Header>
            <Style.HeaderLeft>
                <Style.IconBox>📞</Style.IconBox>
                <Style.TitleBox>
                    <Style.Title>Live Calls Dashboard</Style.Title>
                    <Style.Subtitle>Realtime view of ConsultEase calls, categories & expert load.</Style.Subtitle>
                    <Style.MetaText>
                        {stats.callsToday} calls today • {stats.declinedCalls} declined ({droppedRate}%)
                    </Style.MetaText>
                </Style.TitleBox>
            </Style.HeaderLeft>
            {/* <Style.HeaderRight>
                <Style.LiveBadge>
                    <Style.LiveDot />
                    <Style.LiveText>Live</Style.LiveText>
                    <Style.UpdatedText>Updated every 5 sec</Style.UpdatedText>
                </Style.LiveBadge>
                <Style.Select>
                    <option>Last 1 hour</option>
                    <option>Today</option>
                    <option>Yesterday</option>
                    <option>Last 7 days</option>
                </Style.Select>
                <Style.RefreshButton>Refresh</Style.RefreshButton>
            </Style.HeaderRight> */}
        </Style.Header>
    )
}