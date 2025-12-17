export function minutesToMMSS(minutes) {
    if (minutes == null || isNaN(minutes)) return "00:00";

    const totalSeconds = Math.round(minutes * 60);

    if (minutes >= 60) {
        const hh = Math.floor(totalSeconds / 3600);
        const mm = Math.floor((totalSeconds % 3600) / 60);
        const ss = totalSeconds % 60;

        return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
    }

    const mm = Math.floor(totalSeconds / 60);
    const ss = totalSeconds % 60;

    return `${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
}


export function formatTimeAMPM(dateInput) {
    if (!dateInput) return "";

    const date = new Date(dateInput);

    let hours = date.getHours();
    const minutes = date.getMinutes();

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12; // convert 0 → 12

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${ampm}`;
}

export function numberShortner(value, decimals = 1) {
    if (value == null || isNaN(value)) return "0";

    const num = Number(value);

    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(decimals).replace(/\.0$/, "") + "B";
    }

    if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(decimals).replace(/\.0$/, "") + "M";
    }

    if (num >= 1_000) {
        return (num / 1_000).toFixed(decimals).replace(/\.0$/, "") + "K";
    }

    return num.toString();
}


export function formatDurationFromMinutes(minutes) {
    if (!Number.isFinite(minutes) || minutes <= 0) return "0 sec";

    const totalSeconds = Math.round(minutes * 60);

    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    const parts = [];

    if (hrs > 0) parts.push(`${hrs}h`);
    if (mins > 0) parts.push(`${mins}min`);
    if (secs > 0) parts.push(`${secs}sec`);

    return parts.join(", ");
}




export function buildCategoryStats(callRows) {
    const map = new Map();

    for (const row of callRows) {
        const categoryName = row.category?.trim() || "Others";

        const minutes = Number(row.duration || 0);
        const revenue = Number(row.revenue || 0);

        const rating = Number(row.rating);
        const hasRating = Number.isFinite(rating);

        const type = row.type;

        if (!map.has(categoryName)) {
            map.set(categoryName, {
                name: categoryName,
                calls: 0,
                videoCalls: 0,
                minutes: 0,
                revenue: 0,
                _ratingSum: 0,
                _ratingCount: 0,
            });
        }

        const agg = map.get(categoryName);

        if (type === "videoCall") {
            agg.videoCalls += 1;
        } else {
            agg.calls += 1;
        }

        agg.minutes += minutes;
        agg.revenue += revenue;

        if (hasRating) {
            agg._ratingSum += rating;
            agg._ratingCount += 1;
        }
    }

    return Array.from(map.values()).map((x) => ({
        name: x.name,
        calls: x.calls,
        videoCalls: x.videoCalls,
        totalCalls: x.calls + x.videoCalls,
        minutes: Math.ceil(x.minutes),
        revenue: x.revenue,
        avgRating: x._ratingCount ? Number((x._ratingSum / x._ratingCount).toFixed(1)) : 0,
    }));
}



export function mapRecentCalls(resData) {
    console.log(resData);
    const recentCalls = resData.data.map(({ attributes }) => ({
        time: attributes.createdAt,
        duration: attributes.duration,
        caller: attributes.caller?.data?.attributes?.name,
        expert: attributes.receiver?.data?.attributes?.name,
        category: attributes.categories?.data?.[0]?.attributes?.name,
        rating:
        attributes.receiver?.data?.attributes?.expert?.data?.attributes
                ?.averageRating ?? null,
                revenue: attributes.totalCost || 0,
                type: attributes.type,
    }));
    console.log('data after update \n\n',recentCalls);

    return recentCalls;
}
