import type { DefaultSession, DefaultUser } from "next-auth";

declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: DefaultSession & {
            id: string;
            role: string;
        }
    }
}