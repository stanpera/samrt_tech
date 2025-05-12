import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/passwordHasher";
import { getUser } from "@/lib/queries";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string;
      email?: string;
      image?: string;
    };
  }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "smarttech",
      name: "Smart Tech",
      credentials: {
        contact: {
          label: "Email or Mobile Phone",
          type: "text",
          placeholder: "Email or Mobile Phone",
        },
        password: { label: "Password", type: "Password" },
      },
      async authorize(credentials) {
        if (!credentials?.contact || !credentials?.password) return null;

        const contact = credentials.contact.trim();

        let user = null;

        if (
          contact.startsWith("+") ||
          /^\d+$/.test(contact) ||
          contact.includes("@")
        ) {
          user = await getUser(contact, [
            "id",
            "firstName",
            "email",
            "passwordHash",
          ]);
        } else {
          return null;
        }

        if (typeof user?.passwordHash !== "string") {
          return null;
        }

        const passwordCorrect = await verifyPassword(
          credentials.password,
          user.passwordHash
        );

        if (passwordCorrect) {
          return {
            id: String(user?.id),
            email: user?.email,
            firstName: user.firstName,
          };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.userId = user.id;
      }
      return token;
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : "/";
    },
    session: async ({ session, token }) => {
      if (token.userId && session.user) {
        session.user.id = String(token.userId);
      }
      if (token.email && session.user) {
        session.user.email = token.email;
      }
      session.expires = new Date(
        Date.now() + 1000 * 60 * 60 * 24
      ).toISOString();

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
