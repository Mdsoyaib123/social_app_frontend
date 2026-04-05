export const CommentSkeleton = () => {
    return (
        <div className="flex gap-3 mt-4 animate-pulse">
            <div className="w-9 h-9 bg-gray-200 rounded-full" />

            <div className="flex-1 space-y-2">
                <div className="h-10 bg-gray-200 rounded-2xl w-full" />
                <div className="h-3 bg-gray-200 rounded w-24" />
            </div>
        </div>
    );
};