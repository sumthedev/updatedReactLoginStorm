import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { setName, setClick, setEmailValid } from "./redux/actions/authActions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import MobileSize from "./mobileSize";

export const Logout = (props) => {
  const rememberedEmail = JSON.parse(localStorage.getItem("rememberedEmail"));
  console.log(rememberedEmail);
  const navigate = useNavigate();
  const [isSize, setMobileSize] = useState(false);

  const handleResize = () => {
    if (window.innerWidth <= 1064) {
      setMobileSize(true);
    } else {
      setMobileSize(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!rememberedEmail) {
      // If the user is not authenticated, redirect to the login page.
      navigate("/");
    } else {
      props.setName(rememberedEmail);
    }
  });

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("rememberedEmail");
    navigate("/");
  };
  return (
    <>
      {isSize === false ? (
        <div className="flex">
          <div className="w-1/2 p-16 flex flex-col justify-center">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              alt="Logo"
              className=" relative w-[8%] mb-6 -mt-14"
            />

            <div>
              <h1 className="text-2xl font-semibold text-black mt-2 ">
                <strong> Hello</strong>{" "}
                <span className="text-gray-500">
                  <strong>
                    {" "}
                    {props.name ? props.name.split("@")[0] : "User"}{" "}
                  </strong>
                </span>
              </h1>
              <p className="mt-4 text-black">You are logged in!</p>

              <button
                onClick={handleLogout}
                className="border  border-black mt-10 text-black py-2 px-4  ml-1 hover:bg-black hover:text-white transition duration-300"
              >
                Logout
              </button>
            </div>

            <p className="mt-10 text-black text-sm">
              Lorem ipsum dolor sit amet consectetur adipisicing
            </p>
            <p className=" font-semibold text-black text-sm">
              libero omnis debitis quis quos ratione ullam
            </p>
          </div>

          <div
            className="w-1/2 bg-cover bg-center h-screen"
            style={{
              backgroundImage: `url(${process.env.PUBLIC_URL}/flow2.jpg)`,
            }}
          >
            <Navbar />
            <div
              className="h-1/2 w-1/2 bg-black rounded-md bg-clip-padding backdrop-filter 
          backdrop-blur-sm bg-opacity-20  relative mx-auto  mt-24 "
            >
              <img src={`${process.env.PUBLIC_URL}/m3.png`} alt="m" />
            </div>
          </div>
        </div>
      ) : (
        <MobileSize />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  console.log(state.name); // Add this line to check the state
  return {
    isClick: state.isClick,
    isValid: state.isValid,
    name: state.name,
  };
};

const mapDispatchToProps = {
  setName,
  setClick,
  setEmailValid,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
