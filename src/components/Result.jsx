import React from "react";

const Result = ({ score, total, badge }) => {
  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
        <p className="text-lg">
          You scored {score} out of {total}
        </p>
        <p className="mt-4 text-xl font-semibold text-green-500">
          Badge: {badge}
        </p>
      </div>
    </div>
  );
};

export default Result;
