"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const reactRouterDom = require("react-router-dom");
const designSystem = require("@strapi/design-system");
const reactIntl = require("react-intl");
const reactQuery = require("@tanstack/react-query");
const react = require("react");
const styled = require("styled-components");
const index = require("./index-D4YHXBMq.js");
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
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.warning100};
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
  border: 1px solid ${({ theme }) => theme.colors.warning200};
`;
const KpiCardContainer = styled__default.default.div`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.75rem;
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
  gap: 0.125rem;
`;
const KpiLabel = styled__default.default.p`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
const KpiValue = styled__default.default.p`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const KpiIconBox = styled__default.default.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  min-height: 2.5rem;
  min-width: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  border: 1px solid transparent;
  font-size: 0.75rem;
  font-weight: 500;

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
function Header({ stats, filter, onFilterChange }) {
  const droppedRate = stats.callsToday ? (stats.declinedCalls / stats.callsToday * 100).toFixed(1) : 0;
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const savedStart = localStorage.getItem("dashboard_start_date");
  const savedEnd = localStorage.getItem("dashboard_end_date");
  console.log("📅 [Header] Initializing dates:", {
    from: savedStart || today,
    to: savedEnd || today,
    source: savedStart ? "localStorage" : "default"
  });
  const [startDate, setStartDate] = react.useState(savedStart || today);
  const [endDate, setEndDate] = react.useState(savedEnd || today);
  react.useEffect(() => {
    if (startDate) localStorage.setItem("dashboard_start_date", startDate);
    if (endDate) localStorage.setItem("dashboard_end_date", endDate);
  }, [startDate, endDate]);
  react.useEffect(() => {
    if (filter === "custom" && startDate && endDate) {
      onFilterChange("custom", { start: startDate, end: endDate });
    }
  }, [startDate, endDate, filter]);
  const handlePresetChange = (preset) => {
    onFilterChange(preset);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(Header$1, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(HeaderLeft, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(IconBox, { children: /* @__PURE__ */ jsxRuntime.jsx(index.PluginIcon, { style: { width: "32px", height: "32px" } }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(TitleBox, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Title, { children: "Live Calls Dashboard" }),
        /* @__PURE__ */ jsxRuntime.jsx(Subtitle, { children: "Realtime view of ConsultEase calls, categories & expert load." }),
        /* @__PURE__ */ jsxRuntime.jsxs(MetaText, { children: [
          stats.callsToday,
          " calls today • ",
          stats.declinedCalls,
          " declined (",
          droppedRate,
          "%)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(HeaderRight, { children: /* @__PURE__ */ jsxRuntime.jsxs(FilterContainer, { children: [
      ["60min", "today", "yesterday", "week"].map((preset) => /* @__PURE__ */ jsxRuntime.jsx(
        FilterButton,
        {
          active: filter === preset,
          onClick: () => handlePresetChange(preset),
          children: preset === "60min" ? "60 Minutes" : preset.charAt(0).toUpperCase() + preset.slice(1)
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
const getDateRange = (filter, customRange) => {
  const now = /* @__PURE__ */ new Date();
  let start = /* @__PURE__ */ new Date();
  let end = /* @__PURE__ */ new Date();
  if (filter === "custom" && customRange?.start && customRange?.end) {
    return {
      start: new Date(customRange.start).toISOString(),
      end: new Date(new Date(customRange.end).setHours(23, 59, 59, 999)).toISOString()
    };
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
    return { start: start.toISOString(), end: now.toISOString() };
  }
  start.setHours(0, 0, 0, 0);
  return { start: start.toISOString(), end: now.toISOString() };
};
const useCompletedCalls = (page = 1, filter = "60min", liveCalls, customRange, statuses = []) => {
  const { get } = admin.useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  let statusFilter = "";
  if (statuses.length > 0) {
    statusFilter = statuses.map((status, index2) => `&filters[callStatus][$in][${index2}]=${status}`).join("");
  } else {
    statusFilter = "&filters[callStatus][$notIn][0]=pending&filters[callStatus][$notIn][1]=ongoing";
  }
  const api = `/admin-pannel/recent-calls?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}${statusFilter}&pagination[page]=${page}&pagination[pageSize]=20`;
  const { data, ...rest } = reactQuery.useQuery({
    queryKey: ["completed-calls", page, filter, liveCalls, customRange, statuses],
    enabled: liveCalls !== void 0,
    queryFn: async () => {
      const { data: data2 } = await get(api);
      return data2;
    }
  });
  return { data: data?.data, meta: data?.meta || {}, ...rest };
};
const useCategoryStats = (filter = "today", liveCalls, customRange) => {
  const { get } = admin.useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  const api = `/admin-pannel/category-stats?filters[startTime][$gte]=${encodeURIComponent(start)}&filters[startTime][$lte]=${encodeURIComponent(end)}`;
  return reactQuery.useQuery({
    queryKey: ["category-stats", filter, liveCalls, customRange],
    enabled: liveCalls !== void 0,
    queryFn: async () => {
      const { data } = await get(api);
      return data;
    }
  });
};
const useStreamData = () => {
  const [liveData, setLiveData] = react.useState();
  console.log(window.strapi?.backendURL);
  react.useEffect(() => {
    const eventSource = new EventSource(`${window.strapi?.backendURL}/admin-pannel/stream`);
    eventSource.onmessage = function(event) {
      const data = JSON.parse(event.data);
      setLiveData(data);
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
function EmptyState({ title, subtitle, icon = "📭" }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(EmptyStateContainer, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(EmptyStateIcon, { children: icon }),
    /* @__PURE__ */ jsxRuntime.jsx(EmptyStateText, { children: title }),
    subtitle && /* @__PURE__ */ jsxRuntime.jsx(EmptyStateSubText, { children: subtitle })
  ] });
}
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
        /* @__PURE__ */ jsxRuntime.jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px" }, children: [
          "Avg Rating: ",
          data.avgRating,
          " ★"
        ] })
      ] })
    ] });
  }
  return null;
};
function CategoryGrid({ liveCalls, filter, customRange }) {
  const { data: categoryStats = [] } = useCategoryStats(filter, liveCalls, customRange);
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
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { style: { position: "absolute", bottom: "4px", right: "4px" }, children: /* @__PURE__ */ jsxRuntime.jsxs(CategoryRating, { children: [
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: "★" }),
        /* @__PURE__ */ jsxRuntime.jsx("span", { children: row.avgRating.toFixed(2) })
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
function LiveCallsTable({ stats = {}, liveCalls = [] }) {
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
        stats.liveCalls,
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
function RecentCallsTable({ liveCalls, filter, customRange }) {
  const [page, setPage] = react.useState(1);
  const [selectedStatuses, setSelectedStatuses] = react.useState([]);
  const [isFilterOpen, setIsFilterOpen] = react.useState(false);
  const filterRef = react.useRef(null);
  const { data: recentCalls = [], meta = {} } = useCompletedCalls(
    page,
    filter,
    liveCalls,
    customRange,
    selectedStatuses
  ) || {};
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
      /* @__PURE__ */ jsxRuntime.jsxs(DropdownContainer, { ref: filterRef, children: [
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
      /* @__PURE__ */ jsxRuntime.jsx("tbody", { children: recentCalls.length === 0 ? /* @__PURE__ */ jsxRuntime.jsx("tr", { children: /* @__PURE__ */ jsxRuntime.jsx("td", { colSpan: "7", children: /* @__PURE__ */ jsxRuntime.jsx(
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
      ) }) }) : recentCalls.map((call, idx) => /* @__PURE__ */ jsxRuntime.jsxs(
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
            /* @__PURE__ */ jsxRuntime.jsx(Td, { fontSize: "1.4rem", children: call.rating ? /* @__PURE__ */ jsxRuntime.jsx(RatingStars, { children: "★".repeat(call.rating) }) : /* @__PURE__ */ jsxRuntime.jsx("span", { style: { fontSize: "1.2rem" }, children: "---" }) })
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
function KpiCard({ label, value, tone = "emerald", chartData, Icon, ...rest }) {
  return /* @__PURE__ */ jsxRuntime.jsx(KpiCardContainer, { ...rest, children: /* @__PURE__ */ jsxRuntime.jsxs(KpiTop, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(KpiInfo, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(KpiLabel, { children: /* @__PURE__ */ jsxRuntime.jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
        label,
        label === "Ongoing calls" && /* @__PURE__ */ jsxRuntime.jsxs(StatusBadge, { status: "ongoing", children: [
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
          /* @__PURE__ */ jsxRuntime.jsx("span", { style: { paddingX: "0.8rem" }, children: "Live" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx(KpiValue, { children: value })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(KpiIconBox, { tone, children: Icon ? /* @__PURE__ */ jsxRuntime.jsx(Icon, { style: { width: "3rem", height: "3rem", padding: "0.5rem" } }) : "⚡" })
  ] }) });
}
function KpiSection({ stats = {} }) {
  return /* @__PURE__ */ jsxRuntime.jsxs(KpiSection$1, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Ongoing calls",
          value: stats.liveCalls,
          tone: "emerald",
          Icon: index.ActiveCall,
          style: { cursor: "pointer" },
          chartData: [
            { name: "Voice", value: stats.voiceCalls || 0 },
            { name: "Video", value: stats.videoCalls || 0 }
          ],
          onClick: () => stats.liveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=ongoing&filters[$and][1][createdAt][$gte]=${encodeURIComponent((/* @__PURE__ */ new Date()).toISOString().split("T")[0] + "T00:00:00.000Z")}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Total calls today",
          value: stats.callsToday,
          chip: "Including free & paid",
          tone: "sky",
          Icon: index.TotalCalls
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Declined calls",
          value: stats.declinedCalls,
          tone: "rose",
          Icon: index.DeclineCall,
          style: { cursor: stats.declinedCalls && "pointer" },
          chartData: [
            { name: "Voice", value: stats.declinedVoice || 0 },
            { name: "Video", value: stats.declinedVideo || 0 }
          ],
          onClick: () => stats.declinedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=declined&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Completed calls",
          value: stats.completedCalls,
          tone: "emerald",
          Icon: index.CompletedCall,
          style: { cursor: "pointer" },
          onClick: () => stats.completedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=completed&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Experts online",
          value: stats.expertsOnline,
          tone: "sky",
          Icon: index.Expert,
          onClick: () => stats.expertsOnline > 0 && window.open(
            `/admin/content-manager/collection-types/api::expert-profile.expert-profile?filters[$and][0][isActive][$eq]=true&sort=createdAt:DESC&page=1&pageSize=100`,
            "_blank"
          )
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(
        KpiCard,
        {
          label: "Total call duration",
          value: minutesToMMSS(stats.avgDuration),
          tone: "emerald",
          Icon: index.CallTime
        }
      )
    ] })
  ] });
}
function CallsLiveDashboard() {
  const { stats = {}, liveCalls } = useStreamData() || {};
  const [timeFilter, setTimeFilter] = react.useState("60min");
  const [customRange, setCustomRange] = react.useState({ start: "", end: "" });
  const handleFilterChange = (filter, custom) => {
    setTimeFilter(filter);
    if (custom) setCustomRange(custom);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(DashboardContainer, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Header, { stats, filter: timeFilter, onFilterChange: handleFilterChange }),
    /* @__PURE__ */ jsxRuntime.jsx(Main, { children: /* @__PURE__ */ jsxRuntime.jsxs(GridContainer, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(Column, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(KpiSection, { stats }),
        /* @__PURE__ */ jsxRuntime.jsx(
          CategoryGrid,
          {
            liveCalls: liveCalls?.length,
            filter: timeFilter,
            customRange
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(Column, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(LiveCallsTable, { stats, liveCalls }),
        /* @__PURE__ */ jsxRuntime.jsx(
          RecentCallsTable,
          {
            liveCalls: liveCalls?.length,
            filter: timeFilter,
            customRange
          }
        )
      ] })
    ] }) })
  ] });
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
