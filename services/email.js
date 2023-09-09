const nodemailer = require('nodemailer');
const fs = require("fs")

const transporter = nodemailer.createTransport({
  host: 'mail.privateemail.com',  // Replace with your SMTP host
  port: 465,
  secure: true,  // Use true for port 465, false for all other ports
  auth: {
    user: 'compete@competeae.com',
    pass: "JoseKnowsThePassword91!",
  },
});

// style="background-image:url(https://i.pinimg.com/736x/5a/9e/ad/5a9ead9e047679c4eddf764b461c98eb.jpg);"
exports.sendEmail = async (to) => {
  try {
    const mailOptions = {
      from: "compete@competeae.com",
      to,
      subject: "Subcribe successfully",
      html: `<html>
      <head>
    <meta name="color-scheme" content="only">
    <meta name="color-scheme" content="light dark">
        <style type="text/css">
     
          body, .darkmode, .darkmode div { /* With class body on the body tag, and all elements represented here that have a background color */
        background-image: linear-gradient(#000000,#000000) !important;
    }
    .darkmode p { /* Add other selectors for other text elements */
        -webkit-text-fill-color: #ffffff !important;
    }
          .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img {line-height: 100%;}#outlook a {padding: 0;}.ExternalClass,.ReadMsgBody {width: 100%;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;}table,td {mso-table-lspace: 0;mso-table-rspace: 0;}img {-ms-interpolation-mode: bicubic;border: 0;height: auto;outline: 0;text-decoration: none;}table {border-collapse: collapse !important;}#bodyCell,#bodyTable,body {height: 100% !important;margin: 0;padding: 0;font-family: ProximaNova, sans-serif;}#bodyCell {padding: 20px;}#bodyTable {width: 600px;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format("woff");font-weight: 400;font-style: normal;}@font-face {font-family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format("woff");font-weight: 600;font-style: normal;}@media only screen and (max-width: 480px) {#bodyTable,body {width: 100% !important;}a,blockquote,body,li,p,table,td {-webkit-text-size-adjust: none !important;}body {min-width: 100% !important;}#bodyTable {max-width: 600px !important;}#signIn {max-width: 280px !important;}}
        </style>
      </head>
      <body >
        <center>
          <table
            style='width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: "ProximaNova", sans-serif;border-collapse: collapse !important;height: 100% !important;'
            align="center"
            border="0"
            cellpadding="0"
            cellspacing="0"
            height="100%"
            width="100%"
            id="bodyTable"
          >
            <tr>
              <td
                align="start"
                valign="top"
                id="bodyCell"
                class="darkmode"
                style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: "ProximaNova", sans-serif;height: 100% !important;'
              >
                <div class="main">
                  <p
                    style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;"
                  >
                    <img
                      src="https://cdn.discordapp.com/attachments/1101050121652801647/1138806699327770737/download.png"
                      width="50"
                      alt="Your logo goes here"
                      style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"
                    />
                  </p>
    
                 
    
                  <p> Hey There,<br />
               Thank you for joining CompeteAE before our official launch! We are thrilled to have you on board and can't wait for you to experience all the amazing features we have to offer.</p>
    
                  <p> Here are just a few of the cool features that you'll be able to enjoy:</p>
    
                  <p>
                    - AI-generated guides to win competitions <br />
    - Create team competitions <br />
    - Update status through third-party connections <br />
    - Vote on others' success <br />
    - News feed for latest updates
    <br />
    
                  </p>
        <p>
                   At CompeteAE, our goal is to provide a platform for users to achieve their goals and compete with others in almost everything. We believe that competition is the key to achieving greatness, and we're excited to help you on your journey to success.
    
                  </p>
                  Big thanks for getting in early! Your feedback will help mold CompeteAE into something truly extraordinary.
                 
            
               <p>Best, <br />
                CompeteAE Team</p>
                  <br /><br />
                  <hr style="border: 2px solid #EAEEF3; border-bottom: 0; margin: 20px 0;" />
                  <p style="text-align: center;color: #A9B3BC;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;">
                  <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" style="width:100%;"/>
                  </p>
                </div>
              </td>
            </tr>
          </table>
        </center>
      </body>
    </html>`,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
exports.sendResultEmail = async (to) => {
  try {
    const mailOptions = {
      from: "compete@competeae.com",
      to,
      subject: "Subject:  [Name of Competition]: The Results  Are Out! 🏆",
      html: `  < html >
      <head>
        <meta name="color-scheme" content="only">
          <meta name="color-scheme" content="light dark">
            <style type="text/css">
    
              body, .darkmode, .darkmode div { /* With class body on the body tag, and all elements represented here that have a background color */
                background - image: linear-gradient(#000000,#000000) !important;
           
        }
              .darkmode p { /* Add other selectors for other text elements */
                -webkit - text - fill - color: #ffffff !important;
        }
              .ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td,img {line - height: 100%;}#outlook a {padding: 0;}.ExternalClass,.ReadMsgBody {width: 100%;}a,blockquote,body,li,p,table,td {-webkit - text - size - adjust: 100%;-ms-text-size-adjust: 100%;}table,td {mso - table - lspace: 0;mso-table-rspace: 0;}img {-ms - interpolation - mode: bicubic;border: 0;height: auto;outline: 0;text-decoration: none;}table {border - collapse: collapse !important;}#bodyCell,#bodyTable,body {height: 100% !important;margin: 0;padding: 0;font-family: ProximaNova, sans-serif;}#bodyCell {padding: 20px;}#bodyTable {width: 600px;}@font-face {font - family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-regular-webfont-webfont.woff) format("woff");font-weight: 400;font-style: normal;}@font-face {font - family: ProximaNova;src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot);src: url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.eot?#iefix)format("embedded-opentype"),url(https://cdn.auth0.com/fonts/proxima-nova/proximanova-semibold-webfont-webfont.woff) format("woff");font-weight: 600;font-style: normal;}@media only screen and (max-width: 480px) {#bodyTable, body {width: 100% !important;}a,blockquote,body,li,p,table,td {-webkit - text - size - adjust: none !important;}body {min - width: 100% !important;}#bodyTable {max - width: 600px !important;}#signIn {max - width: 280px !important;}}
              p{
                text - align:start;
              }
            </style>
          </head>
          <body >
            <center>
              <table
                style='width: 600px;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 0;font-family: "ProximaNova", sans-serif;border-collapse: collapse !important;height: 100% !important;'
                align="center"
                border="0"
                cellpadding="0"
                cellspacing="0"
                height="100%"
                width="100%"
                id="bodyTable"
              >
                <tr>
                  <td
                    align="start"
                    valign="top"
                    id="bodyCell"
                    class="darkmode"
                    style='-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%;mso-table-lspace: 0pt;mso-table-rspace: 0pt;margin: 0;padding: 20px;font-family: "ProximaNova", sans-serif;height: 100% !important;'
                  >
                    <div class="main">
                      <p
                        style="text-align: center;-webkit-text-size-adjust: 100%;-ms-text-size-adjust: 100%; margin-bottom: 30px;"
                      >
                        <img
                          src="https://cdn.discordapp.com/attachments/1101050121652801647/1138806699327770737/download.png"
                          width="50"
                          alt="Your logo goes here"
                          style="-ms-interpolation-mode: bicubic;border: 0;height: auto;line-height: 100%;outline: none;text-decoration: none;"
                        />
                      </p>
    
    
    
                      <p>Hello [Recipient Name],
                        <br />
                        <br />
                        It's a wrap [Name of Competition] has ended and hopefully you pushed yourself and left nothing on the table. There could only be one winner. Is it you?
                      </p>
    
    
                      <p>
                        Whether you topped the charts or are gearing up for a comeback, remember, every challenge makes you stronger.
    
                      </p>
                      <p>See the results and all the epic moments: [Link to Results Page]
                      </p>
                      <p>
                        Stay competitive and see you in the Competition!
                      </p>
                      <p>
                        Questions or feedback? We're all ears: Support@competeae.com.
                      </p>
                      <p>Best, <br />
                        Team Compete AE Inc.</p>
    
                    </div>
                  </td>
                </tr>
              </table>
            </center>
          </body>
        </html>`,
    };

    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
