 
const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;


///////////////////


module.exports = { session: process.env.SESSION_ID || 'Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibU1EWU9ybm4rdWduc3hoRCszZE5jU2RDY3JDbDVPVWhFMlZRSjA5ZERYdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ3RVMnV1eVpSVm8rbWErZE83T2Qxb3VWNWpFUTNaWHhpTlFMVGplaWUxaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTkZ3TTE2NCsvSVpsWFlvbks5N2JISnNEc0lqak9aRDhMNytrMTZnK0VJPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4Lzl1OTMyUm14S3BpR0pBOGc0azlVOW1QbEU5T1VuMVdzREJyK0RISlZRPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjROUjNsUlAvVE9xSzFOaGFMZ25xaVhCbnJ1bVY5bTIwQmx6QTlMbzVySEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImFYRXhJZmI2SUVqYTVCdWdmQnpET3FnVWJtUHhFUTR5Tm9KcmV6QStDZ289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaU1CaEYzaEJuQmNwSTRnUEM3OG12Q0s2QXZuNXIvOHg4M0kvUnZLWHJscz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ1dMMFhVSVZoMnlCQVNmWnhoTDNHQlBnNWkzQnEwMk0yQUdyaURETXNIUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inpnd2k2V2ZZeXdOT0tJYVJVblJlNFFPZlhZZ084dkRTQ2M4Yzd4dUJISC9pUmRXZ1RoTTNEdG9iSjVoWWpZVDVJd3RiaUUrbGJRdk1TZlFndnBzMmpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMwLCJhZHZTZWNyZXRLZXkiOiJRczAyUm1uc2VkZDRJQ2x0T3gwNktDb1NVdkZ1YmpHcWJJbkozeTVTQjhRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNDgxNTEyMTkwMjdAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzc5MDNCNTJGMTZDODYxMkNCQjc4REE5RURFODk4NkEifSwibWVzc2FnZVRpbWVzdGFtcCI6MTcyNzcyMjQyMH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjM0ODE1MTIxOTAyN0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwM0I3NEE0OUVFRkI4MEFGMDIyQjI4ODdBQTM2MDlEMyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI3NzIyNDIyfV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKbVdoZzRIQVMtU0piOVRsa0FCNnlBIiwicGhvbmVJZCI6ImM1ZjZhMTFmLWFmZDgtNDNmZS05OWYwLTc1M2I3YmZkMzAyOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJic05pUEg1UTNUWE5pcEZzUkRtYW80NG9JY1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUVlIN1liZkMwMlZHaFhibTlXMVBsT3ZCN1BjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjU3RzNOV1hIIiwibWUiOnsiaWQiOiIyMzQ4MTUxMjE5MDI3OjI4QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuOBgsWYVsWBL03DlUggSE9OU1BFTkNFUiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3lYeC9ZSEVLSG42N2NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiTVdpYnYrNHN1WlJHOVhNa2RaYlIzSCtRSCszNlFEWUhOOXVlblU1SmwyND0iLCJhY2NvdW50U2lnbmF0dXJlIjoidDNlYi91TnNrMThPZGVyUkJxSlBqR3o5TGkrYWtnelQ5T3F5Tm44b2xPWlFwWUg2ZExtK2g1R3dSZHl6SHBHakVpajN4S25oalNlWklFUkF0RkRNRHc9PSIsImRldmljZVNpZ25hdHVyZSI6IlV0RCtHaDlDNDdnK3FqeVhTaFVuVHJkSVNWOTNYaG0vYW45UmJUTDZZbTR5cTdTYlJxUmRHZllHaVVzczNGTDE3Sk9mUEF4MTkwTVlUdnZPRjlMUGhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM0ODE1MTIxOTAyNzoyOEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJURm9tNy91TExtVVJ2VnpKSFdXMGR4L2tCL3Qra0EyQnpmYm5wMU9TWmR1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI3NzIyNDE0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUphViJ9',

////////////////////////////////



    PREFIXE: process.env.PREFIX || ".",



///////////////////////////
    A_REACT : process.env.AUTO_REACTION || 'on',
    CHATBOT: process.env.CHAT_BOT || "off",
    OWNER_NAME: process.env.OWNER_NAME || "TALKDROVE",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "923072380380",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BYTE-MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://raw.githubusercontent.com/HyHamza/HyHamza/main/Images/BYTE-MD-LITE.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Update ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
