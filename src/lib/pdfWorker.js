/**
 * Configure pdfjs-dist worker once so getDocument() works (e.g. PDF first-page thumbnails).
 * Import this from a component that uses PDF.js (e.g. PdfFirstPageThumb).
 */
import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.mjs?url';

let workerInitialized = false;

export function initPdfWorker() {
  if (workerInitialized) return;
  pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;
  workerInitialized = true;
}
