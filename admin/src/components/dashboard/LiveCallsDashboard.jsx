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


    return (
        <Style.DashboardContainer>
            <Header stats={stats} />

            <Style.Main>
                <Style.GridContainer>
                    <Style.Column>
                        <KpiSection stats={stats} />
                        <CategoryGrid liveCalls={liveCalls?.length} />

                        {/* <ExpertsSnapshot /> */}
                        {/* <TopConsultants /> */}
                    </Style.Column>

                    <Style.Column>
                        <LiveCallsTable stats={stats} liveCalls={liveCalls} />
                        <RecentCallsTable liveCalls={liveCalls?.length} />
                    </Style.Column>
                </Style.GridContainer>
            </Style.Main>
        </Style.DashboardContainer>
    );
}
