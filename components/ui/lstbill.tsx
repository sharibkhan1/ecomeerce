// components/ui/billboard.tsx
interface BillBoardProps {
    imageUrl: string;
  }
  
  const HomeLAstBillboard: React.FC<BillBoardProps> = ({ imageUrl }) => {
    return (
      <div className="pb-4 sm:pb-6 lg:pb-8 rounded-xl overflow-hidden">
        <div
          className="rounded-xl relative h-[30rem] bg-cover overflow-hidden"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="h-48 sm:h-60 md:h-80 lg:h-80 aspect-square md:aspect-[2.4/1]"></div>
        </div>
      </div>
    );
  };
  
  export default HomeLAstBillboard;
  