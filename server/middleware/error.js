export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  if (err?.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      details: Object.values(err.errors).map((error) => error.message)
    });
  }
  if (err?.code === 11000) {
    const fields = Object.keys(err.keyPattern || {});
    return res.status(409).json({ message: `${fields.join(" and ")} already exists` });
  }
  res.status(err.status || 500).json({ message: err.message || "Internal server error" });
}
