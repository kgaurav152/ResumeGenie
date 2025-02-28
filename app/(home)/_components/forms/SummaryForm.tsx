"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeContext } from "@/context/resume-info-provider";
import useUpdateDocument from "@/features/document/use-update-document";
import { toast } from "@/hooks/use-toast";
import { AIChatSession } from "@/lib/google-ai-model";
import { generateThumbnail } from "@/lib/helper";
import { ResumeDataType } from "@/types/resume.type";
import { Loader, Sparkles } from "lucide-react";
import React, { useCallback, useState } from "react";

interface Summary {
  experienceLevel: string;
  summary: string;
}

interface GeneratesSummaryType {
  [experienceLevel: string]: {
    summary: string[];
  };
}

const prompt = `Job Title: {jobTitle}. Based on the job title, please generate concise 
and complete summaries for my resume in JSON format, incorporating the following experience
levels: fresher, mid, and experienced. Each summary should be limited to 3 to 4 lines,
reflecting a personal tone and showcasing specific relevant programming languages, technologies,
frameworks, and methodologies without any placeholders or gaps. Ensure that the summaries are
engaging and tailored to highlight unique strengths, aspirations, and contributions to collaborative
projects, demonstrating a clear understanding of the role and industry standards.`;

const SummaryForm = (props: { handleNext: () => void }) => {
  const { handleNext } = props;
  const { resumeInfo, onUpdate } = useResumeContext();

  const { mutateAsync, isPending } = useUpdateDocument();

  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummary, setAiGeneratedSummary] =
    useState<GeneratesSummaryType | null>(null);
  const [userContext, setUserContext] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (e: { target: { value: string } }) => {
    const { value } = e.target;
    const resumeDataInfo = resumeInfo as ResumeDataType;
    const updatedInfo = {
      ...resumeDataInfo,
      summary: value,
    };
    onUpdate(updatedInfo);
  };

  const handleSubmit = useCallback(
    async (e: { preventDefault: () => void }) => {
      e.preventDefault();
      if (!resumeInfo) return;
      const thumbnail = await generateThumbnail();
      const currentNo = resumeInfo?.currentPosition
        ? resumeInfo?.currentPosition + 1
        : 1;

      await mutateAsync(
        {
          currentPosition: currentNo,
          thumbnail: thumbnail,
          summary: resumeInfo?.summary,
        },
        {
          onSuccess: () => {
            toast({
              title: "Success",
              description: "Summary updated successfully",
            });
            handleNext();
          },
          onError() {
            toast({
              title: "Error",
              description: "Failed to update summary",
              variant: "destructive",
            });
          },
        }
      );
    },
    [resumeInfo]
  );

  const GenerateSummaryFromAI = async (context: string) => {
    try {
      const jobTitle = resumeInfo?.personalInfo?.jobTitle;
      if (!jobTitle) return;
      setLoading(true);

      const contextPrompt = context
        ? `${prompt} Additional Context: ${context}`
        : prompt;

      const PROMPT = contextPrompt.replace("{jobTitle}", jobTitle);
      const result = await AIChatSession.sendMessage(PROMPT);
      const responseText = await result.response.text();
      const parsedResponse = JSON.parse(responseText);
      const formattedSummaries = parsedResponse.summaries.reduce(
        (acc: any, item: any) => {
          acc[item.experienceLevel] = { summary: [item.summary] };
          return acc;
        },
        {} as GeneratesSummaryType
      );
      setAiGeneratedSummary(formattedSummaries);
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        title: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = useCallback(
    (summary: string) => {
      if (!resumeInfo) return;
      const resumeDataInfo = resumeInfo as ResumeDataType;
      const updatedInfo = {
        ...resumeDataInfo,
        summary: summary,
      };
      onUpdate(updatedInfo);
      setAiGeneratedSummary(null);
    },
    [onUpdate, resumeInfo]
  );

  return (
    <div>
      <div className="w-full">
        <h2 className="font-bold text-lg">Summary</h2>
        <p className="text-sm">Add summary for your resume</p>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex items-end justify-between">
            <Label>Add Summary</Label>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className="gap-1"
                  disabled={loading || isPending}
                >
                  <Sparkles size="15px" className="text-purple-500" />
                  Generate with AI
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
            {/* <Button
              variant="outline"
              type="button"
              className="gap-1"
              disabled={loading || isPending}
              onClick={() => GenerateSummaryFromAI()}
            >
              <Sparkles size="15px" className="text-purple-500" />
              Generate with AI
            </Button> */}
          </div>
          <Textarea
            className="mt-5 min-h-36"
            required
            value={resumeInfo?.summary || ""}
            onChange={handleChange}
          />

          {aiGeneratedSummary && Object.keys(aiGeneratedSummary).length > 0 && (
            <div>
              <h5 className="font-semibold text-[15px] my-4">Suggestions</h5>
              {Object.entries(aiGeneratedSummary).map(
                ([experienceType, { summary }], index) => (
                  <Card
                    role="button"
                    key={index}
                    className="my-4 bg-primary/5 shadow-none border-primary/30"
                    onClick={() => handleSelect(summary?.join(" "))}
                  >
                    <CardHeader className="py-2">
                      <CardTitle className="font-semibold text-md">
                        {experienceType.charAt(0).toUpperCase() +
                          experienceType.slice(1)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm">
                      {summary?.map((text, idx) => (
                        <p key={idx}>{text}</p>
                      ))}
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          )}

          <Button
            className="mt-4"
            type="submit"
            disabled={
              isPending || loading || resumeInfo?.status === "archived"
                ? true
                : false
            }
          >
            {isPending && <Loader size="15px" className="animate-spin" />}
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SummaryForm;
