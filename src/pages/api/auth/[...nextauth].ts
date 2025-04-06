import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";
import { signIn } from "@/lib/firebase/service";
import { compare } from "bcrypt";

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
                password: {
                    label: "Password",
                    type: "password",
                },
            },
                async authorize(credentials) {
                    const {email, password} = credentials as {
                        email: string;
                        password: string;
                    };
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const user: any = await signIn({email});
                    if (user) {
                        const passwordConfirm = await compare(password, user.password);
                        if(passwordConfirm) {
                           return user 
                        } 
                        return null;
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
                token.role = user.role;
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
        if("role" in token) {
            session.user.role = token.role;
        }
        return session;
    }
},
    pages: {
        signIn: "/auth/login",
    }
}

export default NextAuth(authOptions);