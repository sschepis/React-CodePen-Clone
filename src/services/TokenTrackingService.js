import SubscriptionService from './SubscriptionService';

class TokenTrackingService {
  constructor() {
    this.userTokens = new Map();
    this.userSubscriptions = new Map();
  }

  async initializeUser(userId) {
    if (!this.userTokens.has(userId)) {
      this.userTokens.set(userId, 0);
      const subscription = await SubscriptionService.getCurrentSubscription(userId);
      this.userSubscriptions.set(userId, subscription);
    }
  }

  async trackTokenUsage(userId, tokenCount) {
    await this.initializeUser(userId);
    const currentTokens = this.userTokens.get(userId);
    const newTokenCount = currentTokens + tokenCount;
    const subscription = this.userSubscriptions.get(userId);
    const tokenLimit = SubscriptionService.getTokenLimit(subscription.tier);

    if (newTokenCount > tokenLimit) {
      throw new Error('Token limit exceeded for current subscription tier');
    }

    this.userTokens.set(userId, newTokenCount);
  }

  getUserTokenUsage(userId) {
    return this.userTokens.get(userId) || 0;
  }

  getUserSubscription(userId) {
    return this.userSubscriptions.get(userId);
  }

  resetUserTokenUsage(userId) {
    this.userTokens.set(userId, 0);
  }

  // Mock method to estimate token usage based on input length
  estimateTokens(input) {
    // This is a very simplistic estimation. In a real scenario,
    // you'd use a more accurate method or rely on the AI service's response.
    return Math.ceil(input.length / 4);
  }
}

export default new TokenTrackingService();