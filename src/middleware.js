import { NextResponse } from "next/server";
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const { data } = await supabase.auth.getSession();

  // const url = req.nextUrl.clone();
  // url.pathname = "/";
  // return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/login"],
};
