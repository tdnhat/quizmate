import { getColorByInitialsFromName, getInitialsFromName } from "@/lib/utils";

interface ParticipantAvatarProps {
    username: string;
}

const ParticipantAvatar = ({ username }: ParticipantAvatarProps) => {
    const initials = getInitialsFromName(username);
    const bgColorClass = getColorByInitialsFromName(initials);
    
    return (
        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${bgColorClass}`}>
            {initials}
        </div>
    );
};

export default ParticipantAvatar; 