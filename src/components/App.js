import React, { useState, useCallback, useEffect } from 'react';
import Sidebar from './sidebar/Sidebar';
import EditorPane from './editors/EditorPane';
import OutputPane from './layout/OutputPane';
import AnalysisPane from './analysis/AnalysisPane';
import CollaborationPane from './collaboration/CollaborationPane';
import HistoryPane from './history/HistoryPane';
import UserInfo from './layout/UserInfo';
import ChatInterface from './ChatInterface';
import AdminDashboard from './AdminDashboard';
import Onboarding from './Onboarding';
import WelcomePage from './WelcomePage';
import MyPens from './MyPens';
import useLocalStorage from '../hooks/useLocalStorage';
import useAuth from './auth/AuthManager';
import useCodeManager from './code/CodeManager';
import useAIManager from './ai/AIManager';

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [versionHistory, setVersionHistory] = useState([]);
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  const [layout, setLayout] = useLocalStorage('layout', 'horizontal');
  const [activeTab, setActiveTab] = useState('code');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('welcome');
  const [pens, setPens] = useState([]);

  const { 
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
  } = useAuth();

  const { html, setHtml, css, setCss, js, setJs, srcDoc, codeAnalysis, performanceScore, analyzeCode } = useCodeManager(userId);
  const { messages, currentSuggestion, handleSendMessage, applySuggestion, setCurrentSuggestion } = useAIManager(userId, html, css, js, setHtml, setCss, setJs);

  useEffect(() => {
    if (isLoggedIn) {
      setCurrentView('myPens');
      // Fetch user's pens here
      // For now, we'll use dummy data
      setPens([
        { id: 1, title: 'My First Pen', description: 'A simple HTML/CSS demo' },
        { id: 2, title: 'React Component', description: 'A reusable React button component' },
        { id: 3, title: 'CSS Animation', description: 'A cool CSS animation example' },
      ]);
    } else {
      setCurrentView('welcome');
    }
  }, [isLoggedIn]);

  const saveVersion = useCallback(() => {
    const newVersion = {
      id: Date.now(),
      html,
      css,
      js,
      timestamp: new Date().toISOString(),
    };
    setVersionHistory(prevHistory => [...prevHistory, newVersion]);
  }, [html, css, js]);

  const loadVersion = useCallback((version) => {
    setHtml(version.html);
    setCss(version.css);
    setJs(version.js);
  }, [setHtml, setCss, setJs]);

  const inviteCollaborator = useCallback((email) => {
    setCollaborators(prevCollaborators => [...prevCollaborators, email]);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  }, [setTheme]);

  const toggleLayout = useCallback(() => {
    setLayout(prevLayout => prevLayout === 'horizontal' ? 'vertical' : 'horizontal');
  }, [setLayout]);

  const handlePenClick = useCallback((penId) => {
    // Load the selected pen
    console.log(`Loading pen with id: ${penId}`);
    setCurrentView('editor');
  }, []);

  const handleCreateNewPen = useCallback(() => {
    // Create a new pen
    console.log('Creating a new pen');
    setCurrentView('editor');
  }, []);

  const handleBackToMyPens = useCallback(() => {
    setCurrentView('myPens');
  }, []);

  const renderActiveTab = useCallback(() => {
    switch (activeTab) {
      case 'code':
        return (
          <EditorPane
            html={html}
            setHtml={setHtml}
            css={css}
            setCss={setCss}
            js={js}
            setJs={setJs}
            currentSuggestion={currentSuggestion}
            userId={userId}
            theme={theme}
            layout={layout}
          />
        );
      case 'output':
        return <OutputPane srcDoc={srcDoc} />;
      case 'analysis':
        return (
          <AnalysisPane
            analyzeCode={analyzeCode}
            codeAnalysis={codeAnalysis}
            performanceScore={performanceScore}
          />
        );
      case 'collaboration':
        return (
          <CollaborationPane
            inviteCollaborator={inviteCollaborator}
            collaborators={collaborators}
          />
        );
      case 'history':
        return (
          <HistoryPane
            saveVersion={saveVersion}
            loadVersion={loadVersion}
            versionHistory={versionHistory}
          />
        );
      default:
        return null;
    }
  }, [activeTab, html, css, js, srcDoc, currentSuggestion, userId, theme, layout, analyzeCode, codeAnalysis, performanceScore, inviteCollaborator, collaborators, saveVersion, loadVersion, versionHistory]);

  if (isAdmin) {
    return <AdminDashboard />;
  }

  if (currentView === 'welcome') {
    return <WelcomePage onRegister={register} onLogin={login} />;
  }

  if (currentView === 'myPens') {
    return <MyPens pens={pens} onPenClick={handlePenClick} onCreateNewPen={handleCreateNewPen} onLogout={logout} />;
  }

  return (
    <div className={`flex flex-col h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Onboarding isOpen={isOnboardingOpen} setIsOpen={setIsOnboardingOpen} />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div className="flex flex-col flex-grow overflow-hidden">
          <UserInfo
            subscription={subscription}
            tokenUsage={tokenUsage}
            handleUpgrade={handleUpgrade}
            onBackToMyPens={handleBackToMyPens}
            onLogout={logout}
          />
          <div className="flex-grow overflow-hidden">
            {renderActiveTab()}
          </div>
          <div className="h-1/3 border-t border-gray-300">
            <ChatInterface onSendMessage={handleSendMessage} messages={messages} />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-2 bg-gray-100 border-t border-gray-300">
        <div>
          <button
            onClick={toggleTheme}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Toggle Theme
          </button>
          <button
            onClick={toggleLayout}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Toggle Layout
          </button>
        </div>
        {currentSuggestion && (
          <div className="flex space-x-2">
            <button
              onClick={applySuggestion}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Apply Suggestion
            </button>
            <button
              onClick={() => setCurrentSuggestion(null)}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Reject Suggestion
            </button>
          </div>
        )}
        {subscription?.tier === 'free' && (
          <button
            onClick={handleUpgrade}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Upgrade to Pro
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
