"use client"
import React, { useEffect, useState } from 'react';
import Header from '../../modules/Header';
import Image from 'next/image';

const Profile = () => {

  const [profile,setProfile] = useState()

  const getProfile = async ()=>{
    const response = await fetch('/api/callapi',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
            uri: '/api/profile/',
            method: 'GET',
        }),
    });
    const data = await response.json();
    setProfile(data);
  } 

  useEffect(()=>{
    getProfile();
  },[])
  return (
    <>
    <Header></Header>
    <div className="min-h-screen bg-base-200 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="card card-compact w-full bg-base-100 shadow-xl">
          <div className="flex items-center justify-center ">
          <div className="w-20 rounded-full">
            <Image
              width={100}
              height={100}
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
          </div>
          <div className="card-body text-center">
            <h2 className="card-title">{profile?.first_name} {profile?.last_name}</h2>
            <p className="text-base text-gray-600">{profile?.email}</p>
            <p className="text-gray-500">I am passionate about building amazing websites and applications. Lets work together!</p>
            <div className="card-actions justify-center mt-4">
              <button className="btn btn-primary">Follow</button>
              <button className="btn btn-outline btn-secondary">Message</button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">
          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sit amet
              lectus in erat fringilla vehicula a id quam.
            </p>
          </div>

          <div className="card bg-base-100 shadow-md p-6">
            <h3 className="text-lg font-semibold">Skills</h3>
            <ul className="list-disc pl-5 text-gray-700">
              <li>JavaScript</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
        </div>

        <div className="card bg-base-100 shadow-md p-6 mt-10">
          <h3 className="text-lg font-semibold">Recent Projects</h3>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-primary">Project One</a> - A web app for task management.
            </li>
            <li>
              <a href="#" className="text-primary">Project Two</a> - A portfolio website.
            </li>
            <li>
              <a href="#" className="text-primary">Project Three</a> - E-commerce platform.
            </li>
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default Profile;
