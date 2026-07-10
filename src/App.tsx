/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PromptSection } from "@/components/PromptSection";
import { Toaster } from "@/components/ui/sonner";
import { Sparkles, Languages } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 font-sans text-white selection:bg-purple-500">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">OmniPrompt</h1>
          </div>
          <div className="flex items-center text-sm font-medium text-purple-200 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <Languages className="w-4 h-4 mr-2 text-cyan-300" />
            <span className="hidden sm:inline">Type in any language. </span>
            <span className="text-white font-semibold ml-1">Get English Prompts.</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-12 sm:max-w-2xl sm:mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            The Ultimate Prompt Generator
          </h2>
          <p className="mt-4 text-lg text-slate-200">
            Describe what you need in your native language. Our AI will instantly craft highly-optimized, structured prompts for the industry's best models.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <PromptSection type="Image" />
          <PromptSection type="Video" />
          <PromptSection type="Text" />
          <PromptSection type="Website" />
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-white/10 text-center">
        <p className="text-sm text-slate-400">
          Built with React & Gemini AI
        </p>
      </footer>
    </div>
  );
}

