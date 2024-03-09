import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "../../../node_modules/swiper/swiper-bundle.min.css";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Priya Sharma",
    company: "EduTech Solutions",
    comment:
      "The quiz builder app has revolutionized our online learning platform. It's engaging and user-friendly!",
  },
  {
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "Rahul Patel",
    company: "TechGenius Innovations",
    comment:
      "Using the quiz builder app has streamlined our assessment process and improved employee knowledge retention.",
  },
  {
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Neha Gupta",
    company: "EventTech Conferences",
    comment:
      "The quiz builder app has added an interactive element to our conferences, making sessions more engaging and informative.",
  },
];

export default function () {
  return (
    <Swiper spaceBetween={30} slidesPerView={3}>
      {testimonials.map((testimonial, index) => (
        <SwiperSlide key={index}>
          <TestimonialCard {...testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
