import { useState } from "react";
import * as Style from "./styles";
import Header from "./Header";
import { useStreamData } from "../../hooks/dashboard";
import CategoryGrid from "./CategoryGrid";
import LiveCallsTable from "./LiveCallsTable";
import RecentCallsTable from "./RecentCallsTable";
import KpiSection from "./KpiSection";

// import TopConsultants from "./TopConsultants";
// import ExpertsSnapshot from "./ExpertsSnapshot";

export default function CallsLiveDashboard() {
    const { stats = {}, liveCalls } = useStreamData() || {}; // Stream data
    const [timeFilter, setTimeFilter] = useState('60min');
    const [customRange, setCustomRange] = useState({ start: '', end: '' });

    const handleFilterChange = (filter, custom) => {
        setTimeFilter(filter);
        if (custom) setCustomRange(custom);
    };

    return (
        <Style.DashboardContainer>
            <Header stats={stats} filter={timeFilter} onFilterChange={handleFilterChange} />

            <Style.Main>
                <Style.GridContainer>
                    <Style.Column>
                        <KpiSection stats={stats} />
                        <CategoryGrid
                            liveCalls={liveCalls?.length}
                            filter={timeFilter}
                            customRange={customRange}
                        />

                        {/* <ExpertsSnapshot />
                        <TopConsultants /> */}
                    </Style.Column>

                    <Style.Column>
                        <LiveCallsTable stats={stats} liveCalls={liveCalls} />
                        <RecentCallsTable
                            liveCalls={liveCalls?.length}
                            filter={timeFilter}
                            customRange={customRange}
                        />
                    </Style.Column>
                </Style.GridContainer>
            </Style.Main>
        </Style.DashboardContainer>
    );
}
