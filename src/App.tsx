/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PromptSection } from "@/components/PromptSection";
import { Toaster } from "@/components/ui/sonner";
import { Sparkles, Languages } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-[#fafafa] font-sans text-neutral-900 selection:bg-neutral-200">
      <Toaster position="top-center" />
      
      {/* Header */}
      <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">OmniPrompt</h1>
          </div>
          <div className="flex items-center text-sm font-medium text-neutral-500 bg-neutral-100/80 px-3 py-1.5 rounded-full">
            <Languages className="w-4 h-4 mr-2 text-neutral-600" />
            <span className="hidden sm:inline">Type in any language. </span>
            <span className="text-neutral-900 font-semibold ml-1">Get English Prompts.</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center mb-10 sm:max-w-2xl sm:mx-auto">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            The Ultimate Prompt Generator
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
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
      <footer className="mt-auto py-8 border-t border-neutral-200/60 text-center">
        <p className="text-sm text-neutral-500">
          Built with React & Gemini AI
        </p>
      </footer>
    </div>
  );
}

