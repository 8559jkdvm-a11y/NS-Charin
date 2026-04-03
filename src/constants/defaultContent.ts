export const CONTENT_VERSION = "1.0.1";

export const defaultContent = {
  version: CONTENT_VERSION,
  header: {
    logo: "/logo.png",
    cta: "특가 구매하기"
  },
  main: {
    hero: {
      badge: "논산계룡축협 직영 브랜드",
      title: "우리 아이를 위한\n건강한 고기 요리, 차린",
      description: "축협이 직접 관리하는 100% 한돈·한우로 만든\n프리미엄 양념육을 집에서 간편하게 만나보세요.",
      cta: "특가 구매하기",
      secondaryCta: "브랜드 스토리",
      bgImage: "https://picsum.photos/seed/meat/1920/1080",
    },
    painPoints: {
      title: "바쁜 일상 속, 아이 식단 고민되시죠?",
      items: [
        { title: "조리 시간 단축", desc: "양념까지 완벽하게! 10분이면 훌륭한 고기 요리가 완성됩니다." },
        { title: "믿을 수 있는 원육", desc: "논산계룡축협이 엄선한 1등급 한돈과 한우만을 사용합니다." },
        { title: "건강한 레시피", desc: "인공 감미료를 줄이고 천연 과일즙으로 맛을 내어 자극적이지 않습니다." }
      ]
    },
    features: {
      feature1: {
        badge: "TRUSTED QUALITY",
        title: "축협이 보증하는\n압도적인 신선함",
        desc: "도축부터 가공, 양념까지 원스톱 시스템으로\n가장 신선한 상태의 고기를 전달합니다.",
        image: "https://picsum.photos/seed/fresh/800/600",
        list: ["HACCP 인증 시설 제조", "축산물 이력제 100% 적용"]
      },
      feature2: {
        badge: "PREMIUM TASTE",
        title: "아이들이 먼저 찾는\n부드러운 감칠맛",
        desc: "수만 번의 테스트를 거친 황금 비율 양념으로\n고기 본연의 맛과 부드러운 식감을 살렸습니다.",
        image: "https://picsum.photos/seed/taste/800/600",
        quote: "까다로운 엄마들이 먼저 알아본 건강한 레시피"
      }
    },
    socialProof: {
      title: "이미 많은 부모님들이 경험하셨습니다",
      rating: "평균 만족도 4.9 / 5.0",
      reviews: [
        { name: "김*희 님", content: "맞벌이라 저녁 준비가 늘 전쟁이었는데, 차린 덕분에 10분 만에 훌륭한 식탁이 완성돼요. 아이가 너무 잘 먹어서 뿌듯합니다.", tag: "워킹맘" },
        { name: "이*준 님", content: "고기 질이 확실히 달라요. 축협 제품이라 믿고 샀는데 양념도 자극적이지 않고 고기가 정말 부드럽네요. 재구매 의사 200%입니다.", tag: "요리하는 아빠" },
        { name: "박*연 님", content: "캠핑 갈 때 가져갔는데 인기 폭발이었어요! 포장도 깔끔하고 조리가 간편해서 야외에서도 셰프 소리 들었네요.", tag: "캠핑 매니아" }
      ]
    },
    promotion: {
      title: "지금 바로\n차린의 맛을 경험하세요",
      badge: "첫 구매 한정 혜택",
      priceOriginal: "25,000원",
      priceDiscount: "9,900원",
      cta: "9,900원에 시작하기"
    }
  },
  details: {
    title: "상세정보",
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
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
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
    brand: "논산계룡축협 차린",
    description: "축협이 직접 관리하고 보증하는 프리미엄 양념육 브랜드.\n우리 가족의 건강한 식탁을 위해 가장 신선한 고기만을 전합니다.",
    customerCenter: {
      title: "고객센터",
      phone: "1588-0000",
      hours: "평일 09:00 - 18:00",
      lunch: "점심시간 12:00 - 13:00"
    },
    info: {
      copyright: "© 2024 Nonsan Gyeryong Livestock Cooperative. All rights reserved.",
      address: "충청남도 논산시 중앙로 251 | 대표자: 임영봉 | 사업자번호: 308-82-00000"
    }
  }
};
