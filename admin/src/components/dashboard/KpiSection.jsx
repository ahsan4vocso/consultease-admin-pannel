import * as Style from "./styles";
import KpiCard from "./KpiCard";
import { minutesToMMSS } from "../../utils/helper";
import { ActiveCall, DeclineCall, CompletedCall, Expert, CallTime, TotalCalls } from "../Icons";

export default function KpiSection({ stats = {} }) {

    return (
        <Style.KpiSection>
            <Style.KpiGrid>
                <KpiCard
                    label="Ongoing calls"
                    value={stats.liveCalls}
                    tone="emerald"
                    Icon={ActiveCall}
                    style={{ cursor: 'pointer' }}
                    chartData={[
                        { name: 'Voice', value: stats.voiceCalls || 0 },
                        { name: 'Video', value: stats.videoCalls || 0 }
                    ]}
                    onClick={() => stats.liveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                        `?filters[$and][0][callStatus][$eq]=ongoing` +
                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date().toISOString().split("T")[0] + "T00:00:00.000Z")}` +
                        `&page=1`, '_blank')}
                />
                <KpiCard
                    label="Total calls today"
                    value={stats.callsToday}
                    chip="Including free & paid"
                    tone="sky"
                    Icon={TotalCalls}
                />
            </Style.KpiGrid>


            <Style.KpiGrid>
                <KpiCard
                    label="Declined calls"
                    value={stats.declinedCalls}
                    tone="rose"
                    Icon={DeclineCall}
                    style={{ cursor: stats.declinedCalls && 'pointer' }}
                    chartData={[
                        { name: 'Voice', value: stats.declinedVoice || 0 },
                        { name: 'Video', value: stats.declinedVideo || 0 }
                    ]}
                    onClick={() => stats.declinedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                        `?filters[$and][0][callStatus][$eq]=declined` +
                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                        `&page=1`, '_blank')}
                />
                <KpiCard
                    label="Completed calls"
                    value={stats.completedCalls}
                    tone="emerald"
                    Icon={CompletedCall}
                    style={{ cursor: 'pointer' }}
                    onClick={() => stats.completedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                        `?filters[$and][0][callStatus][$eq]=completed` +
                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                        `&page=1`, '_blank')}
                />
            </Style.KpiGrid>
            <Style.KpiGrid>
                <KpiCard
                    label="Experts online"
                    value={stats.expertsOnline}
                    tone="sky"
                    Icon={Expert}
                    onClick={() =>
                        stats.expertsOnline > 0 &&
                        window.open(
                            `/admin/content-manager/collection-types/api::expert-profile.expert-profile` +
                            `?filters[$and][0][isActive][$eq]=true` +
                            `&sort=createdAt:DESC` +
                            `&page=1` +
                            `&pageSize=100`,
                            "_blank"
                        )
                    }
                />
                <KpiCard
                    label="Total call duration"
                    value={minutesToMMSS(stats.avgDuration)}
                    tone="emerald"
                    Icon={CallTime}
                />
            </Style.KpiGrid>
        </Style.KpiSection>
    );
}
