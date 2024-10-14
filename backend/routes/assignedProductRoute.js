const express = require("express");
const router = express.Router();
 
const {
  createAssignedProduct,
  getAllAssignedProduct,
  getSingleAssignedProduct,
  getCurrentUserAssignedProduct,
  removeAssignedProduct,
  deleteAllAssignedProduct,
  // deleteAssignedProduct,
} = require("../controllers/assignedProductController");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");
const { updateProductTag } = require("../controllers/product");

router
  .route("/")
  .post(
    [authenticateUser, authorizeRoles("superadmin", "user")],
    createAssignedProduct
  )
  .get(
    [authenticateUser, authorizeRoles("superadmin", "user")],
    getAllAssignedProduct
  );

router
  .route("/allMyProducts")
  .get(authenticateUser, getCurrentUserAssignedProduct);

router
  .route("/deleteAllAssignedProduct")
  .delete(
    [authenticateUser, authorizeRoles("superadmin", "user")],
    deleteAllAssignedProduct
  );

router.patch("/updateProducts/:id", updateProductTag);

router
  .route("/:id")
  .get(
    [authenticateUser, authorizeRoles("superadmin", "user")],
    getSingleAssignedProduct
  )
  .patch(
    [authenticateUser, authorizeRoles("superadmin", "user")],
    removeAssignedProduct
  );
// .delete(
//   [authenticateUser, authorizeRoles("superadmin", "user")],
//   deleteAssignedProduct
// );

module.exports = router;
