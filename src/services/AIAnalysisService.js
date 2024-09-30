import ClaudeService from './ClaudeService';
import TokenTrackingService from './TokenTrackingService';

const AIAnalysisService = {
  async analyzeCode(code, language, userId) {
    const inputTokens = TokenTrackingService.estimateTokens(code);
    TokenTrackingService.trackTokenUsage(userId, inputTokens);

    const analysisPrompt = `Analyze the following ${language} code for best practices, potential bugs, and optimization opportunities:\n\n${code}`;
    
    try {
      const response = await ClaudeService.sendMessage(analysisPrompt, {}, userId);
      return {
        analysis: response.text,
        suggestions: this.extractSuggestions(response.text)
      };
    } catch (error) {
      console.error('Error during AI code analysis:', error);
      return {
        analysis: 'An error occurred during the analysis.',
        suggestions: []
      };
    }
  },

  extractSuggestions(analysisText) {
    // This is a simplified extraction. In a real implementation,
    // you'd use more sophisticated NLP techniques.
    const suggestions = analysisText.split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.slice(2));
    
    return suggestions;
  },

  async getPerformanceScore(code, language, userId) {
    const scorePrompt = `Evaluate the following ${language} code and provide a performance score out of 100:\n\n${code}`;
    
    try {
      const response = await ClaudeService.sendMessage(scorePrompt, {}, userId);
      const score = this.extractScore(response.text);
      return score;
    } catch (error) {
      console.error('Error getting performance score:', error);
      return null;
    }
  },

  extractScore(responseText) {
    const scoreMatch = responseText.match(/(\d+)\/100/);
    return scoreMatch ? parseInt(scoreMatch[1]) : null;
  }
};

export default AIAnalysisService;