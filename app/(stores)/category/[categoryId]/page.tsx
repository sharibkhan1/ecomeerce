import getProducts from "@/actions/ger-products";
import getCategory from "@/actions/get-category";
import Billboard from "@/components/ui/billboard";
import Cont from "@/components/ui/cont";
import NoResultCate from "@/components/ui/no-prod";
import NoResult from "@/components/ui/no-result";
import ProductCard from "@/components/ui/product-card";

export const revalidate = 0;

interface CategoryPageProps{
    params:{
        categoryId: string;
    },
    searchParams:{
        colorId:string;
        sizeId:string;
    }
}

const CategoryPage:React.FC<CategoryPageProps>= async({
    params,searchParams
})=>{


    const products = await getProducts({
        categoryId:params.categoryId,
        colorId:searchParams.colorId,
        sizeId:searchParams.sizeId,
    });
    const category = await getCategory(params.categoryId);

    return(
        <div className="bg-white dark:bg-[#09090B]" >
            
                {category ? <Billboard data={category?.billboard} /> : <NoResult/>}
                <Cont>
                <div className="px-4 sm:px-6 lg:px-8 pb-24 " >
                    <div className="lg:grid lg:grid-cols-4 lg:gap-x-8 " >
                        {/* <MobileFilter sizes={sizes} colors={colors}/>
                        <div className="hidden lg:block " >
                            <Filter
                                valueKey = "sizeId"
                                name="Sizes"
                                data={sizes}
                            />
                            <Filter
                                valueKey = "colorId"
                                name="Colors"
                                data={colors}
                            />
                        </div> */}
                        <div className="mt-6 lg:col-span-4 lg:mt-0 " >
                            {products.length === 0 && <NoResultCate/>}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 " >
                                {products.map((item)=>(
                                    <ProductCard
                                        key={item.id}
                                        data={item}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Cont>
        </div>
    )
}
export default CategoryPage;