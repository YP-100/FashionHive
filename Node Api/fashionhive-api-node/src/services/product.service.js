const Category = require("../models/category.model");
const Product = require("../models/product.model")


async function createProduct(reqData) {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1
        });
        await topLevel.save();
    }
                  
    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id
    });
    
    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2
        });
        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id
    });
    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3
        });

        await thirdLevel.save();
    }
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPersent: reqData.discountedPersent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        size: reqData.size,
        quantity: reqData.quantity,
        category: thirdLevel._id
    });

    return await product.save();
}

async function deleteProduct(productId) {
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);

    return "Product deleted successfully";
}

async function updateProduct(productId, reqData) {
    const updatedProduct = await Product.findByIdAndUpdate(productId, reqData);

    return updatedProduct;
}

async function findProductById(id) {
    const product = await Product.findById(id).populate("category").exec();
    if (!product) {
        throw new Error("Product not found");
    }
    return product;
}

async function getAllProducts(reqQuery) {
    let { category, title, color, sizes, minPrice, maxPrice, minDiscount, sort, stock, pageNumber, pageSize } = reqQuery;

    pageSize = pageSize || 10;

    let query = Product.find().populate("category");

    // Add title filter if provided
    if (title) {
        query = query.where("title").regex(new RegExp(title, "i"));
    }

    // Handle category filtering
    if (category) {
        // Find all categories with matching name (case-insensitive)
        const categories = await Category.find({ 
            name: { $regex: new RegExp(`^${category}$`, "i") }
        });
        
        if (categories.length > 0) {
            // Get array of category IDs
            const categoryIds = categories.map(cat => cat._id);
            // Filter products that belong to any of these categories
            query = query.where("category").in(categoryIds);
        } else {
            return { content: [], currentPage: 1, totalPages: 0 };
        }
    }

    // Rest of your filters (color, sizes, price, etc.)
    if (color) {
        const colorSet = new Set(color.split(",").map(color => color.trim().toLowerCase()));
        const colorRegex = colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
        query = query.where("color").regex(colorRegex);
    }

    if (sizes) {
        const sizesSet = new Set(sizes.split(','));
        query = query.where('sizes.name').in([...sizesSet]);
    }

    if (minPrice && maxPrice) {
        query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
    }

    if (minDiscount) {
        query = query.where('discountedPersent').gte(minDiscount);
    }

    if (stock) {
        if (stock == 'instock') {
            query = query.where('quantity').gt(0);
        } else if (stock == 'outofstock') {
            query = query.where('quantity').lte(0);
        }
    }

    if (sort) {
        let sortOption = {};
        if (sort === "price_high") {
            sortOption = { discountedPrice: -1 };
        } else if (sort === "price_low") {
            sortOption = { discountedPrice: 1 };
        }
        query = query.sort(sortOption);
    }

    const totalProducts = await Product.countDocuments(query);
    const skip = (pageNumber - 1) * pageSize;
    query = query.skip(skip).limit(pageSize);

    const products = await query.exec();
    const totalpages = Math.ceil(totalProducts / pageSize);

    return { content: products, currentPage: pageNumber, totalPages: totalpages };
}



//admin to give multiple product

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct,
}