// import googleSheets from "@/utils/google-sheets";
import { google } from 'googleapis'
import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

async function handlePOST(req, res) {
    let { inspectorDiscordId, description, legion, startDate, endDate } = await req.json();

    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();

    const newInspection = await prisma.inspection.create({
        data: {
            inspectorDiscordId,
            description,
            legion,
            startDate,
            endDate
        }
    });

    const auth = await google.auth.getClient({
        credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
    const sheet = google.sheets({ version: 'v4', auth })

    const spreadsheetId = "1wHWZIBVIimKCrytSCRAza_tS1Vgw92I9r4H4MSwvVx4";
    const range = `${legion}!B2:H`;

    const response = await sheet.spreadsheets.values.get({ spreadsheetId, range });

    const rows = response.data.values;

    if (rows.length) {
        await Promise.all(rows.map(async (row) => {
            try {
                await prisma.inspectingSoldier.create({
                    data: {
                        inspectionId: newInspection.id,
                        idn: row[0],
                        callSign: row[1],
                        rank: row[2],
                        position: row[3],
                        dateOfEnlistment: row[4],
                        dateOfPromotion: row[5],
                        discordId: row[6]
                    }
                });
            } catch (e) {
                console.log("[LOG CREATE INSPECTION]", e)
            }
        }));
    }

    return NextResponse.json(newInspection);
}

export {handlePOST as POST}