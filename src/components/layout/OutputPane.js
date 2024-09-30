import React from 'react';

const OutputPane = ({ srcDoc }) => {
  return (
    <div className="w-full h-full border border-gray-300 rounded-md overflow-hidden">
      <iframe
        srcDoc={srcDoc}
        title="output"
        sandbox="allow-scripts"
        className="w-full h-full"
      />
    </div>
  );
};

export default OutputPane;