import { useQuery } from "@tanstack/react-query";
import { cottageUtils } from "../utils/cottage.utils";
import { languageUtils } from "../utils/language.utils";
import { QUERY_KEYS } from "./query-keys";
import { placeUtils } from "../utils/place.utils";
import { regionUtils } from "../utils/region.utils";
import { comfortUtils } from "../utils/comfort.utils";
import { cottageTypeUtils } from "../utils/cottage-type.utils";
import { userUtils } from "../utils/user.utils";
import { notificationUtils } from "../utils/notification.utilis";
import { ServiceUtils } from "../utils/service.utils";
import { TariffUtils } from "../utils/tariff.utilis";
import { OrderUtils } from "../utils/order.utils";
import { safeLocalStorage } from "@/utils/safeLocalstorge";

export const ALL_DATA = {
  useCottage: () =>
    useQuery({
      queryKey: [QUERY_KEYS.cottages],
      queryFn: cottageUtils.getCottage,
    }),
  useCottageTop: () => {
    return useQuery({
      queryKey: [QUERY_KEYS.cottageTop],
      queryFn: cottageUtils.getCottageTop,
    });
  },
  useCottageByPlace: (placeId) => {
    const cottages = useQuery({
      queryKey: [QUERY_KEYS.cottages_by_place],
      queryFn: async () => await cottageUtils.getCottageByPlace(placeId),
    });

    const likedCottages = JSON.parse(safeLocalStorage.getItem("liked"));
    if (cottages.data?.length) {
      const data = cottages.data.map((e) => {
        if (likedCottages?.includes(e.id)) {
          return {
            ...e,
            isLiked: true,
          };
        } else {
          return {
            ...e,
            isLiked: false,
          };
        }
      });
      return { ...cottages, data: data };
    }
    return { ...cottages };
  },
  useCottageFilter: ({ type, place, price }) => {
    const filters = useQuery({
      queryKey: [QUERY_KEYS.cottage_by_filter, type, place, price],
      queryFn: async () => {
        const data = await cottageUtils.getCottageFilter({
          type,
          place,
          price,
        });
        return data;
      },
    });

    const likedCottages = JSON.parse(safeLocalStorage.getItem("liked"));
    if (filters.data?.length) {
      const data = filters.data.map((e) => {
        if (likedCottages?.includes(e.id)) {
          return {
            ...e,
            isLiked: true,
          };
        } else {
          return {
            ...e,
            isLiked: false,
          };
        }
      });
      return { ...filters, data: data };
    }
    return { ...filters };
  },
  useCottageByType: (type) =>
    useQuery({
      queryKey: [QUERY_KEYS.cottageType_by_Id],
      queryFn: async () => await cottageUtils.getCottageType(type),
    }),

  useCottageUser: () =>
    useQuery({
      queryKey: [QUERY_KEYS.cottages],
      queryFn: cottageUtils.getCottageUser,
    }),

  useCottageAllUserId: (userId) =>
    useQuery({
      queryKey: [QUERY_KEYS.cottageUserAllId],
      queryFn: async () => await cottageUtils.getCottageUserId(userId),
    }),
  useSearchCottage: (search) => {
    return useQuery({
      queryKey: ['search_cottage', search],
      queryFn: async () => await cottageUtils.getSearchCottage(search),
      enabled: !!search,
    })
  },
  useSuitableCottage: (id) =>
    useQuery({
      queryKey: [QUERY_KEYS.cottage_suitable_id, id],
      queryFn: async () => await cottageUtils.getSuitableCottage(id)
    }),
  useCottageTariffTop: (id) =>
    useQuery({
      queryKey: [QUERY_KEYS.cottage_by_isTop, id],
      queryFn: async () => await cottageUtils.getCottageTariffTop(id)
    }),
  useCottageRecommended: () =>
    useQuery({
      queryKey: [QUERY_KEYS.cottage_by_recommended],
      queryFn: cottageUtils.getCottageRecommended
    }),
  useLanguage: () =>
    useQuery({
      queryKey: [QUERY_KEYS.languages],
      queryFn: languageUtils.getLanguage,
    }),
  usePlace: () =>
    useQuery({
      queryKey: [QUERY_KEYS.places],
      queryFn: placeUtils.getPlace,
    }),
  useRegion: () =>
    useQuery({
      queryKey: [QUERY_KEYS.regions],
      queryFn: regionUtils.getRegion,
    }),
  useComforts: () =>
    useQuery({
      queryKey: [QUERY_KEYS.comforts],
      queryFn: comfortUtils.getComfort,
    }),
  useCottageType: () =>
    useQuery({
      queryKey: [QUERY_KEYS.cottageType],
      queryFn: cottageTypeUtils.getCottageType,
    }),
  useUsers: () =>
    useQuery({
      queryKey: [QUERY_KEYS.users],
      queryFn: userUtils.getUsers,
    }),
  useSingleUser: () =>
    useQuery({
      queryKey: [QUERY_KEYS.users],
      queryFn: userUtils.getSingleUser,
    }),
  useCottageUserById: (userID) =>
    useQuery({
      queryKey: [QUERY_KEYS.userCottageUser],
      queryFn: async () => await userUtils.getCottageUserById(userID),
    }),

  useNotificationUser: (userId) =>
    useQuery({
      queryKey: [QUERY_KEYS.notification, userId],
      queryFn: async () => {
        const data = await notificationUtils.getUserNotification(userId);
        return data;
      },
    }),

  useAllNotification: () =>
    useQuery({
      queryKey: [QUERY_KEYS.all_notification],
      queryFn: async () => {
        const data = await notificationUtils.getNotification();
        return data;
      },
    }),

  useServices: () =>
    useQuery({
      queryKey: [QUERY_KEYS.services],
      queryFn: async () => {
        const data = await ServiceUtils.getService();
        return data;
      },
    }),

  useTariff: () =>
    useQuery({
      queryKey: [QUERY_KEYS.tariff],
      queryFn: async () => {
        const data = await TariffUtils.getTariff();
        return data;
      },
    }),
  useTarifId: (tarifId) =>
    useQuery({
      queryKey: [QUERY_KEYS.servicesId, tarifId],
      queryFn: async () => await ServiceUtils.getServiceId(tarifId)
    }),
  useOrder: () =>
    useQuery({
      queryKey: [QUERY_KEYS.order],
      queryFn: OrderUtils.getOrder
    }),
  usePlaceById: (id) =>
    useQuery({
      queryKey: [QUERY_KEYS.place_by_id, id],
      queryFn: async () => await placeUtils.getPlaceById(id),
      enabled: Boolean(id)
    })
};
