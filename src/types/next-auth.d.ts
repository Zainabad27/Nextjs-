import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id?: string;
    isverified?: boolean;
    isacceptingmessage?: boolean;
    username?: string;
  }

  interface Session {
    user: {
      _id?: string;
      isverified?: boolean;
      isacceptingmessage?: boolean;
      username?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isverified?: boolean;
    isacceptingmessage?: boolean;
    username?: string;
  }
}
