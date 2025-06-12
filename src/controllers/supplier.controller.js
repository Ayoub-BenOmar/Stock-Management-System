import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createSupplier = async (req, res) =>{
    try {
        const { name, email, phone, address } = req.body

        if (!name || !email || !phone) {
            return res.status(422).json({
                error: "Name, Email and Phone are required!"
            })
        }

        if(await prisma.supplier.findFirst({ where: { name: req.body.name }})){
            return res.status(409).json({error: `${req.body.name} is already exists`})
        }

        const newSupplier = await prisma.supplier.create({
            data: req.body
        })

        return res.status(201).json(newSupplier)
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

export const getSuppliers = async (req, res) =>{
    try {
        const suppliers = await prisma.supplier.findMany();
        return res.status(200).json(suppliers);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const getSupplier = async (req, res) => {
    try {
        const supplier = await prisma.supplier.findFirst({ where: { id: parseInt(req.params.id) }})

        if(!supplier){
            return res.status(404).json({error: 'Supplier not found'})
        }

        return res.status(200).json(supplier);
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

export const updateSupplier = async (req, res) => {
    try {
        if(!req.body.name || !req.body.email || !req.body.phone){
            return res.status(422).json({ error: 'Name, Email and Phone is required'})
        }

        const existingSupplier = await prisma.supplier.findUnique({
            where: { id: parseInt(req.params.id) }
        })

        if (!existingSupplier) {
            return res.status(404).json({ error: "Supplier not found" })
        }

        const existingName = await prisma.supplier.findFirst({
            where: {
                name: {
                equals: req.body.name,
                mode: 'insensitive'
                },
                id: { not: parseInt(req.params.id) },
            },
        });

        if (existingName) {
            return res.status(409).json({ error: "Supplier is already exists"})
        }

        const existingEmail = await prisma.supplier.findFirst({
            where: {
                email: req.body.email,
                id: { not: parseInt(req.params.id) }
            }
        })

        const existingPhone = await prisma.supplier.findFirst({
            where: {
                phone: req.body.phone,
                id: { not: parseInt(req.params.id) }
            }
        })

        if (existingEmail || existingPhone) {
            return res.status(409).json({ error: "Email or Phone is already exists"})
        }

        const updateSupplier = await prisma.supplier.update({
            where: { id: parseInt(req.params.id) },
            data: req.body
        })

        return res.status(200).json(updateSupplier);
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}