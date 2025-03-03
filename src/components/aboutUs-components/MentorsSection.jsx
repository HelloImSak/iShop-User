import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
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
      website: "#",
    },
  },
  {
    name: "Sreng Chipor",
    role: "Mentor",
    image: TeacherPor, 
    social: {
      github: "#",
      linkedin: "#",
      website: "#",
    },
  },
];

const MentorsSection = () => {
  return (
    <section className="text-center py-8">
      <h2 className="text-2xl font-bold text-primary mb-6">Meet Our Mentors</h2>
      <div className="flex justify-center gap-14">
        {mentors.map((mentor, index) => (
          <div key={index} className="flex flex-col items-center bg-white p-4">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="w-40 h-40 rounded-full object-cover"
            />
            <h3 className="text-lg font-semibold mt-2">{mentor.name}</h3>
            <p className="text-primary text-sm">{mentor.role}</p>
            <div className="flex space-x-3 mt-2 text-gray-500">
                <a href={mentor.social.github} className="hover:text-gray-700"><FaGithub /></a>
                <a href={mentor.social.linkedin} className="hover:text-gray-700"><FaLinkedin /></a>
                <a href={mentor.social.website} className="hover:text-gray-700"><FaGlobe /></a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MentorsSection;
