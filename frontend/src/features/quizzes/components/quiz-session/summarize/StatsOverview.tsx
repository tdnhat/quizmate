import { Participant } from "../../../types/session";

interface StatsOverviewProps {
    participants: Participant[];
}

const StatsOverview = ({ participants }: StatsOverviewProps) => {
    // Calculate stats
    const activeParticipantsCount = participants.filter(p => p.isActive).length;
    const totalScore = participants.reduce((sum, p) => sum + (p.score || 0), 0);
    const averageScore = participants.length > 0 ? Math.round(totalScore / participants.length) : 0;
    const topScore = participants.length > 0 
        ? Math.max(...participants.map(p => p.score || 0))
        : 0;

    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-sm text-blue-500 mb-1">Participants</div>
                <div className="text-2xl font-bold">{activeParticipantsCount}</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="text-sm text-purple-500 mb-1">Average Score</div>
                <div className="text-2xl font-bold">{averageScore} pts</div>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <div className="text-sm text-amber-500 mb-1">Top Score</div>
                <div className="text-2xl font-bold">{topScore} pts</div>
            </div>
        </div>
    );
};

export default StatsOverview; 