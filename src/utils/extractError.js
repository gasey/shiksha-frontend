const extractError = (err) => {
  // Network / CORS / server down
  if (!err.response) {
    return new Error("Network error. Please try again.");
  }

  const data = err.response.data;

  // DRF ValidationError → { field: [msg] }
  if (typeof data === "object") {
    const messages = [];

    for (const key in data) {
      if (Array.isArray(data[key])) {
        messages.push(data[key][0]);
      } else if (typeof data[key] === "string") {
        messages.push(data[key]);
      }
    }

    if (messages.length) {
      return new Error(messages.join(" "));
    }
  }

  // DRF default → ["message"]
  if (Array.isArray(data)) {
    return data[0];
  }

  // Fallback
  return new Error("Something went wrong.");
};

export default extractError;
