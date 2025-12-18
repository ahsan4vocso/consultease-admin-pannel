import React from 'react';
import * as Style from "./styles";

export default function EmptyState({ title, subtitle, icon = "📭" }) {
    return (
        <Style.EmptyStateContainer>
            <Style.EmptyStateIcon>{icon}</Style.EmptyStateIcon>
            <Style.EmptyStateText>{title}</Style.EmptyStateText>
            {subtitle && <Style.EmptyStateSubText>{subtitle}</Style.EmptyStateSubText>}
        </Style.EmptyStateContainer>
    );
}
