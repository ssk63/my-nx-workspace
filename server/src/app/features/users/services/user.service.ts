import { db } from '../../../db';
import { users } from '../../../db/schemas/auth.schema';
import { eq } from 'drizzle-orm';

export async function updateUserProfile(userId: string, data: { firstName?: string; lastName?: string; avatarUrl?: string }) {
  await db.update(users)
    .set({
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.avatarUrl && { avatarUrl: data.avatarUrl }),
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId));

  const updatedUser = (await db.select().from(users).where(eq(users.id, userId)))[0];
  return updatedUser;
} 