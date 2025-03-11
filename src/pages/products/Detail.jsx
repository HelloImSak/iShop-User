import React from 'react'
import { useParams } from 'react-router'
import { useGetByUuidQuery } from '../../redux/service/product/productSlice';
import ProductDetail from './ProductDetail';

export default function Detail() {        
    const {uuid} = useParams();
    const { data, isLoading, isError } = useGetByUuidQuery(uuid);        
  return (
    <ProductDetail
      images={data?.color?.images}
      category={data?.category?.name}
      title={data?.name}
      availability="In Stock"
      brand={data?.brand?.name}
      price={data?.priceOut}
      originalPrice={1999.0}
      description="The most powerful MacBook Pro ever is here..."
      colors={["Space Gray", "Silver"]}
      sizes={[
        "14-inch Liquid Retina XDR Display",
        "13-inch Liquid Retina Display",
      ]}
      memoryOptions={["16GB Unified Memory", "8GB Unified Memory"]}
      storageOptions={["1TB SSD Storage", "256GB SSD Storage"]}
    />
  );
}
