"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const reactQuery = require("@tanstack/react-query");
const styled = require("styled-components");
const react = require("react");
const index = require("./index-CavnEJs6.js");
const recharts = require("recharts");
const _interopDefault = (e) => e && e.__esModule ? e : { default: e };
const styled__default = /* @__PURE__ */ _interopDefault(styled);
const pulseInfo = styled.keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
`;
const DashboardContainer = styled__default.default.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  flex-direction: column;
`;
const Header$1 = styled__default.default.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const HeaderLeft = styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const IconBox = styled__default.default.div`
  padding: 10px;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.primary600};
`;
const TitleBox = styled__default.default.div``;
const Title = styled__default.default.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const Subtitle = styled__default.default.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
const MetaText = styled__default.default.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  margin-top: 0.125rem;
`;
const HeaderRight = styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
`;
styled__default.default.div`
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
const LiveDot = styled__default.default.span`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success500};
  animation: ${pulseInfo} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
styled__default.default.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
`;
styled__default.default.span`
  color: ${({ theme }) => theme.colors.neutral400};
`;
styled__default.default.select`
  border-radius: 9999px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  padding: 0.4rem 0.75rem;
  outline: none;
  color: ${({ theme }) => theme.colors.neutral600};
`;
styled__default.default.button`
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
const Main = styled__default.default.main`
  flex: 1;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;
const GridContainer = styled__default.default.section`
  display: grid;
  gap: 1rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Column = styled__default.default.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const KpiSection$1 = styled__default.default.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const KpiGrid = styled__default.default.div`
  display: grid;
  gap: 0.75rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Card = styled__default.default.section`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 1rem;
`;
const CardHeader = styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;
const CardTitle = styled__default.default.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const CardSubtitle = styled__default.default.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled__default.default.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const CategoryGrid$1 = styled__default.default.div`
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
const CategoryItem = styled__default.default.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  min-height: 80px;
`;
const CategoryName = styled__default.default.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
const CategoryStats = styled__default.default.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled__default.default.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success600};
  margin: 0;
`;
const CategoryRating = styled__default.default.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
`;
const ChartContainer = styled__default.default.div`
  height: 16rem;
`;
styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;
styled__default.default.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;
styled__default.default.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
styled__default.default.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
styled__default.default.div`
  width: 6rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral200};
  overflow: hidden;
`;
styled__default.default.div`
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success500};
  width: ${(props) => props.width || "0%"};
`;
styled__default.default.span`
  font-size: 11px;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral600};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
styled__default.default.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
`;
styled__default.default.span`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) => props.bg || props.theme.colors.neutral100};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;
styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
styled__default.default.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  width: 1rem;
`;
styled__default.default.div`
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
styled__default.default.div`
  display: flex;
  flex-direction: column;
`;
styled__default.default.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
styled__default.default.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 11px;
`;
styled__default.default.div`
  text-align: right;
`;
styled__default.default.p`
  color: ${({ theme }) => theme.colors.neutral400};
  margin: 0;
`;
styled__default.default.p`
  font-weight: 600;
  color: ${(props) => props.color || props.theme.colors.neutral800};
  margin: 0;
`;
const TableSection = styled__default.default.section`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
`;
const TableHeader = styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
`;
const ActiveBadge = styled__default.default.span`
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
styled__default.default.button`
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
const TableContainer = styled__default.default.div`
  overflow-x: auto;
  ${(props) => props.maxHeight && styled.css`
    max-height: ${props.maxHeight};
    overflow-y: auto;
  `}
  ${(props) => props.minHeight && styled.css`
    min-height: ${props.minHeight};
  `}
`;
const Table = styled__default.default.table`
  min-width: 100%;
  font-size: 1.5rem;
  border-collapse: collapse;
`;
const Thead = styled__default.default.thead`
  background-color: ${({ theme }) => theme.colors.neutral100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 1.3rem;
`;
const Th = styled__default.default.th`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  text-align: ${(props) => props.align || "center"};
  font-weight: 500;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.neutral100};
  z-index: 1;
`;
const Tr = styled__default.default.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
  }
`;
const Td = styled__default.default.td`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  color: ${(props) => props.color || props.theme.colors.neutral800};
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize || "inherit"};
  text-align: ${(props) => props.align || "center"};
  max-width: ${(props) => props.maxWidth || "none"};
  white-space: nowrap;
  overflow: ${(props) => props.truncate ? "hidden" : "visible"};
  text-overflow: ${(props) => props.truncate ? "ellipsis" : "clip"};
`;
const StatusBadge = styled__default.default.span`
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  border: 1px solid transparent;

  ${(props) => /Live|ongoing/i.test(props.status) && styled.css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.colors.success600};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${(props) => /declined|missed|busy|pending/i.test(props.status) && styled.css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.colors.danger600};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
  ${(props) => /pending/i.test(props.status) && styled.css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.colors.warning600};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${(props) => /completed/i.test(props.status) && styled.css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.neutral800};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
`;
const CategoryBadge = styled__default.default.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral700};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
styled__default.default.button`
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
const RatingStars = styled__default.default.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
`;
const KpiCardContainer = styled__default.default.div`
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.75rem 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
`;
const KpiTop = styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
const KpiInfo = styled__default.default.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;
const KpiLabel = styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 14px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
  
  svg {
    flex-shrink: 0;
  }
`;
const KpiValue = styled__default.default.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const KpiChartWrapper = styled__default.default.div`
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
styled__default.default.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
`;
styled__default.default.span`
  color: ${({ theme }) => theme.colors.neutral400};
`;
styled__default.default.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: 0.125rem 0.5rem;

  ${(props) => props.tone === "emerald" && styled.css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.colors.success700};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${(props) => props.tone === "amber" && styled.css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.colors.warning700};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${(props) => props.tone === "sky" && styled.css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary700};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
  ${(props) => props.tone === "rose" && styled.css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.colors.danger700};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
`;
const EmptyStateContainer = styled__default.default.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.neutral400};
  gap: 1rem;
  width: 100%;
`;
const EmptyStateIcon = styled__default.default.div`
  font-size: 2.5rem;
  opacity: 0.5;
`;
const EmptyStateText = styled__default.default.p`
  font-size: 14px;
  margin: 0;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral500};
`;
const EmptyStateSubText = styled__default.default.p`
  font-size: 12px;
  margin: 0;
  opacity: 0.8;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const PaginationContainer = styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const PaginationButton = styled__default.default.button`
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

  ${(props) => props.active && styled.css`
    background-color: ${({ theme }) => theme.colors.primary100};
    border-color: ${({ theme }) => theme.colors.primary200};
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: 600;
  `}
`;
const PaginationInfo = styled__default.default.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
`;
const FilterContainer = styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${({ theme }) => theme.colors.neutral0};
  padding: 0.35rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
`;
const FilterButton = styled__default.default.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.colors.neutral500};
  background-color: ${(props) => props.active ? props.theme.colors.primary100 : "transparent"};
  border: 1px solid ${(props) => props.active ? props.theme.colors.primary200 : "transparent"};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: ${(props) => props.active ? props.theme.colors.primary100 : props.theme.colors.neutral100};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const LiveFilterButton = styled__default.default(FilterButton)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.active ? props.theme.colors.success100 : props.theme.colors.neutral0};
  border: 1px solid ${(props) => props.active ? props.theme.colors.success500 : props.theme.colors.neutral150};
  color: ${(props) => props.active ? props.theme.colors.success700 : props.theme.colors.neutral600};
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  box-shadow: ${(props) => props.active ? "0 0 12px rgba(34, 197, 94, 0.2)" : "none"};

  &:hover {
    background-color: ${(props) => props.active ? props.theme.colors.success100 : props.theme.colors.neutral100};
    border-color: ${(props) => props.active ? props.theme.colors.success500 : props.theme.colors.neutral300};
  }

  ${LiveDot} {
    background-color: ${(props) => props.active ? props.theme.colors.success500 : props.theme.colors.neutral400};
    animation: ${(props) => props.active ? styled.css`${pulseInfo} 2s infinite` : "none"};
  }
`;
const FilterDivider = styled__default.default.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.neutral200};
  margin: 0 0.75rem;
`;
const CustomRangeContainer = styled__default.default.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: 1rem;
  padding-left: 1rem;
  border-left: 1px solid ${({ theme }) => theme.colors.neutral150};
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateX(-10px); }
    to { opacity: 1; transform: translateX(0); }
  }
`;
const DateInput = styled__default.default.input`
  border-radius: 8px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  padding: 0.4rem 0.6rem;
  outline: none;
  color: ${({ theme }) => theme.colors.neutral700};
  transition: all 0.2s;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary500};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary100};
  }

  &::-webkit-calendar-picker-indicator {
    cursor: pointer;
    filter: invert(0.5);
    &:hover { filter: invert(0.3); }
  }
`;
const DateLabel = styled__default.default.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral400};
  letter-spacing: 0.025em;
`;
styled__default.default.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const DropdownContainer = styled__default.default.div`
  position: relative;
  display: inline-block;
`;
const DropdownButton = styled__default.default.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral700};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary500};
    background: ${({ theme }) => theme.colors.neutral100};
  }
`;
const DropdownMenu = styled__default.default.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 4px;
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 200px;
  padding: 4px;
`;
const DropdownItem = styled__default.default.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.neutral700};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.neutral100};
  }
`;
const TickIcon = styled__default.default.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary600};
`;
styled__default.default.button`
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  border: 1px solid transparent;

  ${({ active, status, theme }) => {
  if (!active) return styled.css`
      background: ${theme.colors.neutral0};
      color: ${theme.colors.neutral600};
      border: 1px solid ${theme.colors.neutral200};
      &:hover {
        background: ${theme.colors.neutral100};
      }
    `;
  switch (status) {
    case "completed":
      return styled.css`
          background: ${theme.colors.success100};
          color: ${theme.colors.success600};
          border-color: ${theme.colors.success200};
        `;
    case "declined":
    case "missed":
    case "busy":
      return styled.css`
          background: ${theme.colors.danger100};
          color: ${theme.colors.danger600};
          border-color: ${theme.colors.danger200};
        `;
    case "force complete by admin":
      return styled.css`
          background: ${theme.colors.secondary100};
          color: ${theme.colors.secondary600};
          border-color: ${theme.colors.secondary200};
        `;
    default:
      return styled.css`
          background: ${theme.colors.primary100};
          color: ${theme.colors.primary600};
          border-color: ${theme.colors.primary200};
        `;
  }
}}
`;
const ModalOverlay = styled__default.default.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
const ModalContent = styled__default.default.div`
  background-color: ${({ theme }) => theme.colors.neutral0};
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 90%;
  max-width: 450px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideUp {
    from { transform: translateY(30px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;
const ModalHeader = styled__default.default.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const ModalBody = styled__default.default.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ModalFooter = styled__default.default.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.neutral100};
`;
const DataRow = styled__default.default.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
  &:last-child {
    border-bottom: none;
  }
`;
const DataLabel = styled__default.default.span`
  color: ${({ theme }) => theme.colors.neutral500};
  font-size: 13px;
  font-weight: 500;
`;
const DataValue = styled__default.default.span`
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const CloseButton = styled__default.default.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.neutral400};
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  transition: all 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
    color: ${({ theme }) => theme.colors.neutral800};
  }
`;
const ModalButton = styled__default.default.button`
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid transparent;
  
  ${(props) => props.variant === "secondary" && styled.css`
    background-color: ${({ theme }) => theme.colors.neutral0};
    border-color: ${({ theme }) => theme.colors.neutral200};
    color: ${({ theme }) => theme.colors.neutral800};
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
      border-color: ${({ theme }) => theme.colors.neutral300};
    }
  `}

  ${(props) => props.variant === "primary" && styled.css`
    background-color: ${({ theme }) => theme.colors.primary600};
    color: #ffffff;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary700};
    }
  `}

  ${(props) => props.variant === "danger" && styled.css`
    background-color: ${({ theme }) => theme.colors.danger100};
    border-color: ${({ theme }) => theme.colors.danger200};
    color: ${({ theme }) => theme.colors.danger600};
    &:hover {
      background-color: ${({ theme }) => theme.colors.danger200};
    }
  `}
`;
function minutesToMMSS(minutes) {
  if (minutes == null || isNaN(minutes)) return "---";
  const totalSeconds = Math.round(minutes * 60);
  if (minutes >= 60) {
    const hh = Math.floor(totalSeconds / 3600);
    const mm2 = Math.floor(totalSeconds % 3600 / 60);
    const ss2 = totalSeconds % 60;
    return `${String(hh).padStart(2, "0")}:${String(mm2).padStart(2, "0")}:${String(ss2).padStart(2, "0")}`;
  }
  const mm = Math.floor(totalSeconds / 60);
  const ss = totalSeconds % 60;
  return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
}
function formatTimeAMPM(dateInput) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
}
function formatDateTime(dateInput) {
  if (!dateInput) return "---";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "---";
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
  return `${day} ${month} ${year}, ${strTime}`;
}
function formatDurationFromMinutes(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "---";
  const totalSeconds = Math.round(minutes * 60);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor(totalSeconds % 3600 / 60);
  const secs = totalSeconds % 60;
  const parts = [];
  if (hrs > 0) parts.push(`${hrs}h`);
  if (mins > 0) parts.push(`${mins}min`);
  if (secs > 0) parts.push(`${secs}sec`);
  return parts.join(", ");
}
const getDateRange = (filter, customRange) => {
  const now = /* @__PURE__ */ new Date();
  let start = /* @__PURE__ */ new Date();
  let end = /* @__PURE__ */ new Date();
  if (filter === "today") {
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return { start: start.toISOString(), end: end.toISOString() };
  }
  if (filter === "60min") {
    start = new Date(now.getTime() - 60 * 60 * 1e3);
    return { start: start.toISOString(), end: now.toISOString() };
  }
  if (filter === "yesterday") {
    start.setDate(now.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setDate(now.getDate() - 1);
    end.setHours(23, 59, 59, 999);
    return { start: start.toISOString(), end: end.toISOString() };
  }
  if (filter === "week") {
    start.setDate(now.getDate() - 7);
    start.setHours(0, 0, 0, 0);
    return { start: start.toISOString(), end: now.toISOString() };
  }
  if (filter === "quarter") {
    start.setDate(now.getDate() - 90);
    start.setHours(0, 0, 0, 0);
    return { start: start.toISOString(), end: now.toISOString() };
  }
  if (filter === "custom" && customRange?.start && customRange?.end) {
    const customStart = new Date(customRange.start);
    customStart.setHours(0, 0, 0, 0);
    const customEnd = new Date(customRange.end);
    customEnd.setHours(23, 59, 59, 999);
    return {
      start: customStart.toISOString(),
      end: customEnd.toISOString()
    };
  }
  start.setHours(0, 0, 0, 0);
  return { start: start.toISOString(), end: now.toISOString() };
};
const useCompletedCalls = (page = 1, filter = "60min", customRange, statuses = []) => {
  const { get } = admin.useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  const params = {
    filters: {
      createdAt: {
        $gte: start,
        $lte: end
      }
    },
    pagination: {
      page,
      pageSize: 20
    }
  };
  if (statuses.length > 0) {
    params.filters.callStatus = { $in: statuses };
  } else {
    params.filters.callStatus = {
      $notIn: ["pending", "ongoing"]
    };
  }
  const query = reactQuery.useQuery({
    queryKey: ["completed-calls", page, filter, customRange, statuses],
    queryFn: async () => {
      const { data } = await get("/admin-pannel/recent-calls", { params });
      return data;
    }
  });
  return { ...query, data: query.data?.data, meta: query.data?.meta || {} };
};
const useDashboardStats = (filter = "today", customRange) => {
  const { get } = admin.useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  return reactQuery.useQuery({
    queryKey: ["dashboard-stats", filter, customRange],
    enabled: filter !== "live",
    queryFn: async () => {
      const { data } = await get("/admin-pannel/stats", {
        params: {
          filters: {
            createdAt: {
              $gte: start,
              $lte: end
            }
          }
        }
      });
      return data;
    },
    initialData: {
      voice: { liveCalls: 0, callsToday: 0, declinedCalls: 0, completedCalls: 0, avgDuration: 0 },
      video: { liveCalls: 0, callsToday: 0, declinedCalls: 0, completedCalls: 0, avgDuration: 0 },
      expertsOnline: 0
    }
  });
};
const useCategoryStats = (filter = "today", customRange) => {
  const { get } = admin.useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  return reactQuery.useQuery({
    queryKey: ["category-stats", filter, customRange],
    enabled: true,
    queryFn: async () => {
      const { data } = await get("/admin-pannel/category-stats", {
        params: {
          filters: {
            createdAt: {
              $gte: start,
              $lte: end
            }
          }
        }
      });
      return data;
    }
  });
};
const useStreamData = () => {
  const [liveData, setLiveData] = react.useState({
    stats: {},
    liveCalls: [],
    recentCalls: [],
    categoryStats: []
  });
  react.useEffect(() => {
    const eventSource = new EventSource(`${window.strapi?.backendURL}/admin-pannel/stream`);
    eventSource.onmessage = function(event) {
      try {
        const data = JSON.parse(event.data);
        console.log("📡 [SSE] Received chunk:", Object.keys(data));
        if (data && typeof data === "object") {
          setLiveData((prev) => ({
            ...prev,
            ...data
          }));
        }
      } catch (error) {
        console.error("SSE data parsing error:", error);
      }
    };
    eventSource.onerror = function(error) {
      console.error("SSE connection error:", error);
    };
    return () => {
      eventSource.close();
    };
  }, []);
  return liveData;
};
const DashboardContext = react.createContext();
const useDashboardContext = () => {
  const context = react.useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};
const DashboardProvider = ({ children }) => {
  const [timeFilter, setTimeFilter] = react.useState("live");
  const [customRange, setCustomRange] = react.useState({
    start: localStorage.getItem("dashboard_start_date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    end: localStorage.getItem("dashboard_end_date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const {
    stats: liveStats = {},
    liveCalls = [],
    recentCalls: liveRecentCalls = [],
    categoryStats: liveCategoryStats = []
  } = useStreamData() || {};
  const [recentCallsPage, setRecentCallsPage] = react.useState(1);
  const [recentCallsStatuses, setRecentCallsStatuses] = react.useState([]);
  const { data: fetchedStats } = useDashboardStats(
    timeFilter,
    customRange
  );
  const { data: fetchedCategoryStats = [] } = useCategoryStats(
    timeFilter,
    customRange
  );
  const { data: fetchedRecentCalls = [], meta: fetchedRecentMeta = {} } = useCompletedCalls(
    recentCallsPage,
    timeFilter,
    customRange,
    recentCallsStatuses
  );
  const stats = timeFilter === "live" ? liveStats : fetchedStats || {};
  const categoryStats = timeFilter === "live" ? liveCategoryStats : fetchedCategoryStats;
  const recentCalls = timeFilter === "live" ? { data: liveRecentCalls, meta: { pagination: { total: liveRecentCalls.length, pageCount: 1 } } } : { data: fetchedRecentCalls, meta: fetchedRecentMeta };
  const handleFilterChange = (filter, range) => {
    setTimeFilter(filter);
    if (range) {
      setCustomRange(range);
      localStorage.setItem("dashboard_start_date", range.start);
      localStorage.setItem("dashboard_end_date", range.end);
    }
  };
  const value = {
    filter: timeFilter,
    customRange,
    handleFilterChange,
    stats,
    liveCalls,
    categoryStats,
    recentCalls,
    recentCallsPage,
    setRecentCallsPage,
    recentCallsStatuses,
    setRecentCallsStatuses
  };
  return /* @__PURE__ */ jsxRuntime.jsx(DashboardContext.Provider, { value, children });
};
function Header() {
  const { stats, filter, handleFilterChange, customRange } = useDashboardContext();
  const { voice = {}, video = {} } = stats || {};
  const totalCallsToday = (voice.callsToday || 0) + (video.callsToday || 0);
  const totalDeclinedCalls = (voice.declinedCalls || 0) + (video.declinedCalls || 0);
  const droppedRate = totalCallsToday ? (totalDeclinedCalls / totalCallsToday * 100).toFixed(1) : 0;
  const [startDate, setStartDate] = react.useState(customRange.start);
  const [endDate, setEndDate] = react.useState(customRange.end);
  react.useEffect(() => {
    setStartDate(customRange.start);
    setEndDate(customRange.end);
  }, [customRange]);
  react.useEffect(() => {
    if (filter === "custom" && startDate && endDate) {
      handleFilterChange("custom", { start: startDate, end: endDate });
    }
  }, [startDate, endDate, filter]);
  const handlePresetChange = (preset) => {
    handleFilterChange(preset);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(Header$1, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(HeaderLeft, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(IconBox, { children: /* @__PURE__ */ jsxRuntime.jsx(index.PluginIcon, { style: { width: "32px", height: "32px" } }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(TitleBox, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Title, { children: "Live Calls Dashboard" }),
        /* @__PURE__ */ jsxRuntime.jsx(Subtitle, { children: "Realtime view of ConsultEase calls, categories & expert load." }),
        /* @__PURE__ */ jsxRuntime.jsxs(MetaText, { children: [
          totalCallsToday,
          " ",
          filter === "live" ? "calls today" : `calls in this ${filter}`,
          " • ",
          totalDeclinedCalls,
          " declined (",
          droppedRate,
          "%)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(HeaderRight, { children: /* @__PURE__ */ jsxRuntime.jsxs(FilterContainer, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        LiveFilterButton,
        {
          active: filter === "live",
          onClick: () => handlePresetChange("live"),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(LiveDot, {}),
            " Live"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(FilterDivider, {}),
      ["yesterday", "week", "quarter"].map((preset) => /* @__PURE__ */ jsxRuntime.jsx(
        FilterButton,
        {
          active: filter === preset,
          onClick: () => handlePresetChange(preset),
          children: preset.charAt(0).toUpperCase() + preset.slice(1)
        },
        preset
      )),
      /* @__PURE__ */ jsxRuntime.jsx(
        FilterButton,
        {
          active: filter === "custom",
          onClick: () => handlePresetChange("custom"),
          children: "Custom Range"
        }
      ),
      filter === "custom" && /* @__PURE__ */ jsxRuntime.jsxs(CustomRangeContainer, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(DateLabel, { children: "From" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          DateInput,
          {
            type: "date",
            value: startDate,
            onChange: (e) => setStartDate(e.target.value)
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(DateLabel, { children: "To" }),
        /* @__PURE__ */ jsxRuntime.jsx(
          DateInput,
          {
            type: "date",
            value: endDate,
            onChange: (e) => setEndDate(e.target.value)
          }
        )
      ] })
    ] }) })
  ] });
}
function KpiCard({ label, value, tone = "emerald", chartData, Icon, ...rest }) {
  const theme = styled.useTheme();
  const getIconColor = (tone2) => {
    switch (tone2) {
      case "emerald":
        return theme.colors.success700;
      case "sky":
        return theme.colors.primary700;
      case "rose":
        return theme.colors.danger700;
      case "amber":
        return theme.colors.warning700;
      default:
        return theme.colors.neutral700;
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(KpiCardContainer, { ...rest, children: /* @__PURE__ */ jsxRuntime.jsxs(KpiTop, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(KpiInfo, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(KpiLabel, { children: [
        Icon && /* @__PURE__ */ jsxRuntime.jsx(Icon, { style: { width: "2rem", height: "2rem", color: getIconColor(tone) } }),
        label,
        label === "Ongoing calls" && /* @__PURE__ */ jsxRuntime.jsxs(StatusBadge, { status: "ongoing", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "span",
            {
              style: {
                width: 4,
                height: 4,
                borderRadius: "50%",
                backgroundColor: "currentColor"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { paddingLeft: "0.4rem" }, children: "Live" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(KpiValue, { children: value })
    ] }),
    chartData && /* @__PURE__ */ jsxRuntime.jsx(KpiChartWrapper, { children: /* @__PURE__ */ jsxRuntime.jsx(PieChartWithPaddingAngle, { data: chartData, tone }) })
  ] }) });
}
function PieChartWithPaddingAngle({ isAnimationActive = true, data, tone }) {
  const theme = styled.useTheme();
  const chartColors = {
    Voice: "#7476f1ff",
    Video: "#48ecbbff"
  };
  const getColors = (tone2) => {
    switch (tone2) {
      case "emerald":
        return [theme.colors.success500, theme.colors.success200];
      case "sky":
        return [theme.colors.primary500, theme.colors.primary200];
      case "rose":
        return [theme.colors.danger500, theme.colors.danger200];
      case "amber":
        return [theme.colors.warning500, theme.colors.warning200];
      default:
        return [theme.colors.neutral500, theme.colors.neutral200];
    }
  };
  const defaultColors = getColors(tone);
  return /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.PieChart, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      recharts.Pie,
      {
        data,
        innerRadius: "70%",
        outerRadius: "100%",
        cornerRadius: "50%",
        paddingAngle: 6,
        dataKey: "value",
        isAnimationActive,
        stroke: "none",
        children: data.map((entry, index2) => /* @__PURE__ */ jsxRuntime.jsx(
          recharts.Cell,
          {
            fill: chartColors[entry.name] || defaultColors[index2 % defaultColors.length]
          },
          `cell-${index2}`
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(CustomTooltip$1, {}), cursor: { fill: "transparent" } })
  ] }) });
}
function CustomTooltip$1({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, value, realValue, fill } = payload[0].payload;
    const displayValue = realValue !== void 0 ? realValue : value;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
      backgroundColor: "#fff",
      color: "#333",
      padding: "4px 10px",
      borderRadius: "6px",
      fontSize: "11px",
      fontWeight: "600",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      border: `1.5px solid ${fill}`,
      display: "flex",
      flexDirection: "row",
      gap: "8px",
      alignItems: "center",
      whiteSpace: "nowrap"
    }, children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: "#666", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em" }, children: name }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { style: { color: fill, fontSize: "12px" }, children: displayValue })
    ] });
  }
  return null;
}
function EmptyState({ title, subtitle, icon = "📭" }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(EmptyStateContainer, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(EmptyStateIcon, { children: icon }),
    /* @__PURE__ */ jsxRuntime.jsx(EmptyStateText, { children: title }),
    subtitle && /* @__PURE__ */ jsxRuntime.jsx(EmptyStateSubText, { children: subtitle })
  ] });
}
const StarIcon = ({ fill, id, size = 10 }) => {
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { marginRight: "1px" },
      children: [
        /* @__PURE__ */ jsxRuntime.jsx("defs", { children: /* @__PURE__ */ jsxRuntime.jsxs("linearGradient", { id: `half-${id}`, children: [
          /* @__PURE__ */ jsxRuntime.jsx("stop", { offset: "50%", stopColor: "currentColor" }),
          /* @__PURE__ */ jsxRuntime.jsx("stop", { offset: "50%", stopColor: "transparent", stopOpacity: "0" })
        ] }) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "path",
          {
            d: "M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinejoin: "round",
            fill: fill === "full" ? "currentColor" : fill === "half" ? `url(#half-${id})` : "none"
          }
        )
      ]
    }
  );
};
const StarRating = ({ rating, size = 10 }) => {
  if (rating === void 0 || rating === null) return null;
  return /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "inline-flex", alignItems: "center" }, children: [1, 2, 3, 4, 5].map((i) => {
    let fill = "empty";
    if (rating >= i) {
      fill = "full";
    } else if (rating > i - 1) {
      const decimal = rating - (i - 1);
      if (decimal <= 0.5 && decimal > 0) {
        fill = "half";
      } else if (decimal > 0.5) {
        fill = "full";
      }
    }
    return /* @__PURE__ */ jsxRuntime.jsx(StarIcon, { fill, id: `${rating}-${i}`, size }, i);
  }) });
};
const CHART_COLORS = {
  voice: "#7476f1ff",
  video: "#48ecbbff"
};
const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return /* @__PURE__ */ jsxRuntime.jsxs("div", { style: {
      backgroundColor: theme.colors.neutral0,
      border: `1px solid ${theme.colors.neutral150}`,
      padding: "12px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      minWidth: "150px"
    }, children: [
      /* @__PURE__ */ jsxRuntime.jsx("p", { style: {
        fontWeight: 600,
        marginBottom: "8px",
        fontSize: "12px",
        color: theme.colors.neutral800,
        borderBottom: `1px solid ${theme.colors.neutral150}`,
        paddingBottom: "4px"
      }, children: label }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: CHART_COLORS.voice, fontSize: "11px", fontWeight: 600 }, children: [
          "Voice Calls: ",
          data.calls
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: CHART_COLORS.video, fontSize: "11px", fontWeight: 600 }, children: [
          "Video Calls: ",
          data.videoCalls
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px", marginTop: "4px", borderTop: `1px solid ${theme.colors.neutral100}`, paddingTop: "4px" }, children: [
          "Total: ",
          data.totalCalls
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px" }, children: [
          "Minutes: ",
          data.minutes
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }, children: [
          "Avg Rating: ",
          /* @__PURE__ */ jsxRuntime.jsx(RatingStars, { children: /* @__PURE__ */ jsxRuntime.jsx(StarRating, { rating: data.avgRating }) })
        ] })
      ] })
    ] });
  }
  return null;
};
function CategoryGrid() {
  const { categoryStats, filter } = useDashboardContext();
  const theme = styled.useTheme();
  return /* @__PURE__ */ jsxRuntime.jsxs(Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: "Calls by Category" }),
      /* @__PURE__ */ jsxRuntime.jsx(CardSubtitle, { children: "Call distribution by topics" })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(CategoryGrid$1, { children: categoryStats.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("div", { style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ jsxRuntime.jsx(
      EmptyState,
      {
        title: "No categories found",
        subtitle: {
          today: "There are no calls for today.",
          yesterday: "There are no calls for yesterday.",
          week: "There are no calls for this week."
        }[filter],
        icon: "📊"
      }
    ) }) : categoryStats.map((row) => /* @__PURE__ */ jsxRuntime.jsxs(CategoryItem, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem", overflow: "hidden" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx(CategoryName, { title: row.name, children: row.name }),
          row.calls > 0 && /* @__PURE__ */ jsxRuntime.jsxs(CategoryStats, { children: [
            "Voice calls: ",
            row.calls
          ] }),
          row.videoCalls > 0 && /* @__PURE__ */ jsxRuntime.jsxs(CategoryStats, { children: [
            "Video calls: ",
            row.videoCalls
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(CategoryStats, { children: [
            "Total: ",
            formatDurationFromMinutes(row.minutes)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { style: { width: "50px", height: "50px", flexShrink: 0 }, children: /* @__PURE__ */ jsxRuntime.jsx(
          PieChartWithPaddingAngle,
          {
            isAnimationActive: false,
            data: [
              { name: "Voice", value: Math.sqrt(row.calls || 0), realValue: row.calls || 0 },
              { name: "Video", value: Math.sqrt(row.videoCalls || 0), realValue: row.videoCalls || 0 }
            ],
            tone: "emerald"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: { position: "absolute", bottom: "4px", right: "6px" }, children: /* @__PURE__ */ jsxRuntime.jsxs(CategoryRating, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: "★" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: row.avgRating })
      ] }) })
    ] }, row.name)) }),
    categoryStats.length > 1 && /* @__PURE__ */ jsxRuntime.jsx(ChartContainer, { style: { height: "350px" }, children: /* @__PURE__ */ jsxRuntime.jsx(recharts.ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntime.jsxs(recharts.BarChart, { data: categoryStats, barSize: 25, margin: { top: 10, right: 10, left: 0, bottom: 40 }, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        recharts.XAxis,
        {
          dataKey: "name",
          tickLine: false,
          axisLine: false,
          tick: { fontSize: 10, fill: theme.colors.neutral500, angle: -45, textAnchor: "end" },
          height: 60,
          interval: 0
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(recharts.YAxis, { hide: true, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsxRuntime.jsx(recharts.Tooltip, { content: /* @__PURE__ */ jsxRuntime.jsx(CustomTooltip, { theme }), cursor: { fill: theme.colors.neutral100 } }),
      /* @__PURE__ */ jsxRuntime.jsx(recharts.Bar, { dataKey: "calls", radius: [6, 6, 0, 0], fill: CHART_COLORS.voice }),
      /* @__PURE__ */ jsxRuntime.jsx(recharts.Bar, { dataKey: "videoCalls", radius: [6, 6, 0, 0], fill: CHART_COLORS.video })
    ] }) }) })
  ] });
}
const useMovingTime = () => {
  const [now, setNow] = react.useState(Date.now());
  react.useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  return now;
};
function LiveCallsTable() {
  const { stats, liveCalls } = useDashboardContext();
  const s = stats || {};
  const currMovingTime = useMovingTime();
  const theme = styled.useTheme();
  const { post } = admin.useFetchClient();
  const [selectedCall, setSelectedCall] = react.useState(null);
  const closeModal = () => setSelectedCall(null);
  const handleRedirect = () => {
    if (selectedCall) {
      window.open(`/admin/content-manager/collection-types/api::call.call/${selectedCall.documentId}`, "_blank");
      closeModal();
    }
  };
  const handleDeclineCall = async () => {
    if (selectedCall) {
      try {
        await post("/admin-pannel/callend", { callId: selectedCall.id });
      } catch (error) {
        console.error("🔔 [LiveCallsTable] Failed to decline call:", error);
      }
      closeModal();
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(TableSection, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(TableHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: "Live calls" }),
        /* @__PURE__ */ jsxRuntime.jsx(CardSubtitle, { children: "Monitor ongoing calls." })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", gap: "10px" }, children: /* @__PURE__ */ jsxRuntime.jsxs(ActiveBadge, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(LiveDot, {}),
        " ",
        (s.voice?.liveCalls || 0) + (s.video?.liveCalls || 0),
        " ongoing"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(TableContainer, { maxHeight: "350px", minHeight: "200px", children: /* @__PURE__ */ jsxRuntime.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Call ID" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Type" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Caller" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Expert" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Start Time" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Duration" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Category" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: liveCalls.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: "8", children: /* @__PURE__ */ jsxRuntime.jsx(
        EmptyState,
        {
          title: "No live calls",
          subtitle: "Ongoing consultations will appear here."
        }
      ) }) }) : liveCalls.map((call) => /* @__PURE__ */ jsxRuntime.jsxs(
        Tr,
        {
          style: { cursor: "pointer" },
          onClick: () => setSelectedCall(call),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontFamily: "monospace", children: call.id }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.type == "voiceCall" ? /* @__PURE__ */ jsxRuntime.jsx(index.VoiceCall, { style: { width: "20px", height: "20px", color: "#5272a3ff" } }) : /* @__PURE__ */ jsxRuntime.jsx(index.VideoCall, { style: { width: "20px", height: "20px", color: "#219bacff" } }) }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.caller }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.expert }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: formatTimeAMPM(call.startTime) || "---" }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.startTime ? minutesToMMSS((currMovingTime - new Date(call.startTime).getTime()) / (1e3 * 60)) : "---" }),
            /* @__PURE__ */ jsxRuntime.jsxs(Td, { children: [
              " ",
              /* @__PURE__ */ jsxRuntime.jsx(CategoryBadge, { children: call.category })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(StatusBadge, { status: call.status, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "currentColor"
                  }
                }
              ),
              call.status === "pending" ? "Calling" : call.status
            ] }) })
          ]
        },
        call.id
      )) })
    ] }) }),
    selectedCall && /* @__PURE__ */ jsxRuntime.jsx(ModalOverlay, { onClick: closeModal, children: /* @__PURE__ */ jsxRuntime.jsxs(ModalContent, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxRuntime.jsxs(ModalHeader, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { style: {
            backgroundColor: selectedCall.type === "voiceCall" ? theme.colors.primary100 : theme.colors.success100,
            color: selectedCall.type === "voiceCall" ? theme.colors.primary600 : theme.colors.success600,
            padding: "8px",
            borderRadius: "12px",
            display: "flex"
          }, children: selectedCall.type === "voiceCall" ? /* @__PURE__ */ jsxRuntime.jsx(index.VoiceCall, { style: { width: "24px", height: "24px" } }) : /* @__PURE__ */ jsxRuntime.jsx(index.VideoCall, { style: { width: "24px", height: "24px" } }) }),
          /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { style: { fontSize: "16px" }, children: "Call Details" }),
            /* @__PURE__ */ jsxRuntime.jsxs(CardSubtitle, { style: { fontSize: "11px" }, children: [
              "ID: ",
              selectedCall.id
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(CloseButton, { onClick: closeModal, children: /* @__PURE__ */ jsxRuntime.jsx(index.Cross, { style: { width: "20px", height: "20px" } }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ModalBody, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(DataRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataLabel, { children: "Caller" }),
          /* @__PURE__ */ jsxRuntime.jsx(DataValue, { children: selectedCall.caller })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(DataRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataLabel, { children: "Expert" }),
          /* @__PURE__ */ jsxRuntime.jsx(DataValue, { children: selectedCall.expert })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(DataRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataLabel, { children: "Category" }),
          /* @__PURE__ */ jsxRuntime.jsx(DataValue, { children: /* @__PURE__ */ jsxRuntime.jsx(CategoryBadge, { children: selectedCall.category }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(DataRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataLabel, { children: "Start Time" }),
          /* @__PURE__ */ jsxRuntime.jsx(DataValue, { children: formatTimeAMPM(selectedCall.startTime) || "---" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(DataRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataLabel, { children: "Duration" }),
          /* @__PURE__ */ jsxRuntime.jsx(DataValue, { children: selectedCall.startTime ? minutesToMMSS((currMovingTime - new Date(selectedCall.startTime).getTime()) / (1e3 * 60)) : "---" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs(DataRow, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DataLabel, { children: "Status" }),
          /* @__PURE__ */ jsxRuntime.jsx(DataValue, { children: /* @__PURE__ */ jsxRuntime.jsxs(StatusBadge, { status: selectedCall.status, children: [
            /* @__PURE__ */ jsxRuntime.jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" } }),
            selectedCall.status === "pending" ? "Calling" : selectedCall.status
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(ModalFooter, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(ModalButton, { variant: "danger", onClick: handleDeclineCall, children: "Decline Call" }),
        /* @__PURE__ */ jsxRuntime.jsx(ModalButton, { variant: "primary", onClick: handleRedirect, children: "View Details" })
      ] })
    ] }) })
  ] });
}
const STATUS_OPTIONS = [
  { label: "Completed", value: "completed" },
  { label: "Declined", value: "declined" },
  { label: "Missed", value: "missed" },
  { label: "Busy", value: "busy" },
  { label: "Force Completed", value: "force complete by admin" }
];
function RecentCallsTable() {
  const {
    recentCalls,
    filter,
    recentCallsPage: page,
    setRecentCallsPage: setPage,
    recentCallsStatuses: selectedStatuses,
    setRecentCallsStatuses: setSelectedStatuses
  } = useDashboardContext();
  const { data = [], meta = {} } = recentCalls || {};
  const calls = Array.isArray(data) ? data : [];
  const [isFilterOpen, setIsFilterOpen] = react.useState(false);
  const filterRef = react.useRef(null);
  react.useEffect(() => {
    setPage(1);
  }, [filter]);
  react.useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleNextPage = () => {
    if (page < (meta.pagination?.pageCount || 1)) setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  const toggleStatus = (status) => {
    setPage(1);
    setSelectedStatuses(
      (prev) => prev.includes(status) ? prev.filter((s) => s !== status) : [...prev, status]
    );
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(TableSection, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(TableHeader, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(CardTitle, { children: "Call Activity" }),
        /* @__PURE__ */ jsxRuntime.jsxs(CardSubtitle, { children: [
          "All closed calls snapshot. ",
          meta.pagination?.total ? `Total calls: ${meta.pagination?.total}` : ""
        ] })
      ] }),
      filter !== "live" && /* @__PURE__ */ jsxRuntime.jsxs(DropdownContainer, { ref: filterRef, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(DropdownButton, { onClick: () => setIsFilterOpen(!isFilterOpen), children: [
          "Filter ",
          selectedStatuses.length > 0 && `(${selectedStatuses.length})`,
          /* @__PURE__ */ jsxRuntime.jsx(index.ChevronDown, {})
        ] }),
        isFilterOpen && /* @__PURE__ */ jsxRuntime.jsx(DropdownMenu, { children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntime.jsxs(
          DropdownItem,
          {
            onClick: () => toggleStatus(opt.value),
            children: [
              opt.label,
              selectedStatuses.includes(opt.value) && /* @__PURE__ */ jsxRuntime.jsx(TickIcon, { children: /* @__PURE__ */ jsxRuntime.jsx(index.Tick, {}) })
            ]
          },
          opt.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(TableContainer, { maxHeight: "450px", minHeight: "200px", children: /* @__PURE__ */ jsxRuntime.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(Thead, { children: /* @__PURE__ */ jsxRuntime.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Call Id" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Type" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Caller" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Expert" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Category" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Start Time" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Duration" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Status" }),
        /* @__PURE__ */ jsxRuntime.jsx(Th, { children: "Rating" })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: calls.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: "9", children: /* @__PURE__ */ jsxRuntime.jsx(
        EmptyState,
        {
          title: "No completed calls",
          subtitle: {
            "60min": "No calls in the last 60 minutes.",
            "today": "No calls completed today.",
            "yesterday": "No calls completed yesterday.",
            "week": "No calls completed this week.",
            "custom": "No calls found for the selected range and criteria."
          }[filter]
        }
      ) }) }) : calls.map((call, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
        Tr,
        {
          style: { cursor: "pointer" },
          onClick: () => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, "_blank"),
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.id }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.type == "voiceCall" ? /* @__PURE__ */ jsxRuntime.jsx(index.VoiceCall, { style: { width: "20px", height: "20px", color: "#5272a3ff" } }) : /* @__PURE__ */ jsxRuntime.jsx(index.VideoCall, { style: { width: "20px", height: "20px", color: "#219bacff" } }) }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.caller }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.expert }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: /* @__PURE__ */ jsxRuntime.jsx(CategoryBadge, { children: call.category || "Other" }) }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: formatDateTime(call.time) }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: minutesToMMSS(call.duration) }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { children: /* @__PURE__ */ jsxRuntime.jsxs(StatusBadge, { status: call.status, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "span",
                {
                  style: {
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "currentColor"
                  }
                }
              ),
              call.status === "pending" ? "Calling" : call.status
            ] }) }),
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: /* @__PURE__ */ jsxRuntime.jsx(RatingStars, { children: /* @__PURE__ */ jsxRuntime.jsx(StarRating, { rating: call.rating, size: 10 }) }) })
          ]
        },
        idx
      )) })
    ] }) }),
    meta.pagination?.pageCount > 1 && /* @__PURE__ */ jsxRuntime.jsxs(PaginationContainer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        PaginationButton,
        {
          disabled: page === 1,
          onClick: handlePrevPage,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsxs(PaginationInfo, { children: [
        "Page ",
        page,
        " of ",
        meta.pagination?.pageCount || 1
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(
        PaginationButton,
        {
          disabled: page >= (meta?.pagination?.pageCount || 1),
          onClick: handleNextPage,
          children: "Next"
        }
      )
    ] })
  ] });
}
function KpiSection() {
  const { stats } = useDashboardContext();
  const s = stats || {};
  const voice = s.voice || {};
  const video = s.video || {};
  const expertsOnline = s.expertsOnline || 0;
  const totalLiveCalls = (voice.liveCalls || 0) + (video.liveCalls || 0);
  const totalCallsToday = (voice.callsToday || 0) + (video.callsToday || 0);
  const totalDeclinedCalls = (voice.declinedCalls || 0) + (video.declinedCalls || 0);
  const totalCompletedCalls = (voice.completedCalls || 0) + (video.completedCalls || 0);
  const totalAvgDuration = (voice.avgDuration || 0) + (video.avgDuration || 0);
  console.table({ voice, video });
  return /* @__PURE__ */ jsxRuntime.jsxs(KpiSection$1, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Ongoing calls",
          value: totalLiveCalls,
          tone: "emerald",
          Icon: index.ActiveCall,
          style: { cursor: "pointer" },
          chartData: [
            { name: "Voice", value: voice.liveCalls || 0 },
            { name: "Video", value: video.liveCalls || 0 }
          ],
          onClick: () => totalLiveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=ongoing&filters[$and][1][createdAt][$gte]=${encodeURIComponent((/* @__PURE__ */ new Date()).toISOString().split("T")[0] + "T00:00:00.000Z")}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Total calls",
          value: totalCallsToday,
          chip: "Including free & paid",
          tone: "sky",
          Icon: index.TotalCalls,
          chartData: [
            { name: "Voice", value: voice.callsToday || 0 },
            { name: "Video", value: video.callsToday || 0 }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Declined calls",
          value: totalDeclinedCalls,
          tone: "rose",
          Icon: index.DeclineCall,
          style: { cursor: totalDeclinedCalls && "pointer" },
          chartData: [
            { name: "Voice", value: voice.declinedCalls || 0 },
            { name: "Video", value: video.declinedCalls || 0 }
          ],
          onClick: () => totalDeclinedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=declined&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Completed calls",
          value: totalCompletedCalls,
          tone: "emerald",
          Icon: index.CompletedCall,
          style: { cursor: "pointer" },
          chartData: [
            { name: "Voice", value: voice.completedCalls || 0 },
            { name: "Video", value: video.completedCalls || 0 }
          ],
          onClick: () => totalCompletedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=completed&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Experts online",
          value: expertsOnline,
          tone: "sky",
          Icon: index.Expert,
          onClick: () => expertsOnline > 0 && // open strapi conent manager
          window.open(
            `/admin/content-manager/collection-types/api::expert-profile.expert-profile?filters[$and][0][isActive][$eq]=true&sort=createdAt:DESC&page=1&pageSize=100`,
            "_blank"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Total call duration",
          value: minutesToMMSS(totalAvgDuration),
          tone: "emerald",
          Icon: index.CallTime,
          chartData: [
            { name: "Voice", value: voice.avgDuration || 0, realValue: minutesToMMSS(voice.avgDuration) },
            { name: "Video", value: video.avgDuration || 0, realValue: minutesToMMSS(video.avgDuration) }
          ]
        }
      )
    ] })
  ] });
}
function DashboardContent() {
  return /* @__PURE__ */ jsxRuntime.jsxs(DashboardContainer, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Main, { children: /* @__PURE__ */ jsxRuntime.jsxs(GridContainer, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Column, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(KpiSection, {}),
        /* @__PURE__ */ jsxRuntime.jsx(CategoryGrid, {})
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Column, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(LiveCallsTable, {}),
        /* @__PURE__ */ jsxRuntime.jsx(RecentCallsTable, {})
      ] })
    ] }) })
  ] });
}
function CallsLiveDashboard() {
  return /* @__PURE__ */ jsxRuntime.jsx(DashboardProvider, { children: /* @__PURE__ */ jsxRuntime.jsx(DashboardContent, {}) });
}
const queryClient = new reactQuery.QueryClient();
const HomePage = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Main, { children: /* @__PURE__ */ jsxRuntime.jsx(reactQuery.QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntime.jsx(CallsLiveDashboard, {}) }) });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(reactRouterDom.Routes, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { index: true, element: /* @__PURE__ */ jsxRuntime.jsx(HomePage, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Route, { path: "*", element: /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) })
  ] });
};
exports.App = App;
