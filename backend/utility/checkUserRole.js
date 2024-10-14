const CustomError = require("../errors");

const checkUserRole = (requestedUser, resourseUser) => {
  //   console.log("inside");
  //   console.log(requestedUser, resourseUser);
  if (requestedUser.role === "superadmin") return;
  if (requestedUser.role === "user" && resourseUser === "superadmin") {
    throw new CustomError.UnauthorizedError("Not authorized for this action");
  }
  if (requestedUser.role === "user" && resourseUser === "user") {
    throw new CustomError.UnauthorizedError("Not authorized for this action");
  }
  if (requestedUser.role === "user") {
    throw new CustomError.UnauthorizedError("Not authorized for this action");
  }
  
};

module.exports = checkUserRole;
