"use client";
import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User, MessageSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const suggestions = [
  "What are Tahir's core technical skills?",
  "Tell me about the Uddogi ERP project.",
  "How can I contact or hire Tahir?",
  "Does Tahir have experience with AI & MCP?"
];

const parseMarkdownToReact = (text) => {
  if (!text) return null;

  const lines = text.split("\n");

  return lines.map((line, lineIdx) => {
    const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
    const isNumbered = /^\d+\.\s/.test(line.trim());
    
    let cleanLine = line;
    let prefix = null;
    
    if (isBullet) {
      cleanLine = line.trim().substring(2);
      prefix = <span className="mr-1.5 text-cyan-500">•</span>;
    } else if (isNumbered) {
      const match = line.trim().match(/^(\d+\.)\s(.*)/);
      if (match) {
        prefix = <span className="mr-1.5 font-semibold text-cyan-500">{match[1]}</span>;
        cleanLine = match[2];
      }
    }

    const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\)|\`.*?\`|https?:\/\/[^\s]+)/g;
    const splitParts = cleanLine.split(regex);

    const renderedLine = splitParts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={partIdx} className="font-bold text-gray-900 dark:text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith("[") && part.includes("](") && part.endsWith(")")) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a
              key={partIdx}
              href={match[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
            >
              {match[1]}
            </a>
          );
        }
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={partIdx} className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-gray-800 text-xs font-mono text-cyan-600 dark:text-cyan-400">
            {part.slice(1, -1)}
          </code>
        );
      }
      if (/^https?:\/\//.test(part)) {
        return (
          <a
            key={partIdx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            {part}
          </a>
        );
      }
      return part;
    });

    if (isBullet || isNumbered) {
      return (
        <div key={lineIdx} className="flex items-start ml-2 my-1 leading-relaxed">
          {prefix}
          <div className="flex-1">{renderedLine}</div>
        </div>
      );
    }

    return (
      <div key={lineIdx} className="min-h-[1.25rem] leading-relaxed">
        {renderedLine}
      </div>
    );
  });
};

export default function AIChatWidget({ isFullPage = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am Tahir's AI Portfolio Assistant. Ask me anything about his technical expertise, projects, education, or career history!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    if (!textToSend) setInput("");
    setIsLoading(true);

    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] })
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `Error: ${data.error || "Failed to communicate with AI model."}` }
        ]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I encountered a network issue. Please check your connection and try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Full-page rendering layout
  if (isFullPage) {
    return (
      <div className="w-full max-w-4xl mx-auto backdrop-blur-md bg-white/10 dark:bg-[#0b1327]/40 border border-gray-200 dark:border-[#192544] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[650px]">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 dark:border-[#192544] bg-gradient-to-r from-cyan-500/20 to-purple-600/20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-white shadow-inner animate-pulse">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 dark:text-white">AI Portfolio Assistant</h3>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-medium">Powered by Gemini AI</p>
            </div>
          </div>
        </div>

        {/* Message Panel */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start space-x-2.5 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
            >
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                  msg.role === "user" ? "bg-purple-600" : "bg-cyan-600"
                }`}
              >
                {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div
                className={`p-3.5 rounded-2xl max-w-[80%] shadow-sm ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-tr-none whitespace-pre-line"
                    : "bg-gray-100 dark:bg-[#16223f] text-gray-800 dark:text-gray-100 border border-gray-200/50 dark:border-[#192544]/50 rounded-tl-none leading-relaxed space-y-1"
                }`}
              >
                {msg.role === "user" ? msg.content : parseMarkdownToReact(msg.content)}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start space-x-2.5">
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-cyan-600 text-white flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="p-3.5 bg-gray-100 dark:bg-[#16223f] border border-gray-200/50 dark:border-[#192544]/50 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                <Loader2 size={16} className="animate-spin text-cyan-500" />
                <span className="text-sm text-gray-500 dark:text-gray-400">AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length === 1 && (
          <div className="px-4 py-2 border-t border-gray-100 dark:border-[#192544]/30">
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 font-medium">Suggestions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((sug, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(sug)}
                  className="text-xs bg-gray-100 dark:bg-[#152345] hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1e2d54] rounded-full px-3 py-1.5 transition-all text-left"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-gray-200 dark:border-[#192544] flex items-center space-x-2 bg-gray-50/50 dark:bg-[#070c18]/20">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder="Ask about skills, projects, work experience..."
            className="flex-1 bg-white dark:bg-[#111c35] border border-gray-300 dark:border-[#1d2d55] text-gray-900 dark:text-white rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={isLoading || !input.trim()}
            className="h-10 w-10 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    );
  }

  // Floating Widget rendering layout
  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[100] flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.85 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="mb-4 w-[calc(100vw-32px)] sm:w-[400px] h-[500px] backdrop-blur-lg bg-white/95 dark:bg-[#0c142c]/95 border border-gray-200 dark:border-[#1b2c55] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Widget Header */}
              <div className="p-4 border-b border-gray-200 dark:border-[#1b2c55] bg-gradient-to-r from-cyan-500/10 to-purple-600/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600 flex items-center justify-center text-white shadow-inner animate-pulse">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-800 dark:text-white">Tahir's AI Assistant</h3>
                    <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">Gemini Active</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-[#1a2d5a] text-gray-500 dark:text-gray-400"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Message Panel */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-2 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : "flex-row"}`}
                  >
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-white ${
                        msg.role === "user" ? "bg-purple-600" : "bg-cyan-600"
                      }`}
                    >
                      {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl max-w-[80%] text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-purple-600 text-white rounded-tr-none whitespace-pre-line"
                          : "bg-gray-100 dark:bg-[#16223f] text-gray-800 dark:text-gray-100 border border-gray-200/50 dark:border-[#192544]/50 rounded-tl-none leading-relaxed space-y-1"
                      }`}
                    >
                      {msg.role === "user" ? msg.content : parseMarkdownToReact(msg.content)}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start space-x-2">
                    <div className="h-7 w-7 rounded-full flex items-center justify-center bg-cyan-600 text-white flex-shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="p-3 bg-gray-100 dark:bg-[#16223f] border border-gray-200/50 dark:border-[#192544]/50 rounded-2xl rounded-tl-none shadow-sm flex items-center space-x-2">
                      <Loader2 size={14} className="animate-spin text-cyan-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Assistant is writing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestion Chips */}
              {messages.length === 1 && (
                <div className="px-4 py-2 border-t border-gray-100 dark:border-[#192544]/30">
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mb-1.5 font-medium">Suggestions:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((sug, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(sug)}
                        className="text-[10px] bg-gray-100 dark:bg-[#152345] hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-[#1e2d54] rounded-full px-2.5 py-1 transition-all text-left"
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Bar */}
              <div className="p-3 border-t border-gray-200 dark:border-[#1b2c55] flex items-center space-x-2 bg-gray-50/50 dark:bg-[#070c18]/20">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Ask about Tahir..."
                  className="flex-1 bg-white dark:bg-[#111c35] border border-gray-300 dark:border-[#1d2d55] text-gray-900 dark:text-white rounded-full px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={isLoading || !input.trim()}
                  className="h-8 w-8 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 disabled:opacity-50 text-white rounded-full flex items-center justify-center shadow-lg transition-all"
                >
                  <Send size={14} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white flex items-center justify-center shadow-2xl relative group"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          ) : (
            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
          {!isOpen && (
            <span className="absolute -top-1.5 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-cyan-500 border border-white dark:border-[#111827] items-center justify-center text-[8px] font-bold text-white">
                !
              </span>
            </span>
          )}
        </motion.button>
      </div>
    </>
  );
}
