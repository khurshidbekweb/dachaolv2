
import { IMG_BASE_URL } from "@/constants/server";
import { cottage } from "@/types";
import Image from "next/image";

interface Props{
    comforts: cottage
}
const ViewComforts = (props: Props) => {    
  return (
    <div className="flex flex-col space-y-2 md:flex-wrap ">
      {props?.comforts?.comforts?.length &&
        props?.comforts.comforts.map((e) => (
          <div key={e.id} className="view-facility1 flex items-center gap-2">
            <Image
              src={`${IMG_BASE_URL}${e.image}`}
              alt="img"
              width={30}
              height={30}
              className="bg-white"
            />
            <p title={e.name} className="text-[18px] font-medium">{e.name}</p>
          </div>
        ))}
    </div>
  );
};

export default ViewComforts;
