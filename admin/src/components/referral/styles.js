import styled, { keyframes, css } from 'styled-components';

// ============================================
// ANIMATIONS
// ============================================

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const rowFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// ============================================
// MAIN LAYOUT
// ============================================

export const DashboardContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral800};
  padding: 1rem 2rem;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: stretch;
`;

export const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

export const SmallBufferSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid ${({ theme }) => theme.colors.neutral200};
  border-top: 2px solid ${({ theme }) => theme.colors.primary500 || '#6366f1'};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
  box-sizing: border-box;
`;

// ============================================
// SEARCH BAR
// ============================================

export const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  max-width: 400px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 3rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 1.2rem;
  font-weight: 500;
  transition: all 0.35s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary600};
    background-color: ${({ theme }) => theme.colors.neutral0};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary100};
  }
`;

export const SearchIconWrapper = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.neutral400};
  display: flex;
  align-items: center;
`;

// ============================================
// TABLE
// ============================================

export const TableCard = styled.div`
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  animation: ${slideUp} 0.6s ease-out;
`;

export const TableHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TableHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const TableHeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  @media (max-width: 768px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.6rem 2.5rem 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
`;

export const SortSelect = styled.select`
  padding: 0.6rem 2.5rem 0.6rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23a0aec0' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral100};
`;

export const Th = styled.th`
  padding: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral600};
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  white-space: nowrap;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  animation: ${rowFadeIn} 0.4s ease-out both;
  animation-delay: ${props => (props.index || 0) * 0.05}s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral50};
  }
`;

export const Td = styled.td`
  padding: 1.25rem 1rem;
  color: ${({ theme }) => theme.colors.neutral700};
  text-align: center;
  font-size: 1.2rem;
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 600;
  
  ${props => props.role === 'Expert' && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.colors.success700};
  `}
  
  ${props => props.role === 'Client' && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary700};
  `}
`;

export const HighlightValue = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary600};
`;

export const CurrencyValue = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success600};
`;

// ============================================
// STATS SECTION
// ============================================

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 1.25rem;
  transition: all 0.2s ease;
  animation: ${slideUp} 0.4s ease-out;
  animation-delay: ${props => props.delay || '0s'};
  animation-fill-mode: both;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.tableHeader};
  }
`;

export const StatCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const StatCardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const StatIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => {
    if (props.variant === 'purple') return '#8b5cf6';
    if (props.variant === 'blue') return '#3b82f6';
    if (props.variant === 'orange') return '#f59e0b';
    if (props.variant === 'green') return '#10b981';
    return '#64748b';
  }};
`;

export const StatLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral800};
`;

export const StatSubtitle = styled.div`
  font-size: 0.95rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral500};
`;

export const StatCornerBubble = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 0 12px 0 40px;
  opacity: 0.1;
  background-color: ${props => {
    if (props.variant === 'purple') return '#8b5cf6';
    if (props.variant === 'blue') return '#3b82f6';
    if (props.variant === 'orange') return '#f59e0b';
    if (props.variant === 'green') return '#10b981';
    return '#64748b';
  }};
`;

// ============================================
// PAGINATION
// ============================================

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const PaginationInfo = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.neutral600};
`;

export const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PageButton = styled.button`
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background-color: ${({ theme, $active }) => $active ? theme.colors.primary600 : theme.colors.neutral0};
  color: ${({ theme, $active }) => $active ? 'white' : theme.colors.neutral700};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: ${({ theme, $active }) => $active ? theme.colors.primary700 : theme.colors.neutral100};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// ============================================
// EMPTY STATE
// ============================================

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const EmptyStateText = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral700};
  margin: 0;
`;

export const EmptyStateSubtext = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin-top: 0.5rem;
`;
