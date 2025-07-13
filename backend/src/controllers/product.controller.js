import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, categoryId, supplierId } = req.body;
        
        // Convert string values to numbers
        const numericPrice = parseFloat(price);
        const numericQuantity = parseInt(quantity);
        const numericCategoryId = parseInt(categoryId);
        const numericSupplierId = parseInt(supplierId);
        
        // Handle uploaded image file
        let pic = null;
        if (req.file) {
            pic = `/uploads/${req.file.filename}`;
        }

        if (!name || !price || !categoryId || !supplierId) {
            return res.status(422).json({
                error: 'Name, price, categoryId and supplierId are required'
            });
        }

        if (numericPrice <= 0) {
            return res.status(422).json({
                error: 'Price must be greater than 0'
            });
        }

        if (numericQuantity < 0) {
            return res.status(422).json({
                error: 'Quantity cannot be negative'
            });
        }

        const category = await prisma.category.findUnique({
            where: { id: numericCategoryId }
        });

        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }

        const supplier = await prisma.supplier.findUnique({
            where: { id: numericSupplierId }
        });

        if (!supplier) {
            return res.status(404).json({
                error: 'Supplier not found'
            });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                description,
                price: numericPrice,
                quantity: numericQuantity,
                categoryId: numericCategoryId,
                supplierId: numericSupplierId,
                pic,
            },

            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                supplier: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },

            omit: {
                categoryId: true,
                supplierId: true
            }
        });

        return res.status(201).json(newProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      omit: {
        categoryId: true,
        supplierId: true,
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      omit: {
        categoryId: true,
        supplierId: true,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, categoryId, active, supplierId } = req.body;
        const productId = parseInt(req.params.id);
        
        // Convert string values to numbers (only if they exist)
        const numericPrice = price !== undefined ? parseFloat(price) : undefined;
        const numericQuantity = quantity !== undefined ? parseInt(quantity) : undefined;
        const numericCategoryId = categoryId !== undefined ? parseInt(categoryId) : undefined;
        const numericSupplierId = supplierId !== undefined ? parseInt(supplierId) : undefined;
        
        // Handle uploaded image file
        let pic = undefined;
        if (req.file) {
            pic = `/uploads/${req.file.filename}`;
        }

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (numericCategoryId) {
            const category = await prisma.category.findUnique({
                where: { id: numericCategoryId }
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
        }

        if (numericSupplierId) {
            const supplier = await prisma.supplier.findUnique({
                where: { id: numericSupplierId }
            });

            if (!supplier) {
                return res.status(404).json({ error: 'Supplier not found' });
            }
        }

        if (numericPrice !== undefined && numericPrice <= 0) {
            return res.status(422).json({
                error: 'Price must be greater than 0'
            });
        }

        if (numericQuantity !== undefined && numericQuantity < 0) {
            return res.status(422).json({
                error: 'Quantity cannot be negative'
            });
        }

        // Build update data object with only defined values
        const updateData = {};
        
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (numericPrice !== undefined) updateData.price = numericPrice;
        if (numericQuantity !== undefined) updateData.quantity = numericQuantity;
        if (numericCategoryId !== undefined) updateData.categoryId = numericCategoryId;
        if (numericSupplierId !== undefined) updateData.supplierId = numericSupplierId;
        if (active !== undefined) updateData.active = (active === "true" || active === true);
        if (pic !== undefined) updateData.pic = pic;

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: updateData,
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }, 
                supplier: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },

            omit: {
                categoryId: true,
                supplierId: true
            }
        });

        return res.status(200).json(updatedProduct);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id);

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
