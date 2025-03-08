interface AuthorProps {
    name: string;
    avatar: string;
}

interface AuthorInfoProps {
    author: AuthorProps;
}

const AuthorInfo = ({ author }: AuthorInfoProps) => {
    return (
        <div className="flex items-center space-x-2">
            <img
                src={author.avatar}
                alt={author.name}
                className="w-6 h-6 rounded-full"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    const parent = target.parentElement!;

                    // Remove the broken image
                    parent.removeChild(target);

                    // Create initials div
                    const initials = author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("");
                    const div = document.createElement("div");
                    div.className =
                        "w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold";
                    div.textContent = initials;

                    // Append initials div
                    parent.appendChild(div);
                }}
            />
            <span className="text-xs text-gray-600 truncate max-w-[100px]">
                {author.name}
            </span>
        </div>
    );
};

export default AuthorInfo;
