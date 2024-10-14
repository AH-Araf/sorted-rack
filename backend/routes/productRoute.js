const express = require("express");
const router = express.Router();


const {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
} = require("../controllers/product");

const {
  authenticateUser,
  authorizeRoles,
} = require("../middleware/authentication");

router
  .route("/")
  .get(authenticateUser, getAllProduct)
  .post(
    [authenticateUser, authorizeRoles("superadmin", "user", "admin" )],
    createProduct
  ); 

router
  .route("/deleteAllProduct")
  .delete(
    [authenticateUser, authorizeRoles("superadmin", "user", "admin")],
    deleteAllProduct
  );

router
  .route("/:id")
  .get(
    [authenticateUser, authorizeRoles("superadmin", "user", "admin")],
    getSingleProduct
  )
  .patch(
    [authenticateUser, authorizeRoles("superadmin", "user", "admin")],
    updateProduct
  )
  .delete(
    [authenticateUser, authorizeRoles("superadmin", "user", "admin")],
    deleteProduct
  );

module.exports = router;


// const express = require("express");
// const router = express.Router();

// const {
//   createProduct,
//   getAllProduct,
//   getSingleProduct,
//   updateProduct,
//   deleteProduct,
//   deleteAllProduct,
// } = require("../controllers/product");

// router
//   .route("/")
//   .get(getAllProduct)
//   .post(createProduct);

// router
//   .route("/deleteAllProduct")
//   .delete(deleteAllProduct);

// router
//   .route("/:id")
//   .get(getSingleProduct)
//   .patch(updateProduct)
//   .delete(deleteProduct);

// module.exports = router;
