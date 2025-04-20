import { Users } from "lucide-react";

interface ListHeaderProps {
    participantCount: number;
}

const ListHeader = ({ participantCount }: ListHeaderProps) => (
    <div className="flex items-center gap-4">
        <h3 className="text-lg font-semibold text-cyan-600">Participants</h3>
        <div className="flex items-center text-muted-foreground text-sm">
            <Users className="h-4 w-4 mr-1 text-cyan-600" />
            {participantCount}
        </div>
    </div>
);

export default ListHeader; 