import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug = '' } = req.query;

  res.clearPreviewData();

  const cookies = res.getHeader('Set-Cookie') as string[];

  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie) =>
      cookie.replace('SameSite=Lax', 'SameSite=None;Secure'),
    ),
  );

  return res.redirect(`/${slug}`);
}
