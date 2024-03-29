import { request, response, Router } from "express";
import { ProductController } from "./controllers/ProductController";
import auth from "./lib/auth";
import { helpers } from "./lib/helpers";


const productRouter = Router();

const productController = new ProductController();

productRouter.get("/", (request, response) => {
  response.render("./login/signin");
});

productRouter.get("/home", auth.isLoggedIn, (request, response) => {
  response.render("home")
  console.log(request.isAuthenticated())
  console.log(request.user)
})

productRouter.get("/products", auth.isLoggedIn, productController.handleListProducts);

productRouter.get("/addProduct", auth.isLoggedIn, productController.handleAddProduct);
productRouter.post("/add-product", productController.handleCreateProduct);
productRouter.get("/searchProduct", auth.isLoggedIn, productController.handleSearchProduct);
productRouter.get("/editProduct", auth.isLoggedIn, productController.handleGetProductData)
productRouter.post("/edit-product", productController.handleUpdateProduct);
productRouter.post("/delete-product", productController.handleDeleteProduct);

export { productRouter };

