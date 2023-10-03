export const storeRole = (role) => {
  localStorage.setItem("role", role);
};

export const getRole = () => {
  const role = localStorage.getItem("role");

  return role;
};

export const removeRole = () => {
  localStorage.removeItem("role");
};

export const isRoleExists = () => {
  return getRole();
};
