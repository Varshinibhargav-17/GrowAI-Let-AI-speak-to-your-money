// ChatbotPage.tsx - Enhanced
"use client";

import { useState } from "react";

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = data.reply || "No response.";
      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: "bot", text: "Error connecting to GrowAI." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/50 flex flex-col items-center py-12 px-4 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>

      <div className="w-full max-w-4xl relative z-10">
        {/* Header Badge */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-50 to-green-100 px-5 py-2 text-sm font-semibold text-green-800 ring-2 ring-green-200 shadow-sm mb-4">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            AI ASSISTANT
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-green-700 via-green-600 to-green-800 bg-clip-text text-transparent">
            GrowAI Assistant
          </h1>
          <p className="text-gray-600 mt-2">Your intelligent financial companion</p>
        </div>

        {/* Chat Container */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border-2 border-green-200 flex flex-col overflow-hidden animate-slide-up">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">💬 Chat with GrowAI</h2>
              <p className="text-green-100 text-sm">Ask me anything about your finances</p>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 h-[500px] bg-gradient-to-b from-gray-50 to-white">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-700 mb-2">Start a conversation</h3>
                <p className="text-gray-500 max-w-md">
                  Ask me about budgeting, investments, tax planning, or any financial questions you have!
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button 
                    onClick={() => setInput("How can I save more money?")}
                    className="text-left px-4 py-3 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all text-sm"
                  >
                    💰 How can I save more money?
                  </button>
                  <button 
                    onClick={() => setInput("What are my top expenses?")}
                    className="text-left px-4 py-3 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all text-sm"
                  >
                    📊 What are my top expenses?
                  </button>
                  <button 
                    onClick={() => setInput("Should I invest in SIPs?")}
                    className="text-left px-4 py-3 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all text-sm"
                  >
                    📈 Should I invest in SIPs?
                  </button>
                  <button 
                    onClick={() => setInput("Help me plan my taxes")}
                    className="text-left px-4 py-3 bg-white border-2 border-green-200 rounded-xl hover:border-green-400 hover:shadow-md transition-all text-sm"
                  >
                    🧾 Help me plan my taxes
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`px-5 py-3 rounded-2xl max-w-md shadow-md ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-green-500 to-green-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none border-2 border-green-100"
                  }`}
                >
                  {msg.sender === "bot" && (
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                        </svg>
                      </div>
                      <span className="text-xs font-semibold text-green-700">GrowAI</span>
                    </div>
                  )}
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-green-100 px-5 py-3 rounded-2xl rounded-bl-none shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                    <span className="text-sm text-gray-500">GrowAI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t-2 border-green-100">
            <div className="flex gap-3">
              <input
                className="flex-1 border-2 border-gray-300 rounded-xl px-5 py-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none transition-all"
                placeholder="Ask about your financial goals..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-green-600/30 hover:shadow-xl hover:shadow-green-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Send</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}