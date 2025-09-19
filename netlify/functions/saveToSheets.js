const { google } = require("googleapis");

exports.handler = async function (event) {
  try {
    const { video } = JSON.parse(event.body || "{}");

    // Load service account credentials from environment variable
    const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.VITE_GOOGLE_SHEET_ID;
    const sheetName = process.env.VITE_GOOGLE_SHEET_NAME || "Sheet1";

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A2:D`,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [video.title, video.channel_name, video.link, video.email || "Email Not Found"],
        ],
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};