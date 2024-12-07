
import { IMG_BASE_URL } from "@/constants/server";
import { cottage } from "@/types";
import Image from "next/image";

interface Props{
    comforts: cottage
}
const ViewComforts = (props: Props) => {    
  return (
    <div className="flex flex-wrap items-center gap-3">
      {props?.comforts?.comforts?.length &&
        props?.comforts.comforts.map((e) => (
          <div key={e.id} className="view-facility1 flex items-center gap-2">
            {/* <Image
              src={`${IMG_BASE_URL}${e.image}`}
              alt="img"
              width={30}
              height={30}
              className="bg-white"
            /> */}
            <p title={e.name} className="text-[16px] border rounded-lg bg-secondary p-2">{e.name}</p>
          </div>
        ))}
    </div>
  );
};

export default ViewComforts;
