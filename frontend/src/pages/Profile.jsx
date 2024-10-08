import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";

const Profile = () => {
  const [profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-user-information",
          { headers }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 md:px-12 px-4 flex flex-col md:flex-row py-8 text-white">
      {!profile && (
        <div className="w-full h-full flex items-center justify-center">
          <Loader />
        </div>
      )}
      {profile && (
        <>
          <div className="w-full md:w-1/4 lg:w-1/6 mb-4 md:mb-0 h-auto lg:h-screen ">
            <Sidebar data={profile} />
            <MobileNav></MobileNav>
          </div>
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
