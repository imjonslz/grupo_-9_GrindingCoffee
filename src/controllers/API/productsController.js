const db = require ("../../../database/models");
const sequelize = require("sequelize");
const Op = sequelize.Op;
const apiProductsController = {

    allProducts: async (req,res) => {
        try{

           let findProduct = await db.Products.findAll({raw:true, include: [{ association: "categories" }, { association: "sizes" }]});
           let Categories = await db.Categories.findAll({raw:true})

           const countCategoryOne = findProduct.filter(product => product.category_id === 1).length;
           const countCategoryTwo = findProduct.filter(product => product.category_id === 2).length;
            res.json({
                total:findProduct.length,
                totalCategories: Categories.length,
                totalGrano: countCategoryOne,
                totalMolido:countCategoryTwo,
                CategoriesData: Categories,
                data:findProduct,
                status:500

            })
        }catch(error){
          res.send(error)
        }
       
    },

    productDetail: async (req,res) => {
        try{

            let ProductFound = await db.Products.findByPk(req.params.id, {raw:true, include: [{ association: "categories" }, { association: "sizes" }]})
            console.log("hola soy el producto numero "+ProductFound);

            return res.json({
                data:{
                    ProductFound,
                    imageURL:`/public/img/products/${ProductFound.productImage}`
                },
                status:400
            })



        }catch(error){
          res.send(error)
        }
      
    }
}

module.exports = apiProductsController;