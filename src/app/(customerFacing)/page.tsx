import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import db from '@/db/db'
import { Product } from '@prisma/client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React, { Suspense } from 'react'

const HomePage = () => {
  return (
    <main className='space-y-12'>
      <ProductGridSection title="Most popular" productsFetcher={getMostPopularProducts}/>
      <ProductGridSection title="Newest" productsFetcher={getNewestProducts}/>
    </main>
  )
}

export default HomePage

function getNewestProducts(){
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  })
}

type ProductGridSectionProps = {
  title: string,
  productsFetcher: () => Promise<Product[]>
}

function getMostPopularProducts(){
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
    take: 6,
  })
}

async function ProductGridSection({ productsFetcher, title }: ProductGridSectionProps){
  return(
  <div className='space-y-4'>
    <div className='flex gap-4'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <Button variant="outline" asChild>
          <Link href="/products" className='space-x-2'>
            <span>View All</span>
            <ArrowRight className='size-4' />
          </Link>
        </Button>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <Suspense 
        fallback={
          <>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense productsFetcher={productsFetcher} />
      </Suspense>
    </div>
  </div>
  )
}

async function ProductSuspense({ productsFetcher }: { productsFetcher: () => Promise<Product[]> }){
  return (await productsFetcher()).map(product => (
    <ProductCard key={product.id} {...product}/>
  ))
}