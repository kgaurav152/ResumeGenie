import React, { useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnStrikeThrough,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader, Sparkles } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/google-ai-model";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";

const PROMPT = `Given the job title "{jobTitle}",
 create 6-7 concise and personal bullet points in
  HTML stringify format that highlight my key
  skills, relevant technologies, and significant
   contributions in that role. Do not include
    the job title itself in the output. Provide
     only the bullet points inside an unordered
     list.`;

const RichTextEditor = (props: {
  jobTitle: string | null;
  initialValue: string;
  onEditorChange: (e: any) => void;
}) => {
  const { jobTitle, initialValue, onEditorChange } = props;

  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const [userContext, setUserContext] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const GenerateSummaryFromAI = async (context: string) => {
    try {
      if (!jobTitle) {
        toast({
          title: "Must provide Job Postion",
          variant: "destructive",
        });
        setIsDialogOpen(false);
        return;
      }
      setLoading(true);
      const contextPrompt = context
        ? `${PROMPT} Additional Context: ${context}`
        : PROMPT;
      const prompt = contextPrompt.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = await result.response.text();

      const responseJson = JSON.parse(responseText);
      const bulletPointsHTML = responseJson.bulletPoints;

      setValue(bulletPointsHTML);
      onEditorChange(bulletPointsHTML);
      setIsDialogOpen(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="flex items-center 
      justify-between my-2"
      >
        <Label>Work Summary</Label>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              type="button"
              className="gap-1"
              disabled={loading}
            >
              <>
                <Sparkles size="15px" className="text-purple-500" />
                Generate with AI
              </>
              {loading && <Loader size="13px" className="animate-spin" />}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Provide Additional Context</DialogTitle>
            </DialogHeader>
            <Textarea
              className="mt-5 min-h-36"
              placeholder="Enter any additional context for the AI (optional)"
              value={userContext}
              onChange={(e) => setUserContext(e.target.value)}
            />
            <Button
              type="button"
              onClick={() => GenerateSummaryFromAI(userContext)}
              disabled={loading}
            >
              {loading ? (
                <Loader size="15px" className="animate-spin" />
              ) : (
                "Generate Summary"
              )}
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          containerProps={{
            style: {
              resize: "vertical",
              lineHeight: 1.2,
              fontSize: "13.5px",
            },
          }}
          onChange={(e) => {
            setValue(e.target.value);
            onEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
