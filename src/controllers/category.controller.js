import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const createCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).json({ error: 'Name is required' })
        }

        if (await prisma.category.findUnique({ where: { name: req.body.name } })) {
            return res.status(409).json({ error: `${req.body.name} category already exists` })
        }

        const newCategory = await prisma.category.create({
            data: {
                name: req.body.name
            }
        })

        return res.status(201).json(newCategory)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        if (!req.body.name) {
            return res.status(422).json({ error: 'Name is required' });
        }

        const existingCategory = await prisma.category.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!existingCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const nameExists = await prisma.category.findFirst({
            where: {
                name: req.body.name,
                id: { not: parseInt(req.params.id) }
            }
        });

        if (nameExists) {
            return res.status(409).json({ error: `${req.body.name} category already exists` });
        }

        const updatedCategory = await prisma.category.update({
            where: { id: parseInt(req.params.id) },
            data: { name: req.body.name }
        });

        return res.status(200).json(updatedCategory);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }

        await prisma.category.delete({
            where: { id: parseInt(req.params.id) }
        });

        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
