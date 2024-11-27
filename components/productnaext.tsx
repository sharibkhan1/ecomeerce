import getBillboard from '@/actions/get-billboard';
import HomeLAstBillboard from './ui/lstbill';


const ProductListHalfnext =async () => {
  const homeImageUrls = await getBillboard("Home3");
  const homeImageUrlss = await getBillboard("Home4");

  return (
    <div className="space-y-9 p-3">
      {homeImageUrls && <HomeLAstBillboard imageUrl={homeImageUrls} />}

      {homeImageUrlss && <HomeLAstBillboard imageUrl={homeImageUrlss} />}
    </div>
  );
};

export default ProductListHalfnext;
