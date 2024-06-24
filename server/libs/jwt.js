import jwt from "jsonwebtoken";

const accessTokenExpiry = "15m";
const refreshTokenExpiry = "7d";

export const signJwtAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: accessTokenExpiry,
  });
};

export const signJwtRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_JWT_SECRET_KEY, {
    expiresIn: refreshTokenExpiry,
  });
};

export const verifyJwtAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};

export const verifyJwtRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_JWT_SECRET_KEY);
  } catch (error) {
    return null;
  }
};
