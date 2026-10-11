import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./auth";

export async function getSession() {
  return auth.api.getSession({ headers: await headers() });
}

/** Protected-route guard: sends guests to /signin and tells the sign-in page to show a toast. */
export async function requireSession(returnTo: string) {
  const session = await getSession();
  if (!session) redirect(`/signin?reason=protected&callbackUrl=${encodeURIComponent(returnTo)}`);
  return session;
}
