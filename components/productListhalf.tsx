import { Product } from "@/lib/types";
import NoResult from "./ui/no-result";
import ProductCard from "./ui/product-card";
import getBillboard from '@/actions/get-billboard';
import HomeHalfBillboard from "./ui/homeHaldBillboard";

interface ProductListProps {
  title: string;
  items: Product[];
}

const ProductListHalf: React.FC<ProductListProps> =async ({
  title,
  items,
}) => {
  // Get the first 8 products and the rest
  const firstBatch = items.slice(0, 8);
  const remainingItems = items.slice(8);
  const homeImageUrl = await getBillboard("Home2");
  const homeImageUrls = await getBillboard("Home3");

  return (
    <div className="space-y-4 p-3">
      <h3 className="font-bold text-3xl">{title}</h3>
      {items.length === 0 && <NoResult />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Render the first 8 ProductCards */}
        {firstBatch.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      {/* Display Billboard component after first 8 items if there are more items */}
      {homeImageUrl && <HomeHalfBillboard imageUrl={homeImageUrl} />}
      {/* Render remaining ProductCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {remainingItems.map((item) => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
      {homeImageUrls && <HomeHalfBillboard imageUrl={homeImageUrls} />}
    </div>
  );
};

export default ProductListHalf;
