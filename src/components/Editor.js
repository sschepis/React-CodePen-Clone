import React, { useState, useEffect, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import ClaudeService from '../services/ClaudeService';

export default function Editor(props) {
  const {
    language,
    displayName,
    value,
    onChange,
    suggestion,
    userId,
    theme
  } = props;

  const [open, setOpen] = useState(true);
  const [editor, setEditor] = useState(null);

  const handleChange = useCallback((value, viewUpdate) => {
    onChange(value);
  }, [onChange]);

  useEffect(() => {
    if (editor && suggestion) {
      const doc = editor.state.doc;
      const cursor = editor.state.selection.main.head;

      // Insert the suggested code
      editor.dispatch({
        changes: { from: cursor, insert: suggestion.content },
        selection: { anchor: cursor + suggestion.content.length }
      });

      // Note: Highlighting suggested code is more complex in CodeMirror 6
      // and might require a custom extension. For now, we'll skip this part.
    }
  }, [editor, suggestion]);

  const handleAICompletion = async (view) => {
    const cursor = view.state.selection.main.head;
    const line = view.state.doc.lineAt(cursor);
    const lineUntilCursor = line.text.slice(0, cursor - line.from);

    try {
      const result = await ClaudeService.getCodeCompletion(lineUntilCursor, language, cursor, userId);
      if (result.suggestion) {
        view.dispatch({
          changes: { from: cursor, insert: result.suggestion.content },
          selection: { anchor: cursor + result.suggestion.content.length }
        });
      }
    } catch (error) {
      console.error('Error getting AI completion:', error);
    }
  };

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'css':
        return css();
      case 'xml':
      case 'html':
        return html();
      default:
        return [];
    }
  };

  return (
    <div className={`h-full flex flex-col ${open ? '' : 'collapsed'}`}>
      <div className="flex justify-between items-center bg-gray-200 text-gray-700 py-2 px-4">
        <span className="font-semibold">{displayName}</span>
        <button
          type="button"
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setOpen(prevOpen => !prevOpen)}
        >
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div>
      <div className="flex-grow overflow-hidden">
        <CodeMirror
          value={value}
          height="100%"
          extensions={[getLanguageExtension()]}
          onChange={handleChange}
          theme={theme === 'dark' ? 'dark' : 'light'}
          className="h-full"
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightSpecialChars: true,
            history: true,
            foldGutter: true,
            drawSelection: true,
            dropCursor: true,
            allowMultipleSelections: true,
            indentOnInput: true,
            syntaxHighlighting: true,
            bracketMatching: true,
            closeBrackets: true,
            autocompletion: true,
            rectangularSelection: true,
            crosshairCursor: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            closeBracketsKeymap: true,
            defaultKeymap: true,
            searchKeymap: true,
            historyKeymap: true,
            foldKeymap: true,
            completionKeymap: true,
            lintKeymap: true,
          }}
          onCreateEditor={(view) => {
            setEditor(view);
            view.dom.addEventListener('keydown', (event) => {
              if (event.key === '.' || (event.ctrlKey && event.key === ' ')) {
                handleAICompletion(view);
              }
            });
          }}
        />
      </div>
    </div>
  );
}
