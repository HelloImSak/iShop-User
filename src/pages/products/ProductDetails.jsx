import React from "react";
import { useParams } from "react-router";

export default function ProductDetails() {
    const {id} = useParams();
  return <div className="h-screen flex items-center justify-center font-OpenSanBold text-4xl">{id}</div>;
}
