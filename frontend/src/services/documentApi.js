const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function getErrorMessage(errorResponse) {
  if (typeof errorResponse?.detail === "string") {
    return errorResponse.detail;
  }

  return "We couldn't extract text from this document. Please try another file.";
}

export async function extractDocumentText(file) {
  const formData = new FormData();
  formData.append("document", file);

  const response = await fetch(`${API_BASE_URL}/api/documents/extract`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorResponse = null;

    try {
      errorResponse = await response.json();
    } catch {
      errorResponse = null;
    }

    throw new Error(getErrorMessage(errorResponse));
  }

  return response.json();
}
