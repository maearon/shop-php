import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"

// Trong thực tế, bạn sẽ kết nối với database để xác thực người dùng
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Đây chỉ là mô phỏng, trong thực tế bạn sẽ kiểm tra thông tin đăng nhập từ database
        if (credentials?.email && credentials.email.includes("adidas")) {
          return {
            id: "1",
            name: "Người dùng Adidas",
            email: credentials.email,
          }
        }
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "dummy-client-secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "dummy-client-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "dummy-client-secret",
    }),
  ],
  pages: {
    signIn: "/account/login",
    signOut: "/",
    error: "/account/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
