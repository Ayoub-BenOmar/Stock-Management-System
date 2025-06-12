import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, categoryId, supplierId } = req.body;

        if (!name || !price || !categoryId || supplierId) {
            return res.status(422).json({
                error: 'Name, price, categoryId and supplierId are required'
            });
        }

        if (price <= 0) {
            return res.status(422).json({
                error: 'Price must be greater than 0'
            });
        }

        if (quantity < 0) {
            return res.status(422).json({
                error: 'Quantity cannot be negative'
            });
        }

        const category = await prisma.category.findUnique({
            where: { id: categoryId }
        });

        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }

        const supplier = await prisma.supplier.findUnique({
            where: { id: supplierId }
        });

        if (!supplier) {
            return res.status(404).json({
                error: 'Supplier not found'
            });
        }

        const newProduct = await prisma.product.create({
            data: req.body,

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
                        name: true
                    }
                }
            },

            omit: {
                categoryId: true
            }
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
                        name: true
                    }
                }
            },

            omit: {
                categoryId: true
            }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, categoryId, active } = req.body;
        const productId = parseInt(req.params.id);

        const existingProduct = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!existingProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: categoryId }
            });

            if (!category) {
                return res.status(404).json({ error: 'Category not found' });
            }
        }

        if (price !== undefined && price <= 0) {
            return res.status(422).json({
                error: 'Price must be greater than 0'
            });
        }

        if (quantity !== undefined && quantity < 0) {
            return res.status(422).json({
                error: 'Quantity cannot be negative'
            });
        }

        const updatedProduct = await prisma.product.update({
            where: { id: productId },
            data: {
                name,
                description,
                price,
                quantity,
                categoryId,
                active
            },
            include: {
                category: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            },

            omit: {
                categoryId: true
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
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        await prisma.product.delete({
            where: { id: productId }
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
