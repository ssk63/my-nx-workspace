import { db } from '../../../db';
import { themes } from '../../../db/schemas/themes.schema';
import { eq } from 'drizzle-orm';
import { 
  Theme, 
  CreateThemeDto, 
  ThemeServiceResponse 
} from '../types/theme.types';

export class ThemeService {
  private async findThemeByTenant(tenantId: string) {
    return db.query.themes.findFirst({
      where: eq(themes.tenantId, tenantId)
    });
  }

  private createErrorResponse(message: string): ThemeServiceResponse<never> {
    return { success: false, error: message };
  }

  private createSuccessResponse<T>(data: T): ThemeServiceResponse<T> {
    return { success: true, data };
  }

  /**
   * Get theme for a tenant
   */
  async getTheme(tenantId: string): Promise<ThemeServiceResponse<Theme>> {
    try {
      const theme = await this.findThemeByTenant(tenantId);
      return theme 
        ? this.createSuccessResponse(theme)
        : this.createErrorResponse('Theme not found');
    } catch {
      return this.createErrorResponse('Failed to get theme');
    }
  }

  /**
   * Create or update theme for a tenant
   */
  async upsertTheme(tenantId: string, themeData: CreateThemeDto): Promise<ThemeServiceResponse<Theme>> {
    try {
      const existingTheme = await this.findThemeByTenant(tenantId);
      
      if (existingTheme) {
        const [updatedTheme] = await db
          .update(themes)
          .set({
            ...themeData,
            updatedAt: new Date()
          })
          .where(eq(themes.id, existingTheme.id))
          .returning();

        return this.createSuccessResponse(updatedTheme);
      }

      const [newTheme] = await db
        .insert(themes)
        .values({
          tenantId,
          ...themeData
        })
        .returning();

      return this.createSuccessResponse(newTheme);
    } catch {
      return this.createErrorResponse('Failed to create/update theme');
    }
  }

  /**
   * Delete theme for a tenant
   */
  async deleteTheme(tenantId: string): Promise<ThemeServiceResponse<void>> {
    try {
      const result = await db
        .delete(themes)
        .where(eq(themes.tenantId, tenantId))
        .returning();

      return result.length > 0
        ? { success: true }
        : this.createErrorResponse('Theme not found');
    } catch {
      return this.createErrorResponse('Failed to delete theme');
    }
  }
} 