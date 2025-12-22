import styled, { keyframes, css } from "styled-components";

// Animations
const pulseInfo = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
`;

export const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  flex-direction: column;
`;

// --- Header ---
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
  padding: 8px;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.success100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.success600};
`;

export const TitleBox = styled.div``;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const MetaText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  margin-top: 0.125rem;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
`;

export const LiveBadge = styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  font-size: 12px;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.4rem 0.5rem;
`;

export const LiveDot = styled.span`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success500};
  animation: ${pulseInfo} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;

export const LiveText = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
`;

export const UpdatedText = styled.span`
  color: ${({ theme }) => theme.colors.neutral400};
`;

export const Select = styled.select`
  border-radius: 9999px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  padding: 0.4rem 0.75rem;
  outline: none;
  color: ${({ theme }) => theme.colors.neutral600};
`;

export const RefreshButton = styled.button`
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.4rem 1rem;
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral700};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }
`;

// --- Main Content ---
export const Main = styled.main`
  flex: 1;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;

export const GridContainer = styled.section`
  display: grid;
  gap: 1rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const KpiSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const KpiGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

// --- Cards & Sections ---
export const Card = styled.section`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 1rem;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

export const CardSubtitle = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const CardMeta = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
`;

// --- Category Mix ---
export const CategoryGrid = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral700};

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

export const CategoryItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
`;

export const CategoryName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

export const CategoryStats = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const CategoryRevenue = styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success600};
  margin: 0;
`;

export const CategoryRating = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
`;

export const ChartContainer = styled.div`
  height: 16rem;
`;

// --- Experts Snapshot ---
export const ExpertRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;

export const ExpertInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const ExpertName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

export const ExpertStats = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const ProgressBarContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ProgressTrack = styled.div`
  width: 6rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral200};
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success500};
  width: ${props => props.width || '0%'};
`;

export const BusyBadge = styled.span`
  font-size: 11px;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral600};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

// --- Top Consultants ---
export const ConsultantHeaderLabels = styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
`;

export const HeaderBadge = styled.span`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.bg || props.theme.colors.neutral100};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const ConsultantRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;

export const ConsultantInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Rank = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  width: 1rem;
`;

export const Avatar = styled.div`
  height: 1.75rem;
  width: 1.75rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success700};
`;

export const ConsultantDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ConsultantName = styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

export const ConsultantCategory = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const ConsultantStats = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 11px;
`;

export const StatBlock = styled.div`
  text-align: right;
`;

export const StatLabel = styled.p`
  color: ${({ theme }) => theme.colors.neutral400};
  margin: 0;
`;

export const StatValue = styled.p`
  font-weight: 600;
  color: ${props => props.color || props.theme.colors.neutral800};
  margin: 0;
`;

// --- Tables (Live Calls & Recent Calls) ---
export const TableSection = styled.section`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
`;

export const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
`;

export const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success100};
  padding: 0.125rem 0.5rem;
  color: ${({ theme }) => theme.colors.success600};
  border: 1px solid ${({ theme }) => theme.colors.success200};
  font-size: 11px;
`;

export const CompactButton = styled.button`
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: transparent;
  padding: 0.125rem 0.5rem;
  color: ${({ theme }) => theme.colors.neutral600};
  font-size: 11px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
  ${props => props.maxHeight && css`
    max-height: ${props.maxHeight};
    overflow-y: auto;
  `}
  ${props => props.minHeight && css`
    min-height: ${props.minHeight};
  `}
`;

export const Table = styled.table`
  min-width: 100%;
  font-size: 1.5rem;
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 1.3rem;
`;

export const Th = styled.th`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  text-align: ${props => props.align || 'center'};
  font-weight: 500;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.neutral100};
  z-index: 1;
`;

export const Tr = styled.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }
`;

export const Td = styled.td`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  color: ${props => props.color || props.theme.colors.neutral800};
  font-family: ${props => props.fontFamily || 'inherit'};
  font-size: ${props => props.fontSize || 'inherit'};
  text-align: ${props => props.align || 'center'};
  max-width: ${props => props.maxWidth || 'none'};
  white-space: nowrap;
  overflow: ${props => props.truncate ? 'hidden' : 'visible'};
  text-overflow: ${props => props.truncate ? 'ellipsis' : 'clip'};
`;

export const StatusBadge = styled.span`
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  border: 1px solid transparent;

  ${props => /Live|ongoing/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.colors.success600};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${props => /declined|missed|busy|pending/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.colors.danger600};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
  ${props => /pending/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.colors.warning600};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${props => /completed/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary600};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
`;

export const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral700};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const ActionButton = styled.button`
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: transparent;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral700};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }
`;

export const RatingStars = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.warning100};
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
  border: 1px solid ${({ theme }) => theme.colors.warning200};
`;

// --- KPI Card ---
export const KpiCardContainer = styled.div`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.75rem;
`;

export const KpiTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const KpiInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const KpiLabel = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;

export const KpiValue = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;

export const KpiIconBox = styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  height: 2.5rem;
  min-width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  font-size: 0.75rem;
  font-weight: 500;

  ${props => props.tone === 'emerald' && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.colors.success700};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${props => props.tone === 'amber' && css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.colors.warning700};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${props => props.tone === 'sky' && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary700};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
  ${props => props.tone === 'rose' && css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.colors.danger700};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
`;

export const KpiBottom = styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
`;

export const KpiBaseline = styled.span`
  color: ${({ theme }) => theme.colors.neutral400};
`;

export const KpiChip = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: 0.125rem 0.5rem;

  ${props => props.tone === 'emerald' && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.colors.success700};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${props => props.tone === 'amber' && css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.colors.warning700};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${props => props.tone === 'sky' && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary700};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
  ${props => props.tone === 'rose' && css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.colors.danger700};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
`;

// --- Empty State ---
export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.neutral400};
  gap: 1rem;
  width: 100%;
`;

export const EmptyStateIcon = styled.div`
  font-size: 2.5rem;
  opacity: 0.5;
`;

export const EmptyStateText = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral500};
`;

export const EmptyStateSubText = styled.p`
  font-size: 12px;
  margin: 0;
  opacity: 0.8;
  color: ${({ theme }) => theme.colors.neutral400};
`;

// --- Pagination ---
export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;

export const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.75rem;
  font-size: 11px;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral700};
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.neutral100};
    border-color: ${({ theme }) => theme.colors.neutral200};
    color: ${({ theme }) => theme.colors.neutral800};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.neutral100};
  }

  ${props => props.active && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    border-color: ${({ theme }) => theme.colors.primary200};
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: 600;
  `}
`;

export const PaginationInfo = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
`;

// --- Filter ---
export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.25rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;

export const FilterButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral500};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: ${({ theme }) => theme.colors.neutral800};
  }

  ${props => props.active && css`
    background-color: ${({ theme }) => theme.colors.neutral0};
    color: ${({ theme }) => theme.colors.neutral800};
    box-shadow: ${({ theme }) => theme.shadows.filterShadow};
    font-weight: 600;
  `}
`;

