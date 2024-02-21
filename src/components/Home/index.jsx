import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions";
import { Link } from "react-router-dom";
import { APP_ROUTES } from "../../utils";
import { Button } from "@mui/base";
import HeroImg from "./images/heroImg.svg";
import Feature1Img from "./images/feature1.svg";
import Feature2Img from "./images/feature2.svg";
import Feature3Img from "./images/feature3.svg";
import Feature4Img from "./images/feature4.svg";
import Feature5Img from "./images/feature5.svg";
import Feature6Img from "./images/feature6.svg";
import AIModeImg from "./images/AIMode.png";
import ManualModeImg from "./images/ManualMode.png";
import FeaturesCard from "./FeaturesCard";
import ModesCard from "./ModesCard";
import AccordionItem from "./Accordian";
import TeamMemberCard from "./TeamMemberCard";
import Carousel from "./Carousel";

// import { loginAction } from "./redux/actions";

function Home(props) {
  const loginSelector = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginAction("data"));
  }, []);
  console.log(loginSelector, "loginSelector");
  const featuresList = [
    {
      title: "Manual and AI mode",
      template: 1,
      link: APP_ROUTES.HOME,
      icon: Feature1Img,
    },
    {
      title: "Multiple question types",
      template: 2,
      link: APP_ROUTES.HOME,
      icon: Feature2Img,
    },
    {
      title: "Profile visibility and Submission Tracking",
      template: 3,
      link: APP_ROUTES.HOME,
      icon: Feature3Img,
    },
    {
      title: "Easy sharing options",
      template: 1,
      link: APP_ROUTES.HOME,
      icon: Feature4Img,
    },
    {
      title: "Attend quiz without an account",
      template: 2,
      link: APP_ROUTES.HOME,
      icon: Feature5Img,
    },
    {
      title: "Data Privacy",
      template: 3,
      link: APP_ROUTES.HOME,
      icon: Feature6Img,
    },
  ];
  const modesList = [
    {
      title: "Manual Mode",
      description:
        "Craft quizzes with precision using our intuitive manual mode. Choose from a variety of question types including multiple-choice, true or false, and multiple answers. Perfect for when you want full control over your quiz content.",
      link: APP_ROUTES.HOME,
      btnText: "Try Manual mode",
      icon: ManualModeImg,
    },
    {
      title: "AI Mode",
      description:
        "Save time and energy with our innovative AI mode. Simply paste your text, specify the number of questions, and let Quizzify generate the quiz for you. You can even select the quiz type that best suits your needs. It's quick, efficient, and hassle-free.",
      link: APP_ROUTES.HOME,
      btnText: "Try AI mode",
      icon: AIModeImg,
    },
  ];
  const FAQList = [
    {
      title: "Create your quiz",
      content:
        "Begin by selecting either manual mode or AI mode to create your quiz. In manual mode, you have full control to craft your questions, choose question types, and customize the quiz to your liking. Alternatively, use AI mode to quickly generate questions by pasting text and specifying the number of questions and quiz type.",
    },
    {
      title: "Create your quiz",
      content:
        "Begin by selecting either manual mode or AI mode to create your quiz. In manual mode, you have full control to craft your questions, choose question types, and customize the quiz to your liking. Alternatively, use AI mode to quickly generate questions by pasting text and specifying the number of questions and quiz type.",
    },
    {
      title: "Create your quiz",
      content:
        "Begin by selecting either manual mode or AI mode to create your quiz. In manual mode, you have full control to craft your questions, choose question types, and customize the quiz to your liking. Alternatively, use AI mode to quickly generate questions by pasting text and specifying the number of questions and quiz type.",
    },
  ];
  const teamMembers = [
    {
      name: "Ketan",
      designation: "Developer",
      description:
        "X+ years of experience in ABC Skill. Expertise in XYZ, MNO, and DEF",
      link: "https://www.linkedin.com/",
    },
    {
      name: "Ketan",
      designation: "Developer",
      description:
        "X+ years of experience in ABC Skill. Expertise in XYZ, MNO, and DEF",
      link: "https://www.linkedin.com/",
    },
    {
      name: "Ketan",
      designation: "Developer",
      description:
        "X+ years of experience in ABC Skill. Expertise in XYZ, MNO, and DEF",
      link: "https://www.linkedin.com/",
    },
  ];
  return (
    <div className="">
      <header className="flex flex-row">
        <Link
          className="font-normal flex items-center   text-black w-1/6 text-start"
          to={APP_ROUTES.HOME}
        >
          Quizzify
        </Link>
        {/* <p className="font-normal text-black mr-auto"></p> */}
        <nav className="grid grid-cols-6 w-5/6">
          <Link
            className="font-normal flex items-center   text-black  justify-end"
            to={APP_ROUTES.HOME}
          >
            Features
          </Link>
          <Link
            className="font-normal  flex items-center text-black  justify-end"
            to={APP_ROUTES.HOME}
          >
            Features
          </Link>
          <Link
            className="font-normal  flex items-center text-black  justify-end"
            to={APP_ROUTES.HOME}
          >
            Features
          </Link>
          <Link
            className="font-normal  flex items-center text-black  justify-end"
            to={APP_ROUTES.HOME}
          >
            Features
          </Link>
          <Link
            className="font-normal  flex items-center text-black  justify-end"
            to={APP_ROUTES.HOME}
          >
            Features
          </Link>
          <Link
            className="font-normal  flex items-center text-black  justify-end"
            to={APP_ROUTES.HOME}
          >
            <Button className="py-1 px-4 border rounded-sm border-black border-1">
              Login/Signup
            </Button>
          </Link>
        </nav>
      </header>
      <section className=" container my-[10vh] justify-between flex gap-2 flex-row ">
        <div className="content  flex flex-col gap-8 w-[35%]">
          <h1 className="text-start font-medium text-5xl">
            Unlock the Power of Quizzing with Ease
          </h1>
          <p className="text-start font-normal text-xl">
            Are you ready to engage, educate, and entertain your audience with
            captivating quizzes? Look no further! Quizzify.in is here to
            revolutionize your quiz-making experience. Whether you're a
            business, educator, or community organizer, our platform empowers
            you to effortlessly create and share quizzes tailored to your needs.
          </p>
          <div className="actions  align-middle  text-start font-normal text-xl">
            <Button className="py-2 my-auto px-4 border bg-black text-white rounded-md border-black border-1">
              Try Now
            </Button>
          </div>
        </div>
        <img src={HeroImg} className="w-[50%] " />
      </section>
      <section className="container my-[15vh]">
        <h1 className="my-4 flex leading-4 text-xl items-center text-center">
          <span className="bg-[#B9FF66] text-start font-medium text-5xl py-1 px-2 mr-8">
            Features
          </span>
          Let’s look at some features that make your life easier
        </h1>
        <div className="container grid grid-cols-2 gap-8">
          {featuresList.map((feature, index) => (
            <FeaturesCard key={index} feature={feature} />
          ))}
        </div>
      </section>
      <section className="container my-[20vh]">
        <div className="container  ">
          {modesList.map((mode, index) => (
            <ModesCard key={index} mode={mode} />
          ))}
        </div>
      </section>
      <section className="container my-[15vh]">
        <h1 className="my-4 flex leading-4 text-xl items-center text-start">
          <span className="w-fit bg-[#B9FF66] text-start font-medium text-5xl py-1 px-2 mr-8">
            Use Cases
          </span>
          <span className="max-w-[50%]">
            Your quizzes are showcased on your profile, making it easy for
            participants to find and access them. Build your reputation as a
            quizmaster and attract more attendees to your quizzes.
          </span>
        </h1>
        <div className="container my-16 bg-[#191A23] flex px-8 py-12  gap-x-4 flex-row border rounded-[40px] border-black border-1">
          <div className="flex-grow p-4 pt-0 box-border text-start w-1/3 border-r border-white">
            <h2 className="text-[#B9FF66] text-3xl mb-4">
              Educational Institutions
            </h2>
            <p className="text-white text-xl">
              Teachers can use the app to create quizzes for various subjects
              and topics, aiding in student engagement and assessment. Students
              can participate in these quizzes to reinforce their learning and
              gauge their understanding of the material.
            </p>
          </div>
          <div className="flex-grow p-4 pt-0 box-border text-start w-1/3 border-r border-white">
            <h2 className="text-[#B9FF66] text-3xl mb-4">Corporate Training</h2>
            <p className="text-white text-xl">
              Businesses can utilize the app to develop quizzes for employee
              training programs, covering topics such as compliance, product
              knowledge, and company policies. This helps employees retain
              information effectively and enhances their job performance.
            </p>
          </div>
          <div className="flex-grow p-4 pt-0 box-border text-start w-1/3 ">
            <h2 className="text-[#B9FF66] text-3xl mb-4">
              Educational Institutions
            </h2>
            <p className="text-white text-xl">
              Teachers can use the app to create quizzes for various subjects
              and topics, aiding in student engagement and assessment. Students
              can participate in these quizzes to reinforce their learning and
              gauge their understanding of the material.
            </p>
          </div>
        </div>
        <div className="container my-16 bg-[#191A23] flex px-8 py-12  gap-x-4 flex-row border rounded-[40px] border-black border-1">
          <div className="flex-grow p-4 pt-0 box-border text-start w-1/3 border-r border-white">
            <h2 className="text-[#B9FF66] text-3xl mb-4">Online Courses</h2>
            <p className="text-white text-xl">
              Instructors offering online courses can integrate quizzes into
              their curriculum to assess student progress and comprehension.
              These quizzes can be used as formative assessments to guide
              learning and provide valuable feedback.
            </p>
          </div>
          <div className="flex-grow p-4 pt-0 box-border text-start w-1/3 border-r border-white">
            <h2 className="text-[#B9FF66] text-3xl mb-4">
              Recruitment Process
            </h2>
            <p className="text-white text-xl">
              Employers can incorporate quizzes into their recruitment process
              to evaluate candidates' skills and knowledge relevant to the job
              position. This helps streamline the hiring process and identify
              the most qualified candidates.
            </p>
          </div>
          <div className="flex-grow p-4 pt-0 box-border text-start w-1/3 ">
            <h2 className="text-[#B9FF66] text-3xl mb-4">Market Research</h2>
            <p className="text-white text-xl">
              Businesses can conduct market research by creating quizzes to
              gather feedback and insights from their target audience. Quizzes
              can be designed to collect demographic information, preferences,
              and opinions on products or services.
            </p>
          </div>
        </div>
      </section>
      <section className="container my-[15vh]">
        <h1 className="my-4  leading-4 text-xl items-center text-start">
          <span className="w-full bg-[#B9FF66] text-start font-medium text-5xl py-1 px-2 mr-8">
            Effortless Quiz Creation and Engagement
          </span>
        </h1>
        <p className="my-8 w-[70%]  leading-4 text-xl leading-6 items-center text-start">
          Quizzify simplifies the quiz creation process into four easy steps.
          Choose between manual mode for customized quizzes or AI mode for quick
          question generation. Customize your quiz, share it with participants
          hassle-free, and track submissions and results in real-time. Elevate
          engagement and learning with Quizzify Pro.
        </p>
        <div className="container">
          {FAQList.map((FAQ, index) => (
            <AccordionItem
              index={index + 1}
              title={FAQ.title}
              content={FAQ.content}
            />
          ))}
        </div>
      </section>

      <section className="container my-[15vh]">
        <h1 className="my-4 flex leading-4 text-xl items-center text-start">
          <span className="w-fit bg-[#B9FF66] text-start font-medium text-5xl py-1 px-2 mr-8">
            Team
          </span>
          <span className="max-w-[50%]">
            Meet the people behind the Quizzify. Feel free to connect with us
            for suggestions or collaborations
          </span>
        </h1>
        <div className="container my-8 flex   gap-x-16 flex-row ">
          {teamMembers.map((member) => (
            <TeamMemberCard {...member} />
          ))}
        </div>
      </section>
      <section className="container my-[15vh]">
        <h1 className="my-4 flex leading-4 text-xl items-center text-start">
          <span className="w-fit bg-[#B9FF66] text-start font-medium text-5xl py-1 px-2 mr-8">
            Testimonials
          </span>
          <span className="max-w-[50%] leading-5">
            Hear from Our Satisfied Clients: Read Our Testimonials to Learn More
            about Our Quiz Making Platform
          </span>
        </h1>
        <div className="container my-8  ">
          <Carousel />
        </div>
      </section>
    </div>
  );
}

export default Home;
