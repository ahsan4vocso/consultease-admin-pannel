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
    // Stream data
    const { stats = {}, liveCalls = [] } = useStreamData() || {};

    return (
        <Style.DashboardContainer>
            <Header stats={stats} />

            <Style.Main>
                {/* Left = stats, Right = records */}
                <Style.GridContainer>
                    <Style.Column>
                        <KpiSection />
                        <CategoryGrid />

                        {/* <ExpertsSnapshot /> */}
                        {/* <TopConsultants /> */}
                    </Style.Column>

                    {/* RIGHT COLUMN: Records (live + recent calls) */}
                    <Style.Column>
                        <LiveCallsTable stats={stats} liveCalls={liveCalls} />
                        <RecentCallsTable />
                    </Style.Column>
                </Style.GridContainer>
            </Style.Main>
        </Style.DashboardContainer>
    );
}
