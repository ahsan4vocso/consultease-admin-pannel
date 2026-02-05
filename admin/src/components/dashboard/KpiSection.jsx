import * as Style from "./styles";
import KpiCard from "./KpiCard";
import { minutesToMMSS } from "../../utils/helper";
import { ActiveCall, DeclineCall, CompletedCall, Expert, CallTime, TotalCalls } from "../Icons";
import { useDashboardContext } from "../../context/DashboardContext";

export default function KpiSection() {
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
    return (
        <Style.KpiSection>
            <Style.KpiGrid>
                <KpiCard
                    label="Ongoing calls"
                    value={totalLiveCalls}
                    tone="emerald"
                    Icon={ActiveCall}
                    style={{ cursor: 'pointer' }}
                    chartData={[
                        { name: 'Voice', value: voice.liveCalls || 0 },
                        { name: 'Video', value: video.liveCalls || 0 }
                    ]}
                    // open strapi conent manager
                    onClick={() => totalLiveCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                        `?filters[$and][0][callStatus][$eq]=ongoing` +
                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date().toISOString().split("T")[0] + "T00:00:00.000Z")}` +
                        `&page=1`, '_blank')}
                />
                <KpiCard
                    label="Total calls"
                    value={totalCallsToday}
                    chip="Including free & paid"
                    tone="sky"
                    Icon={TotalCalls}
                    chartData={[
                        { name: 'Voice', value: voice.callsToday || 0 },
                        { name: 'Video', value: video.callsToday || 0 }
                    ]}
                />
            </Style.KpiGrid>


            <Style.KpiGrid>
                <KpiCard
                    label="Declined/Missed calls"
                    value={totalDeclined}
                    tone="rose"
                    Icon={DeclineCall}
                    style={{ cursor: totalDeclined && 'pointer' }}
                    chartData={[
                        { name: 'Voice', value: (voice.declinedCalls || 0) + (voice.missedCalls || 0) },
                        { name: 'Video', value: (video.declinedCalls || 0) + (video.missedCalls || 0) }
                    ]}
                    extra={
                        <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.2rem' }}>
                            <Style.KpiChip tone="rose" style={{ fontSize: '10px', padding: '0.4rem 0.6rem' }}>
                                {totalDeclinedCount} declined
                            </Style.KpiChip>
                            <Style.KpiChip tone="amber" style={{ fontSize: '10px', padding: '0.4rem 0.6rem' }}>
                                {totalMissedCount} missed
                            </Style.KpiChip>
                        </div>
                    }
                    // open strapi conent manager 
                    onClick={() => totalDeclined > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                        `?filters[$and][0][callStatus][$in][0]=declined` +
                        `&filters[$and][0][callStatus][$in][1]=missed` +
                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                        `&page=1`, '_blank')}
                />
                <KpiCard
                    label="Completed calls"
                    value={totalCompletedCalls}
                    tone="emerald"
                    Icon={CompletedCall}
                    style={{ cursor: 'pointer' }}
                    chartData={[
                        { name: 'Voice', value: voice.completedCalls || 0 },
                        { name: 'Video', value: video.completedCalls || 0 }
                    ]}
                    // open strapi conent manager
                    onClick={() => totalCompletedCalls > 0 && window.open(`/admin/content-manager/collection-types/api::call.call` +
                        `?filters[$and][0][callStatus][$eq]=completed` +
                        `&filters[$and][1][createdAt][$gte]=${encodeURIComponent(new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString())}` +
                        `&page=1`, '_blank')}
                />
            </Style.KpiGrid>
            <Style.KpiGrid>
                <KpiCard
                    label="Experts online"
                    value={expertsOnline}
                    tone="sky"
                    Icon={Expert}
                    extra={
                        <Style.KpiChip tone="sky" style={{ fontSize: '10px', padding: '0.4rem 0.6rem' }}>
                            {totalExperts} Total
                        </Style.KpiChip>
                    }
                    onClick={() =>
                        expertsOnline > 0 &&
                        // open strapi conent manager
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
                    value={minutesToMMSS(totalAvgDuration)}
                    tone="emerald"
                    Icon={CallTime}
                    chartData={[
                        { name: 'Voice', value: voice.avgDuration || 0, realValue: minutesToMMSS(voice.avgDuration) },
                        { name: 'Video', value: video.avgDuration || 0, realValue: minutesToMMSS(video.avgDuration) }
                    ]}
                />
            </Style.KpiGrid>
        </Style.KpiSection>
    );
}