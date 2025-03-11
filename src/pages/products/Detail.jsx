import React from 'react'
import { useParams } from 'react-router'
import { useGetByUuidQuery } from '../../redux/service/product/productSlice';

export default function Detail() {        
    const {uuid} = useParams();
    const { data, isLoading, isError } = useGetByUuidQuery(uuid);        
  return (
    <div className="h-screen flex items-center">
      Uuid: {data?.uuid}
      Name: {data?.name}
    </div>
  );
}
