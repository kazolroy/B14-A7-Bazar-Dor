import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "better-auth/adapters/memory";
import { MongoClient } from "mongodb";

const g = globalThis as unknown as { __mongo?: MongoClient; __memdb?: Record<string, unknown[]> };

function database() {
  const uri = process.env.MONGODB_URI;
  if (uri) {
    g.__mongo ??= new MongoClient(uri);
    return mongodbAdapter(g.__mongo.db(process.env.MONGODB_DB || "bazardor"), { client: g.__mongo });
  }
  // No database configured: in-memory store so the app still runs (accounts reset on restart).
  g.__memdb ??= { user: [], session: [], account: [], verification: [] };
  return memoryAdapter(g.__memdb);
}

const social: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  social.google = { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET };
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
  social.github = { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET };

export const auth = betterAuth({
  database: database(),
  secret: process.env.BETTER_AUTH_SECRET || "dev-only-secret-change-me-in-production-0123456789",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || undefined,
  trustedOrigins: process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`, "https://*.vercel.app"] : undefined,
  emailAndPassword: { enabled: true, autoSignIn: false, minPasswordLength: 6 },
  socialProviders: social,
});
