import React, { useState } from 'react';
import { useAdmin } from '@/src/context/AdminContext';
import { useContent } from '@/src/context/ContentContext';
import { cn } from '@/src/lib/utils';
import { Edit3, Image as ImageIcon, Check, X, Play, Video } from 'lucide-react';

interface EditableVideoProps {
  contentPath: string;
  className?: string;
  thumbnailPath?: string;
}

export function EditableVideo({ contentPath, className, thumbnailPath }: EditableVideoProps) {
  const { isAdmin } = useAdmin();
  const { content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  
  const videoUrl = contentPath.split('.').reduce((obj, key) => obj?.[key], content) || '';
  const thumbnailUrl = thumbnailPath ? thumbnailPath.split('.').reduce((obj, key) => obj?.[key], content) : '';
  const [tempUrl, setTempUrl] = useState(videoUrl);

  const handleSave = () => {
    updateContent(contentPath, tempUrl);
    setIsEditing(false);
  };

  const isYoutube = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const embedUrl = isYoutube ? videoUrl.replace('watch?v=', 'embed/').split('&')[0] : videoUrl;

  if (isEditing && isAdmin) {
    return (
      <div className={cn("relative bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[300px]", className)}>
        <div className="w-full max-w-md space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold mb-2">
            <Video size={20} />
            <span>동영상 URL 입력</span>
          </div>
          <input 
            type="text" 
            className="w-full p-3 border-2 border-primary rounded-xl bg-white text-black"
            placeholder="YouTube 또는 동영상 URL"
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            autoFocus
          />
          <p className="text-xs text-gray-500">YouTube '공유' -{'>'} '퍼가기'의 src 주소를 넣으시면 가장 잘 나옵니다.</p>
          <div className="flex gap-2 justify-end">
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded-lg font-bold flex items-center gap-2">
              <Check size={16} /> 저장
            </button>
            <button onClick={() => { setTempUrl(videoUrl); setIsEditing(false); }} className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold flex items-center gap-2">
              <X size={16} /> 취소
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative group overflow-hidden rounded-2xl shadow-xl", className)}>
      {videoUrl ? (
        <div className="w-full h-full aspect-video">
          {isYoutube ? (
            <iframe 
              src={embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video src={videoUrl} controls className="w-full h-full object-cover" />
          )}
        </div>
      ) : (
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <Play size={48} className="text-gray-400" />
        </div>
      )}

      {isAdmin && (
        <button 
          onClick={() => setIsEditing(true)}
          className="absolute top-4 right-4 bg-primary text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-20"
        >
          <Edit3 size={20} />
        </button>
      )}
    </div>
  );
}

interface EditableTextProps {
  contentPath: string;
  className?: string;
  multiline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
}

export function EditableText({ contentPath, className, multiline = false, as: Component = 'div' }: EditableTextProps) {
  const { isAdmin } = useAdmin();
  const { content, updateContent } = useContent();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get value from path
  const value = contentPath.split('.').reduce((obj, key) => obj?.[key], content) || '';
  const [tempValue, setTempValue] = useState(value);

  if (!isAdmin) {
    return (
      <Component className={cn("whitespace-pre-line", className)}>
        {value}
      </Component>
    );
  }

  const handleSave = () => {
    updateContent(contentPath, tempValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group w-full">
        {multiline ? (
          <textarea
            className={cn("w-full p-2 border-2 border-primary rounded bg-white text-black", className)}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            rows={4}
            autoFocus
          />
        ) : (
          <input
            className={cn("w-full p-2 border-2 border-primary rounded bg-white text-black", className)}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            autoFocus
          />
        )}
        <div className="absolute -top-10 right-0 flex gap-2 z-50">
          <button onClick={handleSave} className="p-2 bg-green-500 text-white rounded-full shadow-lg"><Check size={16} /></button>
          <button onClick={() => { setTempValue(value); setIsEditing(false); }} className="p-2 bg-red-500 text-white rounded-full shadow-lg"><X size={16} /></button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative group cursor-pointer border-2 border-transparent hover:border-primary/30 rounded p-1 transition-all", className)}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsEditing(true);
      }}
    >
      <Component className={cn("whitespace-pre-line", !value && "text-gray-500 italic")}>
        {value || `[${contentPath} 비어 있음]`}
      </Component>
      <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-primary text-white p-1 rounded-bl shadow-sm">
          <Edit3 size={12} />
        </div>
      </div>
    </div>
  );
}

interface EditableImageProps {
  contentPath: string;
  className?: string;
  alt?: string;
}

export function EditableImage({ contentPath, className, alt }: EditableImageProps) {
  const { isAdmin } = useAdmin();
  const { content, updateContent, storageError } = useContent();
  const [error, setError] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  
  const value = contentPath.split('.').reduce((obj, key) => obj?.[key], content) || '';

  const compressImage = (dataUrl: string, maxWidth: number, maxHeight: number, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(`Attempting to upload file: ${file.name}, size: ${file.size} bytes`);
      
      // We still keep a loose limit for the initial file to avoid browser hang
      if (file.size > 5 * 1024 * 1024) {
        setError("이미지 원본 용량이 너무 큽니다. (5MB 이하 권장)");
        setTimeout(() => setError(null), 3000);
        return;
      }

      setIsCompressing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          console.log("File read complete, starting compression...");
          // Compress to max 1200px width/height and 0.7 quality
          const compressedDataUrl = await compressImage(reader.result as string, 1200, 1200, 0.7);
          console.log("Compression complete, updating content...");
          updateContent(contentPath, compressedDataUrl);
          setError(null);
        } catch (err) {
          console.error("Compression error:", err);
          setError("이미지 최적화 중 오류가 발생했습니다.");
        } finally {
          setIsCompressing(false);
        }
      };
      reader.onerror = () => {
        console.error("FileReader error:", reader.error);
        setError("이미지를 읽는 중 오류가 발생했습니다.");
        setIsCompressing(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const displayError = error || storageError;

  return (
    <div className={cn("relative group", className)}>
      <img 
        src={value} 
        alt={alt} 
        className={cn("w-full h-full object-cover", isCompressing && "opacity-50")} 
        referrerPolicy="no-referrer"
      />
      {isCompressing && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {isAdmin && (
        <>
          <label 
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <ImageIcon size={32} className="mb-2" />
            <span className="text-sm font-bold">{isCompressing ? "최적화 중..." : "이미지 변경"}</span>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isCompressing} />
          </label>
          {displayError && (
            <div className="absolute bottom-2 left-2 right-2 bg-red-500 text-white text-[10px] p-1 rounded text-center z-20 animate-bounce">
              {displayError}
            </div>
          )}
        </>
      )}
    </div>
  );
}
