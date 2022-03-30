declare module Express {
  interface Request {
    clientIp: string;
  }
}
