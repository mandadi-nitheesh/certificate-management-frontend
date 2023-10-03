import { redirect } from "react-router";

export const getJwtToken = () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    return;
  }

  const duration = getDuration();

  if (duration < 0) {
    return "EXPIRED";
  }

  return token;
};

export const storeJwtToken = (item) => {
  localStorage.setItem("jwtToken", item);
};

export const RemoveToken = () => {
  localStorage.clear("jwtToken");
  redirect("/");
};

export const isTokenExists = () => {
  return getJwtToken();
};

export const getDuration = () => {
  const storedTime = localStorage.getItem("expiration");
  const expirationDate = new Date(storedTime);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
};
