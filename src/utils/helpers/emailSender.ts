import { Resend } from 'resend';
import { RESEND_API_KEY } from '../costants';

const resend = new Resend(RESEND_API_KEY);

/**
 * Function to send an email
 * @param htmlMessage - The HTML message to send
 */
export const sendEmail = async (htmlMessage: string) => {
  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'claudiopasinelli@gmail.com',
    subject: 'Nuovo messaggio da www.nurale.com',
    html: htmlMessage,
  });

  return Promise.resolve({ data, error });
};
