import React from 'react';
import * as Style from "./styles";

const topConsultants = [
    {
        name: "CA Mehul Shah",
        category: "GST / Indirect Tax",
        minutes: 186,
        calls: 14,
        rating: 4.8,
    },
    {
        name: "Adv. Ritu Gupta",
        category: "Litigation / Tribunal",
        minutes: 164,
        calls: 11,
        rating: 4.7,
    },
    {
        name: "CA Nivedita",
        category: "Income Tax",
        minutes: 149,
        calls: 10,
        rating: 4.6,
    },
    {
        name: "CS Ankit Jain",
        category: "Company Law / ROC",
        minutes: 132,
        calls: 9,
        rating: 4.5,
    },
    {
        name: "CA Rohan",
        category: "GST / Indirect Tax",
        minutes: 121,
        calls: 8,
        rating: 4.4,
    },
];

export default function TopConsultants() {
    return (
        <Style.Card>
            <Style.CardHeader>
                <div>
                    <Style.CardTitle>Top consultants (today)</Style.CardTitle>
                    <Style.CardSubtitle>Ranked by minutes, calls & rating.</Style.CardSubtitle>
                </div>
                <Style.ConsultantHeaderLabels>
                    <Style.HeaderBadge>Minutes</Style.HeaderBadge>
                    <Style.HeaderBadge bg="#f8fafc">Calls</Style.HeaderBadge>
                    <Style.HeaderBadge bg="#f8fafc">Rating</Style.HeaderBadge>
                </Style.ConsultantHeaderLabels>
            </Style.CardHeader>

            <div>
                {topConsultants.map((c, index) => (
                    <Style.ConsultantRow key={c.name}>
                        <Style.ConsultantInfo>
                            <Style.Rank>#{index + 1}</Style.Rank>
                            <Style.Avatar>
                                {c.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .slice(0, 2)}
                            </Style.Avatar>
                            <Style.ConsultantDetails>
                                <Style.ConsultantName>{c.name}</Style.ConsultantName>
                                <Style.ConsultantCategory>{c.category}</Style.ConsultantCategory>
                            </Style.ConsultantDetails>
                        </Style.ConsultantInfo>
                        <Style.ConsultantStats>
                            <Style.StatBlock>
                                <Style.StatLabel>Minutes</Style.StatLabel>
                                <Style.StatValue>{c.minutes}</Style.StatValue>
                            </Style.StatBlock>
                            <Style.StatBlock>
                                <Style.StatLabel>Calls</Style.StatLabel>
                                <Style.StatValue>{c.calls}</Style.StatValue>
                            </Style.StatBlock>
                            <Style.StatBlock>
                                <Style.StatLabel>Rating</Style.StatLabel>
                                <Style.StatValue color="#d97706">{c.rating.toFixed(1)} ★</Style.StatValue>
                            </Style.StatBlock>
                        </Style.ConsultantStats>
                    </Style.ConsultantRow>
                ))}
            </div>
        </Style.Card>
    );
}
