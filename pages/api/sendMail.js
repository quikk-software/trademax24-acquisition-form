const nodemailer = require("nodemailer");
require("dotenv").config();

export default async (req, res) => {
  const dataObject = req.body.obj;
  const mailInfo = await sendViaNodemailerAndReturnInfo(dataObject);
  res.json(mailInfo.messageId);
};

async function sendViaNodemailerAndReturnInfo(container) {
  if (!container.dataSecurity) return;
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PW,
    },
  });

  const text =
    `${container.name} ${container.modelname}\n` +
    `Bildschirmgröße: ${container.size}\n` +
    `Displaytyp: ${container.displayType}\n` +
    `Prozessor: ${container.processor}\n` +
    `Grafikkarte: ${container.graphics}\n` +
    `Arbeitsspeicher (in GB): ${container.ram}\n` +
    `Festplattenspeicher (in GB): ${container.drive}\n` +
    `Festplattentyp: ${container.driveType}\n` +
    `Gerät funktioniert?: ${container.deviceOperating ? "Ja" : "Nein"}\n` +
    `Display funktioniert?: ${container.displayOperating ? "Ja" : "Nein"}\n` +
    `Batterie funktioniert?: ${container.batteryOperating ? "Ja" : "Nein"}\n` +
    `MagSafe dabei?: ${container.magsafeAvaible ? "Ja" : "Nein"}\n\n` +
    `Zubehör:\n
            OVP: ${container.equipment.ovp ? "Ja" : "Nein"}\n
            Maus: ${container.equipment.mouse ? "Ja" : "Nein"}\n
            Tastatur: ${container.equipment.keyboard ? "Ja" : "Nein"}\n
            Trackpad: ${container.equipment.trackpad ? "Ja" : "Nein"}\n
            Netzteil: ${container.equipment.adapter ? "Ja" : "Nein"}\n
            Kabel: ${container.equipment.cable ? "Ja" : "Nein"}\n` +
    `Anmerkung: ${container.message}\n\n` +
    `Vorname: ${container.surname}\n` +
    `Nachname: ${container.lastname}\n` +
    `E-Mail: ${container.email}\n` +
    `Telefon: ${container.telefon}`;

  const html = `
    <style>
    * {
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
    .email-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .email-wrapper table {
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .email-wrapper table td {
        border: 1px solid rgba(0, 0, 0, 0.2);
        padding: 1em;
    }
    h4 {
        padding: 1.5em 0 0 0;
    }
    </style>
    <div class="email-wrapper">
    <h1>Anfrage über das Ankaufformular</h1>
    <h3>${container.name} ${container.modelname}</h3>
    <h4>Spezifikation</h4>
    <table>
        ${
          container.size !== ""
            ? `<tr>
                <td>Bildschirmdiagonale</td>
                <td>${container.size}</td> 
            <tr>`
            : ``
        }
        ${
          container.displayType !== ""
            ? `<tr>
                <td>Displaytyp</td>
                <td>${container.displayType}</td> 
            <tr>`
            : ``
        }
        ${
          container.processor !== ""
            ? `<tr>
                <td>Prozessor</td>
                <td>${container.processor}</td> 
            <tr>`
            : ``
        }
        ${
          container.graphics !== ""
            ? `<tr>
                <td>Grafikkarte</td>
                <td>${container.graphics}</td> 
            <tr>`
            : ``
        }
        ${
          container.ram !== ""
            ? `<tr>
                <td>Arbeitsspeicher (in GB)</td>
                <td>${container.ram}</td> 
            <tr>`
            : ``
        }
        ${
          container.drive !== ""
            ? `<tr>
                <td>Festplattenspeicher (in GB)</td>
                <td>${container.drive}</td> 
            <tr>`
            : ``
        }
        ${
          container.driveType !== ""
            ? `<tr>
                <td>Festplattentyp</td>
                <td>${container.driveType}</td> 
            <tr>`
            : ``
        }
        <tr>
            <td>Gerät funktioniert?</td>
            <td>${container.condition}</td>
        </tr>
        <tr>
            <td>Gerät funktioniert?</td>
            <td>${container.deviceOperating ? "Ja" : "Nein"}</td>
        </tr>
        <tr>
            <td>Display funktioniert?</td>
            <td>${container.displayOperating ? "Ja" : "Nein"}</td>
        </tr>
        <tr>
            <td>Batterie funktioniert?</td>
            <td>${container.batteryOperating ? "Ja" : "Nein"}</td>
        </tr>
        <tr>
            <td>MagSafe dabei?</td>
            <td>${container.magsafeAvaible ? "Ja" : "Nein"}</td>
        </tr>
        <tr>
            <td>Zubehör</td>
            <td>
                OVP: ${container.equipment.ovp ? "Ja" : "Nein"}<br />
                Maus: ${container.equipment.mouse ? "Ja" : "Nein"}<br />
                Tastatur: ${container.equipment.keyboard ? "Ja" : "Nein"}<br />
                Trackpad: ${container.equipment.trackpad ? "Ja" : "Nein"}<br />
                Netzteil: ${container.equipment.adapter ? "Ja" : "Nein"}<br />
                Kabel: ${container.equipment.cable ? "Ja" : "Nein"}
            </td>
        </tr>
        ${
          container.message !== ""
            ? `<tr>
                <td>Anmerkung</td>
                <td>${container.message}</td> 
            <tr>`
            : ``
        }
    </table>
    <h4>Kundendaten</h4>
    <table>
        <tr>
            <td>Vorname</td>
            <td>${container.surname}</td>
        </tr>
        <tr>
            <td>Nachname</td>
            <td>${container.lastname}</td>
        </tr>
        <tr>
            <td>E-Mail</td>
            <td>${container.email}</td>
        </tr>
        <tr>
            <td>Telefon</td>
            <td>${container.telefon}</td>
        </tr>
    </table>
    <h3><a href="${
      process.env.RUNNING_DOMAIN
    }/dashboard">Hier</a> geht's zur Weboberfläche</h3>
    </div>
    `;

  let info = await transporter.sendMail({
    from: `"TradeMax24 Ankaufformular" <${process.env.MAIL_USER}>`,
    to: "joyce@quikk.de",
    subject: "Es liegt eine neue Ankaufanfrage vor",
    text: text,
    html: html,
  });

  return info;
}
