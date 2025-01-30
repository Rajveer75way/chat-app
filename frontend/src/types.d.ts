export interface User {
  _id?: string;  // Optional for new users (use 'id' instead of '_id')
  name: string;
  email: string;
  active?: boolean;  // Optional, default value can be handled in the schema
  role: "USER" | "ADMIN";
  password: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    token: string; // Access token
    refreshToken: string; // Refresh token
    user?: User; // Optional user details
  }
  
  // SVG Module Declaration
  declare module "*.svg" {
    import React = require("react");
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
  }
  