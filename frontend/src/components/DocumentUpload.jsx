import { useRef, useState } from "react";

import {
  extractDocumentText,
  summarizeDocumentText,
} from "../services/documentApi";

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"];
const ACCEPTED_MIME_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
];
const SUMMARY_LENGTHS = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium" },
  { value: "long", label: "Long" },
];

function getFileExtension(fileName) {
  const lastDotIndex = fileName.lastIndexOf(".");
  return lastDotIndex >= 0 ? fileName.slice(lastDotIndex).toLowerCase() : "";
}

function formatFileSize(sizeInBytes) {
  if (sizeInBytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(sizeInBytes / 1024))} KB`;
  }

  return `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatFileType(file) {
  const extension = getFileExtension(file.name);

  if (extension === ".pdf") {
    return "PDF";
  }

  if (extension === ".png") {
    return "PNG";
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return "JPG";
  }

  return file.type || "Document";
}

function validateFile(file) {
  const extension = getFileExtension(file.name);
  const hasAcceptedExtension = ACCEPTED_EXTENSIONS.includes(extension);
  const hasAcceptedMimeType = ACCEPTED_MIME_TYPES.includes(file.type);

  if (!hasAcceptedExtension || !hasAcceptedMimeType) {
    return "Unsupported file type. Please upload a PDF or image.";
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "File is too large. Maximum size is 10 MB.";
  }

  return "";
}

function DocumentUpload() {
  const inputRef = useRef(null);
  const dragDepthRef = useRef(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [summaryLength, setSummaryLength] = useState("short");
  const [summary, setSummary] = useState("");
  const [summaryError, setSummaryError] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);
  const isProcessing = isExtracting || isSummarizing;

  function selectFile(file, nextNotice = "") {
    const validationError = validateFile(file);

    if (validationError) {
      setSelectedFile(null);
      setError(validationError);
      setNotice(nextNotice);
      setExtractedText("");
      setSummary("");
      setSummaryError("");
      return;
    }

    setSelectedFile(file);
    setError("");
    setNotice(nextNotice);
    setExtractedText("");
    setSummary("");
    setSummaryError("");
  }

  function handleFiles(files) {
    if (isProcessing) {
      return;
    }

    const [file] = Array.from(files);

    if (!file) {
      return;
    }

    selectFile(
      file,
      files.length > 1
        ? "Only one document can be selected. The first file was used."
        : "",
    );
  }

  function handleInputChange(event) {
    handleFiles(event.target.files);
    event.target.value = "";
  }

  function handleDragEnter(event) {
    event.preventDefault();
    dragDepthRef.current += 1;
    setIsDragging(true);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragLeave(event) {
    event.preventDefault();
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);

    if (dragDepthRef.current === 0) {
      setIsDragging(false);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    dragDepthRef.current = 0;
    setIsDragging(false);

    if (isProcessing) {
      return;
    }

    handleFiles(event.dataTransfer.files);
  }

  function handleRemoveFile() {
    setSelectedFile(null);
    setError("");
    setNotice("");
    setExtractedText("");
    setSummary("");
    setSummaryError("");
    setIsExtracting(false);
    setIsSummarizing(false);
  }

  function openFilePicker() {
    if (isProcessing) {
      return;
    }

    inputRef.current?.click();
  }

  async function handleExtractText() {
    if (!selectedFile || isProcessing) {
      return;
    }

    setIsExtracting(true);
    setError("");
    setNotice("");
    setExtractedText("");
    setSummary("");
    setSummaryError("");

    try {
      const result = await extractDocumentText(selectedFile);
      setExtractedText(result.text);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "We couldn't extract text from this document. Please try another file.",
      );
    } finally {
      setIsExtracting(false);
    }
  }

  async function handleGenerateSummary() {
    const textToSummarize = extractedText.trim();

    if (!textToSummarize || isProcessing) {
      setSummaryError("No readable text is available to summarize.");
      return;
    }

    setIsSummarizing(true);
    setSummaryError("");
    setSummary("");

    try {
      const result = await summarizeDocumentText(textToSummarize, summaryLength);
      setSummary(result.summary);
    } catch (requestError) {
      setSummaryError(
        requestError instanceof Error
          ? requestError.message
          : "We couldn't generate a summary right now. Please try again.",
      );
    } finally {
      setIsSummarizing(false);
    }
  }

  const uploadStateClasses = isDragging
    ? "border-teal-500 bg-teal-50 ring-2 ring-teal-100"
    : "border-slate-300 bg-white hover:border-teal-500 hover:bg-slate-50";

  return (
    <section
      aria-label="Document upload"
      className={`rounded-lg border border-dashed p-6 text-center shadow-sm transition ${uploadStateClasses}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg"
        className="sr-only"
        onChange={handleInputChange}
        disabled={isProcessing}
      />

      {selectedFile ? (
        <div className="mx-auto max-w-xl text-left">
          <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
            Selected document
          </p>
          <div className="mt-4 rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="break-words text-base font-semibold text-slate-900">
              {selectedFile.name}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {formatFileType(selectedFile)} •{" "}
              {formatFileSize(selectedFile.size)}
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                onClick={openFilePicker}
                disabled={isProcessing}
              >
                Replace file
              </button>
              <button
                type="button"
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                onClick={handleRemoveFile}
                disabled={isProcessing}
              >
                Remove
              </button>
              <button
                type="button"
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
                onClick={handleExtractText}
                disabled={isProcessing}
              >
                {isExtracting ? "Extracting text..." : "Extract text"}
              </button>
            </div>
          </div>
          {isExtracting ? (
            <p
              role="status"
              className="mt-3 rounded-md bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800"
            >
              Extracting text...
            </p>
          ) : null}
        </div>
      ) : (
        <div className="mx-auto flex max-w-xl flex-col items-center">
          <p className="text-base font-semibold text-slate-900">Upload a document</p>
          <p className="mt-3 text-sm text-slate-600">
            {isDragging
              ? "Drop your file to select it"
              : "Drag & drop your file here"}
          </p>
          <p className="mt-2 text-sm text-slate-500">or</p>
          <button
            type="button"
            className="mt-3 rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            onClick={openFilePicker}
          >
            Browse files
          </button>
          <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">
            PDF, PNG, JPG, JPEG • Max 10 MB
          </p>
        </div>
      )}

      {notice ? (
        <p className="mx-auto mt-4 max-w-xl rounded-md bg-sky-50 px-3 py-2 text-sm text-sky-800">
          {notice}
        </p>
      ) : null}

      {error ? (
        <p
          role="alert"
          className="mx-auto mt-4 max-w-xl rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}

      {extractedText ? (
        <div className="mx-auto mt-6 max-w-xl text-left">
          <h2 className="text-base font-semibold text-slate-900">
            Extracted Text
          </h2>
          <div className="mt-3 max-h-80 overflow-auto rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
            <pre className="whitespace-pre-wrap font-sans">{extractedText}</pre>
          </div>

          <div className="mt-6 rounded-md border border-slate-200 bg-white p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <label
                  htmlFor="summary-length"
                  className="text-sm font-medium text-slate-800"
                >
                  Summary length
                </label>
                <select
                  id="summary-length"
                  className="mt-2 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:w-40"
                  value={summaryLength}
                  onChange={(event) => {
                    setSummaryLength(event.target.value);
                    setSummary("");
                    setSummaryError("");
                  }}
                  disabled={isSummarizing}
                >
                  {SUMMARY_LENGTHS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-400"
                onClick={handleGenerateSummary}
                disabled={isSummarizing}
              >
                {isSummarizing ? "Generating summary..." : "Generate Summary"}
              </button>
            </div>

            {isSummarizing ? (
              <p
                role="status"
                className="mt-3 rounded-md bg-sky-50 px-3 py-2 text-sm font-medium text-sky-800"
              >
                Generating summary...
              </p>
            ) : null}

            {summaryError ? (
              <p
                role="alert"
                className="mt-3 rounded-md bg-red-50 px-3 py-2 text-sm font-medium text-red-700"
              >
                {summaryError}
              </p>
            ) : null}

            {summary ? (
              <div className="mt-5">
                <h2 className="text-base font-semibold text-slate-900">
                  Summary
                </h2>
                <div className="mt-3 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                  <pre className="whitespace-pre-wrap font-sans">{summary}</pre>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default DocumentUpload;
