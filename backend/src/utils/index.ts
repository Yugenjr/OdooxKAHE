import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: any,
  message: string = "Success",
  statusCode: number = 200
) => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const sendError = (
  res: Response,
  message: string = "Error",
  statusCode: number = 400,
  error?: any
) => {
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { error }),
  });
};

export const getValidationError = (field: string, message?: string) => {
  return `${field} is required${message ? ": " + message : ""}`;
};
