import * as Style from './styles';

const StatCard = ({
    variant = 'purple',
    icon: Icon,
    label,
    value,
    subtitle,
    delay = '0s'
}) => {
    return (
        <Style.StatCard variant={variant} delay={delay}>
            <Style.StatCornerBubble variant={variant} />
            <Style.StatCardHeader>
                <Style.StatLabel>{label}</Style.StatLabel>
                {Icon && (
                    <Style.StatIconWrapper variant={variant}>
                        <Icon style={{ width: '28px', height: '28px' }} />
                    </Style.StatIconWrapper>
                )}
            </Style.StatCardHeader>

            <Style.StatCardBody>
                <Style.StatValue>
                    {value}
                </Style.StatValue>
                {subtitle && (
                    <Style.StatSubtitle variant={variant}>{subtitle}</Style.StatSubtitle>
                )}
            </Style.StatCardBody>
        </Style.StatCard>
    );
};

export default StatCard;
