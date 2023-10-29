import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";


async function handleGET(req, res) {
    const inspections = await prisma.inspection.findMany();
    return NextResponse.json(inspections);
}

export { handleGET as GET }