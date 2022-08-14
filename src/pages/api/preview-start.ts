import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { slug = '' } = req.query;

  const params = req.url?.split('?') as string[];

  if (req.query.secret !== process.env.PREVIEW_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.setPreviewData({});

  const cookies = res.getHeader('Set-Cookie') as string[];

  res.setHeader(
    'Set-Cookie',
    cookies.map((cookie) =>
      cookie.replace('SameSite=Lax', 'SameSite=None;Secure'),
    ),
  );

  const redirectTo = `/${slug}?${params[1]}`;

  console.log(redirectTo);

  return res.redirect(redirectTo);
}
