
// import { Resend } from 'resend';
// // import { RESEND_API_KEY } from '../../../utils';
// import { EmailTemplate } from '../../../emails/example';

// // const resend:any = new Resend(RESEND_API_KEY);
// const resend:any = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   try {
//     const { data, error } = await resend.emails.send({
//       from: 'Acme <onboarding@resend.dev>',
//       to: ['claudiopasinelli@gmail.com'],
//       subject: 'Hello world',
//       react: EmailTemplate({ firstName: 'John' }),
//     });

//     if (error) {
//       return Response.json({ error }, { status: 500 });
//     }

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error }, { status: 500 });
//   }
// }

import { Resend } from 'resend';
// import { RESEND_API_KEY } from '../../../utils';
import { EmailTemplate } from '../../../emails/example';

// const resend:any = new Resend(RESEND_API_KEY);
const resend:any = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  return
}
