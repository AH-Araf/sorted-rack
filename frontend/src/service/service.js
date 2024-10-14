
const login = (userId, email, role, username, branch) => {
  localStorage.setItem("userDetails", JSON.stringify({ userId, email, role, username, branch }));
  if (role === "superadmin") {
    window.location.href = "localhost:3000/stock";
  }
};

const getUserDetails = () => {
  return localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails")) || {};
};

const isLoggedIn = () => {
  return localStorage.getItem("userDetails") || false;
}
const logout = () => {
  localStorage.removeItem("userDetails");
};

export { login, getUserDetails, isLoggedIn, logout }; 
