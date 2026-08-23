import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export type PdfFormat = "a4" | "a5";

export async function exportStandeeAsPng(element: HTMLElement, fileName: string): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
  });
  const link = document.createElement("a");
  link.download = `${fileName.replace(/\s+/g, "_")}_Standee.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

export async function exportStandeeAsPdf(
  element: HTMLElement,
  fileName: string,
  format: PdfFormat = "a4"
): Promise<void> {
  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
  });
  const imgData = canvas.toDataURL("image/png");

  // A4: 210 x 297 mm, A5: 148 x 210 mm
  const pdf = new jsPDF("p", "mm", format);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pdfWidth - 20; // 10mm padding on sides
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Center vertically if height allows
  const yOffset = imgHeight < pdfHeight ? (pdfHeight - imgHeight) / 2 : 10;

  pdf.addImage(imgData, "PNG", 10, yOffset, imgWidth, imgHeight);
  pdf.save(`${fileName.replace(/\s+/g, "_")}_Standee_${format.toUpperCase()}.pdf`);
}

export function triggerPrintDialog(): void {
  window.print();
}
