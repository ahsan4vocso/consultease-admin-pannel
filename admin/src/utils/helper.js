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
