import React from 'react';
import BillBoardClient from './_components/client';
import db from '@/lib/db';
import { BillboardColumn } from './_components/columns';
import { format } from 'date-fns';

const BillBoardPage = async ({ params }: { params: { storeId: string } }) => {
  const billboards = await db.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillBoards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillBoards} />
      </div>
    </div>
  );
};

export default BillBoardPage;
