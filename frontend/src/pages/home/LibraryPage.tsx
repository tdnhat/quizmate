import { LibraryProvider, LibraryContent } from "../../features/library";

const LibraryPage = () => {
    return (
        <div className="container mx-auto max-w-6xl p-4">
            <LibraryProvider>
                <LibraryContent />
            </LibraryProvider>
        </div>
    );
};

export default LibraryPage;
