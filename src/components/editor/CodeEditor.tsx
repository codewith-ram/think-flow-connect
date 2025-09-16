'use client';

import { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Moon, Sun, Code2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Language = 'javascript' | 'python' | 'java' | 'cpp' | 'csharp' | 'go' | 'rust' | 'typescript';

export default function CodeEditor() {
  const [code, setCode] = useState<string>('// Write your code here\nconsole.log("Hello, Think Flow!");');
  const [language, setLanguage] = useState<Language>('javascript');
  const [theme, setTheme] = useState<'vs-dark' | 'light'>('vs-dark');
  const [output, setOutput] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState(false);
  const editorRef = useRef<any>(null);

  const languageOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'cpp', label: 'C++' },
    { value: 'csharp', label: 'C#' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
  ];

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleRunCode = async () => {
    setIsExecuting(true);
    setOutput('Executing code...');
    
    try {
      // In a real implementation, this would call your backend API to execute the code
      // For now, we'll simulate execution with a timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate different outputs based on language
      const mockOutputs = {
        javascript: 'Hello, Think Flow!',
        python: 'Hello, Think Flow!',
        java: 'Hello, Think Flow!',
        cpp: 'Hello, Think Flow!',
        csharp: 'Hello, Think Flow!',
        go: 'Hello, Think Flow!',
        rust: 'Hello, Think Flow!',
        typescript: 'Hello, Think Flow!',
      };
      
      setOutput(mockOutputs[language] || 'Code executed successfully!');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Failed to execute code'}`);
    } finally {
      setIsExecuting(false);
    }
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'vs-dark' ? 'light' : 'vs-dark');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      {/* Editor Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Code2 className="h-5 w-5 mr-2 text-indigo-600" />
              <span className="font-semibold">Code Editor</span>
            </div>
            <Select
              value={language}
              onValueChange={(value) => setLanguage(value as Language)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {theme === 'vs-dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              {isExecuting ? 'Running...' : 'Run Code'}
            </Button>
          </div>
        </div>
      </div>

      {/* Editor and Output */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            defaultLanguage={language}
            language={language}
            theme={theme}
            value={code}
            onChange={(value) => setCode(value || '')}
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: true },
              fontSize: 14,
              wordWrap: 'on',
              automaticLayout: true,
              scrollBeyondLastLine: false,
              fontFamily: 'Fira Code, monospace',
              fontLigatures: true,
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-full md:w-1/3 bg-gray-50 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex items-center">
            <Terminal className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm font-medium">Output</span>
          </div>
          <div className="flex-1 p-4 overflow-auto font-mono text-sm">
            {output || 'Run your code to see the output here...'}
          </div>
          <div className="p-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {language.toUpperCase()} | {theme === 'vs-dark' ? 'Dark' : 'Light'} Theme
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
