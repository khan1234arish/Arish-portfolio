import fs from 'fs';
import path from 'path';
import { SiteContent } from '@/data/types';
import { initialSiteContent } from '@/data/initialData';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'site-content.json');

// In-memory cache for fast access
let memoryContent: SiteContent | null = null;

export async function getSiteContent(): Promise<SiteContent> {
  if (memoryContent) {
    return memoryContent;
  }

  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData) as SiteContent;
      // Merge with initial data structure in case new fields were added
      memoryContent = {
        ...initialSiteContent,
        ...parsed,
        profile: { ...initialSiteContent.profile, ...parsed.profile },
        availability: { ...initialSiteContent.availability, ...parsed.availability },
        settings: { ...initialSiteContent.settings, ...parsed.settings },
      };
      return memoryContent;
    }
  } catch (error) {
    console.error('Error reading site-content.json, using initial data:', error);
  }

  memoryContent = initialSiteContent;
  return memoryContent;
}

export async function updateSiteContent(newContent: Partial<SiteContent>): Promise<SiteContent> {
  const currentContent = await getSiteContent();
  const updated: SiteContent = {
    ...currentContent,
    ...newContent,
    lastUpdated: new Date().toISOString(),
  };

  memoryContent = updated;

  try {
    const dirPath = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving site-content.json:', error);
  }

  return updated;
}
