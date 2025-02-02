import React from "react";

const Question = ({ data, handleAnswer }) => {
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{data.description}</h2>
      <div className="space-y-2">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option.is_correct)}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            {option.description}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
