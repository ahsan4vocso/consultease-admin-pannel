import { useState, useEffect } from 'react';
import { useReferralUserStats } from '../../hooks/referral';
import { useDebounce } from '../../hooks/helper';
import * as Style from './styles';
import Pagination from './Pagination';
import { formatCurrency, getInitials } from '../../utils/helper';
import { SearchIcon } from '../Icons';

const UserReferralTable = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedSearch = useDebounce(searchQuery, 300);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('total_referrals');
    const [sortOrder, setSortOrder] = useState('desc');
    const [roleFilter, setRoleFilter] = useState('Expert');


    useEffect(() => { setCurrentPage(1) }, [debouncedSearch, roleFilter, sortBy]);

    const { data, isLoading, isFetching } = useReferralUserStats({
        page: currentPage,
        pageSize: 10,
        sort: `${sortBy}:${sortOrder}`,
        role: roleFilter,
        search: debouncedSearch
    });

    const items = data?.data || [];
    const pagination = data?.meta?.pagination || { page: 1, pageSize: 10, total: 0, pageCount: 0 };

    const toggleSort = (col) => {
        setSortBy(col);
        setSortOrder(col === 'name' ? 'asc' : 'desc');
    };

    const handleSortChange = (e) => {
        const field = e.target.value;
        setSortBy(field);
        setSortOrder(field === 'name' ? 'asc' : 'desc');
    };

    return (
        <Style.TableCard>
            <Style.TableHeader>
                <Style.TableHeaderLeft style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: '0 2px', color: 'inherit' }}>Referral Performance</h2>
                    <p style={{ fontSize: '1.2rem', color: 'inherit', opacity: 0.7, margin: '0 0 2px 4px' }}>Detailed metrics for user contributions</p>
                    <p style={{ fontSize: '1.1rem', color: 'inherit', opacity: 0.5, margin: '0 0 0 4px' }}>
                        {pagination.total} records • {pagination.pageCount} pages
                    </p>
                </Style.TableHeaderLeft>

                <Style.TableHeaderRight>
                    <Style.StandaloneFilter>
                        <Style.FilterSelect
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                        >
                            <option value="all">All Roles</option>
                            <option value="Expert">Experts</option>
                            <option value="Client">Clients</option>
                        </Style.FilterSelect>
                    </Style.StandaloneFilter>

                    <Style.StandaloneFilter>
                        <Style.FilterSelect
                            value={sortBy}
                            onChange={handleSortChange}
                        >
                            <option value="total_referrals">By Referrals</option>
                            <option value="total_earnings_from_referrals">By Earnings</option>
                            <option value="total_wallet_topup">By Wallet</option>
                            <option value="name">By Name</option>
                        </Style.FilterSelect>
                    </Style.StandaloneFilter>

                    <Style.SearchContainer>
                        <Style.SearchGroup>
                            <Style.SearchInput
                                type="text"
                                placeholder="What are you looking for?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />

                            <Style.SearchButton>
                                {isFetching ? (
                                    <Style.SmallBufferSpinner />
                                ) : (
                                    <SearchIcon />
                                )}
                            </Style.SearchButton>
                        </Style.SearchGroup>
                    </Style.SearchContainer>
                </Style.TableHeaderRight>
            </Style.TableHeader>

            <Style.TableContainer>
                <Style.Table>
                    <Style.Thead>
                        <Style.Tr>
                            <Style.Th onClick={() => toggleSort('name')} style={{ cursor: 'pointer' }}>
                                User Profile {sortBy === 'name' ? '↑' : ''}
                            </Style.Th>
                            <Style.Th>Contact Details</Style.Th>
                            <Style.Th onClick={() => toggleSort('total_referrals')} style={{ cursor: 'pointer' }}>
                                Referrals {sortBy === 'total_referrals' ? '↓' : ''}
                            </Style.Th>
                            <Style.Th onClick={() => toggleSort('total_earnings_from_referrals')} style={{ cursor: 'pointer' }}>
                                Ref. Earnings {sortBy === 'total_earnings_from_referrals' ? '↓' : ''}
                            </Style.Th>
                            <Style.Th onClick={() => toggleSort('total_wallet_topup')} style={{ cursor: 'pointer' }}>
                                Wallet Topup {sortBy === 'total_wallet_topup' ? '↓' : ''}
                            </Style.Th>
                        </Style.Tr>
                    </Style.Thead>
                    <Style.Tbody>
                        {isLoading ? (
                            <Style.Tr><Style.Td colSpan="5" style={{ padding: '8rem' }}>Gathering referral data...</Style.Td></Style.Tr>
                        ) : items.length === 0 ? (
                            <Style.Tr><Style.Td colSpan="5" style={{ padding: '8rem' }}>No records discovered.</Style.Td></Style.Tr>
                        ) : (
                            items.map((user, idx) => (
                                <Style.Tr key={user.id} index={idx}>
                                    <Style.Td>
                                        <Style.ProfileCell>
                                            <Style.Avatar role={user.role}>
                                                {getInitials(user.name)}
                                            </Style.Avatar>
                                            <Style.NameInfo>
                                                <Style.NameLabel>
                                                    {user.name}
                                                    {user.role === 'Expert' && <Style.CrownIcon>👑</Style.CrownIcon>}
                                                </Style.NameLabel>
                                                {user.role === 'Expert' ? (
                                                    <Style.ExpertTag>
                                                        Expert
                                                    </Style.ExpertTag>
                                                ) : (
                                                    <Style.ClientTag>
                                                        Client
                                                    </Style.ClientTag>
                                                )}
                                            </Style.NameInfo>
                                        </Style.ProfileCell>
                                    </Style.Td>
                                    <Style.Td>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                                            <div style={{ fontSize: '1.25rem', color: 'inherit' }}>{user.mobile}</div>
                                            <div style={{ fontSize: '1.1rem', color: 'inherit', opacity: 0.6 }}>{user.email}</div>
                                        </div>
                                    </Style.Td>
                                    <Style.Td>
                                        <Style.HighlightValue style={{ fontSize: '1.5rem', display: 'block', color: 'inherit' }}>{user.total_referrals || 0}</Style.HighlightValue>
                                    </Style.Td>
                                    <Style.Td>
                                        <Style.CurrencyValue style={{ fontSize: '1.4rem', display: 'block' }}>{formatCurrency(user.total_earnings_from_referrals)}</Style.CurrencyValue>
                                    </Style.Td>
                                    <Style.Td>
                                        <span style={{ color: 'inherit', fontSize: '1.4rem', display: 'block' }}>{formatCurrency(user.total_wallet_topup)}</span>
                                    </Style.Td>
                                </Style.Tr>
                            ))
                        )}
                    </Style.Tbody>
                </Style.Table>
            </Style.TableContainer>

            {!isLoading && pagination.pageCount > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={pagination.pageCount}
                    onPageChange={setCurrentPage}
                    totalItems={pagination.total}
                    pageSize={pagination.pageSize}
                />
            )}
        </Style.TableCard>
    );
};

export default UserReferralTable;
