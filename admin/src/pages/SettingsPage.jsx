import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, Typography, Button, Loader } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';
import { toast } from 'react-toastify';
import PluginLayout from '../components/PluginLayout';
import SettingsHeader from '../components/settings/SettingsHeader';
import * as Style from '../components/dashboard/styles';

const SettingsContainer = styled.div`
  padding: 16px 32px 32px 32px;
  width: 100%;
`;

const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  margin-top: 8px;
  width: 100%;
`;

const ActionCard = styled(Box)`
  padding: 24px;
  background: ${({ theme }) => theme.colors.neutral0};
  border: 1px solid ${({ theme }) => theme.colors.neutral150};
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.primary600};
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
  }
`;

const SettingsPage = () => {
    const { get, post } = useFetchClient();
    const [loadingAction, setLoadingAction] = useState(null);

    const handleDbAction = async (action, endpoint) => {
        if (!endpoint) {
            toast.info(`Action "${action}" is coming soon.`);
            return;
        }

        setLoadingAction(action);
        try {
            const { data } = await post(endpoint);
            const cancelledCount = data?.summary?.totalCancelled || 0;
            toast.success(`${data.message} ${cancelledCount} transactions updated.`);
        } catch (error) {
            console.error(`Error executing ${action}:`, error);
            toast.error(error?.response?.data?.error?.message || `Failed to execute ${action}`);
        } finally {
            setLoadingAction(null);
        }
    };

    return (
        <PluginLayout>
            <Style.DashboardContainer>
                <SettingsHeader />
                <Style.Main>
                    <SettingsContainer>
                        <ActionGrid>
                            {/* Financial Maintenance */}
                            <ActionCard>
                                <Box>
                                    <Typography variant="delta" fontWeight="bold">Cancel Stale Transactions</Typography>
                                    <Box paddingTop={2} paddingBottom={4}>
                                        <Typography variant="pi" textColor="neutral600">
                                            Cancel pending PayU topups and transactions older than 30 minutes to prevent data bloat.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => handleDbAction('Cancel Stale Transactions', '/admin-pannel/maintenance/cancel-stale-transactions')}
                                    loading={loadingAction === 'Cancel Stale Transactions'}
                                >
                                    Cancel Pending
                                </Button>
                            </ActionCard>

                            <ActionCard>
                                <Box>
                                    <Typography variant="delta" fontWeight="bold">Generate Monthly Invoices</Typography>
                                    <Box paddingTop={2} paddingBottom={4}>
                                        <Typography variant="pi" textColor="neutral600">
                                            Manually trigger the generation of monthly statements and invoices for the current period.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => handleDbAction('Generate Monthly Invoices')}
                                    loading={loadingAction === 'Generate Monthly Invoices'}
                                >
                                    Start Generation
                                </Button>
                            </ActionCard>

                            {/* Expert & Call Maintenance */}
                            <ActionCard>
                                <Box>
                                    <Typography variant="delta" fontWeight="bold">End Stuck Calls</Typography>
                                    <Box paddingTop={2} paddingBottom={4}>
                                        <Typography variant="pi" textColor="neutral600">
                                            Detect and terminate calls stuck in 'ringing' or 'ongoing' states for an unusual amount of time.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => handleDbAction('End Stuck Calls')}
                                    loading={loadingAction === 'End Stuck Calls'}
                                >
                                    Terminate Stale
                                </Button>
                            </ActionCard>

                            <ActionCard>
                                <Box>
                                    <Typography variant="delta" fontWeight="bold">Refresh Expert Rankings</Typography>
                                    <Box paddingTop={2} paddingBottom={4}>
                                        <Typography variant="pi" textColor="neutral600">
                                            Recalculate rank factors, review averages, and update "Top 10%" milestones for all experts.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="secondary" 
                                    onClick={() => handleDbAction('Refresh Expert Rankings')}
                                    loading={loadingAction === 'Refresh Expert Rankings'}
                                >
                                    Recalculate Ranks
                                </Button>
                            </ActionCard>

                            {/* System Cleanup */}
                            <ActionCard>
                                <Box>
                                    <Typography variant="delta" fontWeight="bold">Purge Logs & OTPs</Typography>
                                    <Box paddingTop={2} paddingBottom={4}>
                                        <Typography variant="pi" textColor="neutral600">
                                            Clear expired session logs, OTP entries, and temporary authentication data from the database.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="danger-light" 
                                    onClick={() => handleDbAction('Purge Logs & OTPs')}
                                    loading={loadingAction === 'Purge Logs & OTPs'}
                                >
                                    Clean Auth Data
                                </Button>
                            </ActionCard>

                            <ActionCard>
                                <Box>
                                    <Typography variant="delta" fontWeight="bold">Clean Call Documents</Typography>
                                    <Box paddingTop={2} paddingBottom={4}>
                                        <Typography variant="pi" textColor="neutral600">
                                            Permanently remove expired recordings and temporary call documents older than the retention policy.
                                        </Typography>
                                    </Box>
                                </Box>
                                <Button 
                                    variant="danger-light" 
                                    onClick={() => handleDbAction('Clean Call Documents')}
                                    loading={loadingAction === 'Clean Call Documents'}
                                >
                                    Remove Old Docs
                                </Button>
                            </ActionCard>
                        </ActionGrid>
                    </SettingsContainer>
                </Style.Main>
            </Style.DashboardContainer>
        </PluginLayout>
    );
};

export default SettingsPage;
