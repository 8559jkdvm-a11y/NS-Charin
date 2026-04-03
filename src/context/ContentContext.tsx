import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultContent, CONTENT_VERSION } from '@/src/constants/defaultContent';
import { db } from '@/src/lib/firebase';
import { doc, onSnapshot, setDoc, getDocFromCache, getDocFromServer } from 'firebase/firestore';

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
    const contentDoc = doc(db, 'app_config', 'current_content');
    
    const unsubscribe = onSnapshot(contentDoc, (snapshot) => {
      if (snapshot.exists()) {
        const cloudData = snapshot.data() as AppContent;
        console.log("Cloud content received");
        
        setContent(prev => {
          const merged = merge({ ...cloudData }, defaultContent);
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
      const contentDoc = doc(db, 'app_config', 'current_content');
      // Add a timestamp to the content before saving
      const contentWithTimestamp = {
        ...content,
        lastUpdated: new Date().toISOString()
      };
      await setDoc(contentDoc, contentWithTimestamp);
      const now = new Date().toLocaleString();
      setLastSynced(now);
      localStorage.setItem('last_synced', now);
      console.log("Content synced to cloud successfully");
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
