// types/express.d.ts
import express from "express";

declare global {
  namespace Express {
    interface User {
      id: string;
      role: string;
      // add other properties from your JWT payload as needed
    }

    interface Request {
      user?: User;
    }
  }
}
