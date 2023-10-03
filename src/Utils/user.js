export const saveUser = (user) => {
  localStorage.setItem("user", user);
};

export const getUser = () => {
  return localStorage.getItem("user");
};
