
import React, { useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from "recharts";

const CHART_COLORS = {
    voice: '#7476f1ff',
    video: '#30c598ff',
};

const RADIAN = Math.PI / 180;

const renderActiveShape = (props) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);

    // Scale offsets based on size (approximate)
    const isTiny = outerRadius < 30;
    const offset1 = isTiny ? 2 : 3;
    const offset2 = isTiny ? 4 : 6;
    const textOffset = isTiny ? 2 : 6; // Reduced extension for tiny chart
    const fontSize = isTiny ? '8px' : '11px';
    const smallFontSize = isTiny ? '6px' : '8px';

    const sx = cx + (outerRadius + offset1) * cos;
    const sy = cy + (outerRadius + offset1) * sin;
    const mx = cx + (outerRadius + offset2) * cos;
    const my = cy + (outerRadius + offset2) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * textOffset;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            {!isTiny && (
                <text x={cx} y={cy} dy={4} textAnchor="middle" fill={fill} style={{ fontSize, fontWeight: 600 }}>
                    {payload.name}
                </text>
            )}
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + (isTiny ? 1 : 2)}
                outerRadius={outerRadius + (isTiny ? 2 : 4)}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={isTiny ? 1 : 1.5} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * (isTiny ? 2 : 3)} y={ey} textAnchor={textAnchor} fill="#333" style={{ fontSize: smallFontSize }}>{`${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * (isTiny ? 2 : 3)} y={ey} dy={isTiny ? 6 : 8} textAnchor={textAnchor} fill="#999" style={{ fontSize: smallFontSize }}>
                {`(${(percent * 100).toFixed(0)}%)`}
            </text>
        </g>
    );
};

const ActiveShapePieChart = ({
    data,
    width = "100%",
    height = 100,
    innerRadius = 20,
    outerRadius = 40
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    // Safety check for data to prevent errors
    if (!data || data.length === 0) return null;

    // Ensure we have values to render
    const hasValues = data.some(d => d.value > 0);
    if (!hasValues) {
        // Render a placeholder or return null? Returning null makes sense for "no data"
        return null;
    }

    return (
        <div style={{ width, height }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        fill="#8884d8"
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.name === 'Voice' ? CHART_COLORS.voice : CHART_COLORS.video} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ActiveShapePieChart;
