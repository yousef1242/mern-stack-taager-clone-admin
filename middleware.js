import { NextResponse } from "next/server";

export function middleware(req) {
  const verify = req.cookies.get("setLoggedAdmin");
  let url = req.url;

  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (!verify && url.includes("/admin")) {
    return NextResponse.redirect("http://localhost:3000/");
  }
  if (verify && url === "http://localhost:3000/") {
    return NextResponse.redirect("http://localhost:3000/admin/products");
  }
}