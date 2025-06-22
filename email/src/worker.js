import PostalMime from 'postal-mime';
import { Resend } from 'resend';

export default {
  async email(message, env, ctx) {
    const email = await PostalMime.parse(message.raw, {
      attachmentEncoding: 'base64'
    });

    const resend = new Resend(env.RESEND_API_KEY);

    const headerTable = `
    <>
      <table style="border:1px solid oklch(0.446 0.043 257.281);border-collapse:collapse;font-size:16px">
        <tbody>
          <tr>
            <td style="border:1px solid oklch(0.446 0.043 257.281);font-weight:700;padding:8px">Sender</td>
            <td style="border:1px solid oklch(0.446 0.043 257.281);padding:8px">${email.from.name} ${email.from.address}</td>
          </tr>
          <tr>
            <td style="border:1px solid oklch(0.446 0.043 257.281);font-weight:700;padding:8px">Subject</td>
            <td style="border:1px solid oklch(0.446 0.043 257.281);padding:8px">${email.subject}</td>
          </tr>
        </tbody>
      </table>
      <br>
      <br>
    </>
  `;

    await resend.emails.send({
      from: 'portfolio@notify.kentayamada.dev',
      to: [env.RECIPIENT_EMAIL_ADDRESS],
      subject: 'Email',
      html: email.html ? headerTable + email.html : '',
      text: email.text ? `Sender: ${email.from.name} <${email.from.address}>\nSubject: ${email.subject}\n\n${email.text}` : '',
      attachments: email.attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content
      }))
    });
  }
};
