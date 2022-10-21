import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { ProductService } from "../services/ProductService"

class ProductController{
    async handleCreateProduct(request: Request, response: Response) {
        const { nombre, marca, precio, id_category } = request.body;
    
        const createProductService = new ProductService();
    
        try {
          await createProductService.create({
            nombre,
            marca,
            precio,
            id_category
          }).then(() => {
            request.flash("succes", "producto creado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al crear la categoria", err.toString());
          response.redirect("/products");
        }
    
    }

    async handleAddProduct(request: Request, response:Response) {
      const categorias = await categoryService.list();
      return response.render("products/addproduct", { categorias })
    }

    async handleDeleteProduct(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new ProductService();
    
        try {
          await deleteProductService.delete(id).then(() => {
            request.flash("succes", "Producto eliminado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          response.render("products/message", {
            message: `Error al eliminar producto: ${err.message}`
          });
        }
    }
    async handleGetProductData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getProductDataService = new ProductService();
  
      const product = await getProductDataService.getData(id);
      const categoria = await categoryService.list()
  
      return response.render("products/editproduct", {
        product: product,
        categoria: categoria
      });
    }
    async handleListProducts(request: Request, response: Response) {
      const listProductsService = new ProductService();
  
      const products = await listProductsService.list();
  
      return response.render("products/index", {
        products: products,
      });
    }
    async handleSearchProduct(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchProductService = new ProductService();
  
      try {
        const products = await searchProductService.search(search);
        response.render("products/searchproduct", {
          products: products,
          search: search
        });
      } catch (err) {
        response.render("products/message", {
          message: `Error al modificar producto: ${err.message}`
        });
      }
    }
    async handleUpdateProduct(request: Request, response: Response) {
      const { id, nombre, marca, precio, id_category } = request.body;
  
      const updateProductService = new ProductService();
  
      try {
        await updateProductService.update({ id, nombre, marca, precio, id_category }).then(() => {
          request.flash("succes", "Producto modificado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          response.render("products/message", {
            message: `Error al modificar producto: ${err.message}`
          });
        }
  
    }  
}
export {ProductController};
