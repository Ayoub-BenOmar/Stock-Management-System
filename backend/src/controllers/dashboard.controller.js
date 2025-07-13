import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const LOW_STOCK = 10;

export const updateDashboardStats = async (req, res) => {
    try {
        const [
            totalSales,
            totalProducts,
            totalCategories,
            totalSuppliers,
            lowStockProducts,
            outOfStockProducts,
            monthlyRevenue,
            dailySales,
            topSellingProduct
        ] = await Promise.all([
            prisma.sale.aggregate({
                _sum: {
                    totalPrice: true
                }
            }),
            prisma.product.count(),
            prisma.category.count(),
            prisma.supplier.count(),
            prisma.product.count({
                where: {
                    quantity: {
                        lt: LOW_STOCK,
                        gt: 0
                    }
                }
            }),
            prisma.product.count({
                where: {
                    quantity: 0
                }
            }),
            prisma.sale.aggregate({
                where: {
                    createdAt: {
                        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                    }
                },
                _sum: {
                    totalPrice: true
                }
            }),
            prisma.sale.count({
                where: {
                    createdAt: {
                        gte: new Date(new Date().setHours(0, 0, 0, 0))
                    }
                }
            }),
            prisma.sale.groupBy({
                by: ['productId'],
                _sum: {
                    quantity: true
                },
                orderBy: {
                    _sum: {
                        quantity: 'desc'
                    }
                },
                take: 1
            })
        ]);

        const stats = await prisma.dashboardStats.upsert({
            where: { id: 1 },
            update: {
                totalSales: totalSales._sum.totalPrice || 0,
                totalProducts,
                totalCategories,
                totalSuppliers,
                lowStockProducts,
                outOfStockProducts,
                monthlyRevenue: monthlyRevenue._sum.totalPrice || 0,
                dailySales,
                topSellingProduct: topSellingProduct[0]?.productId || null,
                lastUpdated: new Date()
            },
            create: {
                id: 1,
                totalSales: totalSales._sum.totalPrice || 0,
                totalProducts,
                totalCategories,
                totalSuppliers,
                lowStockProducts,
                outOfStockProducts,
                monthlyRevenue: monthlyRevenue._sum.totalPrice || 0,
                dailySales,
                topSellingProduct: topSellingProduct[0]?.productId || null,
                lastUpdated: new Date()
            },
            include: {
                topProduct: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        });

        return res.status(200).json(stats);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getDashboardStats = async (req, res) => {
    try {
        const stats = await prisma.dashboardStats.findUnique({
            where: { id: 1 },
            include: {
                topProduct: {
                    select: {
                        id: true,
                        name: true,
                        price: true
                    }
                }
            }
        });

        if (!stats) {
            return res.status(404).json({ error: 'Dashboard statistics not found' });
        }

        return res.status(200).json(stats);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};