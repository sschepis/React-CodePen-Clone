import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';
import AIAnalysisService from '../../services/AIAnalysisService';

const useCodeManager = (userId) => {
  const [html, setHtml] = useLocalStorage('html', '');
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage('js', '');
  const [srcDoc, setSrcDoc] = useState('');
  const [codeAnalysis, setCodeAnalysis] = useState(null);
  const [performanceScore, setPerformanceScore] = useState(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  const analyzeCode = useCallback(async () => {
    const htmlAnalysis = await AIAnalysisService.analyzeCode(html, 'HTML', userId);
    const cssAnalysis = await AIAnalysisService.analyzeCode(css, 'CSS', userId);
    const jsAnalysis = await AIAnalysisService.analyzeCode(js, 'JavaScript', userId);
    
    setCodeAnalysis({ html: htmlAnalysis, css: cssAnalysis, js: jsAnalysis });
    
    const jsScore = await AIAnalysisService.getPerformanceScore(js, 'JavaScript', userId);
    setPerformanceScore(jsScore);
  }, [html, css, js, userId]);

  return {
    html, setHtml,
    css, setCss,
    js, setJs,
    srcDoc,
    codeAnalysis,
    performanceScore,
    analyzeCode
  };
};

export default useCodeManager;