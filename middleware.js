import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("setLoggedAdmin");
  let url = req.url;

  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("https://mern-stack-taager-clone-admin.vercel.app");
  }
  if (verify && url === "http://localhost:3000/") {
    return NextResponse.redirect("https://mern-stack-taager-clone-admin.vercel.app/");
  }
}