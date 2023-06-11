import React from "react";
// import Router from "next/router";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { ValidationErrors, ISkills } from "../types";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import { GetServerSidePropsContext } from "next";

export const createObjectFromForm = (
  data: FormData
): { [key: string]: any } => {
  const object: { [key: string]: any } = {};
  data.forEach(
    (value: FormDataEntryValue, key: string) => (object[key] = value as string)
  );
  return object;
};

export const createErrors = (
  errors: { message: string; field: string }[]
): ValidationErrors => {
  const obj: {
    [key: string]: any;
  } = {};
  errors.forEach(({ message, field }: { message: string; field: string }) => {
    obj[field] = message;
  });
  return obj;
};

export const generateDropDownFields = (
  arr: { value: string; label: string }[]
) => {
  return arr.map(({ value, label }) => {
    return (
      <MenuItem key={value} value={value}>
        {label}
      </MenuItem>
    );
  });
};

export const createSkillsList = (skills: ISkills[]) => {
  return _.chain(skills).groupBy("type").value();
};

export const redirectOnError = (context: GetServerSidePropsContext) => {}
  // typeof window !== "undefined"
  //   ? Router.push("/login")
  //   : context.res.writeHead(302, { Location: "/login" }).end();




// authorization

export const auth = (context: GetServerSidePropsContext) => {
  // const token = getCookie("token");

  // // If there's no token, it means the user is not logged in.
  // if (!token) {
  //   if (typeof window === "undefined") {
  //     context.res.writeHead(302, { Location: "/login" });
  //     context.res.end();
  //   } else {
  //     Router.push("/login");
  //   }
  // }
  // return token;
};

export const login = (token: string) => {
  // setCookie("token", token);
  // Router.push("/portfolios");
};

export const logout = () => {
  deleteCookie("token");
  // to support logging out from all windows
  window.localStorage.setItem("logout", Date.now().toString());
  // Router.push("/login");
};

export const withAuthSync = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "logout") {
        console.log("logged out from storage!");
        // Router.push("/login");
      }
    };

    // useEffect(() => {
    //   window.addEventListener("storage", syncLogout);

    //   return () => {
    //     window.removeEventListener("storage", syncLogout);
    //     window.localStorage.removeItem("logout");
    //   };
    // }, []);
    return <WrappedComponent {...props} />;
  };
  return Wrapper;
};
