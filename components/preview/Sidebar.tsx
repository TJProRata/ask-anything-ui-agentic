/**
 * Sidebar Component
 * Editing sidebar for preview gist pages
 * Displays answer cards from questions 1-10
 *
 * TODO: Implement full sidebar with:
 * - Answer card display from onboarding data
 * - Edit mode for each answer
 * - Real-time sync with Convex
 * - Publish button
 */

interface Answer {
  question: string;
  answer: string;
  phase: number;
}

interface SidebarProps {
  answers?: Answer[];
  onEdit?: (phaseNumber: number) => void;
  onPublish?: () => void;
}

export default function Sidebar({
  answers = [],
  onEdit,
  onPublish,
}: SidebarProps) {
  return (
    <div className="w-full md:w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Your Answers</h2>
        <p className="text-sm text-gray-600 mb-6">
          Review and edit your gist configuration
        </p>

        {/* Placeholder answer cards */}
        <div className="space-y-4 mb-6">
          {answers.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              <p className="text-sm">Answer cards will appear here</p>
            </div>
          ) : (
            answers.map((answer, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
                onClick={() => onEdit?.(answer.phase)}
              >
                <div className="text-xs text-gray-500 mb-1">
                  Phase {answer.phase}
                </div>
                <div className="font-semibold text-sm mb-1">
                  {answer.question}
                </div>
                <div className="text-sm text-gray-700">{answer.answer}</div>
              </div>
            ))
          )}
        </div>

        {/* Publish button */}
        <button
          onClick={onPublish}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Publish Gist
        </button>
      </div>
    </div>
  );
}
