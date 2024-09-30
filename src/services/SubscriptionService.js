import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_stripe_publishable_key');

const SubscriptionService = {
  tiers: {
    free: {
      name: 'Free',
      price: 0,
      tokenLimit: 1000,
      features: ['Basic AI assistance', 'Limited code completion']
    },
    pro: {
      name: 'Pro',
      price: 9.99,
      tokenLimit: 10000,
      features: ['Advanced AI assistance', 'Unlimited code completion', 'Priority support']
    },
    enterprise: {
      name: 'Enterprise',
      price: 49.99,
      tokenLimit: 100000,
      features: ['Custom AI models', 'Team collaboration', 'Dedicated support']
    }
  },

  async createCheckoutSession(userId, tierName) {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        tierName,
      }),
    });

    const session = await response.json();
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  },

  async getCurrentSubscription(userId) {
    // In a real app, this would make an API call to your backend
    // For now, we'll return a mock subscription
    return {
      tier: 'free',
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    };
  },

  getTokenLimit(tierName) {
    if (!tierName || !this.tiers[tierName]) {
      console.warn(`Invalid tier name: ${tierName}. Defaulting to free tier.`);
      return this.tiers.free.tokenLimit;
    }
    return this.tiers[tierName].tokenLimit;
  }
};

export default SubscriptionService;