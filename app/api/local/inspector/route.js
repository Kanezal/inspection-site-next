import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

async function handleGET(req, res) {
    const inspectors = await prisma.inspector.findMany();
    return NextResponse.json(inspectors);
}

export { handleGET as GET }