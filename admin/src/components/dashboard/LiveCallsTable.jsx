import * as Style from "./styles";
import EmptyState from "./EmptyState";
import { formatTimeAMPM, minutesToMMSS } from "../../utils/helper";
import { VideoCall, VoiceCall } from "../Icons";
import { useMovingTime } from "../../hooks/useFormater";

export default function LiveCallsTable({ stats = {}, liveCalls = [] }) {
    const currMovingTime = useMovingTime();

    return (
        <Style.TableSection>
            <Style.TableHeader>
                <div>
                    <Style.CardTitle>Live calls</Style.CardTitle>
                    <Style.CardSubtitle>Monitor ongoing calls.</Style.CardSubtitle>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Style.ActiveBadge><Style.LiveDot /> {stats.liveCalls} ongoing</Style.ActiveBadge>
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
                                <td colSpan="7">
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
                                    onClick={() => window.open(`/admin/content-manager/collection-types/api::call.call/${call.documentId}`, '_blank')}
                                >
                                    <Style.Td fontFamily="monospace" color="#64748b" >{call.id}</Style.Td>
                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.type == "voiceCall" ? <VoiceCall style={{ width: "20px", height: "20px", color: "#5272a3ff" }} /> : <VideoCall style={{ width: "20px", height: "20px", color: "#219bacff" }} />}</Style.Td>
                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.caller}</Style.Td>
                                    <Style.Td fontSize="1.4rem" color="#1e293b">{call.expert}</Style.Td>
                                    <Style.Td fontSize="1.4rem" color="#1e293b">{formatTimeAMPM(call.startTime) || "---"}</Style.Td>
                                    <Style.Td fontSize="1.4rem" color="#1e293b">{minutesToMMSS((currMovingTime - new Date(call.startTime).getTime()) / (1000 * 60))}</Style.Td>
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
        </Style.TableSection>
    );
}
