const { google } = require('googleapis');

auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const client = await auth.getClient();
const googleSheets = google.sheets({ version: 'v4', auth: client });

export default googleSheets