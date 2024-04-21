import React from 'react'
import PageHeader from '../_components/PageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const AdminProductsPage = () => {
  return (
    <>
    <div className='flex justify-between items-center gap-4'>
        <PageHeader>Products</PageHeader>
        <Button asChild>
            <Link href="/admin/products/new">Add Product</Link>
        </Button>
    </div>
    <ProductsTable />
    </>
  )
}

export default AdminProductsPage

function ProductsTable(){
    return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead className='w-0'>
                    <span className='sr-only'>Avaiable For Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className='w-0'>
                    <span className='sr-only'>Actions</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            
        </TableBody>
    </Table>
    )
}