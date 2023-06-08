// import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextResponse } from "next/server";

import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useSelector } from "react-redux";

export default async function middleware(request) {
  const verify = request.cookies["token"];
  // let verify = user.token;
  let url = request.url;

  if (
    !verify &&
    (url.includes("/lobby") ||
      url.includes("/dashboard") ||
      url.includes("/creatProject"))
  ) {
    // return NextResponse.redirect("http://localhost:3001/signIn");
  }
}
