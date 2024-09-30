import React from 'react';
import SubscriptionService from '../../services/SubscriptionService';

const UserInfo = ({ subscription, tokenUsage, handleUpgrade, onBackToMyPens, onLogout }) => {
  const tierName = subscription?.tier || 'free';
  const tokenLimit = SubscriptionService.getTokenLimit(tierName);

  return (
    <div className="bg-gray-100 p-4 flex items-center justify-between">
      <div className="flex space-x-4">
        <div className="text-sm font-medium text-gray-700">
          Subscription: <span className="capitalize">{tierName}</span>
        </div>
        <div className="text-sm font-medium text-gray-700">
          Token Usage: <span className="font-bold">{tokenUsage}</span> / {tokenLimit}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onBackToMyPens}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Back to My Pens
        </button>
        {tierName === 'free' && (
          <button
            onClick={handleUpgrade}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded text-sm"
          >
            Upgrade to Pro
          </button>
        )}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserInfo;