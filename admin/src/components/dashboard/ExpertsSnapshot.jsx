import React from 'react';
import * as Style from "./styles";

const expertPresence = [
    { name: "GST / Indirect Tax", online: 8, inCall: 5 },
    { name: "Income Tax", online: 6, inCall: 3 },
    { name: "Company Law / ROC", online: 4, inCall: 2 },
    { name: "Litigation / Tribunal", online: 3, inCall: 1 },
    { name: "Startup Advisory", online: 3, inCall: 1 },
];

export default function ExpertsSnapshot() {
    return (
        <Style.Card>
            <Style.CardHeader>
                <div>
                    <Style.CardTitle>Experts snapshot</Style.CardTitle>
                    <Style.CardSubtitle>Online vs in-call across practice areas.</Style.CardSubtitle>
                </div>
                <Style.CardMeta>India time</Style.CardMeta>
            </Style.CardHeader>
            <div>
                {expertPresence.map((row) => {
                    const total = row.online || 1;
                    const inCallPct = Math.min((row.inCall / total) * 100, 100);

                    return (
                        <Style.ExpertRow key={row.name}>
                            <Style.ExpertInfo>
                                <Style.ExpertName>{row.name}</Style.ExpertName>
                                <Style.ExpertStats>
                                    {row.inCall} in call • {row.online - row.inCall} online
                                </Style.ExpertStats>
                            </Style.ExpertInfo>
                            <Style.ProgressBarContainer>
                                <Style.ProgressTrack>
                                    <Style.ProgressBar width={`${inCallPct}%`} />
                                </Style.ProgressTrack>
                                <Style.BusyBadge>{inCallPct.toFixed(0)}% busy</Style.BusyBadge>
                            </Style.ProgressBarContainer>
                        </Style.ExpertRow>
                    );
                })}
            </div>
        </Style.Card>
    );
}
