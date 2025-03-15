import React from "react";
import MentorsSection from "../components/aboutUs-components/MentorsSection";
import TeamsSection from "../components/aboutUs-components/TeamsSection";
import TestimonialSection from "../components/aboutUs-components/TestimonialSection";
import AssuranceSection from "../components/home-components/AssuranceSection";
import Banner from "../components/aboutUs-components/Banner";
export default function About() {
  return (
    <div className="pt-40 space-y-10 ">
      <Banner />
      <main className="max-w-screen-2xl mx-auto md:px-[50px] xl:px-[100px]">
        <AssuranceSection />
        <MentorsSection />
        <TeamsSection />
        <TestimonialSection />
      </main>
    </div>
  );
}
