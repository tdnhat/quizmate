import { User } from "@/types/user";

interface AuthorInfoProps {
    author: User;
}

const AuthorInfo = ({ author }: AuthorInfoProps) => {
    return (
        <div className="flex items-center space-x-2">
            <img
                src={author.avatarUrl}
                alt={author.username}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement!;

                    // Remove the broken image
                    parent.removeChild(target);

                    // Create initials div
                    const initials = author.username.split("-")[0].charAt(0).toUpperCase();
                    const div = document.createElement("div");
                    div.className =
                        "w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold";
                    div.textContent = initials;

                    // Append initials div
                    parent.appendChild(div);
                }}
            />
            <span className="text-xs text-gray-600 truncate max-w-[100px]">
                {author.username}
            </span>
        </div>
    );
};

export default AuthorInfo;
