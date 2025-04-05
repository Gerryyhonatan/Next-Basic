import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                fullname: {
                    label: "Fullname",
                    type: "text",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
                async authorize(credentials) {
                    const {email, password, fullname} = credentials as {
                        email: string;
                        fullname: string;
                        password: string;
                    };
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const user: any = {id: 1, email: email, fullname: fullname, password: password};
                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                }
        })
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt({token, account, user}: any) {
            if(account?.provider === "credentials") {
                token.email = user.email;
                token.fullname = user.fullname;
        }
        return token;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({session, token}: any) {
        if("email" in token) {
            session.user.email = token.email;
        }
        if("fullname" in token) {
            session.user.fullname = token.fullname;
        }
        return session;
    }
},
}

export default NextAuth(authOptions);