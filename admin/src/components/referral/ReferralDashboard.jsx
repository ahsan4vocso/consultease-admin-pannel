import useReferral from '../../hooks/referral';
import UserReferralTable from './UserReferralTable';
import StatsSection from './StatsSection';
import DashboardHeader from './DashboardHeader';
import * as Style from './styles';

const ReferralDashboard = () => {
    const {
        users,
        pagination,
        searchQuery,
        setSearch,
        setPage,
        sortBy,
        sortOrder,
        toggleSort,
        roleFilter,
        setRoleFilter,
        isLoading,
        isFetching,
        isSearching,
        globalStats,
        isPlaceholderData,
        error,
    } = useReferral();

    return (
        <Style.DashboardContainer>
            <DashboardHeader />

            <Style.MainContent>
                <StatsSection globalStats={globalStats} />
                <Style.TableColumn>
                    <UserReferralTable
                        users={users}
                        pagination={pagination}
                        sortBy={sortBy}
                        onSort={toggleSort}
                        onPageChange={setPage}
                        roleFilter={roleFilter}
                        onRoleFilterChange={setRoleFilter}
                        searchValue={searchQuery}
                        onSearchChange={setSearch}
                        isLoading={isLoading}
                        isFetching={isFetching}
                        isSearching={isSearching}
                        isPlaceholderData={isPlaceholderData}
                    />
                </Style.TableColumn>
            </Style.MainContent>
        </Style.DashboardContainer>
    );
};

export default ReferralDashboard;
