import getBillboard from '@/actions/get-billboard';
import HomeLAstBillboard from './ui/lstbill';


const ProductListHalfnext =async () => {
  const homeImageUrls = await getBillboard("Home3");
  const homeImageUrlss = await getBillboard("Home4");
  const phomeImageUrlss = await getBillboard("PHome3");
  const phomeImageUrls = await getBillboard("PHome4");

  return (
    <div className="space-y-9 p-3">
      {homeImageUrls &&(
  <div className='hidden md:block'>
    <HomeLAstBillboard imageUrl={homeImageUrls} />
  </div>
)}
      {phomeImageUrlss &&(
  <div className='block md:hidden  '>
    <HomeLAstBillboard imageUrl={phomeImageUrlss} />
  </div>
)}


{homeImageUrlss &&(
  <div className='hidden md:block'>
    <HomeLAstBillboard imageUrl={homeImageUrlss} />
  </div>
)}
      {phomeImageUrls &&(
  <div className='block md:hidden  '>
    <HomeLAstBillboard imageUrl={phomeImageUrls} />
  </div>
)}
    </div>
  );
};

export default ProductListHalfnext;
