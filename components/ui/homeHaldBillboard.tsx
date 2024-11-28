// components/ui/billboard.tsx
interface BillBoardProps {
  imageUrl: string;
}

const HomeHalfBillboard: React.FC<BillBoardProps> = ({ imageUrl }) => {
  return (
    <div className="pb-4 sm:pb-6 lg:pb-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative overflow-hidden"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center', // Ensures the image is centered
        }}
      >
        {/* Adjust the aspect ratio dynamically based on screen size */}
        <div className="h-48 sm:h-60 md:h-72 lg:h-80 
                        w-full 
                        aspect-[2/1] sm:aspect-[3/2] md:aspect-[2.4/1]">
        </div>
      </div>
    </div>
  );
};

export default HomeHalfBillboard;
