import getProducts from '@/actions/ger-products';
import getBillboard from '@/actions/get-billboard';
import ProductListHalf from '@/components/productListhalf';
import Cont from '@/components/ui/cont';
import HomeBillboard from '@/components/ui/HomeBillboard';
import React from 'react';

export const revalidate = 0;

const StoreHome = async () => {
  // Fetch featured products
  const products = await getProducts({ isFeatured: true });

  // Fetch only the imageUrl of the "Home" billboard
  const homeImageUrl = await getBillboard("Home");

  return (
    <div className='dark:bg-black/90'>
      {/* Pass the fetched imageUrl to the Billboard component */}
      {homeImageUrl && <HomeBillboard imageUrl={homeImageUrl} />}

      <Cont>
        <div className='space-y-10 pb-10 dark:text-white/90 '>
          <div className='flex-col flex gap-y-8 sm:px-6 lg:px-8'>
            <ProductListHalf title="Featured Products" items={products} />
          </div>
        </div>
      </Cont>
    </div>
  );
};

export default StoreHome;
