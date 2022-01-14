import React from "react";
import { LoginPage, ProfilePage, SignupPage } from "./containers";
import TodoPage from "./containers/TodoPage/TodoPage";

export default function routeConfiguration() {
  /* returing an array w objects of our routes */
  return [
    {
      name: "SignupPage",
      path: "/signup",
      component: (props) => <SignupPage {...props} />,
    },
    {
      name: "LoginPage",
      path: "/login",
      component: (props) => <LoginPage {...props} />,
    },
    {
      name: "ProfilePage",
      path: "/profile",
      component: (props) => <ProfilePage {...props} />,
      auth: true, //private route making it secure using auth key
    },
    {
      name: "TodoPage",
      path: "/todo",
      component: (props) => <TodoPage {...props} />,
      auth: true, //private route making it secure using auth key
    },
  ];
}
