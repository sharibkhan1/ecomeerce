// components/ui/billboard.tsx
interface BillBoardProps {
    imageUrl: string;
  }
  
  const HomeBillboard: React.FC<BillBoardProps> = ({ imageUrl }) => {
    return (
      <div className="pb-4 sm:pb-6 lg:pb-8 p-2 sm:p-3 lg:p-4 rounded-xl overflow-hidden">
              <div
        className="rounded-xl relative bg-cover aspect-[2/3] md:aspect-[2.4/1] overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',        // Ensure image covers the entire container
          backgroundPosition: 'center',   // Center the image
          backgroundRepeat: 'no-repeat',  // Prevent image repetition
        }}
      >
        </div>
      </div>
    );
  };
  
  export default HomeBillboard;
  