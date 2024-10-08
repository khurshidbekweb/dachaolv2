export interface ChildProps {
    children: React.ReactNode
}

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
    images: string[],
    
}