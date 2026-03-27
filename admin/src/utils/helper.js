export function minutesToMMSS(minutes) {
    if (minutes == null || isNaN(minutes)) return "---";

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

export function formatDateTime(dateInput) {
    if (!dateInput) return "---";

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return "---";

    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const strTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${ampm}`;

    return `${day} ${month} ${year}, ${strTime}`;
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
    if (!Number.isFinite(minutes) || minutes <= 0) return "---";

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


export const getDateRange = (filter, customRange) => {
    const now = new Date();
    let start = new Date();
    let end = new Date();

    if (filter === 'today') {
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        return { start: start.toISOString(), end: end.toISOString() };
    }

    if (filter === '60min') {
        start = new Date(now.getTime() - 60 * 60 * 1000);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'yesterday') {
        start.setDate(now.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(now.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        return { start: start.toISOString(), end: end.toISOString() };
    }

    if (filter === 'week') {
        start.setDate(now.getDate() - 7);
        start.setHours(0, 0, 0, 0);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'quarter') {
        start.setDate(now.getDate() - 90);
        start.setHours(0, 0, 0, 0);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'month') {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        start.setHours(0, 0, 0, 0);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'last_month') {
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        start.setHours(0, 0, 0, 0);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        end.setHours(23, 59, 59, 999);
        return { start: start.toISOString(), end: end.toISOString() };
    }

    if (filter === 'last_3_months') {
        start.setDate(now.getDate() - 90);
        start.setHours(0, 0, 0, 0);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'quarter') {
        start.setDate(now.getDate() - 90);
        start.setHours(0, 0, 0, 0);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'year') {
        start.setDate(now.getDate() - 365);
        start.setHours(0, 0, 0, 0);
        return { start: start.toISOString(), end: now.toISOString() };
    }

    if (filter === 'custom' && customRange?.start && customRange?.end) {
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

export function formatCurrency(value, useShortener = false) {
    if (value == null || isNaN(value)) return "₹0";
    const num = Number(value);

    if (useShortener && num >= 1000) {
        return `₹${(num / 1000).toFixed(1).replace(/\.0$/, "")}k`;
    }

    return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}

export function getInitials(name) {
    if (!name) return '??';
    const parts = name.split(' ').filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
}
