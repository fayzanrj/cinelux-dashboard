export const handleInternalError = (res) => {
  return res.status(500).json({ message: "Internal Server Error" });
};

export const handleIncompleteError = (res) => {
  return res.status(400).json({ message: "Incomplete data" });
};

export const handleNotFoundError = (res, message) => {
  return res.status(404).json({ message });
};

export const handleBadRequest = (res, message) => {
  return res.status(400).json({ message });
};

export const handleUnAuthorizedError = (res) => {
  return res.status(401).json({ message: "Unauthroized" });
};
