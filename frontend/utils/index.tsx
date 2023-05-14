import { useEffect } from "react";
import Router from "next/router";
import { deleteCookie } from "cookies-next";
import { setCookie, getCookie } from "cookies-next";

export const login = (token: string) => {
  setCookie("token", token);
  Router.push("/portfolios");
};

export const createObjectFromForm = (data) => {
  const object: { [key: string]: FormDataEntryValue } = {};
  data.forEach(
    (value: FormDataEntryValue, key: string) => (object[key] = value)
  );
  return object;
};

export const redirectOnError = (ctx) =>
  typeof window !== "undefined"
    ? Router.push("/login")
    : ctx.res.writeHead(302, { Location: "/login" }).end();

export const auth = (ctx) => {
  const token = getCookie("token");

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === "undefined") {
      ctx.res.writeHead(302, { Location: "/login" });
      ctx.res.end();
    } else {
      Router.push("/login");
    }
  }

  return token;
};

export const logout = () => {
  deleteCookie("token");

  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now().toString());
  Router.push("/login");
};

export const withAuthSync = (WrappedComponent) => {
  const Wrapper = (props) => {
    const syncLogout = (event) => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        Router.push("/login");
      }
    };

    useEffect(() => {
      window.addEventListener("storage", syncLogout);

      return () => {
        window.removeEventListener("storage", syncLogout);
        window.localStorage.removeItem("logout");
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async (ctx) => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
