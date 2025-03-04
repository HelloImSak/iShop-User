import React from "react";
import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import TeacherPhea from "../../assets/MentorImage/teacherPhea.png"
import TeacherPor from "../../assets/MentorImage/teacherPor.png"

const mentors = [
  {
    name: "Sin SreyPhea",
    role: "Mentor",
    image: TeacherPhea,
    social: {
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
  {
    name: "Sreng Chipor",
    role: "Mentor",
    image: TeacherPor, 
    social: {
      github: "#",
      linkedin: "#",
      facebook: "#",
    },
  },
];

const MentorsSection = () => {
  return (
    <section className="text-center py-8">
      <h2 className="text-4xl font-bold text-primary mb-10">Meet Our Mentors</h2>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 justify-center gap-14">
        {mentors.map((mentor, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-4">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-50 h-48 rounded-full object-cover mb-3"
            />
            <h3 className="text-lg font-semibold m-2">{mentor.name}</h3>
            <p className="text-primary text-sm mb-1">{mentor.role}</p>
            <div className="flex space-x-3 mt-2 text-gray-500">
                <a href={mentor.social.github} className="text-xl hover:text-gray-700"><FaGithub /></a>
                <a href={mentor.social.linkedin} className="text-xl hover:text-gray-700"><FaLinkedin /></a>
                <a href={mentor.social.facebook} className="text-xl hover:text-gray-700"><FaFacebook /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MentorsSection;
