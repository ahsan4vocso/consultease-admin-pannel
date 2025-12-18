import React from 'react';
import * as Style from "./styles";

export default function KpiCard({ label, value, tone = "emerald", ...rest }) {
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
                <Style.KpiIconBox tone={tone}>⚡</Style.KpiIconBox>
            </Style.KpiTop>
        </Style.KpiCardContainer>
    );
}
