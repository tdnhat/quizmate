import { CheckIcon } from "lucide-react";

const QuestionLegend = () => {
    return (
        <div className="space-y-2">
            <p className="text-sm font-medium">Legend:</p>
            <div className="grid grid-cols-1 gap-2">
                {/* Current Question */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-cyan-600 text-white border border-cyan-700 shadow-md mr-3">
                        <span className="text-xs font-semibold">!</span>
                    </div>
                    <span>Current Question</span>
                </div>

                {/* Answered Question */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-green-100 text-green-800 border border-green-300 mr-3">
                        <CheckIcon className="w-3.5 h-3.5 text-green-600" />
                    </div>
                    <span>Answered</span>
                </div>

                {/* Not Answered Question */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 mr-3">
                        <span className="text-xs font-semibold">?</span>
                    </div>
                    <span>Not Answered</span>
                </div>

                {/* Flagged Question */}
                <div className="flex items-center text-xs">
                    <div className="w-5 h-5 rounded-sm flex items-center justify-center bg-amber-100 text-amber-600 border border-amber-300 mr-3">
                        <span className="text-xs font-semibold">!</span>
                    </div>
                    <span>Flagged</span>
                </div>
            </div>
        </div>
    );
};

export default QuestionLegend;
