/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function isArrayOfStrings(_val: unknown): _val is string[] {
  return Boolean(_val) && Array.isArray(_val) && _val.some((field) => typeof field === "string");
}

/* eslint-disable no-case-declarations */
const genericMessage = "Something went wrong while trying to connect with the server";

export const handleApiError = (error: any) => {
  // @ts-ignore
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line
    console.error("[Service Error]", { error });
  }
  if (!error?.response) {
    const { data } = error || {};
    if (!data) return genericMessage;

    return (data?.error && data?.error[0]?.message) || data?.message || genericMessage;
  }

  const { response } = error || {};
  const { data } = response;

  switch (response?.status) {
    case 400:
    case 404:
    case 409:
      return extractApiErrorMessage(data);
    case 401:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        "You are not authorized to perform this action"
      );

    case 403:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        data?.data ||
        "You are forbidden from performing this action"
      );

    case 500:
      return genericMessage;
    case 504:
      return "Gateway server Timeout";
    default:
      return (
        (data?.detail && (typeof data?.detail === "string" ? data?.detail : JSON.stringify(data?.detail))) ||
        (data?.error && data?.error[0]?.message) ||
        data?.message ||
        genericMessage
      );
  }
};

export default handleApiError;

function extractApiErrorMessage(data: any): string {
  if (Array.isArray(data?.errorMessages)) {
    return data.errorMessages.join("\n");
  }
  if (Array.isArray(data?.error)) {
    return data.error.map((e: any) => e?.message || e).join("\n");
  }
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.detail === "string") return data.detail;
  if (typeof data?.displayMessage === "string") return data.displayMessage;

  return "Something went wrong";
}
