import * as Style from './styles';
import Pagination from './Pagination';

const UserReferralTable = ({
    users,
    pagination,
    sortBy,
    onSort,
    onPageChange,
    roleFilter,
    onRoleFilterChange,
    searchValue,
    onSearchChange,
    isLoading,
    isSearching,
}) => {
    const formatCurrency = (value) => {
        const num = parseFloat(value);
        return `₹${num.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    const formatNumber = (value) => {
        return (value || 0).toLocaleString('en-US');
    };

    const sortOptions = [
        { value: 'total_referrals', label: 'Referrals' },
        { value: 'total_earnings_from_referrals', label: 'Referral Earnings' },
        { value: 'total_wallet_topup', label: 'Wallet Topup' },
        { value: 'total_earnings_from_calls', label: 'Call Earnings' }
    ];

    const showEmptyState = !isLoading && (!users || users.length === 0);
    const showData = users && users.length > 0;

    return (
        <Style.TableCard>
            <Style.TableColumn>
                <Style.TableHeader>
                    <Style.TableHeaderLeft>
                        <Style.SearchContainer>
                            <Style.SearchInput
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                            <Style.SearchIconWrapper>
                                {isSearching ? (
                                    <Style.SmallBufferSpinner />
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.35-4.35" />
                                    </svg>
                                )}
                            </Style.SearchIconWrapper>
                        </Style.SearchContainer>
                    </Style.TableHeaderLeft>
                    <Style.TableHeaderRight>
                        <Style.FilterSelect
                            value={roleFilter}
                            onChange={(e) => onRoleFilterChange(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="Expert">Experts</option>
                            <option value="Client">Clients</option>
                        </Style.FilterSelect>

                        <Style.SortSelect
                            value={sortBy}
                            onChange={(e) => onSort(e.target.value)}
                        >
                            {sortOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    Sort by {option.label}
                                </option>
                            ))}
                        </Style.SortSelect>
                    </Style.TableHeaderRight>
                </Style.TableHeader>

                <Style.TableContainer>
                    <Style.Table>
                        <Style.Thead>
                            <Style.Tr index={0}>
                                <Style.Th>Name</Style.Th>
                                <Style.Th>Email</Style.Th>
                                <Style.Th>Contact</Style.Th>
                                <Style.Th>Role</Style.Th>
                                <Style.Th>Referrals</Style.Th>
                                <Style.Th>Ref. Earnings</Style.Th>
                                <Style.Th>Wallet Topup</Style.Th>
                                <Style.Th>Call Earnings</Style.Th>
                            </Style.Tr>
                        </Style.Thead>
                        <Style.Tbody>
                            {isLoading && !showData ? (
                                <Style.Tr index={0}>
                                    <Style.Td colSpan="8" style={{ height: '300px' }}>
                                        <Style.SmallBufferSpinner style={{ margin: '0 auto', width: '40px', height: '40px' }} />
                                    </Style.Td>
                                </Style.Tr>
                            ) : showEmptyState ? (
                                <Style.Tr index={0}>
                                    <Style.Td colSpan="8">
                                        <Style.EmptyState>
                                            <Style.EmptyStateIcon>🔍</Style.EmptyStateIcon>
                                            <Style.EmptyStateText>No results found</Style.EmptyStateText>
                                            <Style.EmptyStateSubtext>Try different search terms or filters</Style.EmptyStateSubtext>
                                        </Style.EmptyState>
                                    </Style.Td>
                                </Style.Tr>
                            ) : (
                                users.map((user, index) => (
                                    <Style.Tr key={user.id} index={index}>
                                        <Style.Td><strong>{user.name}</strong></Style.Td>
                                        <Style.Td>{user.email}</Style.Td>
                                        <Style.Td>{user.mobile}</Style.Td>
                                        <Style.Td>
                                            <Style.RoleBadge role={user.role}>{user.role}</Style.RoleBadge>
                                        </Style.Td>
                                        <Style.Td><Style.HighlightValue>{formatNumber(user.total_referrals)}</Style.HighlightValue></Style.Td>
                                        <Style.Td><Style.CurrencyValue>{formatCurrency(user.total_earnings_from_referrals)}</Style.CurrencyValue></Style.Td>
                                        <Style.Td>{formatCurrency(user.total_wallet_topup)}</Style.Td>
                                        <Style.Td><Style.CurrencyValue>{formatCurrency(user.total_earnings_from_calls)}</Style.CurrencyValue></Style.Td>
                                    </Style.Tr>
                                ))
                            )}
                        </Style.Tbody>
                    </Style.Table>
                </Style.TableContainer>

                <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.pageCount}
                    onPageChange={onPageChange}
                    totalItems={pagination.total}
                    pageSize={pagination.pageSize}
                />
            </Style.TableColumn>
        </Style.TableCard>
    );
};

export default UserReferralTable;
