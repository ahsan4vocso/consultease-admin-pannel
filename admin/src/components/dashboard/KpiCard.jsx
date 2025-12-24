import * as Style from "./styles";

import ActiveShapePieChart from "./ActiveShapePieChart";

export default function KpiCard({ label, value, tone = "emerald", chartData, ...rest }) {
    return (
        <Style.KpiCardContainer {...rest}>
            <Style.KpiTop>
                <Style.KpiInfo>
                    <Style.KpiLabel>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            {label}
                            {label === "Ongoing calls" && <Style.StatusBadge status='ongoing'>
                                <span
                                    style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: "50%",
                                        backgroundColor: "currentColor",
                                    }}
                                />
                                <span style={{ paddingX: "0.8rem" }}>Live</span>
                            </Style.StatusBadge>}
                        </div>
                    </Style.KpiLabel>
                    <Style.KpiValue>{value}</Style.KpiValue>
                </Style.KpiInfo>
                {/* {(chartData || false) && chartData.some(d => d.value > 0) ? (
                    <ActiveShapePieChart
                        data={chartData}
                        width={80} // Enough width for offsets
                        height={60}
                        innerRadius={12}
                        outerRadius={20}
                    />
                ) : ( */}
                <Style.KpiIconBox tone={tone}>⚡</Style.KpiIconBox>
                {/* )} */}
            </Style.KpiTop>
        </Style.KpiCardContainer>
    );
}
