import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultContent, CONTENT_VERSION } from '@/src/constants/defaultContent';
import { db } from '@/src/lib/firebase';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  getDocFromServer, 
  collection, 
  writeBatch,
  query,
  getDocs
} from 'firebase/firestore';

interface AppContent {
  version: string;
  main: {
    hero: {
      badge: string;
      title: string;
      description: string;
      cta: string;
      secondaryCta: string;
      bgImage: string;
    };
    painPoints: {
      title: string;
      items: { title: string; desc: string }[];
    };
    features: {
      feature1: { badge: string; title: string; desc: string; image: string; list: string[] };
      feature2: { badge: string; title: string; desc: string; image: string; quote: string };
    };
    socialProof: {
      title: string;
      rating: string;
      reviews: { name: string; content: string; tag: string }[];
    };
    promotion: {
      title: string;
      badge: string;
      priceOriginal: string;
      priceDiscount: string;
      cta: string;
    };
  };
  // Add other pages as needed
  [key: string]: any;
}

interface ContentContextType {
  content: AppContent;
  updateContent: (path: string, value: any) => void;
  syncToCloud: () => Promise<void>;
  refreshFromCloud: () => Promise<void>;
  isSyncing: boolean;
  isCloudLoaded: boolean;
  lastSynced: string | null;
  storageError: string | null;
  clearStorage: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<AppContent>(() => {
    const saved = localStorage.getItem('app_content');
    if (!saved) return defaultContent;
    
    try {
      const parsed = JSON.parse(saved);
      
      // Log version change but don't reset - let merge handle it
      if (parsed.version !== CONTENT_VERSION) {
        console.log(`Content version mismatch: ${parsed.version} vs ${CONTENT_VERSION}. Merging updates.`);
      }

      // Deep merge helper to ensure new default fields are added to existing state
      const merge = (target: any, source: any) => {
        for (const key in source) {
          if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
            if (!target[key]) target[key] = {};
            merge(target[key], source[key]);
          } else {
            if (target[key] === undefined) {
              target[key] = source[key];
            }
          }
        }
        return target;
      };

      // Start with a copy of parsed, then merge in missing defaults
      const merged = merge({ ...parsed }, defaultContent);
      
      // Migration: Ensure services.guides matches the new default structure if it was the old one
      if (merged.services?.guides?.length === 3 && merged.services.guides[1].title.includes("에어프라이어")) {
        merged.services.guides = defaultContent.services.guides;
      }

      return merged;
    } catch (e) {
      console.error("Failed to parse saved content", e);
      return defaultContent;
    }
  });

  const [storageError, setStorageError] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isCloudLoaded, setIsCloudLoaded] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(() => localStorage.getItem('last_synced'));

  // Deep merge helper
  const merge = (target: any, source: any) => {
    if (!target) return source;
    const result = { ...target };
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = merge(target[key] || {}, source[key]);
      } else {
        if (target[key] === undefined) {
          result[key] = source[key];
        }
      }
    }
    return result;
  };

  const refreshFromCloud = async () => {
    setIsSyncing(true);
    try {
      const contentDoc = doc(db, 'app_config', 'current_content');
      const snapshot = await getDocFromServer(contentDoc);
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as AppContent;
        setContent(prev => merge({ ...cloudData }, defaultContent));
        setIsCloudLoaded(true);
        const now = new Date().toLocaleString();
        setLastSynced(now);
        localStorage.setItem('last_synced', now);
      }
    } catch (e) {
      console.error("Failed to refresh from cloud", e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Real-time sync from Firestore
  useEffect(() => {
    const configCol = collection(db, 'app_config');
    
    // Listen to the entire collection to reconstruct the content from sections
    const unsubscribe = onSnapshot(configCol, (querySnapshot) => {
      if (querySnapshot.empty) return;

      console.log("Cloud content updates received");
      const newContent = { ...defaultContent };
      let hasData = false;

      querySnapshot.forEach((doc) => {
        const id = doc.id;
        const data = doc.data();

        if (id === 'current_content') {
          // Legacy support: if the old single document exists, use it
          Object.assign(newContent, data);
          hasData = true;
        } else if (id.startsWith('section_')) {
          const sectionKey = id.replace('section_', '');
          // @ts-ignore
          newContent[sectionKey] = data;
          hasData = true;
        }
      });

      if (hasData) {
        setContent(prev => {
          const merged = merge({ ...newContent }, defaultContent);
          return merged;
        });
        setIsCloudLoaded(true);
        const now = new Date().toLocaleString();
        setLastSynced(now);
        localStorage.setItem('last_synced', now);
      }
    }, (error) => {
      console.error("Firestore sync error:", error);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('app_content', JSON.stringify(content));
      setStorageError(null);
    } catch (e) {
      console.error("Failed to save to localStorage", e);
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        setStorageError("저장 공간이 가득 찼습니다. 이미지를 삭제하거나 최적화해주세요.");
      } else {
        setStorageError("데이터 저장 중 오류가 발생했습니다.");
      }
    }
  }, [content]);

  const clearStorage = () => {
    localStorage.removeItem('app_content');
    window.location.reload();
  };

  const updateContent = (path: string, value: any) => {
    setContent(prev => {
      const keys = path.split('.');
      
      const updateRecursive = (obj: any, pathKeys: string[]): any => {
        const [first, ...rest] = pathKeys;
        
        if (rest.length === 0) {
          if (Array.isArray(obj)) {
            const newArr = [...obj];
            newArr[parseInt(first)] = value;
            return newArr;
          }
          return { ...obj, [first]: value };
        }

        if (Array.isArray(obj)) {
          const newArr = [...obj];
          const index = parseInt(first);
          newArr[index] = updateRecursive(newArr[index], rest);
          return newArr;
        }

        return {
          ...obj,
          [first]: updateRecursive(obj[first], rest)
        };
      };

      try {
        return updateRecursive(prev, keys);
      } catch (e) {
        console.error("Error updating content at path:", path, e);
        return prev;
      }
    });
  };

  const syncToCloud = async () => {
    setIsSyncing(true);
    try {
      const batch = writeBatch(db);
      
      // Save metadata and version
      const metaDoc = doc(db, 'app_config', 'metadata');
      batch.set(metaDoc, { 
        lastUpdated: new Date().toISOString(),
        version: content.version 
      });

      // Split content into sections to avoid 1MB limit
      // Each top-level key in AppContent becomes a separate document
      for (const key in content) {
        if (key === 'version') continue;
        const sectionDoc = doc(db, 'app_config', `section_${key}`);
        // @ts-ignore
        batch.set(sectionDoc, content[key]);
      }

      // Also update the legacy document with a "redirect" or small summary if needed
      // but we mainly want to clear it or reduce its size.
      // For safety, we keep a small version of it.
      const legacyDoc = doc(db, 'app_config', 'current_content');
      batch.set(legacyDoc, { 
        version: content.version,
        splitStorage: true,
        lastUpdated: new Date().toISOString()
      });

      await batch.commit();

      const now = new Date().toLocaleString();
      setLastSynced(now);
      localStorage.setItem('last_synced', now);
      console.log("Content synced to cloud successfully (split into sections)");
    } catch (e) {
      console.error("Failed to sync to cloud", e);
      throw e;
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <ContentContext.Provider value={{ 
      content, 
      updateContent, 
      syncToCloud, 
      refreshFromCloud,
      isSyncing, 
      isCloudLoaded,
      lastSynced,
      storageError, 
      clearStorage 
    }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
