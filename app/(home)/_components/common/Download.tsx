import React, { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { DownloadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { formatFileName } from "@/lib/helper";
import { StatusType } from "@/types/resume.type";

const Download = (props: {
  title: string;
  isLoading: boolean;
  status?: StatusType;
}) => {
  const { title, status, isLoading } = props;
  const [loading, setLoading] = useState(false);

  const handleDownload = useCallback(async () => {
    const resumeElement = document.getElementById("resume-preview-id");
    if (!resumeElement) {
      toast({
        title: "Error",
        description: "Could not download",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);

    const fileName = formatFileName(title);
    try {
      const canvas = await html2canvas(resumeElement, { scale: 2 });
      const imgWidth = 210; //A4 size in mm
      const pageHeight = 295; // A4 height in mm
      const marginTop = 15; // Top margin (only for subsequent pages)
      const marginBottom = 20; // Bottom margin
      const availablePageHeight = pageHeight - marginBottom; // First page has no top margin

      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let pageIndex = 0;

      const pdf = new jsPDF();

      let pageCanvas = document.createElement("canvas");
      let pageCtx = pageCanvas.getContext("2d");

      pageCanvas.width = canvas.width;
      pageCanvas.height = availablePageHeight * (canvas.width / imgWidth); // Scale height accordingly

      while (heightLeft > 0) {
        // Clear the temporary canvas
        pageCtx?.clearRect(0, 0, pageCanvas.width, pageCanvas.height);

        // Draw the required section of the original canvas onto the new canvas
        pageCtx?.drawImage(
          canvas,
          0,
          pageIndex * pageCanvas.height, // Start from the next section
          canvas.width,
          pageCanvas.height,
          0,
          0,
          pageCanvas.width,
          pageCanvas.height
        );

        // Convert cropped section to image
        const imgData = pageCanvas.toDataURL("image/png");

        // First page has no top margin
        let positionY = pageIndex === 0 ? 0 : marginTop;

        // Add the image to the PDF
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          0,
          positionY,
          imgWidth,
          availablePageHeight
        );

        // Update variables for the next page
        heightLeft -= availablePageHeight;
        pageIndex++;
      }
      pdf.save(fileName);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Error generating PDF:",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [title]);

  return (
    <Button
      disabled={isLoading || loading || status === "archived" ? true : false}
      variant="secondary"
      className="bg-white border gap-1
                   dark:bg-gray-800 !p-2
                    min-w-9 lg:min-w-auto lg:p-4"
      onClick={handleDownload}
    >
      <div className="flex items-center gap-1">
        <DownloadCloud size="17px" />
        <span className="hidden lg:flex">
          {loading ? "Generating PDF" : "Download Resume"}
        </span>
      </div>
    </Button>
  );
};

export default Download;
