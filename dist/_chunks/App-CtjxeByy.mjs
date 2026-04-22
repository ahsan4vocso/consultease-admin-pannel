import { jsxs, jsx } from "react/jsx-runtime";
import { useFetchClient, Page } from "@strapi/strapi/admin";
import { NavLink, Routes, Route } from "react-router-dom";
import { useQuery, keepPreviousData, QueryClientProvider, QueryClient } from "@tanstack/react-query";
import React, { useState, useEffect, createContext, useContext, useRef } from "react";
import styled, { useTheme, css, keyframes } from "styled-components";
import { Flex, Box, Typography, Divider, SubNav } from "@strapi/design-system";
import { A as AnalyticalDashboardIcon, P as PLUGIN_ID, C as CallAnalyticsIcon, a as ChartIcon, R as ReferralLogo, V as VoiceCall, b as VideoCall, c as Cross, d as ChevronDown, T as Tick, e as ActiveCall, f as TotalCalls, D as DeclineCall, g as CompletedCall, E as Expert, h as CallTime, S as SearchIcon, i as ReferralIcon, j as ConversionIcon, U as UniqueIcon, W as WalletIcon, k as ActivityIcon, l as TrendingUpIcon, m as UsersIcon, B as BriefcaseIcon, n as UserCheckIcon, o as ExperimentIcon } from "./index-Lyu_fpmp.mjs";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, AreaChart, Area, CartesianGrid } from "recharts";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StyledSubNav = styled(SubNav)`
  width: 200px;
  flex-shrink: 0;
`;
const NavButton = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 2px;
  text-decoration: none;
  border-radius: 12px;
  margin: 4px 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: ${({ theme }) => theme.colors.neutral700};
  background-color: transparent;
  position: relative;
  border: 1px solid transparent;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral150};
    color: ${({ theme }) => theme.colors.primary600};
    transform: translateX(4px);
  }

  &.active {
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.primary700};
    font-weight: 600;
    
    &::before {
      content: "";
      position: absolute;
      left: -12px;
      top: 20%;
      height: 60%;
      width: 4px;
      background-color: ${({ theme }) => theme.colors.primary600};
      border-radius: 0 4px 4px 0;
    }

    /* Target Icon inside active link */
    svg {
      color: ${({ theme }) => theme.colors.primary600};
    }
  }

  span {
    font-size: 1.3rem;
    transition: color 0.2s;
  }
`;
const IconWrapper$4 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.neutral500};
  transition: color 0.2s;
`;
const PluginLayout = ({ children }) => {
  const theme = useTheme();
  return /* @__PURE__ */ jsxs(Flex, { alignItems: "stretch", children: [
    /* @__PURE__ */ jsxs(StyledSubNav, { "aria-label": "Analytics navigation", children: [
      /* @__PURE__ */ jsx(Box, { paddingLeft: 4, paddingTop: 3, paddingBottom: 3, children: /* @__PURE__ */ jsxs(Flex, { gap: 2, alignItems: "center", children: [
        /* @__PURE__ */ jsx(Box, { background: "primary100", padding: 1, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", children: /* @__PURE__ */ jsx(AnalyticalDashboardIcon, { style: { width: "1.8rem", height: "1.8rem", color: theme.colors.primary600 } }) }),
        /* @__PURE__ */ jsx(Typography, { variant: "beta", fontWeight: "bold", textColor: "neutral800", children: "Dashboards" })
      ] }) }),
      /* @__PURE__ */ jsx(Divider, {}),
      /* @__PURE__ */ jsxs(Box, { paddingTop: 2, children: [
        /* @__PURE__ */ jsxs(
          NavButton,
          {
            to: `/plugins/${PLUGIN_ID}`,
            end: true,
            children: [
              /* @__PURE__ */ jsx(IconWrapper$4, { children: /* @__PURE__ */ jsx(CallAnalyticsIcon, { style: { width: "2rem", height: "2rem" } }) }),
              /* @__PURE__ */ jsx(Typography, { variant: "beta", children: "Call Analytics" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          NavButton,
          {
            to: `/plugins/${PLUGIN_ID}/statistics`,
            children: [
              /* @__PURE__ */ jsx(IconWrapper$4, { children: /* @__PURE__ */ jsx(ChartIcon, { style: { width: "1.8rem", height: "1.8rem" } }) }),
              /* @__PURE__ */ jsx(Typography, { variant: "beta", children: "Statistics" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          NavButton,
          {
            to: `/plugins/${PLUGIN_ID}/referral-analytics`,
            children: [
              /* @__PURE__ */ jsx(IconWrapper$4, { children: /* @__PURE__ */ jsx(ReferralLogo, { style: { width: "2rem", height: "2rem" } }) }),
              /* @__PURE__ */ jsx(Typography, { variant: "beta", children: "Referral Analytics" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(Box, { flex: "1", background: "neutral100", children })
  ] });
};
const pulseInfo = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
`;
const slideUp$2 = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const rowFadeIn$1 = keyframes`
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;
const fadeIn$2 = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;
const scrollbarStyles$1 = css`
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
const DashboardContainer$1 = styled.div`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  flex-direction: column;
  animation: ${fadeIn$2} 0.5s ease-out both;
  ${scrollbarStyles$1}
`;
const Header$4 = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const HeaderLeft$1 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const IconBox$3 = styled.div`
  padding: 10px;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.primary600};
`;
const TitleBox = styled.div``;
const Title$5 = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
const MetaText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  margin-top: 0.125rem;
`;
const HeaderRight$1 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
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
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.4rem 0.5rem;
`;
const LiveDot = styled.span`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success500};
  animation: ${pulseInfo} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
`;
styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
`;
styled.span`
  color: ${({ theme }) => theme.colors.neutral400};
`;
styled.select`
  border-radius: 9999px;
  font-size: 12px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  padding: 0.4rem 0.75rem;
  outline: none;
  color: ${({ theme }) => theme.colors.neutral600};
`;
styled.button`
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
const Main = styled.main`
  flex: 1;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.neutral100};
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
const Card$1 = styled.section`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 1rem;
  animation: ${slideUp$2} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.index || 0) * 0.1}s;
`;
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`;
const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const CardSubtitle = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const CategoryGrid$1 = styled.div`
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
const CategoryItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  min-height: 80px;
  animation: ${slideUp$2} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.index || 0) * 0.1}s;
`;
const CategoryName = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;
const CategoryStats = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled.p`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success600};
  margin: 0;
`;
const CategoryRating = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0;
`;
const ChartContainer$1 = styled.div`
  height: 16rem;
`;
styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  animation: ${slideUp$2} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
`;
styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;
styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
styled.div`
  width: 6rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral200};
  overflow: hidden;
`;
styled.div`
  height: 100%;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.success500};
  width: ${(props) => props.width || "0%"};
`;
styled.span`
  font-size: 11px;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral600};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
styled.div`
  display: none;
  @media (min-width: 640px) {
    display: flex;
  }
  align-items: center;
  gap: 0.25rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
`;
styled.span`
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  background-color: ${(props) => props.bg || props.theme.colors.neutral100};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  animation: ${slideUp$2} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
`;
styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  width: 1rem;
`;
styled.div`
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
styled.div`
  display: flex;
  flex-direction: column;
`;
styled.p`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
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
  color: ${({ theme }) => theme.colors.neutral400};
  margin: 0;
`;
styled.p`
  font-weight: 600;
  color: ${(props) => props.color || props.theme.colors.neutral800};
  margin: 0;
`;
const TableSection = styled.section`
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  animation: ${slideUp$2} 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.index || 0) * 0.1}s;
`;
const TableHeader$1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
`;
const ActiveBadge = styled.span`
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
styled.button`
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
const TableContainer$1 = styled.div`
  overflow-x: auto;
  ${(props) => props.maxHeight && css`
    max-height: ${props.maxHeight};
    overflow-y: auto;
  `}
  ${(props) => props.minHeight && css`
    min-height: ${props.minHeight};
  `}
  ${scrollbarStyles$1}
`;
const Table$1 = styled.table`
  min-width: 100%;
  font-size: 1.5rem;
  border-collapse: collapse;
`;
const Thead$1 = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral100};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.025em;
  font-size: 1.3rem;
`;
const Th$1 = styled.th`
  padding: 0.5rem 1rem;
  white-space: nowrap;
  text-align: ${(props) => props.align || "center"};
  font-weight: 500;
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.neutral100};
  z-index: 1;
`;
const Tr$1 = styled.tr`
  transition: all 0.2s ease;
  animation: ${rowFadeIn$1} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.index || 0) * 0.05}s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.neutral100};
    transform: scale(1.001);
  }
`;
const Td$1 = styled.td`
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
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.success200 : theme.colors.success600};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${(props) => /declined|missed|busy|pending/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.danger200 : theme.colors.danger600};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
  ${(props) => /pending/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.warning200 : theme.colors.warning600};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${(props) => /completed/i.test(props.status) && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.colors.neutral800};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
`;
const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  background-color: ${({ theme }) => theme.colors.neutral100};
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral700};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
styled.button`
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
const RatingStars = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.125rem 0.5rem;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.warning600};
`;
const KpiCardContainer = styled.div`
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  padding: 0.75rem 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
  animation: ${slideUp$2} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.index || 0) * 0.1}s;
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
  gap: 1rem;
`;
const KpiLabel = styled.div`
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
const KpiValueWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  line-height: 1;
`;
const KpiValue = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  line-height: 1;
`;
const KpiChartWrapper = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
styled.div`
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
`;
styled.span`
  color: ${({ theme }) => theme.colors.neutral400};
`;
const KpiChip = styled.span`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid transparent;
  padding: 0.125rem 0.5rem;

  font-weight: 500;

  ${(props) => props.tone === "emerald" && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.success200 : theme.colors.success700};
    border-color: ${({ theme }) => theme.colors.success200};
  `}
  ${(props) => props.tone === "amber" && css`
    background-color: ${({ theme }) => theme.colors.warning100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.warning200 : theme.colors.warning700};
    border-color: ${({ theme }) => theme.colors.warning200};
  `}
  ${(props) => props.tone === "sky" && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.primary200 : theme.colors.primary700};
    border-color: ${({ theme }) => theme.colors.primary200};
  `}
  ${(props) => props.tone === "rose" && css`
    background-color: ${({ theme }) => theme.colors.danger100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.danger200 : theme.colors.danger700};
    border-color: ${({ theme }) => theme.colors.danger200};
  `}
`;
const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 1rem;
  color: ${({ theme }) => theme.colors.neutral400};
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
  color: ${({ theme }) => theme.colors.neutral500};
`;
const EmptyStateSubText = styled.p`
  font-size: 12px;
  margin: 0;
  opacity: 0.8;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const PaginationContainer$1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const PaginationButton = styled.button`
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

  ${(props) => props.active && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    border-color: ${({ theme }) => theme.colors.primary200};
    color: ${({ theme }) => theme.colors.primary600};
    font-weight: 600;
  `}
`;
const PaginationInfo$1 = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral500};
`;
const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: ${({ theme }) => theme.colors.neutral0};
  padding: 0.35rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
`;
const FilterButton = styled.button`
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
const LiveFilterButton = styled(FilterButton)`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${(props) => props.active ? props.theme.colors.success100 : props.theme.colors.neutral0};
  border: 1px solid ${(props) => props.active ? props.theme.colors.success500 : props.theme.colors.neutral150};
  color: ${(props) => props.active ? props.theme.name === "dark" ? props.theme.colors.success200 : props.theme.colors.success700 : props.theme.colors.neutral600};
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  box-shadow: ${(props) => props.active ? "0 0 12px rgba(34, 197, 94, 0.2)" : "none"};

  &:hover {
    background-color: ${(props) => props.active ? props.theme.colors.success100 : props.theme.colors.neutral100};
    border-color: ${(props) => props.active ? props.theme.colors.success500 : props.theme.colors.neutral300};
  }

  ${LiveDot} {
    background-color: ${(props) => props.active ? props.theme.colors.success500 : props.theme.colors.neutral400};
    animation: ${(props) => props.active ? css`${pulseInfo} 2s infinite` : "none"};
  }
`;
const FilterDivider = styled.div`
  width: 1px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.neutral200};
  margin: 0 0.75rem;
`;
const CustomRangeContainer = styled.div`
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
const DateInput = styled.input`
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
const DateLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.neutral400};
  letter-spacing: 0.025em;
`;
styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;
const DropdownButton = styled.button`
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
const DropdownMenu = styled.div`
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
const DropdownItem = styled.div`
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
const TickIcon = styled.span`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.primary600};
`;
styled.button`
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
  if (!active) return css`
      background: ${theme.colors.neutral0};
      color: ${theme.colors.neutral600};
      border: 1px solid ${theme.colors.neutral200};
      &:hover {
        background: ${theme.colors.neutral100};
      }
    `;
  switch (status) {
    case "completed":
      return css`
          background: ${theme.colors.success100};
          color: ${theme.colors.success600};
          border-color: ${theme.colors.success200};
        `;
    case "declined":
    case "missed":
    case "busy":
      return css`
          background: ${theme.colors.danger100};
          color: ${theme.colors.danger600};
          border-color: ${theme.colors.danger200};
        `;
    case "force complete by admin":
      return css`
          background: ${theme.colors.secondary100};
          color: ${theme.colors.secondary600};
          border-color: ${theme.colors.secondary200};
        `;
    default:
      return css`
          background: ${theme.colors.primary100};
          color: ${theme.colors.primary600};
          border-color: ${theme.colors.primary200};
        `;
  }
}}
`;
const ModalOverlay = styled.div`
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
const ModalContent = styled.div`
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
const ModalHeader = styled.div`
  padding: 20px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const ModalBody = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const ModalFooter = styled.div`
  padding: 16px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.neutral100};
`;
const DataRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
  &:last-child {
    border-bottom: none;
  }
`;
const DataLabel = styled.span`
  color: ${({ theme }) => theme.colors.neutral500};
  font-size: 13px;
  font-weight: 500;
`;
const DataValue = styled.span`
  color: ${({ theme }) => theme.colors.neutral800};
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const CloseButton = styled.button`
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
const ModalButton = styled.button`
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
  
  ${(props) => props.variant === "secondary" && css`
    background-color: ${({ theme }) => theme.colors.neutral0};
    border-color: ${({ theme }) => theme.colors.neutral200};
    color: ${({ theme }) => theme.colors.neutral800};
    &:hover {
      background-color: ${({ theme }) => theme.colors.neutral100};
      border-color: ${({ theme }) => theme.colors.neutral300};
    }
  `}

  ${(props) => props.variant === "primary" && css`
    background-color: ${({ theme }) => theme.colors.primary600};
    color: #ffffff;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary700};
    }
  `}

  ${(props) => props.variant === "danger" && css`
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
  if (filter === "month") {
    start = new Date(now.getFullYear(), now.getMonth(), 1);
    start.setHours(0, 0, 0, 0);
    return { start: start.toISOString(), end: now.toISOString() };
  }
  if (filter === "last_month") {
    start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    start.setHours(0, 0, 0, 0);
    end = new Date(now.getFullYear(), now.getMonth(), 0);
    end.setHours(23, 59, 59, 999);
    return { start: start.toISOString(), end: end.toISOString() };
  }
  if (filter === "last_3_months") {
    start.setDate(now.getDate() - 90);
    start.setHours(0, 0, 0, 0);
    return { start: start.toISOString(), end: now.toISOString() };
  }
  if (filter === "quarter") {
    start.setDate(now.getDate() - 90);
    start.setHours(0, 0, 0, 0);
    return { start: start.toISOString(), end: now.toISOString() };
  }
  if (filter === "year") {
    start.setDate(now.getDate() - 365);
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
function formatCurrency$1(value, useShortener = false) {
  if (value == null || isNaN(value)) return "₹0";
  const num = Number(value);
  if (useShortener && num >= 1e3) {
    return `₹${(num / 1e3).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return `₹${num.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}
function getInitials(name) {
  if (!name) return "??";
  const parts = name.split(" ").filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}
const useCompletedCalls = (page = 1, filter = "60min", customRange, statuses = []) => {
  const { get } = useFetchClient();
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
  const query = useQuery({
    queryKey: ["completed-calls", page, filter, customRange, statuses],
    queryFn: async () => {
      const { data } = await get("/admin-pannel/recent-calls", { params });
      return data;
    }
  });
  return { ...query, data: query.data?.data, meta: query.data?.meta || {} };
};
const useDashboardStats = (filter = "today", customRange) => {
  const { get } = useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  return useQuery({
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
      voice: { liveCalls: 0, callsToday: 0, declinedCalls: 0, missedCalls: 0, completedCalls: 0, avgDuration: 0 },
      video: { liveCalls: 0, callsToday: 0, declinedCalls: 0, missedCalls: 0, completedCalls: 0, avgDuration: 0 },
      expertsOnline: 0,
      totalExperts: 0
    }
  });
};
const useCategoryStats = (filter = "today", customRange) => {
  const { get } = useFetchClient();
  const { start, end } = getDateRange(filter, customRange);
  return useQuery({
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
const useAdminSummary = () => {
  const { get } = useFetchClient();
  return useQuery({
    queryKey: ["admin-stats-summary"],
    queryFn: async () => {
      const { data } = await get("/admin-pannel/stats/summary");
      return data;
    }
  });
};
const useAdminGraph = (filter = "day wise") => {
  const { get } = useFetchClient();
  return useQuery({
    queryKey: ["admin-stats-graph", filter],
    queryFn: async () => {
      const { data } = await get("/admin-pannel/stats/graph", {
        params: { filter }
      });
      return data;
    },
    placeholderData: keepPreviousData
  });
};
const useStreamData = () => {
  const [liveData, setLiveData] = useState({
    stats: {},
    liveCalls: [],
    recentCalls: [],
    categoryStats: []
  });
  useEffect(() => {
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
const DashboardContext = createContext();
const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within a DashboardProvider");
  }
  return context;
};
const DashboardProvider = ({ children }) => {
  const [timeFilter, setTimeFilter] = useState("live");
  const [customRange, setCustomRange] = useState({
    start: localStorage.getItem("dashboard_start_date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    end: localStorage.getItem("dashboard_end_date") || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
  });
  const {
    stats: liveStats = {},
    liveCalls = [],
    recentCalls: liveRecentCalls = [],
    categoryStats: liveCategoryStats = []
  } = useStreamData() || {};
  const [recentCallsPage, setRecentCallsPage] = useState(1);
  const [recentCallsStatuses, setRecentCallsStatuses] = useState([]);
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
  return /* @__PURE__ */ jsx(DashboardContext.Provider, { value, children });
};
function Header$3() {
  const { stats, filter, handleFilterChange, customRange } = useDashboardContext();
  const { voice = {}, video = {} } = stats || {};
  const totalCallsToday = (voice.callsToday || 0) + (video.callsToday || 0);
  const totalDeclinedCalls = (voice.declinedCalls || 0) + (video.declinedCalls || 0);
  const droppedRate = totalCallsToday ? (totalDeclinedCalls / totalCallsToday * 100).toFixed(1) : 0;
  const [startDate, setStartDate] = useState(customRange.start);
  const [endDate, setEndDate] = useState(customRange.end);
  useEffect(() => {
    setStartDate(customRange.start);
    setEndDate(customRange.end);
  }, [customRange]);
  useEffect(() => {
    if (filter === "custom" && startDate && endDate) {
      handleFilterChange("custom", { start: startDate, end: endDate });
    }
  }, [startDate, endDate, filter]);
  const handlePresetChange = (preset) => {
    handleFilterChange(preset);
  };
  return /* @__PURE__ */ jsxs(Header$4, { children: [
    /* @__PURE__ */ jsxs(HeaderLeft$1, { children: [
      /* @__PURE__ */ jsx(IconBox$3, { children: /* @__PURE__ */ jsx(CallAnalyticsIcon, { style: { width: "32px", height: "32px" } }) }),
      /* @__PURE__ */ jsxs(TitleBox, { children: [
        /* @__PURE__ */ jsx(Title$5, { children: "Call Analytics" }),
        /* @__PURE__ */ jsx(Subtitle, { children: "Realtime view of ConsultEase calls, categories & expert load." }),
        /* @__PURE__ */ jsxs(MetaText, { children: [
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
    /* @__PURE__ */ jsx(HeaderRight$1, { children: /* @__PURE__ */ jsxs(FilterContainer, { children: [
      /* @__PURE__ */ jsxs(
        LiveFilterButton,
        {
          active: filter === "live",
          onClick: () => handlePresetChange("live"),
          children: [
            /* @__PURE__ */ jsx(LiveDot, {}),
            " Live"
          ]
        }
      ),
      /* @__PURE__ */ jsx(FilterDivider, {}),
      ["yesterday", "week", "month", "last_month", "quarter", "year"].map((preset) => /* @__PURE__ */ jsx(
        FilterButton,
        {
          active: filter === preset,
          onClick: () => handlePresetChange(preset),
          children: preset === "last_month" ? "Last Month" : preset === "month" ? "This Month" : preset.charAt(0).toUpperCase() + preset.slice(1)
        },
        preset
      )),
      /* @__PURE__ */ jsx(
        FilterButton,
        {
          active: filter === "custom",
          onClick: () => handlePresetChange("custom"),
          children: "Custom Range"
        }
      ),
      filter === "custom" && /* @__PURE__ */ jsxs(CustomRangeContainer, { children: [
        /* @__PURE__ */ jsx(DateLabel, { children: "From" }),
        /* @__PURE__ */ jsx(
          DateInput,
          {
            type: "date",
            value: startDate,
            onChange: (e) => setStartDate(e.target.value)
          }
        ),
        /* @__PURE__ */ jsx(DateLabel, { children: "To" }),
        /* @__PURE__ */ jsx(
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
function KpiCard({ label, value, tone = "emerald", chartData, Icon, extra, ...rest }) {
  const theme = useTheme();
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
  return /* @__PURE__ */ jsx(KpiCardContainer, { ...rest, children: /* @__PURE__ */ jsxs(KpiTop, { children: [
    /* @__PURE__ */ jsxs(KpiInfo, { children: [
      /* @__PURE__ */ jsxs(KpiLabel, { children: [
        Icon && /* @__PURE__ */ jsx(Icon, { style: { width: "2rem", height: "2rem", color: getIconColor(tone) } }),
        label,
        label === "Ongoing calls" && /* @__PURE__ */ jsxs(StatusBadge, { status: "ongoing", children: [
          /* @__PURE__ */ jsx(
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
          /* @__PURE__ */ jsx("span", { style: { paddingLeft: "0.4rem" }, children: "Live" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(KpiValueWrapper, { children: [
        /* @__PURE__ */ jsx(KpiValue, { children: value }),
        extra
      ] })
    ] }),
    chartData && /* @__PURE__ */ jsx(KpiChartWrapper, { children: /* @__PURE__ */ jsx(PieChartWithPaddingAngle, { data: chartData, tone }) })
  ] }) });
}
function PieChartWithPaddingAngle({ isAnimationActive = true, data, tone }) {
  const theme = useTheme();
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
  return /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
    /* @__PURE__ */ jsx(
      Pie,
      {
        data,
        innerRadius: "70%",
        outerRadius: "100%",
        cornerRadius: "50%",
        paddingAngle: 6,
        dataKey: "value",
        isAnimationActive,
        stroke: "none",
        children: data.map((entry, index) => /* @__PURE__ */ jsx(
          Cell,
          {
            fill: chartColors[entry.name] || defaultColors[index % defaultColors.length]
          },
          `cell-${index}`
        ))
      }
    ),
    /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip$1, {}), cursor: { fill: "transparent" } })
  ] }) });
}
function CustomTooltip$1({ active, payload }) {
  if (active && payload && payload.length) {
    const { name, value, realValue, fill } = payload[0].payload;
    const displayValue = realValue !== void 0 ? realValue : value;
    return /* @__PURE__ */ jsxs("div", { style: {
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
      /* @__PURE__ */ jsx("span", { style: { color: "#666", fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.05em" }, children: name }),
      /* @__PURE__ */ jsx("span", { style: { color: fill, fontSize: "12px" }, children: displayValue })
    ] });
  }
  return null;
}
function EmptyState({ title, subtitle, icon = "📭" }) {
  return /* @__PURE__ */ jsxs(EmptyStateContainer, { children: [
    /* @__PURE__ */ jsx(EmptyStateIcon, { children: icon }),
    /* @__PURE__ */ jsx(EmptyStateText, { children: title }),
    subtitle && /* @__PURE__ */ jsx(EmptyStateSubText, { children: subtitle })
  ] });
}
const StarIcon = ({ fill, id, size = 10 }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { marginRight: "1px" },
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: `half-${id}`, children: [
          /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "currentColor" }),
          /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "transparent", stopOpacity: "0" })
        ] }) }),
        /* @__PURE__ */ jsx(
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
  return /* @__PURE__ */ jsx("div", { style: { display: "inline-flex", alignItems: "center" }, children: [1, 2, 3, 4, 5].map((i) => {
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
    return /* @__PURE__ */ jsx(StarIcon, { fill, id: `${rating}-${i}`, size }, i);
  }) });
};
const CHART_COLORS = {
  voice: "#7476f1ff",
  video: "#48ecbbff"
};
const CustomTooltip = ({ active, payload, label, theme }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return /* @__PURE__ */ jsxs("div", { style: {
      backgroundColor: theme.colors.neutral0,
      border: `1px solid ${theme.colors.neutral150}`,
      padding: "12px",
      borderRadius: "8px",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      minWidth: "150px"
    }, children: [
      /* @__PURE__ */ jsx("p", { style: {
        fontWeight: 600,
        marginBottom: "8px",
        fontSize: "12px",
        color: theme.colors.neutral800,
        borderBottom: `1px solid ${theme.colors.neutral150}`,
        paddingBottom: "4px"
      }, children: label }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "4px" }, children: [
        /* @__PURE__ */ jsxs("p", { style: { color: CHART_COLORS.voice, fontSize: "11px", fontWeight: 600 }, children: [
          "Voice Calls: ",
          data.calls
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { color: CHART_COLORS.video, fontSize: "11px", fontWeight: 600 }, children: [
          "Video Calls: ",
          data.videoCalls
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px", marginTop: "4px", borderTop: `1px solid ${theme.colors.neutral100}`, paddingTop: "4px" }, children: [
          "Total: ",
          data.totalCalls
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px" }, children: [
          "Minutes: ",
          data.minutes
        ] }),
        /* @__PURE__ */ jsxs("p", { style: { color: theme.colors.neutral600, fontSize: "11px", display: "flex", alignItems: "center", gap: "4px" }, children: [
          "Avg Rating: ",
          /* @__PURE__ */ jsx(RatingStars, { children: /* @__PURE__ */ jsx(StarRating, { rating: data.avgRating }) })
        ] })
      ] })
    ] });
  }
  return null;
};
function CategoryGrid() {
  const { categoryStats, filter } = useDashboardContext();
  const theme = useTheme();
  return /* @__PURE__ */ jsxs(Card$1, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(CardTitle, { children: "Calls by Category" }),
      /* @__PURE__ */ jsx(CardSubtitle, { children: "Call distribution by topics" })
    ] }) }),
    /* @__PURE__ */ jsx(CategoryGrid$1, { children: categoryStats.length === 0 ? /* @__PURE__ */ jsx("div", { style: { gridColumn: "1 / -1" }, children: /* @__PURE__ */ jsx(
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
    ) }) : categoryStats.map((row, idx) => /* @__PURE__ */ jsxs(CategoryItem, { index: idx + 5, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.25rem", overflow: "hidden" }, children: [
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
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { width: "50px", height: "50px", flexShrink: 0 }, children: /* @__PURE__ */ jsx(
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
      /* @__PURE__ */ jsx("div", { style: { position: "absolute", bottom: "4px", right: "6px" }, children: /* @__PURE__ */ jsxs(CategoryRating, { children: [
        /* @__PURE__ */ jsx("span", { children: "★" }),
        /* @__PURE__ */ jsx("span", { children: row.avgRating })
      ] }) })
    ] }, row.name)) }),
    categoryStats.length > 1 && /* @__PURE__ */ jsx(ChartContainer$1, { style: { height: "350px" }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: categoryStats, barSize: 25, margin: { top: 10, right: 10, left: 0, bottom: 40 }, children: [
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "name",
          tickLine: false,
          axisLine: false,
          tick: { fontSize: 10, fill: theme.colors.neutral500, angle: -45, textAnchor: "end" },
          height: 60,
          interval: 0
        }
      ),
      /* @__PURE__ */ jsx(YAxis, { hide: true, axisLine: false, tickLine: false }),
      /* @__PURE__ */ jsx(Tooltip, { content: /* @__PURE__ */ jsx(CustomTooltip, { theme }), cursor: { fill: theme.colors.neutral100 } }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "calls", radius: [6, 6, 0, 0], fill: CHART_COLORS.voice }),
      /* @__PURE__ */ jsx(Bar, { dataKey: "videoCalls", radius: [6, 6, 0, 0], fill: CHART_COLORS.video })
    ] }) }) })
  ] });
}
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};
const useMovingTime = () => {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1e3);
    return () => clearInterval(id);
  }, []);
  return now;
};
function LiveCallsTable() {
  const { stats, liveCalls } = useDashboardContext();
  const s = stats || {};
  const currMovingTime = useMovingTime();
  const theme = useTheme();
  const { post } = useFetchClient();
  const [selectedCall, setSelectedCall] = useState(null);
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
        toast.success(`Call ${selectedCall.id} declined successfully.`);
      } catch (error) {
        console.error("🔔 [LiveCallsTable] Failed to decline call:", error);
        toast.error(error.response?.data?.error?.message || "Failed to decline the call.");
      }
      closeModal();
    }
  };
  return /* @__PURE__ */ jsxs(TableSection, { index: 3, children: [
    /* @__PURE__ */ jsxs(TableHeader$1, { children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Live calls" }),
        /* @__PURE__ */ jsx(CardSubtitle, { children: "Monitor ongoing calls." })
      ] }),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: "10px" }, children: /* @__PURE__ */ jsxs(ActiveBadge, { children: [
        /* @__PURE__ */ jsx(LiveDot, {}),
        " ",
        (s.voice?.liveCalls || 0) + (s.video?.liveCalls || 0),
        " ongoing"
      ] }) })
    ] }),
    /* @__PURE__ */ jsx(TableContainer$1, { maxHeight: "350px", minHeight: "200px", children: /* @__PURE__ */ jsxs(Table$1, { children: [
      /* @__PURE__ */ jsx(Thead$1, { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(Th$1, { children: "Call ID" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Type" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Caller" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Expert" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Start Time" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Duration" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Category" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: liveCalls.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "8", children: /* @__PURE__ */ jsx(
        EmptyState,
        {
          title: "No live calls",
          subtitle: "Ongoing consultations will appear here."
        }
      ) }) }) : liveCalls.map((call, idx) => /* @__PURE__ */ jsxs(
        Tr$1,
        {
          index: idx,
          style: { cursor: "pointer" },
          onClick: () => setSelectedCall(call),
          children: [
            /* @__PURE__ */ jsx(Td$1, { fontFamily: "monospace", children: call.id }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.type == "voiceCall" ? /* @__PURE__ */ jsx(VoiceCall, { style: { width: "20px", height: "20px", color: "#5272a3ff" } }) : /* @__PURE__ */ jsx(VideoCall, { style: { width: "20px", height: "20px", color: "#219bacff" } }) }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.caller }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.expert }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: formatTimeAMPM(call.startTime) || "---" }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.startTime ? minutesToMMSS((currMovingTime - new Date(call.startTime).getTime()) / (1e3 * 60)) : "---" }),
            /* @__PURE__ */ jsxs(Td$1, { children: [
              " ",
              /* @__PURE__ */ jsx(CategoryBadge, { children: call.category })
            ] }),
            /* @__PURE__ */ jsx(Td$1, { children: /* @__PURE__ */ jsxs(StatusBadge, { status: call.status, children: [
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
    ] }) }),
    selectedCall && /* @__PURE__ */ jsx(ModalOverlay, { onClick: closeModal, children: /* @__PURE__ */ jsxs(ModalContent, { onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs(ModalHeader, { children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
          /* @__PURE__ */ jsx("div", { style: {
            backgroundColor: selectedCall.type === "voiceCall" ? theme.colors.primary100 : theme.colors.success100,
            color: selectedCall.type === "voiceCall" ? theme.colors.primary600 : theme.colors.success600,
            padding: "8px",
            borderRadius: "12px",
            display: "flex"
          }, children: selectedCall.type === "voiceCall" ? /* @__PURE__ */ jsx(VoiceCall, { style: { width: "24px", height: "24px" } }) : /* @__PURE__ */ jsx(VideoCall, { style: { width: "24px", height: "24px" } }) }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx(CardTitle, { style: { fontSize: "16px" }, children: "Call Details" }),
            /* @__PURE__ */ jsxs(CardSubtitle, { style: { fontSize: "11px" }, children: [
              "ID: ",
              selectedCall.id
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx(CloseButton, { onClick: closeModal, children: /* @__PURE__ */ jsx(Cross, { style: { width: "20px", height: "20px" } }) })
      ] }),
      /* @__PURE__ */ jsxs(ModalBody, { children: [
        /* @__PURE__ */ jsxs(DataRow, { children: [
          /* @__PURE__ */ jsx(DataLabel, { children: "Caller" }),
          /* @__PURE__ */ jsx(DataValue, { children: selectedCall.caller })
        ] }),
        /* @__PURE__ */ jsxs(DataRow, { children: [
          /* @__PURE__ */ jsx(DataLabel, { children: "Expert" }),
          /* @__PURE__ */ jsx(DataValue, { children: selectedCall.expert })
        ] }),
        /* @__PURE__ */ jsxs(DataRow, { children: [
          /* @__PURE__ */ jsx(DataLabel, { children: "Category" }),
          /* @__PURE__ */ jsx(DataValue, { children: /* @__PURE__ */ jsx(CategoryBadge, { children: selectedCall.category }) })
        ] }),
        /* @__PURE__ */ jsxs(DataRow, { children: [
          /* @__PURE__ */ jsx(DataLabel, { children: "Start Time" }),
          /* @__PURE__ */ jsx(DataValue, { children: formatTimeAMPM(selectedCall.startTime) || "---" })
        ] }),
        /* @__PURE__ */ jsxs(DataRow, { children: [
          /* @__PURE__ */ jsx(DataLabel, { children: "Duration" }),
          /* @__PURE__ */ jsx(DataValue, { children: selectedCall.startTime ? minutesToMMSS((currMovingTime - new Date(selectedCall.startTime).getTime()) / (1e3 * 60)) : "---" })
        ] }),
        /* @__PURE__ */ jsxs(DataRow, { children: [
          /* @__PURE__ */ jsx(DataLabel, { children: "Status" }),
          /* @__PURE__ */ jsx(DataValue, { children: /* @__PURE__ */ jsxs(StatusBadge, { status: selectedCall.status, children: [
            /* @__PURE__ */ jsx("span", { style: { width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" } }),
            selectedCall.status === "pending" ? "Calling" : selectedCall.status
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(ModalFooter, { children: [
        /* @__PURE__ */ jsx(ModalButton, { variant: "danger", onClick: handleDeclineCall, children: "Decline Call" }),
        /* @__PURE__ */ jsx(ModalButton, { variant: "primary", onClick: handleRedirect, children: "View Details" })
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef(null);
  useEffect(() => {
    setPage(1);
  }, [filter]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(TableSection, { index: 4, children: [
    /* @__PURE__ */ jsxs(TableHeader$1, { children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: "Call Activity" }),
        /* @__PURE__ */ jsxs(CardSubtitle, { children: [
          "All closed calls snapshot. ",
          meta.pagination?.total ? `Total calls: ${meta.pagination?.total}` : ""
        ] })
      ] }),
      filter !== "live" && /* @__PURE__ */ jsxs(DropdownContainer, { ref: filterRef, children: [
        /* @__PURE__ */ jsxs(DropdownButton, { onClick: () => setIsFilterOpen(!isFilterOpen), children: [
          "Filter ",
          selectedStatuses.length > 0 && `(${selectedStatuses.length})`,
          /* @__PURE__ */ jsx(ChevronDown, {})
        ] }),
        isFilterOpen && /* @__PURE__ */ jsx(DropdownMenu, { children: STATUS_OPTIONS.map((opt) => /* @__PURE__ */ jsxs(
          DropdownItem,
          {
            onClick: () => toggleStatus(opt.value),
            children: [
              opt.label,
              selectedStatuses.includes(opt.value) && /* @__PURE__ */ jsx(TickIcon, { children: /* @__PURE__ */ jsx(Tick, {}) })
            ]
          },
          opt.value
        )) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(TableContainer$1, { maxHeight: "450px", minHeight: "200px", children: /* @__PURE__ */ jsxs(Table$1, { children: [
      /* @__PURE__ */ jsx(Thead$1, { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx(Th$1, { children: "Call Id" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Type" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Caller" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Expert" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Category" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Start Time" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Duration" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Status" }),
        /* @__PURE__ */ jsx(Th$1, { children: "Rating" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: calls.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: "9", children: /* @__PURE__ */ jsx(
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
      ) }) }) : calls.map((call, idx) => /* @__PURE__ */ jsxs(
        Tr$1,
        {
          index: idx,
          style: { cursor: "pointer" },
          onClick: () => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, "_blank"),
          children: [
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.id }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.type == "voiceCall" ? /* @__PURE__ */ jsx(VoiceCall, { style: { width: "20px", height: "20px", color: "#5272a3ff" } }) : /* @__PURE__ */ jsx(VideoCall, { style: { width: "20px", height: "20px", color: "#219bacff" } }) }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.caller }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: call.expert }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: /* @__PURE__ */ jsx(CategoryBadge, { children: call.category || "Other" }) }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: formatDateTime(call.time) }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: minutesToMMSS(call.duration) }),
            /* @__PURE__ */ jsx(Td$1, { children: /* @__PURE__ */ jsxs(StatusBadge, { status: call.status, children: [
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
            ] }) }),
            /* @__PURE__ */ jsx(Td$1, { fontSize: "1.4rem", children: /* @__PURE__ */ jsx(RatingStars, { children: /* @__PURE__ */ jsx(StarRating, { rating: call.rating, size: 10 }) }) })
          ]
        },
        idx
      )) })
    ] }) }),
    meta.pagination?.pageCount > 1 && /* @__PURE__ */ jsxs(PaginationContainer$1, { children: [
      /* @__PURE__ */ jsx(
        PaginationButton,
        {
          disabled: page === 1,
          onClick: handlePrevPage,
          children: "Previous"
        }
      ),
      /* @__PURE__ */ jsxs(PaginationInfo$1, { children: [
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
function KpiSection() {
  const { stats } = useDashboardContext();
  const s = stats || {};
  const voice = s.voice || {};
  const video = s.video || {};
  const expertsOnline = s.expertsOnline || 0;
  const totalExperts = s.totalExperts || 0;
  const totalLiveCalls = (voice.liveCalls || 0) + (video.liveCalls || 0);
  const totalCallsToday = (voice.callsToday || 0) + (video.callsToday || 0);
  const totalDeclinedCount = (voice.declinedCalls || 0) + (video.declinedCalls || 0);
  const totalMissedCount = (voice.missedCalls || 0) + (video.missedCalls || 0);
  const totalDeclined = totalDeclinedCount + totalMissedCount;
  const totalCompletedCalls = (voice.completedCalls || 0) + (video.completedCalls || 0);
  const totalAvgDuration = (voice.avgDuration || 0) + (video.avgDuration || 0);
  console.table({ voice, video });
  return /* @__PURE__ */ jsxs(KpiSection$1, { children: [
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          index: 0,
          label: "Ongoing calls",
          value: totalLiveCalls,
          tone: "emerald",
          Icon: ActiveCall,
          style: { cursor: "pointer" },
          chartData: [
            { name: "Voice", value: voice.liveCalls || 0 },
            { name: "Video", value: video.liveCalls || 0 }
          ],
          onClick: () => totalLiveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=ongoing&filters[$and][1][createdAt][$gte]=${encodeURIComponent((/* @__PURE__ */ new Date()).toISOString().split("T")[0] + "T00:00:00.000Z")}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          index: 1,
          label: "Total calls",
          value: totalCallsToday,
          chip: "Including free & paid",
          tone: "sky",
          Icon: TotalCalls,
          chartData: [
            { name: "Voice", value: voice.callsToday || 0 },
            { name: "Video", value: video.callsToday || 0 }
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          index: 2,
          label: "Declined/Missed calls",
          value: totalDeclined,
          tone: "rose",
          Icon: DeclineCall,
          style: { cursor: totalDeclined && "pointer" },
          chartData: [
            { name: "Voice", value: (voice.declinedCalls || 0) + (voice.missedCalls || 0) },
            { name: "Video", value: (video.declinedCalls || 0) + (video.missedCalls || 0) }
          ],
          extra: /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: "0.4rem", marginTop: "0.2rem" }, children: [
            /* @__PURE__ */ jsxs(KpiChip, { tone: "rose", style: { fontSize: "10px", padding: "0.4rem 0.6rem" }, children: [
              totalDeclinedCount,
              " declined"
            ] }),
            /* @__PURE__ */ jsxs(KpiChip, { tone: "amber", style: { fontSize: "10px", padding: "0.4rem 0.6rem" }, children: [
              totalMissedCount,
              " missed"
            ] })
          ] }),
          onClick: () => totalDeclined > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$in][0]=declined&filters[$and][0][callStatus][$in][1]=missed&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      ),
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          index: 3,
          label: "Completed calls",
          value: totalCompletedCalls,
          tone: "emerald",
          Icon: CompletedCall,
          style: { cursor: "pointer" },
          chartData: [
            { name: "Voice", value: voice.completedCalls || 0 },
            { name: "Video", value: video.completedCalls || 0 }
          ],
          onClick: () => totalCompletedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call?filters[$and][0][callStatus][$eq]=completed&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date((/* @__PURE__ */ new Date()).setUTCHours(0, 0, 0, 0)).toISOString())}&page=1`, "_blank")
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(KpiGrid, { children: [
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          index: 4,
          label: "Experts online",
          value: expertsOnline,
          tone: "sky",
          Icon: Expert,
          extra: /* @__PURE__ */ jsxs(KpiChip, { tone: "sky", style: { fontSize: "10px", padding: "0.4rem 0.6rem" }, children: [
            totalExperts,
            " Total"
          ] }),
          onClick: () => expertsOnline > 0 && // open strapi conent manager
          window.open(
            `/admin/content-manager/collection-types/api::expert-profile.expert-profile?filters[$and][0][isActive][$eq]=true&sort=createdAt:DESC&page=1&pageSize=100`,
            "_blank"
          )
        }
      ),
      /* @__PURE__ */ jsx(
        KpiCard,
        {
          index: 5,
          label: "Total call duration",
          value: minutesToMMSS(totalAvgDuration),
          tone: "emerald",
          Icon: CallTime,
          chartData: [
            { name: "Voice", value: voice.avgDuration || 0, realValue: minutesToMMSS(voice.avgDuration) },
            { name: "Video", value: video.avgDuration || 0, realValue: minutesToMMSS(video.avgDuration) }
          ]
        }
      )
    ] })
  ] });
}
const queryClient$1 = new QueryClient();
const HomePage = () => {
  return /* @__PURE__ */ jsx(PluginLayout, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient$1, children: /* @__PURE__ */ jsx(DashboardProvider, { children: /* @__PURE__ */ jsxs(DashboardContainer$1, { children: [
    /* @__PURE__ */ jsx(Header$3, {}),
    /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs(GridContainer, { children: [
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(KpiSection, {}),
        /* @__PURE__ */ jsx(CategoryGrid, {})
      ] }),
      /* @__PURE__ */ jsxs(Column, { children: [
        /* @__PURE__ */ jsx(LiveCallsTable, {}),
        /* @__PURE__ */ jsx(RecentCallsTable, {})
      ] })
    ] }) })
  ] }) }) }) });
};
const useReferralStats = () => {
  const { get } = useFetchClient();
  return useQuery({
    queryKey: ["referral_stats"],
    queryFn: async () => {
      const response = await get(`/${PLUGIN_ID}/referral-stats`);
      return response.data.data;
    }
  });
};
const useReferralUserStats = (params) => {
  const { get } = useFetchClient();
  return useQuery({
    queryKey: ["referral_table_stats", params],
    queryFn: async () => {
      const response = await get(`/${PLUGIN_ID}/referral-table-data`, { params });
      return response.data;
    },
    placeholderData: keepPreviousData
  });
};
const gradients = {
  gold: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)",
  blue: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)"
};
const fadeIn$1 = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const slideUp$1 = keyframes`
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
const Header$2 = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;
const IconBox$2 = styled.div`
  padding: 10px;
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.colors.primary100};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.colors.primary600};
`;
const HeaderTitleBox = styled.div``;
const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const HeaderSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin: 0;
`;
const HeaderMetaText = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.neutral400};
  margin-top: 0.125rem;
`;
const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  flex-direction: column;
`;
const DashboardMain = styled.main`
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
const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @media (min-width: 1600px) {
    flex-direction: row;
    align-items: stretch; /* Stretch children to match height */
    gap: 2rem;
  }
`;
const TableColumn = styled.div`
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
const SmallBufferSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top: 3px solid white;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  flex-shrink: 0;
  box-sizing: border-box;
`;
const SearchContainer = styled.div`
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
const SearchGroup = styled.div`
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
const SearchInput = styled.input`
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
const StandaloneFilter = styled.div`
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
const FilterSelect = styled.select`
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
const SearchButton = styled.button`
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
const TableCard = styled.div`
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
  box-shadow: 0 4px 20px -5px rgba(0, 0, 0, 0.07);
  animation: ${slideUp$1} 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
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
const TableHeader = styled.div`
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
const TableHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;
const TableHeaderRight = styled.div`
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
const TableContainer = styled.div`
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
const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
`;
const Thead = styled.thead`
  background-color: ${({ theme }) => theme.colors.neutral100};
  position: sticky;
  top: 0;
  z-index: 998;
`;
const Th = styled.th`
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
const Tbody = styled.tbody``;
const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  animation: ${rowFadeIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.index || 0) * 0.04}s;
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
const Td = styled.td`
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
styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.9rem;
  font-weight: 500;
  
  ${(props) => props.role === "Expert" && css`
    background-color: ${({ theme }) => theme.colors.success100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.success200 : theme.colors.success700};
  `}
  
  ${(props) => props.role === "Client" && css`
    background-color: ${({ theme }) => theme.colors.primary100};
    color: ${({ theme }) => theme.name === "dark" ? theme.colors.primary200 : theme.colors.primary700};
  `}
`;
const HighlightValue = styled.span`
  font-weight: 400;
  color: ${({ theme }) => theme.name === "dark" ? theme.colors.primary400 : theme.colors.primary600};
`;
const CurrencyValue = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral800};
`;
const ProfileCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.5rem;
  padding: 0.5rem 0;
`;
const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.25rem;
  color: white;
  background: ${(props) => props.role === "Expert" ? gradients.gold : gradients.blue};
  box-shadow: 0 4px 12px ${(props) => props.role === "Expert" ? "rgba(253, 160, 133, 0.3)" : "rgba(102, 166, 255, 0.3)"};
  flex-shrink: 0;
  border: 2px solid white;
  overflow: hidden;
`;
const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const NameInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  align-items: flex-start;
  text-align: left;
`;
const NameLabel = styled.div`
  font-weight: 500;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.neutral800};
  letter-spacing: -0.01em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const ExpertTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.8rem;
  background: ${({ theme }) => theme.colors.warning100};
  border: 1px solid ${({ theme }) => theme.colors.warning200};
  border-radius: 10px;
  color: ${({ theme }) => theme.name === "dark" ? theme.colors.warning200 : theme.colors.warning600};
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 2px 4px rgba(255, 212, 59, 0.1);
  width: fit-content;
`;
const ClientTag = styled.div`
  display: inline-flex;
  padding: 0.3rem 0.8rem;
  background: ${({ theme }) => theme.colors.primary100};
  border: 1px solid ${({ theme }) => theme.colors.primary200};
  border-radius: 10px;
  color: ${({ theme }) => theme.name === "dark" ? theme.colors.primary200 : theme.colors.primary600};
  font-size: 0.85rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  width: fit-content;
`;
const CrownIcon = styled.span`
  font-size: 1.1rem;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
`;
const StatsGrid = styled.div`
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
const StatCardPremium = styled.div`
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
  animation: ${slideUp$1} 0.5s ease-out both;
  animation-delay: ${(props) => props.delay || "0s"};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  }
`;
const ExpendsCardWrapper = styled(StatCardPremium)`
  padding: 1.5rem;
  background: ${({ theme }) => theme.name === "dark" ? "rgba(23, 23, 23, 0.6)" : theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  
  @media (min-width: 1600px) {
    height: fit-content;
  }
`;
const ExpendsMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;
const ExpendsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 0.5rem;
`;
const DataPanel = styled.div`
  padding: 1rem 1.25rem 0.75rem;
  background: ${({ theme }) => theme.name === "dark" ? theme.colors.neutral100 : theme.colors.neutral50};
  border-radius: 16px;
  border-left: 4px solid ${(props) => props.color};
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 8px 16px -4px rgba(0,0,0,0.08);
  }
`;
const PanelTitle = styled.div`
  font-size: 0.85rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const PanelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PanelLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral400};
`;
const PanelValue = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${(props) => props.color || props.theme.colors.neutral800};
`;
const StatTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const StatTitle = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral500};
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const StatMainValue = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  letter-spacing: -0.02em;
`;
const SparklineWrapper = styled.div`
  width: 110px;
  height: 70px; /* Adjusted to balance visibility and space */
  margin-top: -5px; 
  opacity: 0.95;
  position: relative;
`;
const HoverDate = styled.div`
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
  animation: ${fadeIn$1} 0.2s ease-out;
  white-space: nowrap;
  z-index: 100;
`;
const PieChartWrapper = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  margin-left: auto;
`;
const ProgressRingWrapper = styled.div`
  width: 55px;
  height: 55px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StatFooterPremium = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  border-top: 1px dashed ${({ theme }) => theme.colors.neutral200};
`;
const FooterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;
const FooterLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral400};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;
const FooterValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.color || (props.theme.name === "dark" ? props.theme.colors.neutral100 : props.theme.colors.neutral600)};
`;
const StatIconBox = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.bg || props.theme.colors.neutral100};
  color: ${(props) => props.color || props.theme.colors.neutral500};
`;
const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
  background-color: ${({ theme }) => theme.colors.neutral100};
`;
const PaginationInfo = styled.span`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.neutral600};
`;
const PaginationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const PageButton = styled.button`
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  background-color: ${({ theme, $active }) => $active ? theme.colors.primary600 : theme.colors.neutral0};
  color: ${({ theme, $active }) => $active ? "white" : theme.colors.neutral600};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $active }) => $active ? "0 4px 12px rgba(99, 102, 241, 0.3)" : "none"};

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
styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;
styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;
styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral700};
  margin: 0;
`;
styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.neutral500};
  margin-top: 0.5rem;
`;
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };
  if (totalPages <= 1) return null;
  return /* @__PURE__ */ jsxs(PaginationContainer, { children: [
    /* @__PURE__ */ jsxs(PaginationInfo, { children: [
      "Showing ",
      startItem,
      "-",
      endItem,
      " of ",
      totalItems
    ] }),
    /* @__PURE__ */ jsxs(PaginationButtons, { children: [
      /* @__PURE__ */ jsx(
        PageButton,
        {
          onClick: () => onPageChange(currentPage - 1),
          disabled: currentPage === 1,
          children: "Previous"
        }
      ),
      getPageNumbers().map((page, index) => page === "..." ? /* @__PURE__ */ jsx("span", { style: { padding: "0 0.5rem" }, children: "..." }, `ellipsis-${index}`) : /* @__PURE__ */ jsx(
        PageButton,
        {
          $active: page === currentPage,
          onClick: () => onPageChange(page),
          children: page
        },
        page
      )),
      /* @__PURE__ */ jsx(
        PageButton,
        {
          onClick: () => onPageChange(currentPage + 1),
          disabled: currentPage === totalPages,
          children: "Next"
        }
      )
    ] })
  ] });
};
const UserReferralTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebounce(searchQuery, 300);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("total_referrals");
  const [sortOrder, setSortOrder] = useState("desc");
  const [roleFilter, setRoleFilter] = useState("all");
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, roleFilter, sortBy, sortOrder]);
  const { data, isLoading, isFetching } = useReferralUserStats({
    page: currentPage,
    pageSize: 10,
    sort: `${sortBy}:${sortOrder}`,
    role: roleFilter,
    search: debouncedSearch
  });
  const items = data?.data || [];
  const pagination = data?.meta?.pagination || { pageSize: 10, total: 0, pageCount: 0 };
  const toggleSort = (col) => {
    if (sortBy === col) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortOrder(col === "name" ? "asc" : "desc");
    }
  };
  return /* @__PURE__ */ jsxs(TableCard, { children: [
    /* @__PURE__ */ jsxs(TableHeader, { children: [
      /* @__PURE__ */ jsxs(TableHeaderLeft, { style: { flexDirection: "column", alignItems: "flex-start" }, children: [
        /* @__PURE__ */ jsx("h2", { style: { fontSize: "2rem", fontWeight: 500, margin: "0 2px", color: "inherit" }, children: "Referral Performance" }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "1.2rem", color: "inherit", opacity: 0.7, margin: "0 0 2px 4px" }, children: "Detailed metrics for user contributions" }),
        /* @__PURE__ */ jsxs("p", { style: { fontSize: "1.1rem", color: "inherit", opacity: 0.5, margin: "0 0 0 4px" }, children: [
          pagination.total,
          " records • ",
          pagination.pageCount,
          " pages"
        ] })
      ] }),
      /* @__PURE__ */ jsxs(TableHeaderRight, { children: [
        /* @__PURE__ */ jsx(StandaloneFilter, { children: /* @__PURE__ */ jsxs(
          FilterSelect,
          {
            value: roleFilter,
            onChange: (e) => setRoleFilter(e.target.value),
            children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "All Roles" }),
              /* @__PURE__ */ jsx("option", { value: "Expert", children: "Experts" }),
              /* @__PURE__ */ jsx("option", { value: "Client", children: "Clients" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx(SearchContainer, { children: /* @__PURE__ */ jsxs(SearchGroup, { children: [
          /* @__PURE__ */ jsx(
            SearchInput,
            {
              type: "text",
              placeholder: "What are you looking for?",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value)
            }
          ),
          /* @__PURE__ */ jsx(SearchButton, { children: isFetching ? /* @__PURE__ */ jsx(SmallBufferSpinner, {}) : /* @__PURE__ */ jsx(SearchIcon, {}) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(TableContainer, { children: /* @__PURE__ */ jsxs(Table, { children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
        /* @__PURE__ */ jsxs(Th, { onClick: () => toggleSort("name"), style: { cursor: "pointer" }, children: [
          "User Profile ",
          sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")
        ] }),
        /* @__PURE__ */ jsx(Th, { children: "Contact Details" }),
        /* @__PURE__ */ jsxs(Th, { onClick: () => toggleSort("total_referrals"), style: { cursor: "pointer" }, children: [
          "Referrals ",
          sortBy === "total_referrals" && (sortOrder === "asc" ? "↑" : "↓")
        ] }),
        /* @__PURE__ */ jsxs(Th, { onClick: () => toggleSort("total_earnings_from_referrals"), style: { cursor: "pointer" }, children: [
          "Ref. Earnings ",
          sortBy === "total_earnings_from_referrals" && (sortOrder === "asc" ? "↑" : "↓")
        ] }),
        /* @__PURE__ */ jsxs(Th, { onClick: () => toggleSort("total_wallet_topup"), style: { cursor: "pointer" }, children: [
          "Wallet Topup ",
          sortBy === "total_wallet_topup" && (sortOrder === "asc" ? "↑" : "↓")
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(Tbody, { children: isLoading ? /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan: "5", style: { padding: "8rem" }, children: "Gathering referral data..." }) }) : items.length === 0 ? /* @__PURE__ */ jsx(Tr, { children: /* @__PURE__ */ jsx(Td, { colSpan: "5", style: { padding: "8rem" }, children: "No records discovered." }) }) : items.map((user, idx) => /* @__PURE__ */ jsxs(Tr, { index: idx, children: [
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs(ProfileCell, { children: [
          /* @__PURE__ */ jsx(Avatar, { role: user.role, children: user.avatar ? /* @__PURE__ */ jsx(AvatarImage, { src: user.avatar, alt: user.name }) : getInitials(user.name) }),
          /* @__PURE__ */ jsxs(NameInfo, { children: [
            /* @__PURE__ */ jsxs(NameLabel, { children: [
              user.name,
              user.role === "Expert" && /* @__PURE__ */ jsx(CrownIcon, { children: "👑" })
            ] }),
            user.role === "Expert" ? /* @__PURE__ */ jsx(ExpertTag, { children: "Expert" }) : /* @__PURE__ */ jsx(ClientTag, { children: "Client" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem", alignItems: "center" }, children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: "1.25rem", color: "inherit" }, children: user.mobile }),
          /* @__PURE__ */ jsx("div", { style: { fontSize: "1.1rem", color: "inherit", opacity: 0.6 }, children: user.email })
        ] }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(HighlightValue, { style: { fontSize: "1.5rem", display: "block", color: "inherit" }, children: user.total_referrals || 0 }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(CurrencyValue, { style: { fontSize: "1.4rem", display: "block" }, children: formatCurrency$1(user.total_earnings_from_referrals) }) }),
        /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx("span", { style: { color: "inherit", fontSize: "1.4rem", display: "block" }, children: formatCurrency$1(user.total_wallet_topup) }) })
      ] }, user.id)) })
    ] }) }),
    !isLoading && pagination.pageCount > 1 && /* @__PURE__ */ jsx(
      Pagination,
      {
        currentPage,
        totalPages: pagination.pageCount,
        onPageChange: setCurrentPage,
        totalItems: pagination.total,
        pageSize: pagination.pageSize
      }
    )
  ] });
};
const Sparkline = ({ data, color, theme }) => {
  const [hoveredName, setHoveredName] = useState(null);
  if (!data || data.length < 2) return null;
  return /* @__PURE__ */ jsxs(React.Fragment, { children: [
    /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "85%", children: /* @__PURE__ */ jsxs(
      AreaChart,
      {
        data,
        onMouseMove: (e) => {
          if (e && e.activePayload && e.activePayload.length > 0) {
            setHoveredName(e.activePayload[0].payload.name);
          } else if (e && e.activeTooltipIndex !== void 0) {
            setHoveredName(data[e.activeTooltipIndex].name);
          }
        },
        onMouseLeave: () => setHoveredName(null),
        children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: `gradient-${color}`, x1: "0", y1: "0", x2: "0", y2: "1", children: [
            /* @__PURE__ */ jsx("stop", { offset: "5%", stopColor: color, stopOpacity: 0.3 }),
            /* @__PURE__ */ jsx("stop", { offset: "95%", stopColor: color, stopOpacity: 0 })
          ] }) }),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              content: ({ active, payload }) => {
                if (active && payload && payload.length) {
                  return /* @__PURE__ */ jsx("div", { style: {
                    backgroundColor: theme.colors.neutral0,
                    padding: "4px 8px",
                    borderRadius: "6px",
                    fontSize: "10px",
                    fontWeight: "700",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: `1px solid ${color}`,
                    color: theme.colors.neutral800
                  }, children: /* @__PURE__ */ jsx("div", { children: payload[0].value }) });
                }
                return null;
              },
              cursor: { stroke: color, strokeWidth: 1, strokeDasharray: "4 4" }
            }
          ),
          /* @__PURE__ */ jsx(
            Area,
            {
              type: "monotone",
              dataKey: "value",
              stroke: color,
              strokeWidth: 3,
              fillOpacity: 1,
              fill: `url(#gradient-${color})`,
              isAnimationActive: false
            }
          )
        ]
      }
    ) }),
    hoveredName && /* @__PURE__ */ jsx(HoverDate, { color, children: hoveredName })
  ] });
};
const MiniPieChart = ({ expert, client, theme }) => {
  const data = [
    { name: "Expert", value: expert || 0 },
    { name: "Client", value: client || 0 }
  ];
  const COLORS = [
    theme.name === "dark" ? theme.colors.warning400 : "#eab308",
    // Expert
    theme.name === "dark" ? theme.colors.primary400 : "#3b82f6"
    // Client
  ];
  if (expert === 0 && client === 0) return null;
  return /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsx(PieChart, { children: /* @__PURE__ */ jsx(
    Pie,
    {
      data,
      innerRadius: "60%",
      outerRadius: "100%",
      paddingAngle: 2,
      dataKey: "value",
      stroke: "none",
      children: data.map((entry, index) => /* @__PURE__ */ jsx(Cell, { fill: COLORS[index % COLORS.length] }, `cell-${index}`))
    }
  ) }) });
};
const ProgressRing = ({ percent, color, theme }) => {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - percent / 100 * circumference;
  return /* @__PURE__ */ jsxs("svg", { width: "55", height: "55", viewBox: "0 0 55 55", children: [
    /* @__PURE__ */ jsx("circle", { cx: "27.5", cy: "27.5", r: radius, stroke: theme.colors.neutral150, strokeWidth: "4.5", fill: "none" }),
    /* @__PURE__ */ jsx(
      "circle",
      {
        cx: "27.5",
        cy: "27.5",
        r: radius,
        stroke: color,
        strokeWidth: "4.5",
        fill: "none",
        strokeDasharray: circumference,
        strokeDashoffset: offset,
        strokeLinecap: "round",
        transform: "rotate(-90 27.5 27.5)"
      }
    ),
    /* @__PURE__ */ jsxs("text", { x: "50%", y: "54%", textAnchor: "middle", fontSize: "11", fontWeight: "800", fill: theme.colors.neutral600, children: [
      percent,
      "%"
    ] })
  ] });
};
const StatCard$1 = ({ title, value, expertVal, clientVal, icon: Icon, delay, color: colorProp, bg: bgProp, variant, chartData, sparkData }) => {
  const theme = useTheme();
  const color = typeof colorProp === "function" ? colorProp({ theme }) : colorProp;
  const bg = typeof bgProp === "function" ? bgProp({ theme }) : bgProp;
  return /* @__PURE__ */ jsxs(StatCardPremium, { delay, children: [
    /* @__PURE__ */ jsxs(StatTop, { children: [
      /* @__PURE__ */ jsxs(StatTitle, { children: [
        /* @__PURE__ */ jsx(StatIconBox, { bg, color, children: /* @__PURE__ */ jsx(Icon, { style: { width: "18px", height: "18px" } }) }),
        title
      ] }),
      variant === "chart" ? /* @__PURE__ */ jsx(SparklineWrapper, { children: /* @__PURE__ */ jsx(Sparkline, { data: sparkData, color, theme }) }) : /* @__PURE__ */ jsx(ProgressRingWrapper, { children: /* @__PURE__ */ jsx(ProgressRing, { percent: chartData?.percentage || 0, color, theme }) })
    ] }),
    /* @__PURE__ */ jsx(StatMainValue, { children: value }),
    /* @__PURE__ */ jsxs(StatFooterPremium, { children: [
      /* @__PURE__ */ jsxs(FooterItem, { children: [
        /* @__PURE__ */ jsx(FooterLabel, { children: "Expert" }),
        /* @__PURE__ */ jsx(FooterValue, { color: theme.name === "dark" ? theme.colors.warning400 : "#eab308", children: typeof expertVal === "number" ? expertVal : formatCurrency$1(expertVal, true) })
      ] }),
      /* @__PURE__ */ jsxs(FooterItem, { children: [
        /* @__PURE__ */ jsx(FooterLabel, { children: "Client" }),
        /* @__PURE__ */ jsx(FooterValue, { color: theme.name === "dark" ? theme.colors.primary400 : "#3b82f6", children: typeof clientVal === "number" ? clientVal : formatCurrency$1(clientVal, true) })
      ] }),
      /* @__PURE__ */ jsx(PieChartWrapper, { children: /* @__PURE__ */ jsx(
        MiniPieChart,
        {
          expert: typeof expertVal === "number" ? expertVal : expertVal,
          client: typeof clientVal === "number" ? clientVal : clientVal,
          theme
        }
      ) })
    ] })
  ] });
};
const PlatformExpendsCard = ({ data, delay, formattedSparkData }) => {
  const theme = useTheme();
  const expertColor = theme.name === "dark" ? theme.colors.warning400 : "#eab308";
  const clientColor = theme.name === "dark" ? theme.colors.primary400 : "#3b82f6";
  return /* @__PURE__ */ jsxs(ExpendsCardWrapper, { delay, children: [
    /* @__PURE__ */ jsxs(StatTop, { children: [
      /* @__PURE__ */ jsxs(ExpendsMain, { children: [
        /* @__PURE__ */ jsxs(StatTitle, { children: [
          /* @__PURE__ */ jsx(StatIconBox, { bg: theme.colors.success100, color: theme.colors.success600, children: /* @__PURE__ */ jsx(WalletIcon, { style: { width: "18px", height: "18px" } }) }),
          "Platform Expends"
        ] }),
        /* @__PURE__ */ jsx(StatMainValue, { style: { fontSize: "2.5rem", marginTop: "0.5rem" }, children: formatCurrency$1(data.total, true) })
      ] }),
      /* @__PURE__ */ jsx(SparklineWrapper, { children: /* @__PURE__ */ jsx(Sparkline, { data: formattedSparkData, color: theme.colors.success600, theme }) })
    ] }),
    /* @__PURE__ */ jsxs(ExpendsGrid, { children: [
      /* @__PURE__ */ jsxs(DataPanel, { color: theme.colors.primary500, children: [
        /* @__PURE__ */ jsx(PanelTitle, { children: "Referrer" }),
        /* @__PURE__ */ jsxs(PanelRow, { children: [
          /* @__PURE__ */ jsx(PanelLabel, { children: "Expert" }),
          /* @__PURE__ */ jsx(PanelValue, { color: expertColor, children: formatCurrency$1(data.referrer.expert, true) })
        ] }),
        /* @__PURE__ */ jsxs(PanelRow, { children: [
          /* @__PURE__ */ jsx(PanelLabel, { children: "Client" }),
          /* @__PURE__ */ jsx(PanelValue, { color: clientColor, children: formatCurrency$1(data.referrer.client, true) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(DataPanel, { color: theme.colors.secondary500, children: [
        /* @__PURE__ */ jsx(PanelTitle, { children: "Receiver" }),
        /* @__PURE__ */ jsxs(PanelRow, { children: [
          /* @__PURE__ */ jsx(PanelLabel, { children: "Expert" }),
          /* @__PURE__ */ jsx(PanelValue, { color: expertColor, children: formatCurrency$1(data.reciever.expert, true) })
        ] }),
        /* @__PURE__ */ jsxs(PanelRow, { children: [
          /* @__PURE__ */ jsx(PanelLabel, { children: "Client" }),
          /* @__PURE__ */ jsx(PanelValue, { color: clientColor, children: formatCurrency$1(data.reciever.client, true) })
        ] })
      ] })
    ] })
  ] });
};
const StatsSection = () => {
  const { data: stats } = useReferralStats();
  const d = stats || {};
  const refs = d.referrals || { total: 0, expert: 0, client: 0, graph: [0, 0, 0, 0, 0] };
  const expends = d.platform_expends || { total: 0, referrer: { expert: 0, client: 0 }, reciever: { expert: 0, client: 0 }, graph: [0, 0, 0, 0, 0] };
  const conv = d.referral_conversion || { total: 0, expert: 0, client: 0, percentage: 0 };
  const direct = d.direct_conversion || { total: 0, expert: 0, client: 0, percentage: 0 };
  const formatSparkData = (graph) => graph.map((v, i) => ({
    name: d.meta?.months?.[i] || "",
    value: v
  }));
  return /* @__PURE__ */ jsxs(StatsGrid, { children: [
    /* @__PURE__ */ jsx(
      StatCard$1,
      {
        title: "Total Referrals",
        value: refs.total,
        expertVal: refs.expert,
        clientVal: refs.client,
        icon: ReferralIcon,
        color: ({ theme }) => theme.colors.primary600,
        bg: ({ theme }) => theme.colors.primary100,
        variant: "chart",
        sparkData: formatSparkData(refs.graph),
        delay: "0s"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard$1,
      {
        title: "Referral Conversion",
        value: conv.total,
        expertVal: conv.expert,
        clientVal: conv.client,
        icon: ConversionIcon,
        color: ({ theme }) => theme.colors.secondary600,
        bg: ({ theme }) => theme.colors.secondary100,
        variant: "ring",
        chartData: { percentage: conv.percentage },
        delay: "0.2s"
      }
    ),
    /* @__PURE__ */ jsx(
      StatCard$1,
      {
        title: "Direct Conversion",
        value: direct.total,
        expertVal: direct.expert,
        clientVal: direct.client,
        icon: UniqueIcon,
        color: ({ theme }) => theme.colors.warning600,
        bg: ({ theme }) => theme.colors.warning100,
        variant: "ring",
        chartData: { percentage: direct.percentage },
        delay: "0.3s"
      }
    ),
    /* @__PURE__ */ jsx(
      PlatformExpendsCard,
      {
        data: expends,
        delay: "0.1s",
        formattedSparkData: formatSparkData(expends.graph)
      }
    )
  ] });
};
const DashboardHeader = () => {
  const { data: stats } = useReferralStats();
  const d = stats || {};
  const totalRefs = d.referrals?.total || 0;
  const conversions = d.referral_conversion?.total || 0;
  const convRate = d.referral_conversion?.percentage || 0;
  return /* @__PURE__ */ jsxs(Header$2, { children: [
    /* @__PURE__ */ jsxs(HeaderLeft, { children: [
      /* @__PURE__ */ jsx(IconBox$2, { children: /* @__PURE__ */ jsx(ReferralLogo, { style: { width: "38px", height: "38px" } }) }),
      /* @__PURE__ */ jsxs(HeaderTitleBox, { children: [
        /* @__PURE__ */ jsx(HeaderTitle, { children: "Referral Analytics" }),
        /* @__PURE__ */ jsx(HeaderSubtitle, { children: "Monitor and analyze referral performance across the network" }),
        /* @__PURE__ */ jsxs(HeaderMetaText, { children: [
          totalRefs,
          " total referrals • ",
          conversions,
          " conversions (",
          convRate,
          "%)"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(HeaderRight, {})
  ] });
};
const ReferralAnalyticsPage = () => {
  return /* @__PURE__ */ jsx(PluginLayout, { children: /* @__PURE__ */ jsxs(DashboardContainer, { children: [
    /* @__PURE__ */ jsx(DashboardHeader, {}),
    /* @__PURE__ */ jsx(DashboardMain, { children: /* @__PURE__ */ jsxs(MainContent, { children: [
      /* @__PURE__ */ jsx(StatsSection, {}),
      /* @__PURE__ */ jsx(TableColumn, { children: /* @__PURE__ */ jsx(UserReferralTable, {}) })
    ] }) })
  ] }) });
};
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
`;
const Card = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 16px;
  padding: 18px 16px 8px 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  overflow: hidden;
  position: relative;
  min-height: 140px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: ${(props) => props.color};
    opacity: 0.8;
  }
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;
const LabelSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const IconWrapper$3 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: ${(props) => `${props.color}10`};
  color: ${(props) => props.color};
  flex-shrink: 0;
`;
const Title$4 = styled.p`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
`;
const TrendContainer = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: ${(props) => props.positive ? "#10b981" : "#ef4444"};
  display: flex;
  align-items: center;
  gap: 2px;
`;
const ValueRow = styled.div`
  margin-bottom: 8px;
`;
const Value = styled.h4`
  font-size: 32px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  letter-spacing: -0.02em;
  line-height: 1;
`;
const ChartWrapper = styled.div`
  height: 60px;
  width: 100%;
  margin-left: -16px;
  margin-right: -16px;
  width: calc(100% + 32px);
  margin-top: auto;
  opacity: 0.9;
  position: relative;
`;
const HoverLabel = styled.div`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  font-weight: 800;
  color: ${(props) => props.color};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  pointer-events: none;
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 100;
  background: ${({ theme }) => theme.colors.neutral0};
  padding: 2px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;
const StatCard = ({ title, value, trend, chartData = [], labels = [], color = "#3b82f6", Icon }) => {
  const theme = useTheme();
  const [hoveredLabel, setHoveredLabel] = useState(null);
  const formattedData = Array.isArray(chartData) && typeof chartData[0] === "number" ? chartData.map((v, i) => ({ name: labels[i] || "", value: v })) : chartData;
  const isPositive = !trend?.startsWith("-");
  const gradientId = `color-premium-${title.replace(/\s+/g, "-").toLowerCase()}`;
  return /* @__PURE__ */ jsxs(Card, { color, children: [
    /* @__PURE__ */ jsxs(TopRow, { children: [
      /* @__PURE__ */ jsxs(LabelSection, { children: [
        Icon && /* @__PURE__ */ jsx(IconWrapper$3, { color, children: /* @__PURE__ */ jsx(Icon, { style: { width: "18px", height: "18px" } }) }),
        /* @__PURE__ */ jsx(Title$4, { children: title })
      ] }),
      trend && /* @__PURE__ */ jsxs(TrendContainer, { positive: isPositive, children: [
        isPositive ? "↑" : "↓",
        " ",
        trend.replace(/[+-]/, "")
      ] })
    ] }),
    /* @__PURE__ */ jsx(ValueRow, { children: /* @__PURE__ */ jsx(Value, { children: value }) }),
    /* @__PURE__ */ jsxs(ChartWrapper, { children: [
      /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(
        AreaChart,
        {
          data: formattedData,
          onMouseMove: (e) => {
            if (e && e.activePayload && e.activePayload.length > 0) {
              setHoveredLabel(e.activePayload[0].payload.name);
            } else if (e && e.activeTooltipIndex !== void 0 && formattedData[e.activeTooltipIndex]) {
              setHoveredLabel(formattedData[e.activeTooltipIndex].name);
            }
          },
          onMouseLeave: () => setHoveredLabel(null),
          children: [
            /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: gradientId, x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: color, stopOpacity: 0.4 }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: color, stopOpacity: 0 })
            ] }) }),
            /* @__PURE__ */ jsx(
              Tooltip,
              {
                content: ({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return /* @__PURE__ */ jsx("div", { style: {
                      backgroundColor: theme.colors.neutral0,
                      padding: "4px 10px",
                      borderRadius: "8px",
                      fontSize: "11px",
                      fontWeight: "800",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: `1px solid ${color}`,
                      color: theme.colors.neutral800
                    }, children: (payload[0].value || 0).toLocaleString() });
                  }
                  return null;
                },
                cursor: { stroke: color, strokeWidth: 1, strokeDasharray: "4 4" }
              }
            ),
            /* @__PURE__ */ jsx(
              Area,
              {
                type: "monotone",
                dataKey: "value",
                stroke: color,
                strokeWidth: 3,
                fill: `url(#${gradientId})`,
                isAnimationActive: true,
                dot: false,
                activeDot: { r: 4, strokeWidth: 0, fill: color }
              }
            )
          ]
        }
      ) }),
      hoveredLabel && /* @__PURE__ */ jsx(HoverLabel, { color, children: hoveredLabel })
    ] })
  ] });
};
const Container$3 = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  position: relative;
`;
const Title$3 = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const IconWrapper$2 = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.primary600};
`;
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
`;
const ChartContainer = styled.div`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  position: relative;
`;
const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
`;
const CenterValue = styled.div`
  font-size: 16px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral800};
  line-height: 1;
`;
const CenterText = styled.div`
  font-size: 9px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  margin-top: 2px;
`;
const Legend$1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;
const LegendItem$1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 11px;
  padding: 4px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
  
  &:last-child {
    border-bottom: none;
  }
`;
const Badge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Dot$1 = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${(props) => props.color};
  box-shadow: 0 0 8px ${(props) => `${props.color}66`};
`;
const Label = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.neutral600};
  white-space: nowrap;
`;
const Count = styled.span`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
`;
const AvailabilityDonut = ({ data = {}, title, Icon }) => {
  const theme = useTheme();
  const dataEntries = Array.isArray(data) ? data : Object.entries(data || {}).map(([name, value]) => ({ name, value }));
  const total = dataEntries.reduce((acc, curr) => acc + (Number(curr.value) || 0), 0);
  return /* @__PURE__ */ jsxs(Container$3, { children: [
    /* @__PURE__ */ jsx("div", { style: { marginBottom: "16px", display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsxs(Title$3, { children: [
      Icon && /* @__PURE__ */ jsx(IconWrapper$2, { children: /* @__PURE__ */ jsx(Icon, { style: { width: 18, height: 18 } }) }),
      title
    ] }) }),
    /* @__PURE__ */ jsxs(ContentWrapper, { children: [
      /* @__PURE__ */ jsxs(ChartContainer, { children: [
        /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(PieChart, { children: [
          /* @__PURE__ */ jsx(
            Pie,
            {
              data: dataEntries,
              innerRadius: 32,
              outerRadius: 46,
              paddingAngle: 4,
              dataKey: "value",
              stroke: "none",
              cornerRadius: 4,
              children: dataEntries.map((entry, index) => {
                const fillColor = {
                  "Approved": "#10b981",
                  "Active": "#10b981",
                  "Online": "#10b981",
                  "Pending": "#f59e0b",
                  "Busy": "#f59e0b",
                  "Blocked": "#ef4444",
                  "Deleted": "#6b7280",
                  "Offline": "#6b7280"
                }[entry.name] || "#8b5cf6";
                return /* @__PURE__ */ jsx(Cell, { fill: fillColor }, `cell-${index}`);
              })
            }
          ),
          /* @__PURE__ */ jsx(
            Tooltip,
            {
              wrapperStyle: { zIndex: 1e3 },
              contentStyle: {
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                fontSize: "11px",
                background: theme.colors.neutral0,
                color: theme.colors.neutral800
              },
              itemStyle: { color: theme.colors.neutral800 }
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs(CenterLabel, { children: [
          /* @__PURE__ */ jsx(CenterValue, { children: total }),
          /* @__PURE__ */ jsx(CenterText, { children: "Total" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Legend$1, { children: dataEntries.map((item, index) => /* @__PURE__ */ jsxs(LegendItem$1, { children: [
        /* @__PURE__ */ jsxs(Badge, { children: [
          /* @__PURE__ */ jsx(Dot$1, { color: {
            "Approved": "#10b981",
            "Active": "#10b981",
            "Online": "#10b981",
            "Pending": "#f59e0b",
            "Busy": "#f59e0b",
            "Blocked": "#ef4444",
            "Deleted": "#6b7280",
            "Offline": "#6b7280"
          }[item.name] || "#8b5cf6" }),
          /* @__PURE__ */ jsx(Label, { children: item.name })
        ] }),
        /* @__PURE__ */ jsx(Count, { children: (item.value || 0).toLocaleString() })
      ] }, index)) })
    ] })
  ] });
};
const Container$2 = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
`;
const Header$1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const Title$2 = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const IconWrapper$1 = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.primary600};
`;
const Legend = styled.div`
  display: flex;
  gap: 16px;
`;
const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral600};
`;
const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;
const GrowthBarChart = ({ data = {}, labels = [], title, Icon }) => {
  const theme = useTheme();
  const formattedData = Array.isArray(data.experts) && Array.isArray(data.clients) ? labels.map((label, i) => ({
    date: label,
    experts: data.experts[i] || 0,
    clients: data.clients[i] || 0
  })) : data;
  return /* @__PURE__ */ jsxs(Container$2, { children: [
    /* @__PURE__ */ jsxs(Header$1, { children: [
      /* @__PURE__ */ jsxs(Title$2, { children: [
        Icon && /* @__PURE__ */ jsx(IconWrapper$1, { children: /* @__PURE__ */ jsx(Icon, { style: { width: 18, height: 18 } }) }),
        title
      ] }),
      /* @__PURE__ */ jsxs(Legend, { children: [
        /* @__PURE__ */ jsxs(LegendItem, { children: [
          /* @__PURE__ */ jsx(Dot, { color: "#3b82f6" }),
          " Experts"
        ] }),
        /* @__PURE__ */ jsxs(LegendItem, { children: [
          /* @__PURE__ */ jsx(Dot, { color: "#10b981" }),
          " Clients"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { height: "240px", width: "100%" }, children: /* @__PURE__ */ jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxs(BarChart, { data: formattedData, margin: { top: 10, right: 10, left: -20, bottom: 0 }, barGap: 6, children: [
      /* @__PURE__ */ jsx(
        CartesianGrid,
        {
          strokeDasharray: "3 3",
          vertical: false,
          stroke: theme.colors.neutral200
        }
      ),
      /* @__PURE__ */ jsx(
        XAxis,
        {
          dataKey: "date",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 11, fill: theme.colors.neutral500 },
          dy: 10
        }
      ),
      /* @__PURE__ */ jsx(
        YAxis,
        {
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 11, fill: theme.colors.neutral500 }
        }
      ),
      /* @__PURE__ */ jsx(
        Tooltip,
        {
          cursor: { fill: theme.colors.neutral100, radius: 4 },
          contentStyle: {
            borderRadius: "12px",
            border: "none",
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            padding: "12px",
            background: theme.colors.neutral0,
            color: theme.colors.neutral800
          },
          itemStyle: { fontSize: "12px", fontWeight: 600 }
        }
      ),
      /* @__PURE__ */ jsx(
        Bar,
        {
          dataKey: "experts",
          name: "Experts",
          fill: "#3b82f6",
          radius: [4, 4, 0, 0],
          barSize: 12
        }
      ),
      /* @__PURE__ */ jsx(
        Bar,
        {
          dataKey: "clients",
          name: "Clients",
          fill: "#10b981",
          radius: [4, 4, 0, 0],
          barSize: 12
        }
      )
    ] }) }) })
  ] });
};
const Container$1 = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;
const IconBox$1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: ${({ theme }) => theme.colors.primary100};
  color: ${({ theme }) => theme.colors.primary600};
`;
const Title$1 = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
`;
const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ItemLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  letter-spacing: 0.025em;
`;
const ItemValue = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
`;
const ProgressTrack = styled.div`
  height: 7px;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 10px;
  overflow: hidden;
`;
const ProgressBar = styled.div`
  height: 100%;
  background: ${(props) => props.color};
  width: ${(props) => props.width}%;
  border-radius: 10px;
  box-shadow: 0 0 6px ${(props) => `${props.color}33`};
`;
const StatusProgress = ({ title, items = {}, total }) => {
  const dataEntries = Object.entries(items).map(([name, value]) => ({ name, value }));
  return /* @__PURE__ */ jsxs(Container$1, { children: [
    /* @__PURE__ */ jsxs(Header, { children: [
      /* @__PURE__ */ jsx(IconBox$1, { children: /* @__PURE__ */ jsx(ActivityIcon, { style: { width: "14px", height: "14px" } }) }),
      /* @__PURE__ */ jsx(Title$1, { children: title })
    ] }),
    dataEntries.map((item, index) => {
      const percentage = total > 0 ? item.value / total * 100 : 0;
      const barColor = {
        "Approved": "#10b981",
        "Active": "#10b981",
        "Online": "#10b981",
        "Pending": "#f59e0b",
        "Busy": "#f59e0b",
        "Blocked": "#ef4444",
        "Deleted": "#6b7280",
        "Offline": "#6b7280"
      }[item.name] || "#8b5cf6";
      return /* @__PURE__ */ jsxs(StatItem, { children: [
        /* @__PURE__ */ jsxs(ItemHeader, { children: [
          /* @__PURE__ */ jsx(ItemLabel, { children: item.name }),
          /* @__PURE__ */ jsxs(ItemValue, { children: [
            (item.value || 0).toLocaleString(),
            " (",
            Math.round(percentage),
            "%)"
          ] })
        ] }),
        /* @__PURE__ */ jsx(ProgressTrack, { children: /* @__PURE__ */ jsx(ProgressBar, { width: percentage, color: barColor }) })
      ] }, index);
    })
  ] });
};
const Container = styled.div`
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const IconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.neutral100};
  color: ${({ theme }) => theme.colors.primary600};
`;
const BreakdownTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 1fr 90px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral100};
  
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;
const TypeInfo = styled.div`
  display: flex;
  align-items: center;
`;
const IconBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => `${props.color}15`};
  color: ${(props) => props.color};
`;
const MetricCell = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align || "flex-start"};
`;
const MetricSubLabel = styled.span`
  font-size: 9px;
  color: ${({ theme }) => theme.colors.neutral500};
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 2px;
  letter-spacing: 0.02em;
`;
const MetricMainVal = styled.span`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
`;
const PayIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;
const RatioLabel = styled.div`
  font-size: 10px;
  font-weight: 800;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
`;
const MiniTrack = styled.div`
  width: 100%;
  height: 4px;
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 2px;
  overflow: hidden;
`;
const MiniBar = styled.div`
  height: 100%;
  width: ${(props) => props.percentage}%;
  background: #10b981;
  border-radius: 2px;
`;
const FooterSummary = styled.div`
  margin-top: auto;
  padding-top: 20px;
`;
const SummaryGrid = styled.div`
  background: ${({ theme }) => theme.colors.neutral100};
  border-radius: 12px;
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #10b981);
  }
`;
const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-align: center;
`;
const SummaryLabel = styled.div`
  font-size: 8px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.neutral500};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;
const SummaryVal = styled.div`
  font-size: 13px;
  font-weight: 800;
  color: ${(props) => props.accent || props.theme.colors.neutral800};
`;
const formatCurrency = (val) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(val);
};
const EconomyBalanceCard = ({ economy }) => {
  const theme = useTheme();
  const totals = {
    spent: economy.audio.clientSpent + economy.video.clientSpent,
    earned: economy.audio.expertEarned + economy.video.expertEarned,
    commission: economy.audio.commission + economy.video.commission
  };
  const renderRow = (data, icon, color) => {
    const ratio = data.clientSpent > 0 ? data.expertEarned / data.clientSpent * 100 : 0;
    return /* @__PURE__ */ jsxs(TableRow, { children: [
      /* @__PURE__ */ jsx(TypeInfo, { children: /* @__PURE__ */ jsx(IconBox, { color, children: icon }) }),
      /* @__PURE__ */ jsxs(MetricCell, { children: [
        /* @__PURE__ */ jsx(MetricSubLabel, { children: "Client Spent" }),
        /* @__PURE__ */ jsx(MetricMainVal, { children: formatCurrency(data.clientSpent) })
      ] }),
      /* @__PURE__ */ jsxs(MetricCell, { children: [
        /* @__PURE__ */ jsx(MetricSubLabel, { children: "Expert Receive" }),
        /* @__PURE__ */ jsx(MetricMainVal, { children: formatCurrency(data.expertEarned) })
      ] }),
      /* @__PURE__ */ jsx(MetricCell, { align: "flex-end", children: /* @__PURE__ */ jsxs(PayIndicator, { children: [
        /* @__PURE__ */ jsxs(RatioLabel, { children: [
          /* @__PURE__ */ jsx(ActivityIcon, { style: { width: 10 } }),
          ratio.toFixed(0),
          "% Pay"
        ] }),
        /* @__PURE__ */ jsx(MiniTrack, { children: /* @__PURE__ */ jsx(MiniBar, { percentage: ratio }) })
      ] }) })
    ] });
  };
  return /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
      /* @__PURE__ */ jsxs(Title, { children: [
        /* @__PURE__ */ jsx(IconWrapper, { children: /* @__PURE__ */ jsx(ActivityIcon, { style: { width: 18, height: 18 } }) }),
        "Revenue & Settlement"
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: "10px", fontWeight: 700, color: theme.colors.neutral500 }, children: "MARGIN" }),
        /* @__PURE__ */ jsxs("span", { style: { fontSize: "12px", fontWeight: 800, color: "#3b82f6" }, children: [
          "~",
          (totals.spent > 0 ? totals.commission / totals.spent * 100 : 0).toFixed(1),
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(BreakdownTable, { children: [
      renderRow(
        economy.audio,
        /* @__PURE__ */ jsx(VoiceCall, { style: { width: 14 } }),
        "#3b82f6"
      ),
      renderRow(
        economy.video,
        /* @__PURE__ */ jsx(VideoCall, { style: { width: 14 } }),
        "#10b981"
      )
    ] }),
    /* @__PURE__ */ jsx(FooterSummary, { children: /* @__PURE__ */ jsxs(SummaryGrid, { children: [
      /* @__PURE__ */ jsxs(SummaryItem, { children: [
        /* @__PURE__ */ jsxs(SummaryLabel, { children: [
          /* @__PURE__ */ jsx(WalletIcon, { style: { width: 10 } }),
          "Total Client Spent"
        ] }),
        /* @__PURE__ */ jsx(SummaryVal, { children: formatCurrency(totals.spent) })
      ] }),
      /* @__PURE__ */ jsxs(SummaryItem, { children: [
        /* @__PURE__ */ jsxs(SummaryLabel, { children: [
          /* @__PURE__ */ jsx(TrendingUpIcon, { style: { width: 10 } }),
          "Total Expert Receive"
        ] }),
        /* @__PURE__ */ jsx(SummaryVal, { accent: "#10b981", children: formatCurrency(totals.earned) })
      ] }),
      /* @__PURE__ */ jsxs(SummaryItem, { children: [
        /* @__PURE__ */ jsxs(SummaryLabel, { children: [
          /* @__PURE__ */ jsx("div", { style: { width: 6, height: 6, borderRadius: "50%", background: "#3b82f6" } }),
          "Platform Revenue"
        ] }),
        /* @__PURE__ */ jsx(SummaryVal, { accent: "#3b82f6", children: formatCurrency(totals.commission) })
      ] })
    ] }) })
  ] });
};
const StatsHeader = ({ total = 0, online = 0, filter, onFilterChange }) => {
  return /* @__PURE__ */ jsxs(Header$4, { children: [
    /* @__PURE__ */ jsxs(HeaderLeft$1, { children: [
      /* @__PURE__ */ jsx(IconBox$3, { children: /* @__PURE__ */ jsx(ChartIcon, { style: { width: "32px", height: "32px" } }) }),
      /* @__PURE__ */ jsxs(TitleBox, { children: [
        /* @__PURE__ */ jsx(Title$5, { children: "Platform Statistics" }),
        /* @__PURE__ */ jsx(Subtitle, { children: "Comprehensive overview of users, growth, and financial metrics." }),
        /* @__PURE__ */ jsxs(MetaText, { children: [
          (total || 0).toLocaleString(),
          " total users registered • ",
          online || 0,
          " experts currently available"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(HeaderRight$1, { children: /* @__PURE__ */ jsx(FilterContainer, { children: ["day wise", "monthly", "quarterly", "yearly"].map((period) => /* @__PURE__ */ jsx(
      FilterButton,
      {
        active: filter === period,
        onClick: () => onFilterChange(period),
        children: period === "day wise" ? "Day Wise" : period.charAt(0).toUpperCase() + period.slice(1)
      },
      period
    )) }) })
  ] });
};
const CustomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.col || 12}, 1fr);
  gap: 20px;
  width: 100%;
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
const CustomGridItem = styled.div`
  grid-column: span ${(props) => props.col || 12};
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${(props) => (props.delayIndex || 0) * 0.1}s;
`;
const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 32px 0 20px 0;
  
  &:first-of-type {
    margin-top: 0;
  }

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.neutral200};
  }
`;
const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.neutral800};
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;
const StatsDashboardPage = () => {
  const [filter, setFilter] = useState("monthly");
  const { data: summary, isLoading: isSummaryLoading } = useAdminSummary();
  const { data: graph, isLoading: isGraphLoading } = useAdminGraph(filter);
  const {
    total = 0,
    test = 0,
    experts = 0,
    clients = 0,
    expertsByStatus = {},
    clientsByStatus = {},
    availability = {},
    badges = {},
    wallet = { totalTopups: 0, referralDistributed: 0, platformEarnings: 0, economy: { audio: 0, video: 0 } }
  } = summary || {};
  const {
    meta = { labels: [] },
    growth = { experts: [], clients: [] },
    wallet: walletGraph = { trend: [] },
    sparklines = { users: [], experts: [], topups: [], referrals: [] }
  } = graph || {};
  return /* @__PURE__ */ jsx(PluginLayout, { children: /* @__PURE__ */ jsxs(DashboardContainer$1, { children: [
    /* @__PURE__ */ jsx(
      StatsHeader,
      {
        total,
        online: availability.Online || 0,
        filter,
        onFilterChange: setFilter
      }
    ),
    /* @__PURE__ */ jsx(Main, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(SectionHeader, { children: /* @__PURE__ */ jsxs(SectionTitle, { children: [
          /* @__PURE__ */ jsx(UsersIcon, { style: { width: "16px", height: "16px" } }),
          "User Intelligence"
        ] }) }),
        /* @__PURE__ */ jsxs(CustomGrid, { col: 12, children: [
          /* @__PURE__ */ jsx(CustomGridItem, { col: 3, delayIndex: 1, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Total Users",
              value: (total || 0).toLocaleString(),
              trend: "12.5%",
              chartData: sparklines.total,
              labels: meta.labels,
              color: "#3b82f6",
              Icon: UsersIcon
            }
          ) }),
          /* @__PURE__ */ jsx(CustomGridItem, { col: 3, delayIndex: 2, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Experts",
              value: (experts || 0).toLocaleString(),
              trend: "8.2%",
              chartData: sparklines.experts,
              labels: meta.labels,
              color: "#8b5cf6",
              Icon: BriefcaseIcon
            }
          ) }),
          /* @__PURE__ */ jsx(CustomGridItem, { col: 3, delayIndex: 3, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Clients",
              value: (clients || 0).toLocaleString(),
              trend: "15.1%",
              chartData: sparklines.users,
              labels: meta.labels,
              color: "#10b981",
              Icon: UserCheckIcon
            }
          ) }),
          /* @__PURE__ */ jsx(CustomGridItem, { col: 3, delayIndex: 4, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Test Users",
              value: (test || 0).toLocaleString(),
              trend: "-2.4%",
              chartData: sparklines.test,
              labels: meta.labels,
              color: "#f59e0b",
              Icon: ExperimentIcon
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CustomGrid, { col: 12, children: [
        /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 5, children: /* @__PURE__ */ jsx(
          AvailabilityDonut,
          {
            title: "Expert Availability",
            data: availability,
            Icon: BriefcaseIcon
          }
        ) }),
        /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 6, children: /* @__PURE__ */ jsx(
          StatusProgress,
          {
            title: "Expert Status",
            total: experts,
            items: expertsByStatus
          }
        ) }),
        /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 7, children: /* @__PURE__ */ jsx(
          StatusProgress,
          {
            title: "Client Status",
            total: clients,
            items: clientsByStatus
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(CustomGrid, { col: 12, children: [
        /* @__PURE__ */ jsx(CustomGridItem, { col: 8, delayIndex: 8, children: /* @__PURE__ */ jsx(
          GrowthBarChart,
          {
            title: "Registration Growth",
            data: growth,
            labels: meta.labels,
            Icon: TrendingUpIcon
          }
        ) }),
        /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 9, children: /* @__PURE__ */ jsx(
          StatusProgress,
          {
            title: "Expert Badge Distribution",
            total: experts,
            items: badges
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx(SectionHeader, { children: /* @__PURE__ */ jsxs(SectionTitle, { children: [
          /* @__PURE__ */ jsx(WalletIcon, { style: { width: "16px", height: "16px" } }),
          "Financial Performance"
        ] }) }),
        /* @__PURE__ */ jsxs(CustomGrid, { col: 12, children: [
          /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 10, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Total Wallet Topups",
              value: `₹${(wallet.totalTopups || 0).toLocaleString()}`,
              trend: "22.4%",
              chartData: sparklines.topups,
              labels: meta.labels,
              color: "#10b981",
              Icon: WalletIcon
            }
          ) }),
          /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 11, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Referral Expenses",
              value: `₹${(wallet.referralDistributed || 0).toLocaleString()}`,
              trend: "5.8%",
              chartData: sparklines.referrals,
              labels: meta.labels,
              color: "#f59e0b",
              Icon: ReferralIcon
            }
          ) }),
          /* @__PURE__ */ jsx(CustomGridItem, { col: 4, delayIndex: 12, children: /* @__PURE__ */ jsx(
            StatCard,
            {
              title: "Platform Earnings",
              value: `₹${(wallet.platformEarnings || 0).toLocaleString()}`,
              trend: "18.2%",
              chartData: sparklines.topups.map((v) => v * 0.15),
              labels: meta.labels,
              color: "#3b82f6",
              Icon: TrendingUpIcon
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs(CustomGrid, { col: 12, children: [
        /* @__PURE__ */ jsx(CustomGridItem, { col: 6, delayIndex: 13, children: /* @__PURE__ */ jsx(
          EconomyBalanceCard,
          {
            economy: wallet.economy
          }
        ) }),
        /* @__PURE__ */ jsx(CustomGridItem, { col: 6, delayIndex: 14, children: /* @__PURE__ */ jsx(
          GrowthBarChart,
          {
            title: "Wallet Topup Trends",
            data: {
              experts: walletGraph.trend,
              clients: walletGraph.trend.map((v) => v * 0.8)
            },
            labels: meta.labels,
            Icon: WalletIcon
          }
        ) })
      ] })
    ] }) })
  ] }) });
};
const queryClient = new QueryClient();
const App = () => {
  return /* @__PURE__ */ jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-right", autoClose: 4e3, hideProgressBar: false, style: { width: "450px", fontSize: "16px" } }),
    /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(HomePage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "referral-analytics", element: /* @__PURE__ */ jsx(ReferralAnalyticsPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "statistics", element: /* @__PURE__ */ jsx(StatsDashboardPage, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(Page.Error, {}) })
    ] })
  ] });
};
export {
  App as default
};
