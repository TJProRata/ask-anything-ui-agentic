/**
 * StepsUI Component
 * Questions 7-10 UI for preview editing
 *
 * TODO: Implement full steps interface with:
 * - Questions 7-10 from onboarding flow
 * - Step progression indicators
 * - Form inputs with validation
 * - Save functionality
 */

interface Step {
  number: number;
  question: string;
  type: "text" | "select" | "textarea";
  options?: string[];
}

interface StepsUIProps {
  currentStep?: number;
  onStepComplete?: (stepNumber: number, answer: string) => void;
}

export default function StepsUI({
  currentStep = 7,
  onStepComplete,
}: StepsUIProps) {
  const steps: Step[] = [
    {
      number: 7,
      question: "What content sources should we connect?",
      type: "select",
      options: ["Website", "Help Center", "Product Docs"],
    },
    {
      number: 8,
      question: "What widget configuration do you prefer?",
      type: "select",
      options: ["Small", "Medium", "Large"],
    },
    {
      number: 9,
      question: "Set your widget size",
      type: "select",
      options: ["Small", "Medium", "Large"],
    },
    {
      number: 10,
      question: 'Set your widget\'s "call to action"',
      type: "text",
    },
  ];

  const currentStepData = steps.find((s) => s.number === currentStep);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step.number === currentStep
                  ? "bg-purple-600 text-white"
                  : step.number < currentStep
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number}
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div
            className="h-2 bg-purple-600 rounded-full transition-all"
            style={{ width: `${((currentStep - 7) / 4) * 100}%` }}
          />
        </div>
      </div>

      {currentStepData && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">
            {currentStepData.question}
          </h2>
          <div className="text-sm text-gray-500 mb-6">
            Question {currentStepData.number} of 10
          </div>

          {/* Placeholder for input */}
          <div className="mb-6">
            <p className="text-gray-600">
              Form input for this step will be rendered here
            </p>
          </div>

          <button
            onClick={() => onStepComplete?.(currentStepData.number, "")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
}
