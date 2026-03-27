import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PluginLayout from '../components/PluginLayout';
import * as Style from "../components/dashboard/styles";
import Header from "../components/dashboard/Header";
import { DashboardProvider } from "../context/DashboardContext";
import CategoryGrid from "../components/dashboard/CategoryGrid";
import LiveCallsTable from "../components/dashboard/LiveCallsTable";
import RecentCallsTable from "../components/dashboard/RecentCallsTable";
import KpiSection from "../components/dashboard/KpiSection";

const queryClient = new QueryClient();

const HomePage = () => {
    return (
        <PluginLayout>
            <QueryClientProvider client={queryClient}>
                <DashboardProvider>
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
                </DashboardProvider>
            </QueryClientProvider>
        </PluginLayout>
    );
};

export { HomePage };