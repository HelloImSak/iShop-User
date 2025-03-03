import React from "react";
import CardDisCom from "../cart/CardDisCom";


export default function LayoutCardCom() {
  return (
    <main className="flex items-center justify-center ">
      <section className="grid grid-cols-3 shrink-0 mx-[100px] gap-[30px]">
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
        <CardDisCom />
      </section>
    </main>
  );
}
