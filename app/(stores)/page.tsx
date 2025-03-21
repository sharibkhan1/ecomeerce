import getProducts from '@/actions/ger-products';
import getBillboard from '@/actions/get-billboard';
import ProductListHalf from '@/components/productListhalf';
import ProductListHalfnext from '@/components/productnaext';
import Cont from '@/components/ui/cont';
import HomeBillboard from '@/components/ui/HomeBillboard';
import React from 'react';

export const revalidate = 0;

const StoreHome = async () => {
  // Fetch featured products
  const products = await getProducts({ isFeatured: true });

  // Fetch only the imageUrl of the "Home" billboard
  const homeImageUrl = await getBillboard("Home");
  const pHomeImageUrl = await getBillboard("PHome");

  return (
    <div className='dark:bg-[#09090B]  '>
      {/* Pass the fetched imageUrl to the Billboard component */}
      {pHomeImageUrl && (
        <div className='block md:hidden'>
          <HomeBillboard imageUrl={pHomeImageUrl} />
        </div>
      )}
      {homeImageUrl && (
        <div className='hidden md:block'>
          <HomeBillboard imageUrl={homeImageUrl} />
        </div>
      )}
      <Cont>
        <div className='space-y-10 pb-10 dark:text-white/90 '>
          <div className='flex-col flex gap-y-8 sm:px-6 lg:px-8'>
            <ProductListHalf title="Featured Products" items={products} />
          </div>
        </div>
      </Cont>
<ProductListHalfnext/>
    </div>
  );
};

export default StoreHome;
