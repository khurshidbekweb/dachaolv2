import type { Metadata } from "next";
import "./globals.css";
import { ChildProps } from "../types";
import RootLayoutClient from "@/components/providers/root-layout";
import NextTopLoader from 'nextjs-toploader';


export const metadata: Metadata = {
  metadataBase: new URL('https://dachaol.uz'),
  title: "DachaOL | Uylar",
  description: "DachaOl.uz — O'zbekistondagi eng yaxshi dacha va uy-joy topish platformasi. Arzon narxlarda dacha ijarasi va sotuvlari, shuningdek, turar joy tanlash bo'yicha keng imkoniyatlar. Yangi dacha topish yoki uni sotish uchun DachaOl.uz saytida ro'yxatdan o'ting va qulay shartlarda bitimlar amalga oshiring. Oson qidiruv, ko'plab variantlar va ishonchli dacha bozorining eng so'nggi yangiliklari shu yerda!",
  authors: [{ name: 'Khurshidbek', url: 'https://dachaol.uz' }],
  keywords: "dacha ijara O'zbekiston, dachaol, dacha, dachi, dacha sotish O'zbekiston, arzon dacha ijarasi, uy-joy ijara Tashkent, uy sotish O'zbekiston, dam olish uylari O'zbekiston, dacha qidirish Tashkent, O'zbekistonda uy sotib olish, dacha bozori O'zbekiston, uy ijarasi Toshkent, dam olish uchun uylar, dacha sotib olish, uy-joy ijarasi O'zbekistonda, Toshkentda dacha topish, dacha narxlari O'zbekiston, qulay dacha ijarasi, shahar tashqarisidagi uylar",
  icons: { icon: '/favicon.png' },
  openGraph: {
		title: 'DachaOL | Uylar',
		description:
			"DachaOl.uz — O'zbekistondagi eng yaxshi dacha va uy-joy topish platformasi. Arzon narxlarda dacha ijarasi va sotuvlari, shuningdek, turar joy tanlash bo'yicha keng imkoniyatlar. Yangi dacha topish yoki uni sotish uchun DachaOl.uz saytida ro'yxatdan o'ting va qulay shartlarda bitimlar amalga oshiring. Oson qidiruv, ko'plab variantlar va ishonchli dacha bozorining eng so'nggi yangiliklari shu yerda!",
		type: 'website',
		url: 'https://dachaol.uz',
		locale: 'en_EN',
		images: 'https://media.graphassets.com/kXL006lyRnW46IKTHdHs',
		countryName: 'Uzbekistan',
		siteName: 'DachaOL',
		emails: 'khurshidbeknuriddinov@gmail.com',
	},
};

function RootLayout({children}: ChildProps) {  
  return <html lang="en">
        <body>
          {/* Bu yerda klientga xos RootLayoutClient komponentini render qilamiz */}
          <RootLayoutClient>
            <NextTopLoader showSpinner={false}/>
            {children}
          </RootLayoutClient>
        </body>
      </html>
}

export default RootLayout;
