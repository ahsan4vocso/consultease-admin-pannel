import * as Style from "./styles";
import Header from "./Header";
import { DashboardProvider, useDashboardContext } from "../../context/DashboardContext";
import CategoryGrid from "./CategoryGrid";
import LiveCallsTable from "./LiveCallsTable";
import RecentCallsTable from "./RecentCallsTable";
import KpiSection from "./KpiSection";

import TopConsultants from "./TopConsultants";
import ExpertsSnapshot from "./ExpertsSnapshot";

function DashboardContent() {
    return (
        <Style.DashboardContainer>
            <Header />

            <Style.Main>
                <Style.GridContainer>
                    <Style.Column>
                        <KpiSection />
                        <CategoryGrid />
                    </Style.Column>

                    <Style.Column>
                        <LiveCallsTable />
                        <RecentCallsTable />
                    </Style.Column>
                </Style.GridContainer>
            </Style.Main>
        </Style.DashboardContainer>
    );
}

export default function CallsLiveDashboard() {
    return (
        <DashboardProvider>
            <DashboardContent />
        </DashboardProvider>
    );
}
