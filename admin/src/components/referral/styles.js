import styled, { keyframes, css } from 'styled-components';

// ============================================
// DESIGN TOKENS
// ============================================

export const gradients = {
  gold: 'linear-gradient(135deg, #fceabb 0%, #f8b500 100%)',
  blue: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
  emerald: 'linear-gradient(135deg, #0575E6 0%, #021B79 100%)'
};

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

const scrollbarStyles = css`
  /* Custom thin scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.neutral300};
    border-radius: 10px;
    border: 1px solid transparent;
    background-clip: content-box;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.neutral400};
    border: 0px solid transparent;
    background-clip: padding-box;
  }

  /* Support for Firefox (partially) */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => `${theme.colors.neutral300} transparent`};
`;

// ============================================
// HEADER
// ============================================

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const IconBox = styled.div`
  padding: 10px;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.primary600};
`;

export const HeaderTitleBox = styled.div``;

export const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

export const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const HeaderMetaText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  margin-top: 0.125rem;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

// ============================================
// MAIN LAYOUT
// ============================================

export const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  flex-direction: column;
`;

export const DashboardMain = styled.main`
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.neutral100};
  ${scrollbarStyles}
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 1600px) {
    flex-direction: row;
    align-items: stretch; /* Stretch children to match height */
    gap: 2rem;
  }
`;

export const TableColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  flex: 1;
  min-width: 0;
  align-items: stretch;

  @media (min-width: 1600px) {
    order: 1;
    height: 760px; 
  }
`;

export const SmallBufferSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
  box-sizing: border-box;
`;

// ============================================
// SEARCH BAR
// ============================================

export const SearchContainer = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (max-width: 992px) {
    max-width: 100%;
    margin-top: 1rem;
  }
`;

export const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: 100px;
  border: 2px solid ${({ theme }) => theme.colors.neutral150};
  padding: 0 0.25rem 0 1.25rem;
  width: 100%;
  height: 42px;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary600};
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.5rem 0.75rem;
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral800};
  min-width: 0;
  height: 100%;

  &::placeholder {
    color: ${({ theme }) => theme.colors.neutral400};
  }

  &:focus {
    outline: none;
  }
`;

export const StandaloneFilter = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: 100px;
  border: 2px solid ${({ theme }) => theme.colors.neutral150};
  padding: 0 0.8rem;
  height: 42px;
  transition: all 0.3s ease;
  overflow: hidden; /* Fixes background bleeding on rounded corners */
`;

export const FilterSelect = styled.select`
  border: none;
  background-color: transparent;
  padding: 0 2rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.neutral800};
  cursor: pointer;
  appearance: none;

  option {
    background-color: ${({ theme }) => theme.colors.neutral0};
    color: ${({ theme }) => theme.colors.neutral800};
  }
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.5rem center;
  height: 100%;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

export const SearchButton = styled.button`
  height: 34px;
  width: 34px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary500} 0%, ${({ theme }) => theme.colors.primary600} 100%);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.08);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.5);
  }

  svg {
    width: 14px;
    height: 14px;
    stroke-width: 4px;
  }
`;

// ============================================
// TABLE
// ============================================

export const TableCard = styled.div`
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.07);
  animation: ${slideUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 12px 30px -10px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1600px) {
    flex: 1;
    min-height: 0; /* Important for flex child with overflow */
  }
`;

export const TableHeader = styled.div`
  padding: 1rem 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  background-color: ${({ theme }) => theme.colors.neutral0};

  @media (max-width: 992px) {
    flex-direction: column;
    align-items: stretch;
    padding: 1.5rem;
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
  gap: 1rem;
  flex: 1;
  justify-content: flex-end;

  @media (max-width: 992px) {
    width: 100%;
    flex-direction: column;
    align-items: flex-end;
  }
`;

export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  ${scrollbarStyles}
  display: flex;
  flex-direction: column;
  position: relative; /* Stacking root */

  @media (min-width: 1600px) {
    flex: 1;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.colors.neutral200};
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral100};
  position: sticky;
  top: 0;
  z-index: 998;
`;

export const Th = styled.th`
  position: sticky;
  top: 0;
  z-index: 999;
  padding: 1.2rem 1rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.neutral600};
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  white-space: nowrap;
  border-bottom: 3px solid ${({ theme }) => theme.colors.neutral150};
  transition: all 0.2s ease;
  background-color: ${({ theme }) => theme.colors.neutral100};
  
  &:first-child {
    text-align: left;
    padding-left: 3.5rem;
    z-index: 1000;
  }
`;


export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  animation: ${rowFadeIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${props => (props.index || 0) * 0.04}s;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
    transform: scale(1.001);
    box-shadow: inset 4px 0 0 0 ${({ theme }) => theme.colors.primary600};
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const Td = styled.td`
  padding: 0.4rem 1rem;
  vertical-align: middle;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 1.15rem;
  font-weight: 400;
  
  &:first-child {
    text-align: left;
    padding-left: 3.5rem;
  }
`;

export const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  
  ${props => props.role === 'Expert' && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.name === 'dark' ? theme.colors.success200 : theme.colors.success700};
  `}
  
  ${props => props.role === 'Client' && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.name === 'dark' ? theme.colors.primary200 : theme.colors.primary700};
  `}
`;

export const HighlightValue = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.name === 'dark' ? theme.colors.primary400 : theme.colors.primary600};
`;

export const CurrencyValue = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
`;

// ============================================
// PROFILE / PREMIUM UI
// ============================================

export const ProfileCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 0.5rem 0;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
  background: ${props => props.role === 'Expert' ? gradients.gold : gradients.blue};
  box-shadow: 0 4px 12px ${props => props.role === 'Expert' ? 'rgba(253, 160, 133, 0.3)' : 'rgba(102, 166, 255, 0.3)'};
  flex-shrink: 0;
  border: 2px solid white;
  overflow: hidden;
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const NameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  text-align: left;
`;

export const NameLabel = styled.div`
  font-weight: 500;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.neutral800};
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ExpertTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.8rem;
  background: ${({ theme }) => theme.colors.warning100};
  border: 1px solid ${({ theme }) => theme.colors.warning200};
  border-radius: 10px;
  color: ${({ theme }) => theme.name === 'dark' ? theme.colors.warning200 : theme.colors.warning600};
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 2px 4px rgba(255, 212, 59, 0.1);
  width: fit-content;
`;

export const ClientTag = styled.div`
  display: inline-flex;
  padding: 0.3rem 0.8rem;
  background: ${({ theme }) => theme.colors.primary100};
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  border-radius: 10px;
  color: ${({ theme }) => theme.name === 'dark' ? theme.colors.primary200 : theme.colors.primary600};
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  width: fit-content;
`;

export const CrownIcon = styled.span`
  font-size: 1.1rem;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
`;

// ============================================
// STATS SECTION
// ============================================

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 0.7rem;
  margin-bottom: 0.1rem;
  width: 100%;

  @media (min-width: 1600px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 340px;
    margin-bottom: 0;
    order: 2;
    height: 760px; /* Matches the table height exactly */
  }

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCardPremium = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border-radius: 20px;
  padding: 1.2rem 1.2rem 0rem 1.2rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  animation: ${slideUp} 0.5s ease-out both;
  animation-delay: ${props => props.delay || '0s'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;

export const ExpendsCardWrapper = styled(StatCardPremium)`
  padding: 1.5rem;
  background: ${({ theme }) => theme.name === 'dark' ? 'rgba(23, 23, 23, 0.6)' : theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (min-width: 1600px) {
    height: fit-content;
  }
`;

export const ExpendsMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const ExpendsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
`;

export const DataPanel = styled.div`
  padding: 1rem 1.25rem 0.75rem;
  background: ${({ theme }) => theme.name === 'dark' ? theme.colors.neutral100 : theme.colors.neutral50};
  border-radius: 16px;
  border-left: 4px solid ${props => props.color};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px -4px rgba(0,0,0,0.08);
  }
`;

export const PanelTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const PanelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PanelLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral400};
`;

export const PanelValue = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${props => props.color || props.theme.colors.neutral800};
`;

export const StatTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const StatTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral500};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StatMainValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  letter-spacing: -0.02em;
`;

export const SparklineWrapper = styled.div`
  width: 110px;
  height: 70px; /* Adjusted to balance visibility and space */
  margin-top: -5px; 
  opacity: 0.95;
  position: relative;
`;

export const HoverDate = styled.div`
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary600};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  pointer-events: none;
  animation: ${fadeIn} 0.2s ease-out;
  white-space: nowrap;
  z-index: 100;
`;

export const PieChartWrapper = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-left: auto;
`;

export const ProgressRingWrapper = styled.div`
  width: 55px;
  height: 55px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatFooterPremium = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.neutral200};
`;

export const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;

export const FooterLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral400};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;

export const FooterValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${props => props.color || (props.theme.name === 'dark' ? props.theme.colors.neutral100 : props.theme.colors.neutral600)};
`;

export const StatIconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.bg || props.theme.colors.neutral100};
  color: ${props => props.color || props.theme.colors.neutral500};
`;

// ============================================
// PAGINATION
// ============================================

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
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
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background-color: ${({ theme, $active }) => $active ? theme.colors.primary600 : theme.colors.neutral0};
  color: ${({ theme, $active }) => $active ? 'white' : theme.colors.neutral600};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $active }) => $active ? '0 4px 12px rgba(99, 102, 241, 0.3)' : 'none'};

  &:hover:not(:disabled) {
    background-color: ${({ theme, $active }) => $active ? theme.colors.primary700 : theme.colors.neutral100};
    border-color: ${({ theme, $active }) => $active ? theme.colors.primary700 : theme.colors.neutral200};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
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
