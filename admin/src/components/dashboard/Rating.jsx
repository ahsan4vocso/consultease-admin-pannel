import React from 'react';

export const StarIcon = ({ fill, id, size = 10 }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: '1px' }}
        >
            <defs>
                <linearGradient id={`half-${id}`}>
                    <stop offset="50%" stopColor="currentColor" />
                    <stop offset="50%" stopColor="transparent" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
                fill={fill === 'full' ? 'currentColor' : fill === 'half' ? `url(#half-${id})` : 'none'}
            />
        </svg>
    );
};

export const StarRating = ({ rating, size = 10 }) => {
    if (rating === undefined || rating === null) return null;

    return (
        <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            {[1, 2, 3, 4, 5].map((i) => {
                let fill = 'empty';
                if (rating >= i) {
                    fill = 'full';
                } else if (rating > i - 1) {
                    const decimal = rating - (i - 1);
                    // x.1 to x.5 -> half star
                    // x.6 to x.0 -> full star
                    if (decimal <= 0.5 && decimal > 0) {
                        fill = 'half';
                    } else if (decimal > 0.5) {
                        fill = 'full';
                    }
                }
                return <StarIcon key={i} fill={fill} id={`${rating}-${i}`} size={size} />;
            })}
        </div>
    );
};
