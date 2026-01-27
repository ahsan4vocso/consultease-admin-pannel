import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer } from 'recharts';
import * as Style from "./styles";
import { useTheme } from 'styled-components';



export default function KpiCard({ label, value, tone = "emerald", chartData, Icon, ...rest }) {
    const theme = useTheme();

    const getIconColor = (tone) => {
        switch (tone) {
            case 'emerald': return theme.colors.success700;
            case 'sky': return theme.colors.primary700;
            case 'rose': return theme.colors.danger700;
            case 'amber': return theme.colors.warning700;
            default: return theme.colors.neutral700;
        }
    };

    return (
        <Style.KpiCardContainer {...rest}>
            <Style.KpiTop>
                <Style.KpiInfo>
                    <Style.KpiLabel>
                        {Icon && <Icon style={{ width: '2rem', height: '2rem', color: getIconColor(tone) }} />}
                        {label}
                        {label === "Ongoing calls" && <Style.StatusBadge status='ongoing'>
                            <span
                                style={{
                                    width: 4,
                                    height: 4,
                                    borderRadius: "50%",
                                    backgroundColor: "currentColor",
                                }}
                            />
                            <span style={{ paddingLeft: "0.4rem" }}>Live</span>
                        </Style.StatusBadge>}
                    </Style.KpiLabel>
                    <Style.KpiValue>{value}</Style.KpiValue>
                </Style.KpiInfo>
                {chartData && (
                    <Style.KpiChartWrapper>
                        <PieChartWithPaddingAngle data={chartData} tone={tone} />
                    </Style.KpiChartWrapper>
                )}
            </Style.KpiTop>
        </Style.KpiCardContainer>
    );
}



export function PieChartWithPaddingAngle({ isAnimationActive = true, data, tone }) {
    const theme = useTheme();

    // Specific colors for chart segments
    const chartColors = {
        Voice: '#7476f1ff',
        Video: '#48ecbbff'
    };

    const getColors = (tone) => {
        switch (tone) {
            case 'emerald':
                return [theme.colors.success500, theme.colors.success200];
            case 'sky':
                return [theme.colors.primary500, theme.colors.primary200];
            case 'rose':
                return [theme.colors.danger500, theme.colors.danger200];
            case 'amber':
                return [theme.colors.warning500, theme.colors.warning200];
            default:
                return [theme.colors.neutral500, theme.colors.neutral200];
        }
    };

    const defaultColors = getColors(tone);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    innerRadius="70%"
                    outerRadius="100%"
                    cornerRadius="50%"
                    paddingAngle={6}
                    dataKey="value"
                    isAnimationActive={isAnimationActive}
                    stroke="none"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={chartColors[entry.name] || defaultColors[index % defaultColors.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            </PieChart>
        </ResponsiveContainer>
    );
}


// mini popup comes on hover
function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
        const { name, value, fill } = payload[0].payload;
        return (
            <div style={{
                backgroundColor: '#fff',
                color: '#333',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '11px',
                fontWeight: '600',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                border: `1.5px solid ${fill}`,
                display: 'flex',
                flexDirection: 'row',
                gap: '8px',
                alignItems: 'center',
                whiteSpace: 'nowrap'
            }}>
                <span style={{ color: '#666', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{name}</span>
                <span style={{ color: fill, fontSize: '12px' }}>{value}</span>
            </div>
        );
    }
    return null;
};