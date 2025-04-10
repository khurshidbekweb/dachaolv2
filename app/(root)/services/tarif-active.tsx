import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { cottage, tariff } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ALL_DATA } from "@/Query/get_all";
import { paymiUtils } from "@/utils/paymi.utils";
import { QUERY_KEYS } from "@/Query/query-keys";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { OrderUtils } from "@/utils/order.utils";
import { TariffModalLanguage } from "@/constants/language";
import { useTranslation } from "react-i18next";

interface propsActive {
    open: boolean,
    onOpenChange: (open: boolean) => void
    tariff: tariff
}

export function ActivateTariffDialog({ open, onOpenChange, tariff, }: propsActive) {
    const userCottage = ALL_DATA.useCottageUser();
    const {t} = useTranslation()
    const [selectDacha, setSelectDacha] = useState("");
    const queryClient = useQueryClient()
    const route = useRouter()
    const backUrl = process.env.NEXT_PUBLIC_PAYME_URL
    const { isPending: isLoading } = useMutation({})

    const paymeIntegration = useMutation({
        mutationFn: paymiUtils.orderPaymi,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.tariff] });
            toast.success(t('success'));            
            setTimeout(()=>{
                onOpenChange(false)
                route.push(data.url)
            }, 200)
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
            paymeIntegration.mutate({
                orderId: data.id,
                url: backUrl
            })
        },
        onError: (err) => {
            toast.error('Xatolik mavjud');
            console.error(err);
        },
    });

    const handleActivate = () => {
        if (selectDacha) {
            addCottage.mutate({
                cottageId: selectDacha,
                tariffId: tariff.id
            })
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] rounded-lg">
                <DialogHeader className="p-1">
                    <DialogTitle className="text-lg font-semibold text-start">
                        {tariff?.type} tarifini faollashtirish
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Tarif parametrlari va muddatni tanlang
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900 text-lg">
                                {tariff?.type}
                            </h4>
                            <Badge variant="secondary" className="ml-2">
                                {tariff?.days} kun
                            </Badge>
                        </div>
                    </div>

                    {/* Muddatni tanlash */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            E`loningizni tanlang
                        </label>
                        <select
                            value={selectDacha}
                            onChange={(e) => setSelectDacha(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">E`lon tanlang</option>
                            {userCottage.data?.length &&
                                userCottage.data.map((el: cottage) => (
                                    <option key={el.id} value={el.id}>
                                        {el.name}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={handleActivate}
                        disabled={!selectDacha   || isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Faollashtirilmoqda...
                            </>
                        ) : (
                            "Faollashtirish"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}