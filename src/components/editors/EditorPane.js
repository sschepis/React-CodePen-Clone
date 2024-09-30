import React from 'react';
import Editor from '../Editor';

const EditorPane = ({ html, setHtml, css, setCss, js, setJs, currentSuggestion, userId, theme, layout }) => {
  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row' : 'flex-col'} h-full`}>
      <EditorContainer
        title="HTML"
        language="html"
        value={html}
        onChange={setHtml}
        suggestion={currentSuggestion && currentSuggestion.language === 'html' ? currentSuggestion : null}
        userId={userId}
        theme={theme}
      />
      <EditorContainer
        title="CSS"
        language="css"
        value={css}
        onChange={setCss}
        suggestion={currentSuggestion && currentSuggestion.language === 'css' ? currentSuggestion : null}
        userId={userId}
        theme={theme}
      />
      <EditorContainer
        title="JavaScript"
        language="javascript"
        value={js}
        onChange={setJs}
        suggestion={currentSuggestion && currentSuggestion.language === 'javascript' ? currentSuggestion : null}
        userId={userId}
        theme={theme}
      />
    </div>
  );
};

const EditorContainer = ({ title, language, value, onChange, suggestion, userId, theme }) => (
  <div className="flex-1 flex flex-col border border-gray-300 m-1 rounded-md overflow-hidden">
    <div className="bg-gray-200 text-gray-700 font-semibold py-2 px-4">
      {title}
    </div>
    <div className="flex-1 overflow-hidden">
      <Editor
        language={language}
        displayName={title}
        value={value}
        onChange={onChange}
        suggestion={suggestion}
        userId={userId}
        theme={theme}
      />
    </div>
  </div>
);

export default EditorPane;