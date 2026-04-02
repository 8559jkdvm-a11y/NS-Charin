import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContent {
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
      feature1: { badge: string; title: string; desc: string; image: string };
      feature2: { badge: string; title: string; desc: string; image: string };
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

const defaultContent: AppContent = {
  header: {
    logo: "https://ais-dev-2dwkgarvymhzbeziz4zjfb-211536969439.asia-northeast1.run.app/logo.png", // Use a placeholder or actual logo if available
    cta: "특가 구매하기"
  },
  main: {
    hero: {
      badge: "논산계룡축협 프리미엄 양념육 '차린'",
      title: "바쁜 퇴근길,\n10분 만에 완성하는\n우리 가족 안심 밥상",
      description: "축협이 직접 관리한 100% 국내산 고기와 과일로 낸 건강한 단맛.\n오늘 저녁, 사랑하는 가족에게 정성을 선물하세요.",
      cta: "첫 구매 한정 50% 특가로 시작하기",
      secondaryCta: "브랜드 스토리 보기",
      bgImage: "https://loremflickr.com/1600/900/meat,cooking",
    },
    painPoints: {
      title: "혹시 이런 고민 하고 계신가요?",
      items: [
        { title: "시간 부족", desc: "퇴근 후 아이 밥 챙기기엔 시간이 너무 없어요." },
        { title: "건강 걱정", desc: "시판 간편식은 첨가물이 많을까 봐 걱정돼요." },
        { title: "맛의 한계", desc: "매번 똑같은 메뉴, 아이가 잘 안 먹어서 속상해요." }
      ]
    },
    features: {
      feature1: {
        badge: "약속 01",
        title: "100% 국내산,\n논산계룡축협의 자부심",
        desc: "논산계룡축협이 직접 관리하는 농가에서 자란 건강한 우리 고기만을 사용합니다. 중간 유통 과정 없이 신선함을 그대로 담았습니다.",
        image: "https://loremflickr.com/1600/900/farm,cow"
      },
      feature2: {
        badge: "약속 02",
        title: "인공 첨가물 없이\n과일로 낸 건강한 맛",
        desc: "아이에게 먹일 음식이기에 설탕 대신 사과, 배 등 과일로 단맛을 냈습니다. 합성 보존료와 인공 색소를 줄여 뒷맛이 깔끔하고 담백합니다.",
        image: "https://loremflickr.com/1600/900/family,dinner"
      }
    },
    promotion: {
      title: "지금 바로 '차린'의\n신선함을 경험해보세요",
      badge: "첫 구매 고객 한정",
      priceOriginal: "29,800원",
      priceDiscount: "14,900원",
      cta: "50% 할인 혜택 받고 구매하기"
    }
  },
  details: {
    title: "제품 상세 정보",
    subtitle: "논산계룡축협 '차린' 양념육의 모든 것을 투명하게 공개합니다.",
    products: [
      {
        images: {
          main: "https://loremflickr.com/800/600/package,food",
          sub1: "https://loremflickr.com/400/300/meat,raw",
          sub2: "https://loremflickr.com/400/300/cooking,pan",
          sub3: "https://loremflickr.com/400/300/spices"
        },
        specs: {
          name: "차린 프리미엄 한돈 고추장 불고기",
          weight: "500g (2~3인분)",
          ingredients: "돼지고기(국내산) 70%, 고추장 양념 30% (사과즙, 배즙 함유)",
          storage: "냉동보관 (-18℃ 이하)"
        },
        nutrition: {
          calories: "185 kcal",
          protein: "18g (33%)",
          fat: "10g (19%)",
          sodium: "450mg (23%)"
        }
      },
      {
        images: {
          main: "https://loremflickr.com/800/600/bulgogi,food",
          sub1: "https://loremflickr.com/400/300/meat,soy",
          sub2: "https://loremflickr.com/400/300/cooking,beef",
          sub3: "https://loremflickr.com/400/300/vegetables"
        },
        specs: {
          name: "차린 프리미엄 한돈 간장 불고기",
          weight: "500g (2~3인분)",
          ingredients: "돼지고기(국내산) 72%, 간장 양념 28% (천연 과일 숙성)",
          storage: "냉동보관 (-18℃ 이하)"
        },
        nutrition: {
          calories: "170 kcal",
          protein: "20g (36%)",
          fat: "8g (15%)",
          sodium: "410mg (21%)"
        }
      },
      {
        images: {
          main: "https://loremflickr.com/800/600/beef,bulgogi",
          sub1: "https://loremflickr.com/400/300/hanwoo,raw",
          sub2: "https://loremflickr.com/400/300/grill,meat",
          sub3: "https://loremflickr.com/400/300/onion,garlic"
        },
        specs: {
          name: "차린 프리미엄 한우 불고기",
          weight: "400g (2인분)",
          ingredients: "소고기(국내산 한우) 75%, 프리미엄 간장 양념 25%",
          storage: "냉동보관 (-18℃ 이하)"
        },
        nutrition: {
          calories: "210 kcal",
          protein: "22g (40%)",
          fat: "12g (22%)",
          sodium: "380mg (19%)"
        }
      },
      {
        images: {
          main: "https://loremflickr.com/800/600/pork,spicy",
          sub1: "https://loremflickr.com/400/300/pork,belly",
          sub2: "https://loremflickr.com/400/300/stir-fry",
          sub3: "https://loremflickr.com/400/300/chili,pepper"
        },
        specs: {
          name: "차린 프리미엄 한돈 제육볶음",
          weight: "500g (2~3인분)",
          ingredients: "돼지고기(국내산) 68%, 매콤 제육 양념 32%",
          storage: "냉동보관 (-18℃ 이하)"
        },
        nutrition: {
          calories: "195 kcal",
          protein: "17g (31%)",
          fat: "11g (20%)",
          sodium: "490mg (25%)"
        }
      }
    ]
  },
  services: {
    title: "기능 및 서비스",
    subtitle: "바쁜 일상 속에서도 완벽한 식사를 즐길 수 있도록 돕습니다.",
    video: {
      image: "https://loremflickr.com/800/450/cooking,video",
      title: "[영상] 셰프가 알려주는 10분 완성 꿀팁",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Default placeholder video
    },
    guides: [
      { title: "01. 프라이팬 조리", desc: "해동된 고기를 중불에서 5~7분간 노릇하게 볶아주세요. 대파나 양파를 곁들이면 더욱 좋습니다." },
      { title: "02. 캠핑 그리들 조리", desc: "강한 불에서 빠르게 볶아 불맛을 입혀보세요. 야외에서도 간편하게 즐길 수 있습니다." }
    ]
  },
  about: {
    title: "브랜드 스토리",
    subtitle: "논산계룡축협은 1980년부터 지금까지 우리 축산 농가의 땀과 정성을 가장 정직한 방식으로 소비자에게 전달하고 있습니다.",
    ceo: {
      image: "https://loremflickr.com/800/1000/farmer,man",
      message: '"우리의 식탁은 가장 안전해야 합니다. 논산계룡축협은 내 가족이 먹는다는 마음으로 사료부터 유통까지 전 과정을 엄격하게 관리합니다."',
      subMessage: "'차린'은 바쁜 일상 속에서도 건강을 포기할 수 없는 당신을 위해 탄생했습니다. 축협의 이름을 걸고 약속합니다. 가장 신선하고 맛있는 우리 고기를 전해드리겠습니다.",
      name: "홍길동"
    },
    values: [
      { title: "농가 상생", desc: "지역 축산 농가와 함께 성장합니다." },
      { title: "산지 직송", desc: "논산에서 식탁까지 가장 빠르게 배송합니다." },
      { title: "엄격한 품질", desc: "HACCP 인증 시설에서 위생적으로 생산합니다." },
      { title: "친환경 사육", desc: "건강한 환경에서 자란 가축만을 엄선합니다." }
    ],
    factory: {
      title: "최첨단 위생 관리 시스템",
      subtitle: "보이지 않는 곳까지 깨끗하게 관리합니다.",
      images: [
        "https://loremflickr.com/600/400/factory,clean",
        "https://loremflickr.com/600/400/laboratory",
        "https://loremflickr.com/600/400/meat,processing"
      ]
    }
  },
  support: {
    title: "고객 지원",
    subtitle: "궁금하신 점이나 불편한 사항을 말씀해 주세요.",
    phone: "1588-0000",
    faqs: [
      { q: "배송은 얼마나 걸리나요?", a: "오후 2시 이전 주문 시 당일 발송되어 다음 날 받아보실 수 있습니다. (주말/공휴일 제외)" },
      { q: "보관은 어떻게 하나요?", a: "냉동 보관 상품입니다. 수령 즉시 냉동실(-18℃ 이하)에 보관해 주세요." },
      { q: "해동 방법이 궁금해요.", a: "조리 전날 냉장실로 옮겨 천천히 해동하시거나, 급하실 경우 찬물에 팩째 담가 해동해 주세요." },
      { q: "대량 구매 문의는 어디로 하나요?", a: "고객센터(1588-0000) 또는 1:1 문의 게시판을 통해 문의해 주시면 담당자가 안내해 드립니다." }
    ]
  },
  footer: {
    brand: "논산계룡축협 '차린'",
    description: "논산계룡축협은 지역 축산 농가와 상생하며, 엄격한 품질 관리를 통해 100% 우리 고기로 만든 건강한 먹거리를 전합니다. '차린'은 당신의 소중한 식탁을 위한 프리미엄 양념육 브랜드입니다.",
    customerCenter: {
      title: "고객센터",
      phone: "1588-0000",
      hours: "평일 09:00 ~ 18:00",
      lunch: "점심시간 12:00 ~ 13:00 (주말/공휴일 휴무)"
    },
    info: {
      copyright: "© 2026 논산계룡축협. All rights reserved.",
      address: "충청남도 논산시 중앙로 123 | 대표자: 홍길동 | 사업자등록번호: 123-45-67890\n통신판매업신고: 제2024-충남논산-0123호 | 개인정보보호책임자: 김철수"
    }
  }
};

interface ContentContextType {
  content: AppContent;
  updateContent: (path: string, value: any) => void;
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

  return (
    <ContentContext.Provider value={{ content, updateContent, storageError, clearStorage }}>
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) throw new Error('useContent must be used within ContentProvider');
  return context;
};
