import { jsx, jsxs } from "react/jsx-runtime";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { Routes, Route } from "react-router-dom";
import { Main as Main$1 } from "@strapi/design-system";
import { useIntl } from "react-intl";
import { useQuery, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import styled, { css, keyframes } from "styled-components";
import { useState, useEffect } from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Bar } from "recharts";
const pulseInfo = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
`;
const DashboardContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: #f1f5f9; /* slate-100 */
  color: #0f172a; /* slate-900 */
  display: flex;
  flex-direction: column;
`;
const Header$1 = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem; /* px-6 py-4 */
  border-bottom: 1px solid #e2e8f0; /* slate-200 */
  background-color: #ffffff;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; /* gap-3 */
`;
const IconBox = styled.div`
  padding: 8px;
  border-radius: 0.75rem; /* rounded-xl */
  background-color: #ecfdf5; /* emerald-50 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem; /* text-lg */
  color: #059669; /* emerald-600 */
`;
const TitleBox = styled.div``;
const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #0f172a; /* slate-900 */
  margin: 0;
`;
const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #64748b; /* slate-500 */
  margin: 0;
`;
const MetaText = styled.p`
  font-size: 11px;
  color: #94a3b8; /* slate-400 */
  margin-top: 0.125rem;
`;
styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem; /* gap-3 */
  font-size: 0.75rem; /* text-xs */
`;
styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  font-size: 12px;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 0.4rem 0.5rem;
`;
const LiveDot = styled.span`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background-color: #10b981; /* emerald-500 */
  animation: ${pulseInfo} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
styled.span`
  font-weight: 500;
  color: #1e293b; /* slate-800 */
`;
styled.span`
  color: #94a3b8; /* slate-400 */
`;
styled.select`
  border-radius: 9999px;
  font-size: 12px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  padding: 0.4rem 0.75rem;
  outline: none;
  color: #475569; /* slate-600 */
`;
styled.button`
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 0.4rem 1rem;
  font-size: 12px;
  font-weight: 500;
  color: #334155; /* slate-700 */
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc; /* slate-50 */
  }
`;
const Main = styled.main`
  flex: 1;
  padding: 1rem;
  @media (min-width: 640px) {
    padding: 1.5rem;
  }
`;
const GridContainer = styled.section`
  display: grid;
  gap: 1rem;
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const KpiSection$1 = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const KpiGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const Card = styled.section`
  border-radius: 1rem; /* rounded-2xl */
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 1rem;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;
const CardTitle = styled.h2`
  font-size: 1.5rem; /* text-sm */
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`;
const CardSubtitle = styled.p`
  font-size: 12px;
  color: #64748b; /* slate-500 */
  margin: 0;
`;
styled.span`
  font-size: 11px;
  color: #94a3b8; /* slate-400 */
`;
const CategoryGrid$1 = styled.div`
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 11px;
  color: #334155; /* slate-700 */

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;
const CategoryItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.75rem; /* rounded-xl */
  border: 1px solid #e2e8f0;
  background-color: #f8fafc; /* slate-50 */
  padding: 0.5rem 0.75rem;
`;
const CategoryName = styled.p`
  font-size: 1.2rem; /* text-xs */
  font-weight: 500;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
const CategoryStats = styled.p`
  font-size: 11px;
  color: #64748b;
  margin: 0;
`;
styled.p`
  font-size: 11px;
  font-weight: 600;
  color: #059669; /* emerald-600 */
  margin: 0;
`;
const CategoryRating = styled.p`
  font-size: 11px;
  color: #d97706; /* amber-600 */
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
`;
const ChartContainer = styled.div`
  height: 16rem; /* h-44 */
`;
styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;
styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;
styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #0f172a;
  margin: 0;
`;
styled.p`
  font-size: 1.1rem;
  color: #64748b;
  margin: 0;
`;
styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
styled.div`
  width: 6rem; /* w-24 */
  height: 0.375rem; /* h-1.5 */
  border-radius: 9999px;
  background-color: #e2e8f0;
  overflow: hidden;
`;
styled.div`
  height: 100%;
  border-radius: 9999px;
  background-color: #10b981; /* emerald-500 */
  width: ${(props) => props.width || "0%"};
`;
styled.span`
  font-size: 11px;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: #ffffff;
  color: #475569;
  border: 1px solid #e2e8f0;
`;
styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  color: #64748b;
`;
styled.span`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) => props.bg || "#f1f5f9"};
  border: 1px solid #e2e8f0;
`;
styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid #e2e8f0;
  background-color: #f8fafc;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
`;
styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
styled.span`
  font-size: 11px;
  color: #94a3b8;
  width: 1rem;
`;
styled.div`
  height: 1.75rem; /* h-7 */
  width: 1.75rem; /* w-7 */
  border-radius: 9999px;
  background-color: #d1fae5; /* emerald-100 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 600;
  color: #047857; /* emerald-700 */
`;
styled.div`
  display: flex;
  flex-direction: column;
`;
styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: #0f172a;
  margin: 0;
`;
styled.p`
  font-size: 11px;
  color: #64748b;
  margin: 0;
`;
styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 11px;
`;
styled.div`
  text-align: right;
`;
styled.p`
  color: #94a3b8;
  margin: 0;
`;
styled.p`
  font-weight: 600;
  color: ${(props) => props.color || "#0f172a"};
  margin: 0;
`;
const TableSection = styled.section`
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  overflow: hidden;
`;
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f8fafc;
`;
const ActiveBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  background-color: #ecfdf5; /* emerald-50 */
  padding: 0.125rem 0.5rem;
  color: #059669; /* emerald-600 */
  border: 1px solid #d1fae5;
  font-size: 11px;
`;
styled.button`
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: transparent;
  padding: 0.125rem 0.5rem;
  color: #475569;
  font-size: 11px;
  cursor: pointer;
  &:hover {
    background-color: #f8fafc;
  }
`;
const TableContainer = styled.div`
  overflow-x: auto;
  ${(props) => props.maxHeight && css`
    max-height: ${props.maxHeight};
    overflow-y: auto;
  `}
  ${(props) => props.minHeight && css`
    min-height: ${props.minHeight};
  `}
`;
const Table = styled.table`
  min-width: 100%;
  font-size: 1.5rem; /* text-xs */
  border-collapse: collapse;
`;
const Thead = styled.thead`
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 1.3rem;
`;
const Th = styled.th`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  text-align: ${(props) => props.align || "center"};
  font-weight: 500;
  position: sticky;
  top: 0;
  background-color: #f8fafc;
  z-index: 1;
`;
const Tr = styled.tr`
  transition: background-color 0.2s;
  &:hover {
    background-color: #f8fafc;
  }
`;
const Td = styled.td`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  color: ${(props) => props.color || "#1e293b"};
  font-family: ${(props) => props.fontFamily || "inherit"};
  font-size: ${(props) => props.fontSize || "inherit"};
  text-align: ${(props) => props.align || "center"};
  max-width: ${(props) => props.maxWidth || "none"};
  white-space: nowrap;
  overflow: ${(props) => props.truncate ? "hidden" : "visible"};
  text-overflow: ${(props) => props.truncate ? "ellipsis" : "clip"};
`;
const StatusBadge = styled.span`
  text-transform: capitalize;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  border-radius: 9999px;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  border: 1px solid transparent;

  ${(props) => /Live|ongoing/i.test(props.status) && css`
    background-color: #ecfdf5;
    color: #059669;
    border-color: #d1fae5;
  `}
  ${(props) => /declined|missed|busy|pending/i.test(props.status) && css`
    background-color: #fffbeb;
    color: red;
    border-color: #fef3c7;
  `}
  ${(props) => /pending/i.test(props.status) && css`
    background-color: #fffbeb;
    color: #d97706;
    border-color: #fef3c7;
  `}
  ${(props) => /completed/i.test(props.status) && css`
    background-color: #ebf4ffff;
    color: #055096ff;
    border-color: #d1e4faff;
  `}
`;
const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background-color: #f8fafc;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: #334155;
  border: 1px solid #e2e8f0;
`;
styled.button`
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
  background-color: transparent;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: #334155;
  cursor: pointer;
  &:hover {
    background-color: #f8fafc;
  }
`;
const RatingStars = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background-color: #fffbeb;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: #d97706;
  border: 1px solid #fef3c7;
`;
const KpiCardContainer = styled.div`
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  padding: 0.75rem;
`;
const KpiTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;
const KpiInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;
const KpiLabel = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #64748b;
  margin: 0;
`;
const KpiValue = styled.p`
  font-size: 16px; /* text-xl */
  font-weight: 600;
  color: #151c2cd5;
  margin: 0;
`;
const KpiIconBox = styled.div`
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

  ${(props) => props.tone === "emerald" && css`
    background-color: #ecfdf5;
    color: #047857;
    border-color: #d1fae5;
  `}
  ${(props) => props.tone === "amber" && css`
    background-color: #fffbeb;
    color: #b45309;
    border-color: #fef3c7;
  `}
  ${(props) => props.tone === "sky" && css`
    background-color: #f0f9ff;
    color: #0369a1;
    border-color: #e0f2fe;
  `}
  ${(props) => props.tone === "rose" && css`
    background-color: #fff1f2;
    color: #be123c;
    border-color: #ffe4e6;
  `}
`;
styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
`;
styled.span`
  color: #94a3b8;
`;
styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: 0.125rem 0.5rem;

  ${(props) => props.tone === "emerald" && css`
    background-color: #ecfdf5;
    color: #047857;
    border-color: #d1fae5;
  `}
  ${(props) => props.tone === "amber" && css`
    background-color: #fffbeb;
    color: #b45309;
    border-color: #fef3c7;
  `}
  ${(props) => props.tone === "sky" && css`
    background-color: #f0f9ff;
    color: #0369a1;
    border-color: #e0f2fe;
  `}
  ${(props) => props.tone === "rose" && css`
    background-color: #fff1f2;
    color: #be123c;
    border-color: #ffe4e6;
  `}
`;
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: #94a3b8;
  gap: 1rem;
  width: 100%;
`;
const EmptyStateIcon = styled.div`
  font-size: 2.5rem;
  opacity: 0.5;
`;
const EmptyStateText = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 500;
  color: #64748b;
`;
const EmptyStateSubText = styled.p`
  font-size: 12px;
  margin: 0;
  opacity: 0.8;
  color: #94a3b8;
`;
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid #e2e8f0;
  background-color: #ffffff;
`;
const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.75rem;
  font-size: 11px;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background-color: #ffffff;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background-color: #f8fafc;
    border-color: #cbd5e1;
    color: #0f172a;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f1f5f9;
  }

  ${(props) => props.active && css`
    background-color: #f0f9ff;
    border-color: #bae6fd;
    color: #0284c7;
    font-weight: 600;
  `}
`;
const PaginationInfo = styled.span`
  font-size: 11px;
  color: #64748b;
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #f1f5f9;
  padding: 0.25rem;
  border-radius: 9999px;
  border: 1px solid #e2e8f0;
`;
const FilterButton = styled.button`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 11px;
  font-weight: 500;
  color: #64748b;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #0f172a;
  }

  ${(props) => props.active && css`
    background-color: #ffffff;
    color: #0f172a;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
    font-weight: 600;
  `}
`;
function Header({ stats }) {
  const droppedRate = stats.callsToday ? ((stats.declinedCalls || 0 / stats.callsToday) * 100).toFixed(1) : 0;
  return /* @__PURE__ */ jsx(Header$1, { children: /* @__PURE__ */ jsxs(HeaderLeft, { children: [
    /* @__PURE__ */ jsx(IconBox, { children: "📞" }),
    /* @__PURE__ */ jsxs(TitleBox, { children: [
      /* @__PURE__ */ jsx(Title, { children: "Live Calls Dashboard" }),
      /* @__PURE__ */ jsx(Subtitle, { children: "Realtime view of ConsultEase calls, categories & expert load." }),
      /* @__PURE__ */ jsxs(MetaText, { children: [
        stats.callsToday,
        " calls today • ",
        stats.declinedCalls,
        " declined (",
        droppedRate,
        "%)"
      ] })
    ] })
  ] }) });
}
const getDateRange = (filter) => {
  const now = /* @__PURE__ */ new Date();
  let start = /* @__PURE__ */ new Date();
  let end = /* @__PURE__ */ new Date();
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
const useCompletedCalls = (page = 1, filter = "60min", liveCalls) => {
  const { get } = useFetchClient();
  const { start, end } = getDateRange(filter);
  const api = `/api/recent-calls?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}&pagination[page]=${page}&pagination[pageSize]=20`;
  const { data, ...rest } = useQuery({
    queryKey: ["completed-calls", page, filter, liveCalls],
    enabled: liveCalls !== void 0,
    queryFn: async () => {
      const { data: data2 } = await get(api);
      return data2;
    }
  });
  return { data: data?.data, meta: data?.meta || {}, ...rest };
};
const useCategoryStats = (filter = "today", liveCalls) => {
  const { get } = useFetchClient();
  const { start, end } = getDateRange(filter);
  const api = `/api/category-stats?filters[createdAt][$gte]=${encodeURIComponent(start)}&filters[createdAt][$lte]=${encodeURIComponent(end)}`;
  return useQuery({
    queryKey: ["category-stats", filter, liveCalls],
    enabled: liveCalls !== void 0,
    queryFn: async () => {
      const { data } = await get(api);
      return data;
    }
  });
};
const useStreamData = () => {
  const [liveData, setLiveData] = useState();
  useEffect(() => {
    const eventSource = new EventSource(`${window.strapi?.backendURL}/api/stream`);
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
  return /* @__PURE__ */ jsxs(EmptyStateContainer, { children: [
    /* @__PURE__ */ jsx(EmptyStateIcon, { children: icon }),
    /* @__PURE__ */ jsx(EmptyStateText, { children: title }),
    subtitle && /* @__PURE__ */ jsx(EmptyStateSubText, { children: subtitle })
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
function formatDurationFromMinutes(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return "0 sec";
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
function CategoryGrid({ liveCalls }) {
  const [dateFilter, setDateFilter] = useState("today");
  const { data: categoryStats = [] } = useCategoryStats(dateFilter, liveCalls);
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Category Mix" }),
        /* @__PURE__ */ jsx(CardSubtitle, { children: "Call distribution by topics" })
      ] }),
      /* @__PURE__ */ jsxs(FilterContainer, { children: [
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: dateFilter === "today",
            onClick: () => setDateFilter("today"),
            children: "Today"
          }
        ),
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: dateFilter === "yesterday",
            onClick: () => setDateFilter("yesterday"),
            children: "Yesterday"
          }
        ),
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: dateFilter === "week",
            onClick: () => setDateFilter("week"),
            children: "Week"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(CategoryGrid$1, { children: categoryStats.length === 0 ? /* @__PURE__ */ jsx("div", { style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ jsx(
      EmptyState,
      {
        title: "No categories found",
        subtitle: {
          today: "There are no calls for today.",
          yesterday: "There are no calls for yesterday.",
          week: "There are no calls for this week."
        }[dateFilter],
        icon: "📊"
      }
    ) }) : categoryStats.map((row) => /* @__PURE__ */ jsxs(CategoryItem, { children: [
      /* @__PURE__ */ jsx(CategoryName, { title: row.name, children: row.name }),
      row.calls > 0 && /* @__PURE__ */ jsxs(CategoryStats, { children: [
        "Voice calls: ",
        row.calls
      ] }),
      row.videoCalls > 0 && /* @__PURE__ */ jsxs(CategoryStats, { children: [
        "Video calls: ",
        row.videoCalls
      ] }),
      /* @__PURE__ */ jsxs(CategoryStats, { children: [
        "Total: ",
        formatDurationFromMinutes(row.minutes)
      ] }),
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "4px", right: "4px" }, children: /* @__PURE__ */ jsxs(CategoryRating, { children: [
        /* @__PURE__ */ jsx("span", { children: "★" }),
        /* @__PURE__ */ jsx("span", { children: row.avgRating.toFixed(2) })
      ] }) })
    ] }, row.name)) }),
    categoryStats.length > 1 && /* @__PURE__ */ jsx(ChartContainer, { children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: categoryStats, barSize: 18, children: [
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "name",
          tickLine: false,
          axisLine: false,
          tick: { fontSize: 10, fill: "#64748b" }
        }
      ),
      /* @__PURE__ */ jsx(YAxis, { hide: true, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          cursor: { fill: "#f8fafc" },
          contentStyle: {
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 8,
            fontSize: 11,
            color: "#0f172a"
          },
          formatter: (value, name) => {
            if (name === "totalCalls") return [value, "Total Calls"];
            if (name === "calls") return [value, "Calls"];
            if (name === "minutes") return [value, "Minutes"];
            if (name === "revenue")
              return [`₹${Number(value).toLocaleString("en-IN")}`, "Revenue"];
            if (name === "avgRating") return [value, "Avg rating"];
            return [value, name];
          }
        }
      ),
      /* @__PURE__ */ jsx(Bar, { dataKey: "totalCalls", radius: [6, 6, 0, 0], fill: "#22c594ff" })
    ] }) }) })
  ] });
}
const VoiceCall = ({ style }) => /* @__PURE__ */ jsx("svg", { style, viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ jsx("path", { d: "M14.5562 15.5477L14.1007 16.0272C14.1007 16.0272 13.0181 17.167 10.0631 14.0559C7.10812 10.9448 8.1907 9.80507 8.1907 9.80507L8.47752 9.50311C9.18407 8.75924 9.25068 7.56497 8.63424 6.6931L7.37326 4.90961C6.61028 3.8305 5.13596 3.68795 4.26145 4.60864L2.69185 6.26114C2.25823 6.71766 1.96765 7.30945 2.00289 7.96594C2.09304 9.64546 2.81071 13.259 6.81536 17.4752C11.0621 21.9462 15.0468 22.1239 16.6763 21.9631C17.1917 21.9122 17.6399 21.6343 18.0011 21.254L19.4217 19.7584C20.3806 18.7489 20.1102 17.0182 18.8833 16.312L16.9728 15.2123C16.1672 14.7486 15.1858 14.8848 14.5562 15.5477Z", fill: "currentColor" }) });
const VideoCall = ({ style }) => /* @__PURE__ */ jsxs("svg", { style, viewBox: "0 0 48 48", version: "1", xmlns: "http://www.w3.org/2000/svg", "enable-background": "new 0 0 48 48", children: [
  /* @__PURE__ */ jsx("path", { fill: "currentColor", d: "M8,12h22c2.2,0,4,1.8,4,4v16c0,2.2-1.8,4-4,4H8c-2.2,0-4-1.8-4-4V16C4,13.8,5.8,12,8,12z" }),
  /* @__PURE__ */ jsx("polygon", { fill: "currentColor", points: "44,35 34,29 34,19 44,13" })
] });
const useMovingTime = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  return now;
};
function LiveCallsTable({ stats = {}, liveCalls = [] }) {
  const currMovingTime = useMovingTime();
  return /* @__PURE__ */ jsxs(TableSection, { children: [
    /* @__PURE__ */ jsxs(TableHeader, { children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Live calls" }),
        /* @__PURE__ */ jsx(CardSubtitle, { children: "Monitor ongoing calls." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "10px" }, children: /* @__PURE__ */ jsxs(ActiveBadge, { children: [
        /* @__PURE__ */ jsx(LiveDot, {}),
        " ",
        stats.liveCalls,
        " ongoing"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(TableContainer, { maxHeight: "350px", minHeight: "200px", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(Th, { children: "Call ID" }),
        /* @__PURE__ */ jsx(Th, { children: "Type" }),
        /* @__PURE__ */ jsx(Th, { children: "Caller" }),
        /* @__PURE__ */ jsx(Th, { children: "Expert" }),
        /* @__PURE__ */ jsx(Th, { children: "Start Time" }),
        /* @__PURE__ */ jsx(Th, { children: "Duration" }),
        /* @__PURE__ */ jsx(Th, { children: "Category" }),
        /* @__PURE__ */ jsx(Th, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: liveCalls.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "7", children: /* @__PURE__ */ jsx(
        EmptyState,
        {
          title: "No live calls",
          subtitle: "Ongoing consultations will appear here."
        }
      ) }) }) : liveCalls.map((call) => /* @__PURE__ */ jsxs(
        Tr,
        {
          style: { cursor: "pointer" },
          onClick: () => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, "_blank"),
          children: [
            /* @__PURE__ */ jsx(Td, { fontFamily: "monospace", color: "#64748b", children: call.id }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: call.type == "voiceCall" ? /* @__PURE__ */ jsx(VoiceCall, { style: { width: "20px", height: "20px", color: "#5272a3ff" } }) : /* @__PURE__ */ jsx(VideoCall, { style: { width: "20px", height: "20px", color: "#219bacff" } }) }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: call.caller }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: call.expert }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: formatTimeAMPM(void 0) || "---" }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: minutesToMMSS((currMovingTime - new Date(call.startTime).getTime()) / (1e3 * 60)) }),
            /* @__PURE__ */ jsxs(Td, { children: [
              " ",
              /* @__PURE__ */ jsx(CategoryBadge, { children: call.category })
            ] }),
            /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(StatusBadge, { status: call.status, children: [
              /* @__PURE__ */ jsx(
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
    ] }) })
  ] });
}
function RecentCallsTable({ liveCalls }) {
  const [page, setPage] = useState(1);
  const [callsFilter, setCallsFilter] = useState("60min");
  const { data: recentCalls = [], meta = {} } = useCompletedCalls(page, callsFilter, liveCalls) || {};
  const handleNextPage = () => {
    if (page < (meta.pagination?.pageCount || 1)) setPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };
  return /* @__PURE__ */ jsxs(TableSection, { children: [
    /* @__PURE__ */ jsxs(TableHeader, { children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Completed calls" }),
        /* @__PURE__ */ jsx(CardSubtitle, { children: "Duration & rating snapshot." })
      ] }),
      /* @__PURE__ */ jsxs(FilterContainer, { children: [
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: callsFilter === "60min",
            onClick: () => setCallsFilter("60min"),
            children: "60 Min"
          }
        ),
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: callsFilter === "today",
            onClick: () => setCallsFilter("today"),
            children: "Today"
          }
        ),
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: callsFilter === "yesterday",
            onClick: () => setCallsFilter("yesterday"),
            children: "Yesterday"
          }
        ),
        /* @__PURE__ */ jsx(
          FilterButton,
          {
            active: callsFilter === "week",
            onClick: () => setCallsFilter("week"),
            children: "Week"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(TableContainer, { maxHeight: "450px", minHeight: "200px", children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(Th, { children: "Caller" }),
        /* @__PURE__ */ jsx(Th, { children: "Expert" }),
        /* @__PURE__ */ jsx(Th, { children: "Category" }),
        /* @__PURE__ */ jsx(Th, { children: "Start Time" }),
        /* @__PURE__ */ jsx(Th, { children: "Duration" }),
        /* @__PURE__ */ jsx(Th, { children: "Rating" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: recentCalls.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "6", children: /* @__PURE__ */ jsx(
        EmptyState,
        {
          title: "No completed calls",
          subtitle: {
            "60min": "No calls in the last 60 minutes.",
            "today": "No calls completed today.",
            "yesterday": "No calls completed yesterday.",
            "week": "No calls completed this week."
          }[callsFilter]
        }
      ) }) }) : recentCalls.map((call, idx) => /* @__PURE__ */ jsxs(
        Tr,
        {
          style: { cursor: "pointer" },
          onClick: () => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, "_blank"),
          children: [
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: call.caller }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: call.expert }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: /* @__PURE__ */ jsx(CategoryBadge, { children: call.category || "Other" }) }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#334155", children: formatTimeAMPM(call.time) }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", color: "#1e293b", children: formatDurationFromMinutes(call.duration) }),
            /* @__PURE__ */ jsx(Td, { fontSize: "1.4rem", children: call.rating ? /* @__PURE__ */ jsx(RatingStars, { children: "★".repeat(call.rating) }) : /* @__PURE__ */ jsx("span", { style: { fontSize: "1.2rem" }, children: "---" }) })
          ]
        },
        idx
      )) })
    ] }) }),
    meta.pagination?.pageCount > 1 && /* @__PURE__ */ jsxs(PaginationContainer, { children: [
      /* @__PURE__ */ jsx(
        PaginationButton,
        {
          disabled: page === 1,
          onClick: handlePrevPage,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxs(PaginationInfo, { children: [
        "Page ",
        page,
        " of ",
        meta.pagination?.pageCount || 1
      ] }),
      /* @__PURE__ */ jsx(
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
function KpiCard({ label, value, tone = "emerald", ...rest }) {
  return /* @__PURE__ */ jsx(KpiCardContainer, { ...rest, children: /* @__PURE__ */ jsxs(KpiTop, { children: [
    /* @__PURE__ */ jsxs(KpiInfo, { children: [
      /* @__PURE__ */ jsx(KpiLabel, { children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "0.5rem" }, children: [
        label,
        label === "Ongoing calls" && /* @__PURE__ */ jsxs(StatusBadge, { status: "ongoing", children: [
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx("span", { style: { paddingX: "0.8rem" }, children: "Live" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(KpiValue, { children: value })
    ] }),
    /* @__PURE__ */ jsx(KpiIconBox, { tone, children: "⚡" })
  ] }) });
}
function KpiSection({ stats = {} }) {
  return /* @__PURE__ */ jsxs(KpiSection$1, { children: [
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Ongoing calls",
          value: stats.liveCalls,
          tone: "emerald",
          style: { cursor: "pointer" },
          onClick: () => stats.liveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=ongoing&filters[$and][1][createdAt][$gte]=${encodeURIComponent((/* @__PURE__ */ new Date()).toISOString().split("T")[0] + "T00:00:00.000Z")}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Total calls today",
          value: stats.callsToday,
          chip: "Including free & paid",
          tone: "sky"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Declined calls",
          value: stats.declinedCalls,
          tone: "amber",
          style: { cursor: stats.declinedCalls && "pointer" },
          onClick: () => stats.declinedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=declined&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Completed calls",
          value: stats.completedCalls,
          tone: "amber",
          style: { cursor: "pointer" },
          onClick: () => stats.completedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=completed&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Experts online",
          value: stats.expertsOnline,
          tone: "rose",
          onClick: () => stats.expertsOnline > 0 && window.open(
            `/admin/content-manager/collection-types/api::expert-profile.expert-profile?filters[$and][0][isActive][$eq]=true&sort=createdAt:DESC&page=1&pageSize=100`,
            "_blank"
          )
        }
      ),
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          label: "Total call duration",
          value: minutesToMMSS(stats.avgDuration),
          tone: "emerald"
        }
      )
    ] })
  ] });
}
function CallsLiveDashboard() {
  const { stats = {}, liveCalls } = useStreamData() || {};
  return /* @__PURE__ */ jsxs(DashboardContainer, { children: [
    /* @__PURE__ */ jsx(Header, { stats }),
    /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs(GridContainer, { children: [
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(KpiSection, { stats }),
        /* @__PURE__ */ jsx(CategoryGrid, { liveCalls: liveCalls?.length })
      ] }),
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(LiveCallsTable, { stats, liveCalls }),
        /* @__PURE__ */ jsx(RecentCallsTable, { liveCalls: liveCalls?.length })
      ] })
    ] }) })
  ] });
}
const queryClient = new QueryClient();
const HomePage = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Main$1, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(CallsLiveDashboard, {}) }) });
};
const App = () => {
  return /* @__PURE__ */ jsxs(Routes, { children: [
    /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
    /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
  ] });
};
export {
  App
};
//# sourceMappingURL=App-DPqhFAwu.mjs.map
