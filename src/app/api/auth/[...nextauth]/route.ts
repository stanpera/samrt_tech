import NextAuth, { type NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import { verifyPassword } from "@/lib/passwordHasher";
import { getUser } from "@/lib/queries";

// declare module "next-auth" {
//   interface User {
//     role?: string;
//   }

//   interface Session {
//     user: User;
//   }

//   interface JWT {
//     role?: string;
//   }
// }

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

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
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
        console.log(
          "credentialsdsad",
          credentials.contact,
          credentials?.password
        );

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
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.email = user.email;
        token.userId = user.id;
      }
      return token;
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
    // signOut: "/",
    // error: "/login",
  },
};

const handler = NextAuth(authOptions as any);
export { handler as GET, handler as POST };
