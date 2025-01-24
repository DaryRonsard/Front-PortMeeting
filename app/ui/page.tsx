"use client"

import React from 'react'
import { FirstModal } from '@/components/ui/modal';
import TableUI from '@/components/ui/table';


const Page = () => {

    return (
        <div className="p-3">
           <FirstModal/>
           <TableUI/>
        </div>
    );
}

export default Page;
