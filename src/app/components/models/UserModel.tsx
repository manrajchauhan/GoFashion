import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from "next/navigation";

interface User {
  name: string;
  surname: string;
  email: string;
  client_id: string;
}

const links = [
  { name: 'Dashboard', href: '/user/dashboard', icon: '/icon/dash.svg' },
  { name: 'Settings', href: '/user/settings', icon: '/icon/settings.svg' },
  { name: 'Homepage', href: '/', icon: '/icon/home.svg' },

];

export default function UserModel() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAuthToken(token);
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get('/api/users', {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });

          setUserData(response.data.user);
        } catch (fetchError: any) {
          setError('Failed to fetch user data');
          console.error('Error fetching user data:', fetchError.response?.data || fetchError.message);
        }
      };

      fetchUserData();
    }
  }, [authToken]);

  const closeModal = () => {
    const modalElement = document.getElementById('settingsModal');
    if (modalElement) {
      modalElement.classList.add('hidden');
    }
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    };

    const handleLinkClick = () => {
      closeModal();
    };


    document.addEventListener('mousedown', handleClickOutside);

    const linksInsideModal = modalRef.current?.querySelectorAll('a, button');
    linksInsideModal?.forEach((element) => {
      element.addEventListener('click', handleLinkClick);
    });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      linksInsideModal?.forEach((element) => {
        element.removeEventListener('click', handleLinkClick);
      });
    };
  }, []);

  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userData");
    router.push("/");
    router.refresh();
};


  return (
    <div ref={modalRef} className="right-6 top-0 absolute border w-[300px] rounded-xl bg-white shadow ">
      <div className="text-center p-5 mt-4 mb-4">
        <img
        height={200}
        width={200}
          loading="lazy"
          src="/logo.svg"
          className="md:ml-8 rounded-full "
          alt="Business Logo"
        />
         <h1 className="text-lg font-semibold tracking-tighter text-gray-800 mt-0.5 capitalize">
            {userData ? (
              <p>
                {userData.name} {userData.surname}
              </p>
            ) : (
              <div className="w-32 h-6 bg-gray-200 animate-pulse rounded-md"></div>
            )}
          </h1>
          <h1 className="text-sm font-bold text-gray-600">
          {userData ? <p>{userData.email}</p> : <div className="w-32 h-6 bg-gray-200 animate-pulse rounded-md"></div>}
        </h1>
      </div>
      <div className="border-t justify-between gap-10">
        <div className="text-start">
          <div className="gap-4">
            {links.map((link, index) => (
              <div key={index} className="px-6 w-full py-3 text-[18px] text-neutral-700 rounded-md hover:bg-gray-50 tracking-tighter flex">
                {/* <img src={link.icon} alt={link.name} className="w-5 h-5 mr-3" /> */}
                <Link href={link.href}>
                  <h1>
                    {link.name}
                  </h1>
                </Link>
              </div>
            ))}
          </div>
          <div className="border-t justify-between gap-10">
            <div className="flex px-6 w-full py-3 text-[18px] text-neutral-700 rounded-md hover:bg-gray-50 tracking-tighter">
          {/* <img src="/icon/log.svg" alt="Log Out" className="w-5 h-5 mr-3" /> */}
          <button onClick={handleLogout} className='font-bold'>
            Log Out
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
