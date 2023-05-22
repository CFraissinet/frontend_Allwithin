// import { NextResponse } from "next/dist/server/web/spec-extension/response";
import { NextResponse } from "next/server";

import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useSelector } from "react-redux";

export default async function middleware(request) {
  // const user = useSelector((state) => state.user.value);
  // const user = await localStorage.getItem("persist:allwithin");
  // const user = request.cookies.get("token")?.value;
  const verify = request.cookies["token"];
  console.log("user", verify);
  // let verify = user.token;
  console.log("verify", verify);
  let url = request.url;
  console.log(url);

  if (
    (!verify &&
      (url.includes("/lobby") ||
        url.includes("/dashboard") ||
        url.includes("/creatProject"))) ||
    url.includes("/join")
  ) {
    return NextResponse.redirect("http://localhost:3001/signIn");
  }
}
