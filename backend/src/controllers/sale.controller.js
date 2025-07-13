import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSale = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(422).json({
                error: 'Product ID and quantity are required'
            });
        }

        if (quantity <= 0) {
            return res.status(422).json({
                error: 'Quantity must be greater than 0'
            });
        }

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) {
            return res.status(404).json({
                error: 'Product not found'
            });
        }

        if (product.quantity < quantity) {
            return res.status(422).json({
                error: 'Not enough stock available'
            });
        }

        const totalPrice = product.price * quantity;

        const [sale] = await prisma.$transaction([
            prisma.sale.create({
                data: {
                    productId,
                    quantity,
                    totalPrice
                },
                include: {
                    product: {
                        select: {
                            id: true,
                            name: true,
                            price: true
                        }
                    }
                }
            }),
            prisma.product.update({
                where: { id: productId },
                data: {
                    quantity: product.quantity - quantity
                }
            })
        ]);

        return res.status(201).json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getSales = async (req, res) => {
    try {
        const sales = await prisma.sale.findMany({
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getSale = async (req, res) => {
    try {
        const sale = await prisma.sale.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        });

        if (!sale) {
            return res.status(404).json({ error: 'Sale not found' });
        }

        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getSalesByProduct = async (req, res) => {
    try {
        const productId = parseInt(req.params.productId);
        
        const sales = await prisma.sale.findMany({
            where: { productId },
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json(sales);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};