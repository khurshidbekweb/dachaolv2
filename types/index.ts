export interface ChildProps {
    children: React.ReactNode
}

export type langKey = keyof footerLang

export interface language {
    image: string,
    id: string,
    code:string,
    title: string
}
export type footerLang = {
    uz: {
      link1: string;
      link2: string;
      link3: string;
    };
    ru: {
      link1: string;
      link2: string;
      link3: string;
    };
    en: {
      link1: string;
      link2: string;
      link3: string;
    };
  };

export interface cottage{
    id: string,
    name: string,
    images: image[],
    comforts: comfort[],
    cottageStatus: "confirmed" | 'progress',
    cottageType: cottageType[],
    description: string,
    latitude: string | null,
    longitude: string | null,
    place: place,
    price: number,
    priceWeekend: number,
    rating: string,
    status: string,
    region: region,
    user: user,
} 
 
export interface cottageTop {
  id:string,
  cottage: cottage,
  cottageId: string,
  createdAt: string,
  expireAt:string,
  priority: string,
  serviceCode: 'top' | 'recommended'
}

export interface image{
  id: string,
  cottageId: string,
  created_at: string,
  image: string,
  isMainImage: boolean,
  status: "active" | "inactive"
}
export interface comfort {
  id: string,
  image: string,
  name: string,
}
export interface cottageType{
  id: string,
  name: string,
}
export interface place {
  id: string,
  image: string,
  name: string,
  regionId: string,
}
export interface region {
  id: string,
  name: string,
}
export interface user {
  id: string,
  username: string | null,
  name: string | null,
  email: string | null,
  phone: string,
  image: string | null,
  password: string | null,
}

export interface breadcrambs {
  title: string,
  slug: string,
}

export interface services{
  id: string,
  name:string,
  description:string,
  serviceCode: 'recommended' | 'top',
  tariffs: tariff[],
  images: string[]
}

export interface tariff{
  id:string,
  description: string,
  service_id: string, 
  days:string,
  price: string
  type: string
  service: services
}
export interface order {
  id:string,
  cottageId:string,
  createdAt:string,
  expireAt:string,
  orderStatus:string,  
  tariff: tariff,
  status: 'active' | 'inactive',
  tariffId:string,
  userId:string,
}
