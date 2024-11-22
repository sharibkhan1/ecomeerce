import { Billboard as BillboardType } from "@/lib/types";

interface BillBoardProps{
    data:BillboardType
};

const Billboard:React.FC<BillBoardProps>=({
    data
})=>{
    return(
        
        // <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden " >
        <div className="pb-4 sm:pb-6 lg:pb-8 p-2 sm:p-3 lg:p-4 rounded-xl overflow-hidden " >
            <div className="rounded-xl relative bg-cover aspect-square md:aspect-[2.4/1] overflow-hidden "
            style={{backgroundImage:`url(${data.imageUrl})`,
            backgroundPosition: "center", // Ensure the image is centered
            backgroundSize: "cover",
            }} >
                <div className="h-full w-full flex flex-col justify-center items-center text-center gap-8  " >
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs " >
                        {data.label}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Billboard;