import { TariffModalLanguage, TariffPageLanguage } from "@/constants/language";
import { ALL_DATA } from "@/Query/get_all";
import { QUERY_KEYS } from "@/Query/query-keys";
import useLanguageStore from "@/store/language-provider";
import { langKey, tariff } from "@/types";
import { OrderUtils } from "@/utils/order.utils";
import { paymiUtils } from '@/utils/paymi.utils'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";


interface Props {
  tariff: tariff,
  id: string
}

const TarifActive = (props: Props) => {
  const userCottage = ALL_DATA.useCottageUser();
  const activete = useRef<HTMLButtonElement>();
  const queryClient = useQueryClient();
  const store = useLanguageStore()
  const language = store.language as keyof langKey
  const route = useRouter()
  const backUrl = process.env.NEXT_PUBLIC_PAYME_URL
  const { t } = useTranslation()
  const paymeIntegration = useMutation({
    mutationFn: paymiUtils.orderPaymi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      toast.success(TariffModalLanguage[language]);
      route.push(data.url)
    },
    onError: (err) => {
      toast.error('Xatolik mavjud');
      console.error(err);
    },
  })

  const addCottage = useMutation({
    mutationFn: OrderUtils.activeOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
      toast.success(TariffModalLanguage[language]);
      paymeIntegration.mutate({
        orderId: data.id,
        url: backUrl
      })
      console.log(paymeIntegration.variables);
    },
    onError: (err) => {
      toast.error('Xatolik mavjud');
      console.error(err);
    },
  });


  const handleCottage = (e) => {
    e.preventDefault();
    addCottage.mutate({
      cottageId: e.target.tariff_cottage.value,
      tariffId: props.tariff.id,
    });
    console.log(addCottage.variables);
    activete.current.classList.remove("disabled");
  };


  return (
    <Dialog>
      <DialogTrigger className="dark:bg-secondary bg-gray-500 text-white w-[90%] absolute bottom-2 p-2 rounded-lg font-medium">
        {TariffPageLanguage.active[language]} {props.tariff.price} so`m
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-createRound">
            {TariffPageLanguage.mainTitle[language]}
          </DialogTitle>
          <DialogDescription>
          </DialogDescription>
          <div className="tarif-info text-light mx-auto text-center mt-3">
            {/* <p> ni <div> ga o'zgartirdim */}
            <div className="bg-slate-300 text-black text-2xl w-[50%] mx-auto p-2 text-center font-createRound rounded-full">
              {props.tariff.days} {TariffPageLanguage.day[language]}
            </div>
            <p className="text-2xl font-medium my-4">
              {TariffPageLanguage.price[language]}: {props.tariff.price} {t("moey_charge")}
            </p>
          </div>
          <Separator />
          <h5 className="text-xl font-createRound my-4">
            {TariffPageLanguage.selectCottage[language]}
          </h5>
          <form className="flex flex-col items-center" onSubmit={handleCottage}>
            <Select name="tariff_cottage">
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`${TariffPageLanguage.selectCottage[language]}`} />
              </SelectTrigger>
              <SelectContent>
                {userCottage.data?.length &&
                  userCottage.data.map((el) => (
                    <SelectItem key={el.id} value={el.id}>
                      {el.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <DialogClose asChild>
              <Button type="submit" ref={activete} className="w-[70%] mx-auto mt-4">
                {TariffPageLanguage.Activite[language]}
              </Button>
            </DialogClose>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>

  );
};

export default TarifActive;