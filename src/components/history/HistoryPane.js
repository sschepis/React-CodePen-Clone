import React from 'react';

const HistoryPane = ({ saveVersion, loadVersion, versionHistory }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <div className="flex mb-4">
        <button
          onClick={saveVersion}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Save Version
        </button>
        <select
          onChange={(e) => loadVersion(versionHistory[e.target.value])}
          className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Load Version</option>
          {versionHistory.map((version, index) => (
            <option key={version.id} value={index}>
              {new Date(version.timestamp).toLocaleString()}
            </option>
          ))}
        </select>
      </div>
      <div className="version-list">
        <h3 className="text-lg font-semibold mb-2">Version History:</h3>
        <ul className="space-y-2">
          {versionHistory.map((version, index) => (
            <li
              key={version.id}
              onClick={() => loadVersion(version)}
              className="cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors duration-200"
            >
              Version {index + 1}: {new Date(version.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HistoryPane;