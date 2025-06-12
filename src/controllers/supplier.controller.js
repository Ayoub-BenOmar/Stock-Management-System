import { Prisma, PrismaClient } from "@prisma/client";
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