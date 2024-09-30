import { useState, useEffect } from 'react';
import TokenTrackingService from '../../services/TokenTrackingService';
import SubscriptionService from '../../services/SubscriptionService';

const useAuth = () => {
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [tokenUsage, setTokenUsage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      authenticateUser(storedUserId);
    }
  }, []);

  const authenticateUser = async (id) => {
    setUserId(id);
    setIsLoggedIn(true);
    const isAdminUser = id.startsWith('admin_');
    setIsAdmin(isAdminUser);
    await TokenTrackingService.initializeUser(id);
    const userSubscription = await SubscriptionService.getCurrentSubscription(id);
    setSubscription(userSubscription);
    const usage = TokenTrackingService.getUserTokenUsage(id);
    setTokenUsage(usage);
  };

  const login = async (email, password) => {
    // In a real app, you would validate credentials here
    const mockUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', mockUserId);
    await authenticateUser(mockUserId);
  };

  const register = async (email, password) => {
    // In a real app, you would create a new user here
    const mockUserId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('userId', mockUserId);
    await authenticateUser(mockUserId);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
    setSubscription(null);
    setTokenUsage(0);
  };

  const handleUpgrade = () => {
    SubscriptionService.createCheckoutSession(userId, 'pro');
  };

  return { 
    userId, 
    isAdmin, 
    subscription, 
    tokenUsage, 
    isLoggedIn,
    login,
    register,
    logout,
    handleUpgrade, 
    setTokenUsage 
  };
};

export default useAuth;