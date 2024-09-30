import React from 'react';

const AnalysisPane = ({ analyzeCode, codeAnalysis, performanceScore }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <button 
        onClick={analyzeCode}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Analyze Code
      </button>
      {codeAnalysis && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">AI Code Analysis</h3>
          <div className="space-y-1">
            <div>HTML: {codeAnalysis.html.suggestions.length} suggestions</div>
            <div>CSS: {codeAnalysis.css.suggestions.length} suggestions</div>
            <div>JS: {codeAnalysis.js.suggestions.length} suggestions</div>
          </div>
        </div>
      )}
      {performanceScore !== null && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Performance Score</h3>
          <div className="text-2xl font-bold text-green-600">
            JavaScript: {performanceScore}/100
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisPane;