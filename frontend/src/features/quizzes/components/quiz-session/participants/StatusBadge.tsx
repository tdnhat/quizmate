import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
    isActive: boolean;
}

const StatusBadge = ({ isActive }: StatusBadgeProps) => {
    return (
        <Badge
            className={
                isActive
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
            }
        >
            {isActive ? "Connected" : "Disconnected"}
        </Badge>
    );
};

export default StatusBadge; 