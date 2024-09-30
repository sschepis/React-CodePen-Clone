import { useState, useCallback } from 'react';
import ClaudeService from '../../services/ClaudeService';

const useAIManager = (userId, html, css, js, setHtml, setCss, setJs) => {
  const [messages, setMessages] = useState([]);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);

  const handleSendMessage = useCallback(async (message) => {
    const newMessages = [...messages, { sender: 'user', text: message }];
    setMessages(newMessages);

    try {
      const response = await ClaudeService.sendMessage(message, { html, css, js }, userId);
      const processedSuggestion = ClaudeService.processSuggestion(response.suggestion);
      setCurrentSuggestion(processedSuggestion);
      setMessages([...newMessages, { sender: 'claude', text: response.text }]);
    } catch (error) {
      console.error('Error communicating with Claude:', error);
      setMessages([...newMessages, { sender: 'claude', text: 'Sorry, I encountered an error. Please try again.' }]);
    }
  }, [messages, html, css, js, userId]);

  const applySuggestion = useCallback(() => {
    if (currentSuggestion) {
      switch (currentSuggestion.language) {
        case 'html':
          setHtml(currentSuggestion.content);
          break;
        case 'css':
          setCss(currentSuggestion.content);
          break;
        case 'javascript':
          setJs(currentSuggestion.content);
          break;
        default:
          console.warn('Unknown language in suggestion:', currentSuggestion.language);
      }
      setCurrentSuggestion(null);
    }
  }, [currentSuggestion, setHtml, setCss, setJs]);

  return {
    messages,
    currentSuggestion,
    handleSendMessage,
    applySuggestion,
    setCurrentSuggestion
  };
};

export default useAIManager;