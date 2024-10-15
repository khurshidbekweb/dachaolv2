import { footerLang } from "@/types";
import { v4 as uuidv4 } from "uuid";

export const NavLeng = {
  uz: {
    connection: "Kontakt",
    set: "Ijtimoiy tarmoqlar",
  },
  ru: {
    connection: "Контакт",
    set: "Социальный сети",
  },
  en: {
    connection: "Contact",
    set: "Social networks",
  },
};

export const HeaderLang = {
  uz: {
    title: "Shaxsiy dacha",
    btn: "Ko'rish",
  },
  ru: {
    title: "Шейхская резиденция",
    btn: "Просмотреть",
  },
  en: {
    title: "Sheikh's residence",
    btn: "View",
  },
};

export const NavberLinks = {
  uz: {
    add: "E'lon qo'shish",
    cottage: "Mening dachalarim",
    profil: "Profil",
    services: "Xizmatlar",
    exit: "Chiqish",
  },
  ru: {
    add: "Подать объявление",
    cottage: "Мои объявлении",
    profil: "Профиль",
    services: "Услуги",
    exit: "Выход",
  },
  en: {
    add: "Post an add",
    cottage: "My ads",
    profil: "Profile",
    services: "Services",
    exit: "Log Out",
  },
};

export const PlaseLeng = {
  uz: "Dam olish maskanlari",
  ru: "Месты Отдыха",
  en: "Vacation Place",
};

export const RecamudetLeng = {
  uz: "Tavsiya etilgan",
  ru: "Рекомендуемые",
  en: "Recommended",
};
export const showMoreInfo = {
  uz: "Ko'proq ko'rish",
  ru: "Показать больше",
  en: "Show more",
}
// ============================== Filter language
export const FilterSectionLeng = {
  uz: "Filter bo'limi",
  ru: "Раздел Фильтр",
  en: "Filter section",
};

export const FilterLeng = {
  uz: {
    place: "Joylashuv",
    tip: "Dacha turi",
    price: "Narxi",
  },
  ru: {
    place: "Расположение",
    tip: "Тип отдыха",
    price: "Цена",
  },
  en: {
    place: "Location",
    tip: "Cottage type",
    price: "Price",
  },
};

export const CottageLeng = {
  uz: {
    region: "viloyati",
    price: "Kunlin narx: ",
    weekendPrice: "Dam olish kunlari uchun narx: ",
    btn: "Ko'rish",
  },
  ru: {
    region: "область",
    price: "Цена За День: ",
    weekendPrice: "Цена За Выходной День: ",
    btn: "Подробное",
  },
  en: {
    region: "region",
    price: "Price per Day: ",
    weekendPrice: "Price per Weekend: ",
    btn: "View ",
  },
};

// =============================== Servises language
export const ProfileLeng = {
  uz: {
    text: "Profil",
    btn: "Saqlash",
  },
  ru: {
    text: "Профиль",
    btn: "Сохранить",
  },
  en: {
    text: "Profile",
    btn: "Save",
  },
};

// =============================== Footer language
export const FooterLink1 = [
  {
    id: uuidv4(),
    content: {
      uz: "Ko'p so'raladigan savollar",
      ru: "Часто задаваемые вопросы",
      en: "FAQ",
    },
  },
  {
    id: uuidv4(),
    content: {
      uz: "Bizning kontaktlarimiz",
      ru: "Наши контакты",
      en: "Our contacts",
    },
    to: "/",
  },
];

export const FooterLink2 = [
  {
    id: uuidv4(),
    content: {
      uz: "Biz haqimizda",
      ru: "О нас",
      en: "About",
    },
    to: "",
  },
  {
    id: uuidv4(),
    content: {
      uz: "Foydalanish shartlari",
      ru: "Пользовательское соглашение",
      en: "Terms of use",
    },
    to: "/",
  },
  {
    id: uuidv4(),
    content: {
      uz: "Maxviylik siyosati",
      ru: "Политика конфиденциальности",
      en: "Privacy Policy",
    },
    to: "/",
  },
];

export const FooterLink3 = [
  {
    id: uuidv4(),
    content: {
      uz: "Dacha",
      ru: "Дачи",
      en: "Cottage",
    },
    to: "#dacha",
  },
  {
    id: uuidv4(),
    content: {
      uz: "Baliq ovlash joylari",
      ru: "Месты рыбалки",
      en: "Place Fishing",
    },
    to: "#place",
  },
  {
    id: uuidv4(),
    content: {
      uz: "Piknik joylari",
      ru: "Месты пикник",
      en: "PLace Picnic",
    },
    to: "#palce",
  },
];

export const FooterHeadLeng = {
  uz: {
    link1: "Qo'llab-quvvatlash",
    link2: "Kompaniya",
    link3: "Hamkorlik",
  },
  ru: {
    link1: "Поддержка",
    link2: "Компания",
    link3: "Cотрудничество",
  },
  en: {
    link1: "Support",
    link2: "Company",
    link3: "Cooperation",
  },
};

export const FooterMiniLang = {
  uz: "Toshkent, Amir Temur 7",
  ru: "Ташкент, Амир Tемура  7",
  en: "Tashkent, Amir Temur 7",
};

export const FilterNotFound = {
  uz: "Dacha topilmadi",
  ru: "Коттедж не найден",
  en: "Cottage not found",
};

export const fovariteLang = {
  uz: "Hozirda dachalar mavjud emas",
  ru: "Нет любимых коттеджей  ",
  en: "Don't have favorite cottages",
};
export const notificationLang = {
  uz: "Bildirishnomalar",
  ru: "Уведомления",
  en: "Notifications",
};
export const userCottageSingle = {
  uz: "ning dachalari",
  ru: " kоттеджe",
  en: "'s Cottage",
};
export const exitLang = [
  {
    uz: "Chiqish",
    ru: "Выход",
    en: "Exit",
  },
  {
    uz: "Kirish",
    ru: "Вход",
    en: "Log in",
  },
];

export const ViewPageLanguage = {
  contactUser: {
    uz: "Foydalanuvchi",
    en: "User",
    ru: "Пользователь",
  },
  announcement: {
    uz: "Barcha e'lonlar",
    ru: "Все объявления",
    en: "All ads",
  },
  userContact: {
    uz: "Telefon qilish",
    ru: "Телефон",
    en: "Phone",
  },
  aboutCottage: {
    uz: "Dam olish maskani haqida",
    ru: "О коттедже",
    en: "About Cottage",
  },
  allComfort: {
    uz: "Barcha qulayliklar",
    ru: "Все удобства",
    en: "All Comforts",
  },
};

export const AddNewPageLanguage = {
  maintitle: {
    uz: "Rasm",
    ru: "Фото",
    en: "Photo",
  },
  addPhoto: {
    uz: "Rasm qo'shish",
    ru: "Добавить фото",
    en: "Add photo",
  },
  mainPhoto: {
    uz: "Asosiy",
    ru: "Главный",
    en: "Main",
  },
  typeCottage: {
    uz: "Mintaqa va dam olish turi",
    ru: "Регион и тип отдыха",
    en: "Region and type of holiday",
  },
  cottageName: {
    uz: "Kottej nomi",
    ru: "Название коттеджа",
    en: "Cottage name",
  },
  region: {
    uz: "Viloyat",
    ru: "Область",
    en: "Region",
  },
  Place: {
    uz: "Joylashuv",
    ru: "Место",
    en: "Place",
  },
  Price: {
    uz: "Narxi",
    ru: "Цена",
    en: "Price",
  },
  weekendPrice: {
    uz: "Hafta oxiridagi narxi",
    ru: "Цена выходного дня",
    en: "Weekend price",
  },
  dachaType: {
    uz: "Dacha turi",
    ru: "Тип коттеджа",
    en: "Type of Cottage",
  },
  comforts: {
    uz: "Qulayliklar",
    ru: "Комфорт",
    en: "Comforts",
  },
  description: {
    uz: "Tavsifi",
    ru: "Описание",
    en: "Description",
  },
  shortDescription: {
    uz: "Joyingizni qisqacha tasvirlab bering",
    ru: "Кратко опищите о вашый месте",
    en: "Describe your place",
  },
  save: {
    uz: "Saqlash",
    ru: " Сохранить",
    en: "Save",
  },
  name: {
    uz: "Nomi",
    ru: "Имя",
    en: "Name",
  },
  cottageSuccess: {
    uz: "Kottej muvaffaqiyatli qo'shildi",
    ru: "Коттедж успешно добавлен",
    en: "Cottage added successfully",
  },
  cottageError: {
    uz: "Xatolik",
    ru: "Ошибка",
    en: "Something went wrong",
  },
};

export const AnnouncementPageLanguage = {
  noAnnouncement: {
    uz: "Hozircha siz e'lon bermagansiz",
    ru: "Вы еще не опубликовали",
    en: "You have not posted yet",
  },
  myannouncement: {
    uz: "Mening e'lonlarim",
    ru: "Мои объявлении",
    en: "My ads",
  },
};

export const ProfilePageLanguage = {
  profile: {
    uz: "Profil",
    ru: "Профиль",
    en: "Profile",
  },
  services: {
    uz: "Xizmatlar",
    en: "Services",
    ru: "Услуги",
  },
  myCottage: {
    uz: "Mening kottejlarim",
    ru: "Мои коттеджи",
    en: "My cottages",
  },
  number: {
    uz: "Nomer",
    ru: "номер",
    en: "Number",
  },
  order: {
    uz: "Foydalangan tariflarim",
    ru: "Мои использованные тарифы",
    en: "My rates used",
  }
};

export const ServicesPageLanguage = {
  mainTitle: {
    uz: "Xizmatlar",
    ru: "Услуги",
    en: "Services",
  },
  viewTariff: {
    uz: "Ko'rish",
    ru: "Просмотры",
    en: "View",
  },
};

export const TariffPageLanguage = {
  mainTitle: {
    uz: "Ta'riflar",
    ru: "Тарифы",
    en: "Tariffs",
  },
  day: {
    uz: "kun",
    ru: "дней",
    en: "days",
  },
  active: {
    uz: "Faollashtirish",
    ru: "Активировать за",
    en: "Activate for",
  },
  price: {
    uz: "Narxi",
    ru: "Цена",
    en: "Price",
  },
  selectCottage: {
    uz: "Dachani tanlang",
    ru: "Выбрать коттедж",
    en: "Select Cottage",
  },
  Activite: {
    uz: "Faollashtirish",
    ru: "Активит",
    en: " Activite",
  },
};

export const signInLanguage = {
  login: {
    uz: "Kirish",
    ru: "Вход",
    en: "Log in",
  },
  phone: {
    uz: "Raqamizni kiriting",
    ru: "Введите свой телефон",
    en: "Enter your phone",
  },
  enter: {
    uz: "Kirish",
    ru: "Войти",
    en: "Log In",
  },
  smsCode: {
    uz: "sms kod",
    ru: "смс-код",
    en: "sms code",
  },
  smsError: {
    uz: "SMS kod noto'gri !!!",
    ru: "СМС-код неверен.",
    en: "code is incorrect",
  },
  successLogin: {
    uz: "Muvaffaqiyatli",
    ru: "Успешно",
    en: "Successfully",
  },
  numberError: {
    uz: "Raqam noto'g'ri kiritilgan",
    ru: "Номер неверный",
    en: "Number is incorrect",
  },
};

export const MenuLanguage = {
  uz: "Menu",
  ru: "Меню",
  en: "Menu",
};

export const TariffModalLanguage = {
  uz: "Tarif muvaffaqiyatli faollashtirildi",
  ru: "Тариф успешно активирован",
  en: "The tariff has been successfully activated",
};

export const VacationLanguage = {
  uz: "Bu joylashuvda dacha yoq",
  ru: "Коттеджа в этом месте нет.",
  en: "Cottage is not available in this place",
};


export const ViewLanguage = {
  uz: "viloyati",
  ru: "область",
  en: "region",
};
export const notPlace = {
  uz: "Bu dam olish maskanida dacha topilmadi ",
  ru: "На этом курорте коттеджей не найдено ",
  en: "No cottages found in this resort ",
};

export const notificationLanguage = {
  uz: "Bildirishnomalar mavjud emas",
  ru: "Нет уведомлений",
  en: "There are no notifications",
};
