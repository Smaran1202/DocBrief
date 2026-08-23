const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";
const EXTRACT_ERROR_MESSAGE =
  "We couldn't extract text from this document. Please try another file.";
const SUMMARY_ERROR_MESSAGE =
  "We couldn't generate a summary right now. Please try again.";
const NETWORK_ERROR_MESSAGE =
  "The backend is unavailable. Please make sure the server is running and try again.";

function getErrorMessage(errorResponse, fallbackMessage) {
  if (typeof errorResponse?.detail === "string") {
    return errorResponse.detail;
  }

  return fallbackMessage;
}

async function parseErrorResponse(response, fallbackMessage) {
  let errorResponse = null;

  try {
    errorResponse = await response.json();
  } catch {
    errorResponse = null;
  }

  return getErrorMessage(errorResponse, fallbackMessage);
}

export async function extractDocumentText(file) {
  const formData = new FormData();
  formData.append("document", file);

  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/documents/extract`, {
      method: "POST",
      body: formData,
    });
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response, EXTRACT_ERROR_MESSAGE));
  }

  return response.json();
}

export async function summarizeDocumentText(text, length) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}/api/documents/summarize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, length }),
    });
  } catch {
    throw new Error(NETWORK_ERROR_MESSAGE);
  }

  if (!response.ok) {
    throw new Error(await parseErrorResponse(response, SUMMARY_ERROR_MESSAGE));
  }

  return response.json();
}
