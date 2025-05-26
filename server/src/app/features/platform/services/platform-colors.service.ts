import { db } from '../../../db';
import { platformColors } from '../../../db/schemas/platform-colors.schema';
import { eq } from 'drizzle-orm';

// Types
export type ColorKey = 'primary' | 'primaryLight' | 'secondary' | 'secondaryLight';

export interface PlatformColors {
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
}

export interface PlatformColorResponse {
  status: number;
  message: string;
  data?: PlatformColors;
}

// Constants
const DEFAULT_COLORS: PlatformColors = {
  primary: '#D35C36',
  primaryLight: '#ED7D5A',
  secondary: '#4B7B82',
  secondaryLight: '#F3F7F7'
};

// Helper functions
const transformToColorMap = (colors: typeof platformColors.$inferSelect[]): PlatformColors => {
  const colorMap = colors.reduce((acc, color) => {
    acc[color.key as ColorKey] = color.value;
    return acc;
  }, {} as Partial<PlatformColors>);

  // Ensure all required colors are present
  return {
    primary: colorMap.primary || DEFAULT_COLORS.primary,
    primaryLight: colorMap.primaryLight || DEFAULT_COLORS.primaryLight,
    secondary: colorMap.secondary || DEFAULT_COLORS.secondary,
    secondaryLight: colorMap.secondaryLight || DEFAULT_COLORS.secondaryLight
  };
};

// Main service functions
export async function setPlatformColors(colors: PlatformColors): Promise<PlatformColorResponse> {
  // Delete existing colors
  await db.delete(platformColors);

  // Insert new colors
  const colorEntries = Object.entries(colors).map(([key, value]) => ({
    key,
    value
  }));

  const newColors = await db.insert(platformColors)
    .values(colorEntries)
    .returning();

  return {
    status: 200,
    message: 'Platform colors updated successfully',
    data: transformToColorMap(newColors)
  };
}

export async function getAllColors(): Promise<PlatformColorResponse> {
  const colors = await db.select().from(platformColors);
  
  if (colors.length === 0) {
    // If no colors exist, set default colors
    return setPlatformColors(DEFAULT_COLORS);
  }

  return {
    status: 200,
    message: 'Colors retrieved successfully',
    data: transformToColorMap(colors)
  };
}

export async function updateColor(key: string, value: string): Promise<PlatformColorResponse> {
  const [updatedColor] = await db.update(platformColors)
    .set({ value, updatedAt: new Date() })
    .where(eq(platformColors.key, key))
    .returning();

  if (!updatedColor) {
    return {
      status: 404,
      message: 'Color not found'
    };
  }

  // Get all colors to return complete color map
  const allColors = await db.select().from(platformColors);
  return {
    status: 200,
    message: 'Color updated successfully',
    data: transformToColorMap(allColors)
  };
}

export async function deleteColor(key: string): Promise<PlatformColorResponse> {
  const [deletedColor] = await db.delete(platformColors)
    .where(eq(platformColors.key, key))
    .returning();

  if (!deletedColor) {
    return {
      status: 404,
      message: 'Color not found'
    };
  }

  return {
    status: 200,
    message: 'Color deleted successfully'
  };
} 