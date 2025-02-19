import React, { useState } from 'react';
import { Send, Bot, User, Sparkles, Dna, Search, Users } from 'lucide-react';

const GenomicsInterface = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [sequence, setSequence] = useState('');
  const [biomarkers, setBiomarkers] = useState({
    geneSymbol: '',
    tissueType: '',
    diseaseType: ''
  });

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Here you would integrate with your AI agent endpoint
    window.location.href = "https://msbi155.app.n8n.cloud/webhook-test/62894eab-bd66-4dae-992b-e3b02fa90a3f";
  };

  const handleSequenceSubmit = async (e) => {
    e.preventDefault();
    // Handle sequence submission to the same endpoint
    window.location.href = "https://msbi155.app.n8n.cloud/webhook-test/62894eab-bd66-4dae-992b-e3b02fa90a3f";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              AX.ai Genomics
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Sequence Submission Section */}
        <section className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Dna className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Genomic Sequence Submission</h2>
          </div>
          <form onSubmit={handleSequenceSubmit} className="space-y-4">
            <textarea
              value={sequence}
              onChange={(e) => setSequence(e.target.value)}
              placeholder="Enter your genomic sequence here..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Submit Sequence
            </button>
          </form>
        </section>

        {/* Biomarker Identification Section */}
        <section className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Search className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Biomarker Identification</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Gene Symbol"
              value={biomarkers.geneSymbol}
              onChange={(e) => setBiomarkers({...biomarkers, geneSymbol: e.target.value})}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Tissue Type"
              value={biomarkers.tissueType}
              onChange={(e) => setBiomarkers({...biomarkers, tissueType: e.target.value})}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Disease Type"
              value={biomarkers.diseaseType}
              onChange={(e) => setBiomarkers({...biomarkers, diseaseType: e.target.value})}
              className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSequenceSubmit}
            className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Identify Biomarkers
          </button>
        </section>

        {/* Chat Interface */}
        <section className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bot className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">AI Assistant</h2>
          </div>
          <form onSubmit={handleChatSubmit} className="flex space-x-4">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about genomics, biomarkers, or sequence analysis..."
              className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center space-x-2 transition-colors"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </section>

        {/* Team Section */}
        <section className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-blue-400" />
            <h2 className="text-xl font-semibold">Meet Our Team</h2>
          </div>
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-400">ABHISHEK S R</h3>
            <p className="text-gray-300 mt-2">M.Sc. Bioinformatics Student | Python & R Developer | NGS & Precision Medicine Enthusiast</p>
            <p className="text-gray-400 mt-4">
              Welcome to my digital portfolio, where Bioinformatics meets Genomics. As a Master of Science candidate in Bioinformatics, 
              I channel my passion for innovative projects and top-tier certifications into mastering advanced tools that transform 
              complex data into actionable insights. Explore my work and discover how I bridge technology and biology to drive 
              scientific progress.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default GenomicsInterface;