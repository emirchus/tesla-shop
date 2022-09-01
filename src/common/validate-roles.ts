import type { NextApiRequest } from 'next';

import { getSession } from 'next-auth/react';

export async function hasRole(req: NextApiRequest, validRoles: string[]): Promise<boolean> {
  const session: any = await getSession({ req });

  if (!session) {
    return false;
  }

  if (!validRoles.includes(session.user.role)) {
    return false;
  }

  return true;
}

