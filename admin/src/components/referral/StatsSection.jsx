import StatCard from './StatCard';
import * as Style from './styles';

// Minimal SVG icons
const GlobalReferralIcon = ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const UserCheckIcon = ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <polyline points="17 11 19 13 23 9" />
    </svg>
);

const UserHeartIcon = ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <path d="M20.42 4.58a2.83 2.83 0 0 1 0 4l-4.42 4.42-4.42-4.42a2.83 2.83 0 0 1 4-4l.42.42.42-.42a2.83 2.83 0 0 1 4 0Z" />
    </svg>
);

const SpendIcon = ({ style }) => (
    <svg style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="10" width="20" height="12" rx="2" ry="2" />
        <path d="M12 22V10" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
);

const StatsSection = ({ globalStats }) => {
    const formatCurrency = (value) => {
        if (!value) return '₹0';
        const num = parseFloat(value);
        return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
    };

    return (
        <Style.StatsGrid>
            <StatCard
                variant="purple"
                icon={GlobalReferralIcon}
                label="Total Referrals"
                value={globalStats?.totalReferrals || 0}
                subtitle="All-time platform total"
                delay="0s"
            />
            <StatCard
                variant="blue"
                icon={UserCheckIcon}
                label="Referrals via Experts"
                value={globalStats?.expertReferrals || 0}
                subtitle="Expert contributions"
                delay="0.1s"
            />
            <StatCard
                variant="orange"
                icon={UserHeartIcon}
                label="Referrals via Clients"
                value={globalStats?.clientReferrals || 0}
                subtitle="Client contributions"
                delay="0.2s"
            />
            <StatCard
                variant="green"
                icon={SpendIcon}
                label="Total Program Spend"
                value={formatCurrency(globalStats?.totalProgramSpend || 0)}
                subtitle="Total disbursed earnings"
                delay="0.3s"
            />
        </Style.StatsGrid>
    );
};

export default StatsSection;
