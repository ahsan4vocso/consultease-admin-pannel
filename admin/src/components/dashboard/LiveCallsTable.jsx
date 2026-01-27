import { useState } from "react";
import { useTheme } from "styled-components";
import { useFetchClient } from "@strapi/strapi/admin";
import * as Style from "./styles";
import EmptyState from "./EmptyState";
import { formatTimeAMPM, minutesToMMSS } from "../../utils/helper";
import { VideoCall, VoiceCall, Cross } from "../Icons";
import { useMovingTime } from "../../hooks/useFormater";

export default function LiveCallsTable({ stats, liveCalls = [] }) {
    const s = stats || {};
    const currMovingTime = useMovingTime();
    const theme = useTheme();
    const { post } = useFetchClient();
    const [selectedCall, setSelectedCall] = useState(null);

    const closeModal = () => setSelectedCall(null);

    const handleRedirect = () => {
        if (selectedCall) {
            window.open(`/admin/content-manager/collection-types/api::call.call/${selectedCall.documentId}`, '_blank');
            closeModal();
        }
    };

    const handleDeclineCall = async () => {
        if (selectedCall) {
            try {
                await post("/admin-pannel/callend", { callId: selectedCall.id });
            } catch (error) {
                console.error("🔔 [LiveCallsTable] Failed to decline call:", error);
            }
            closeModal();
        }
    };

    return (
        <Style.TableSection>
            <Style.TableHeader>
                <div>
                    <Style.CardTitle>Live calls</Style.CardTitle>
                    <Style.CardSubtitle>Monitor ongoing calls.</Style.CardSubtitle>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Style.ActiveBadge><Style.LiveDot /> {(s.voice?.liveCalls || 0) + (s.video?.liveCalls || 0)} ongoing</Style.ActiveBadge>
                </div>
            </Style.TableHeader>
            <Style.TableContainer maxHeight="350px" minHeight="200px">
                <Style.Table>
                    <Style.Thead>
                        <tr>
                            <Style.Th>Call ID</Style.Th>
                            <Style.Th>Type</Style.Th>
                            <Style.Th>Caller</Style.Th>
                            <Style.Th>Expert</Style.Th>
                            <Style.Th>Start Time</Style.Th>
                            <Style.Th>Duration</Style.Th>
                            <Style.Th>Category</Style.Th>
                            <Style.Th>Status</Style.Th>
                        </tr>
                    </Style.Thead>
                    <tbody>
                        {liveCalls.length === 0 ? (
                            <tr>
                                <td colSpan="8">
                                    <EmptyState
                                        title="No live calls"
                                        subtitle="Ongoing consultations will appear here."
                                    />
                                </td>
                            </tr>
                        ) : (
                            liveCalls.map((call) => (
                                <Style.Tr
                                    key={call.id}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => setSelectedCall(call)}
                                >
                                    <Style.Td fontFamily="monospace">{call.id}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.type == "voiceCall" ? <VoiceCall style={{ width: "20px", height: "20px", color: "#5272a3ff" }} /> : <VideoCall style={{ width: "20px", height: "20px", color: "#219bacff" }} />}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.caller}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.expert}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{formatTimeAMPM(call.startTime) || "---"}</Style.Td>
                                    <Style.Td fontSize="1.4rem">{call.startTime ? minutesToMMSS((currMovingTime - new Date(call.startTime).getTime()) / (1000 * 60)) : "---"}</Style.Td>
                                    <Style.Td> <Style.CategoryBadge>{call.category}</Style.CategoryBadge></Style.Td>

                                    <Style.Td>
                                        <Style.StatusBadge status={call.status}>
                                            <span
                                                style={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: "50%",
                                                    backgroundColor: "currentColor",
                                                }}
                                            />
                                            {call.status === "pending" ? "Calling" : call.status}
                                        </Style.StatusBadge>
                                    </Style.Td>
                                </Style.Tr>
                            )))}
                    </tbody>
                </Style.Table>
            </Style.TableContainer>

            {selectedCall && (
                <Style.ModalOverlay onClick={closeModal}>
                    <Style.ModalContent onClick={(e) => e.stopPropagation()}>
                        <Style.ModalHeader>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    backgroundColor: selectedCall.type === 'voiceCall' ? theme.colors.primary100 : theme.colors.success100,
                                    color: selectedCall.type === 'voiceCall' ? theme.colors.primary600 : theme.colors.success600,
                                    padding: '8px',
                                    borderRadius: '12px',
                                    display: 'flex'
                                }}>
                                    {selectedCall.type === 'voiceCall' ?
                                        <VoiceCall style={{ width: '24px', height: '24px' }} /> :
                                        <VideoCall style={{ width: '24px', height: '24px' }} />
                                    }
                                </div>
                                <div>
                                    <Style.CardTitle style={{ fontSize: '16px' }}>Call Details</Style.CardTitle>
                                    <Style.CardSubtitle style={{ fontSize: '11px' }}>ID: {selectedCall.id}</Style.CardSubtitle>
                                </div>
                            </div>
                            <Style.CloseButton onClick={closeModal}>
                                <Cross style={{ width: '20px', height: '20px' }} />
                            </Style.CloseButton>
                        </Style.ModalHeader>

                        <Style.ModalBody>
                            <Style.DataRow>
                                <Style.DataLabel>Caller</Style.DataLabel>
                                <Style.DataValue>{selectedCall.caller}</Style.DataValue>
                            </Style.DataRow>
                            <Style.DataRow>
                                <Style.DataLabel>Expert</Style.DataLabel>
                                <Style.DataValue>{selectedCall.expert}</Style.DataValue>
                            </Style.DataRow>
                            <Style.DataRow>
                                <Style.DataLabel>Category</Style.DataLabel>
                                <Style.DataValue><Style.CategoryBadge>{selectedCall.category}</Style.CategoryBadge></Style.DataValue>
                            </Style.DataRow>
                            <Style.DataRow>
                                <Style.DataLabel>Start Time</Style.DataLabel>
                                <Style.DataValue>{formatTimeAMPM(selectedCall.startTime) || "---"}</Style.DataValue>
                            </Style.DataRow>
                            <Style.DataRow>
                                <Style.DataLabel>Duration</Style.DataLabel>
                                <Style.DataValue>{selectedCall.startTime ? minutesToMMSS((currMovingTime - new Date(selectedCall.startTime).getTime()) / (1000 * 60)) : "---"}</Style.DataValue>
                            </Style.DataRow>
                            <Style.DataRow>
                                <Style.DataLabel>Status</Style.DataLabel>
                                <Style.DataValue>
                                    <Style.StatusBadge status={selectedCall.status}>
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" }} />
                                        {selectedCall.status === "pending" ? "Calling" : selectedCall.status}
                                    </Style.StatusBadge>
                                </Style.DataValue>
                            </Style.DataRow>
                        </Style.ModalBody>

                        <Style.ModalFooter>
                            <Style.ModalButton variant="danger" onClick={handleDeclineCall}>
                                Decline Call
                            </Style.ModalButton>
                            <Style.ModalButton variant="primary" onClick={handleRedirect}>
                                View Details
                            </Style.ModalButton>
                        </Style.ModalFooter>
                    </Style.ModalContent>
                </Style.ModalOverlay>
            )}
        </Style.TableSection>
    );
}
