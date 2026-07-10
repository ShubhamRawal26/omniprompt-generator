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

const promptColors = {
  Image: {
    gradient: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
    icon: "bg-purple-500/20 text-purple-400",
    button: "bg-purple-600 hover:bg-purple-700",
    border: "border-purple-500/30"
  },
  Video: {
    gradient: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    icon: "bg-blue-500/20 text-blue-400",
    button: "bg-blue-600 hover:bg-blue-700",
    border: "border-blue-500/30"
  },
  Text: {
    gradient: "from-emerald-500 to-green-500",
    bg: "bg-emerald-500/10",
    icon: "bg-emerald-500/20 text-emerald-400",
    button: "bg-emerald-600 hover:bg-emerald-700",
    border: "border-emerald-500/30"
  },
  Website: {
    gradient: "from-orange-500 to-red-500",
    bg: "bg-orange-500/10",
    icon: "bg-orange-500/20 text-orange-400",
    button: "bg-orange-600 hover:bg-orange-700",
    border: "border-orange-500/30"
  },
};

interface PromptSectionProps {
  type: PromptType;
}

export function PromptSection({ type }: PromptSectionProps) {
  const [input, setInput] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const Icon = promptIcons[type];
  const colors = promptColors[type];

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
    <Card className={cn("flex flex-col border border-white/10 shadow-lg bg-gradient-to-br from-white/10 to-white/5 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-white/20 backdrop-blur-sm", colors.border)}>
      <CardHeader className={cn("bg-gradient-to-r", colors.gradient, "bg-opacity-10 border-b border-white/10 pb-4 relative overflow-hidden")}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="flex items-center space-x-3 relative z-10">
          <div className={cn("p-3 rounded-lg", colors.icon)}>
            <Icon className="w-5 h-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-bold tracking-tight text-white">{type} Prompt Generator</CardTitle>
            <CardDescription className="text-sm text-slate-300 mt-1">{promptDescriptions[type]}</CardDescription>
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
            className="min-h-[100px] resize-none bg-white/5 border-white/20 text-white placeholder-slate-400 focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:border-transparent rounded-lg"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="flex justify-end">
             <Button 
              onClick={handleGenerate} 
              disabled={isLoading || !input.trim()}
              className={cn("w-full sm:w-auto text-white font-semibold shadow-lg transition-all", colors.button)}
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
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Optimized Prompt (English)</span>
              <Button variant="ghost" size="sm" onClick={handleCopy} className="h-8 px-2 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                <Copy className="w-3.5 h-3.5 mr-1.5" />
                Copy
              </Button>
            </div>
            <ScrollArea className="bg-white/5 border border-white/20 rounded-lg p-4 text-sm text-slate-100 leading-relaxed font-mono h-[200px]">
              {generatedPrompt}
            </ScrollArea>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
