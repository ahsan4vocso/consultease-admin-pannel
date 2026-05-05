import React from 'react';
import styled from 'styled-components';
import { SettingsIcon } from '../Icons';
import * as Style from '../dashboard/styles';

const SettingsHeaderContainer = styled(Style.Header)`
  background: ${({ theme }) => theme.colors.neutral0};
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  padding: 16px 32px;
`;

const SettingsHeader = () => {
    return (
        <SettingsHeaderContainer>
            <Style.HeaderLeft>
                <Style.IconBox>
                    <SettingsIcon style={{ width: "32px", height: "32px", color: "#6366f1" }} />
                </Style.IconBox>
                <Style.TitleBox>
                    <Style.Title>Platform Settings</Style.Title>
                    <Style.Subtitle>Optimize platform performance, reconcile financial records, and perform expert lifecycle maintenance tasks.</Style.Subtitle>
                </Style.TitleBox>
            </Style.HeaderLeft>
        </SettingsHeaderContainer>
    );
};

export default SettingsHeader;
