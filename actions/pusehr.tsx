import { useEffect, useState } from 'react';
import Pusher from 'pusher-js';

const useRealTimeStockUpdates = (productId: string) => {
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    // Initialize Pusher and subscribe to the relevant channel and event
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_APP_KEY!, {
      cluster: "ap2",
    });

    const channel = pusher.subscribe('product-channel');
    
    channel.bind('stock-updated', (data: { productId: string; newStock: number }) => {
      if (data.productId === productId) {
        setStock(data.newStock); // Update the stock value in the state
      }
    });

    // Clean up the connection when the component unmounts
    return () => {
      pusher.unsubscribe('product-channel');
    };
  }, [productId]);

  return stock;
};

export default useRealTimeStockUpdates;
