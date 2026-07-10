import React, { useState } from "react";
import { Copy, Sparkles, Loader2, Image as ImageIcon, Video, FileText, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { generateOptimizedPrompt } from "@/lib/gemini";
import { cn } from "@/lib/utils";

import { ScrollArea } from "@/components/ui/scroll-area";

type PromptType = "Image" | "Video" | "Text" | "Website";

const promptIcons = {
  Image: ImageIcon,
  Video: Video,
  Text: FileText,
  Website: Globe,
};

const promptDescriptions = {
  Image: "Specify characters, style, and mood for an image generation model.",
  Video: "Describe camera motion, subjects, and framing for a video model.",
  Text: "Define task, format, and persona for an LLM (like ChatGPT).",
  Website: "Detail layout, features, and vibe for web UI generators.",
};

interface PromptSectionProps {
  type: PromptType;
}

export function PromptSection({ type }: PromptSectionProps) {
  const [input, setInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Icon = promptIcons[type];

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter a description first.");
      return;
    }

    setIsLoading(true);
    setGeneratedPrompt("");
    try {
      const result = await generateOptimizedPrompt(type, input);
      setGeneratedPrompt(result);
      toast.success(`${type} prompt generated successfully!`);
    } catch (error) {
      toast.error("Failed to generate prompt. See console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <Card className="flex flex-col border-neutral-200/60 shadow-sm bg-white overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-neutral-100 rounded-lg text-neutral-700">
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold tracking-tight text-neutral-900">{type} Prompt Generator</CardTitle>
            <CardDescription className="text-sm text-neutral-500 mt-1">{promptDescriptions[type]}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col p-5 gap-4 flex-grow">
        <div className="flex flex-col space-y-2">
          <Textarea 
            placeholder={
              type === "Image" ? "Ej: Un gato volando en el espacio con un traje espacial..." : 
              type === "Video" ? "Ex: Caméra survolant une forêt majestueuse au lever du soleil..." :
              type === "Text" ? "Ex: Schreibe einen kreativen Blogbeitrag über Künstliche Intelligenz..." :
              "Ex: Un sito web per una pizzeria moderna con colori caldi..."
            }
            className="min-h-[100px] resize-none focus-visible:ring-1 focus-visible:ring-neutral-300 border-neutral-200"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex justify-end">
             <Button 
              onClick={handleGenerate} 
              disabled={isLoading || !input.trim()}
              className="w-full sm:w-auto bg-neutral-900 hover:bg-neutral-800 text-white font-medium shadow-sm transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate {type} Prompt
                </>
              )}
            </Button>
          </div>
        </div>

        {generatedPrompt && (
          <div className="flex flex-col flex-grow mt-2 animate-in fade-in slide-in-from-bottom-2 duration-300 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Optimized Prompt (English)</span>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100">
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy
              </Button>
            </div>
            <ScrollArea className="bg-neutral-50 border border-neutral-200/60 rounded-md p-4 text-sm text-neutral-800 leading-relaxed font-mono h-[200px]">
              {generatedPrompt}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
