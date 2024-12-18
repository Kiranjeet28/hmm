import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import getUserInfo from "@/core/server/user/getUserInfo";
import createUserIfNot from "@/core/server/user/createUser";
import { $Enums } from "@prisma/client";

declare module "next-auth" {
    interface Session {
        Student: {
            Id: string;
            Name: string;
            Email: string;
            Image: string;
            role: $Enums.Role;
        };
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: $Enums.Role;
    }
}

const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.Student = {
                    Id: token.sub as string,
                    Name: token.name as string,
                    Email: token.email as string,
                    Image: token.picture as string,
                    role: token.role as $Enums.Role,
                };
            }
            return session;
        },
        async jwt({ token, trigger }) {
            if (trigger === "signIn") {
                const userInfo = await getUserInfo({ Email: token.email! });
                if (userInfo) {
                    token.sub = userInfo.id;
                    token.role = userInfo.role;
                }
            }
            return token;
        },
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                if (!user.name || !user.email) return false;
                const dbUser = await createUserIfNot({
                    Email: user.email,
                    Name: user.name,
                    Image: user.image,
                });
                return !!dbUser;
            }
            return false;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24 * 7,
    },
    secret: process.env.NEXT_PUBLIC_SECRET as string,
    pages: {
        signIn: "/",
        error: "/",
        newUser: "/",
    },
};

// Export the handler as the default export
export default NextAuth(authOptions);