/**
 * Normalise any thrown error into { message, code, status }.
 * Works with axios errors, backend { success:false } payloads, and plain Errors.
 */
export function parseError(err) {
  if (!err) return { message: "Something went wrong", code: "UNKNOWN", status: 0 };

  // Backend standard error shape: { success:false, error:{ code, message } }
  const backendErr = err?.response?.data?.error || err?.data?.error;
  if (backendErr?.message) {
    return {
      message: backendErr.message,
      code: backendErr.code || "API_ERROR",
      status: err?.response?.status || err?.status || 0,
    };
  }

  // Backend message passthrough
  const backendMsg = err?.response?.data?.message || err?.data?.message;
  if (backendMsg) {
    return {
      message: backendMsg,
      code: err?.response?.data?.code || "API_ERROR",
      status: err?.response?.status || 0,
    };
  }

  if (err?.message) {
    return { message: err.message, code: err.code || "CLIENT_ERROR", status: err.status || 0 };
  }

  if (typeof err === "string") return { message: err, code: "ERROR", status: 0 };

  return { message: "Something went wrong", code: "UNKNOWN", status: 0 };
}

export function getErrorMessage(err) {
  return parseError(err).message;
}

export function isUnauthorized(err) {
  return parseError(err).status === 401;
}
