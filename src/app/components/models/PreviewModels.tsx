"use client"
import Link from 'next/link'
import { useRouter } from "next/navigation";
import React from 'react'

const demoimg =
{
    previewUrl: '/dress/cotton-silk-girl.jpeg',
    img_name : 'A Women Wearing Silk Cotton Dress',
    description: 'A Women Wearing Silk Cotton Dress',
}

const Tags = [
    {
        id:1,
        name:"Casual Wear",
        icon:"/icon/category.svg",
},
{
    id:2,
    name:"Jackets",
    icon:"/icon/subcategory.svg",
},
{
    id:3,
    name:"Casual Outing",
    icon:"/icon/Occasion.svg",
},
{
    id:4,
    name:"Sleeveless",
    icon:"/icon/sleeve.svg",
},
{
    id:5,
    name:"Round Neck",
    icon:"/icon/neck.svg",
},

{
    id:6,
    name:"Solid",
    icon:"/icon/pattern.svg",
},
]

export default function PreviewModels() {

    const router = useRouter();
    const HandleClick = () =>{
        router.push("/");
    }

  return (
    <div className="right-0 top-10 absolute  w-full min-h-screen shadow-lg rounded-md  ">
    <div className="flex items-center mx-10  ">
      <img
        loading="lazy"
        src="/logo.svg"
        className="object-contain py-4 max-w-40 max-md:ml-1 rounded-full "
        alt="Business Logo"
      />
      <button
        className="flex top-2 absolute right-10"
onClick={HandleClick}
      >
        <svg
          className="rounded-full border border-neutral-700 p-2"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="#111827"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </button>
      <h1 className="px-4 mb-2 font-bold text-green-800 tracking-tighter text-sm">Preview</h1>
    </div>

    <div className='border-t px-10 p-5'>
        <div className='justify-between flex'>
    <div>
        <h1 className='text-2xl mb-2 mt-6'>{demoimg.img_name}</h1>
        </div>
        <div>
            <ul className="ml-auto flex gap-7 py-2">
       <Link href="#" className="bg-[#EA580B] px-4 hover:bg-orange-700 mt-2 rounded-xl flex gap-2 items-center p-2">
        <img src="/icon/download.svg" alt="Upload" className="w-6 h-4"/>
            <button>
                <h1>Download</h1>
            </button>
            </Link>
        </ul>
</div>
</div>
    <div className="flex gap-20 ">
    <div className="mt-4 ">
        <img
          src={demoimg.previewUrl}
          alt="preview"
          className="object-cover w-full h-[500px] rounded-lg"
        />
      </div>

      <div className="gap-2">
       <div className=''>
       <div className="grid grid-cols-3 gap-5 mt-4 mb-16 text-heading">
            {Tags.map((Tagging) => (
              <li key={Tagging.id} className='flex items-center gap-5 bg-white p-3 rounded-lg'>
                <div className="p-1 w-fit">
                <img src={Tagging.icon} alt="icons" className='w-fit h-6 ' />
                </div>
                <p>{Tagging.name}</p>
              </li>
            ))}
          </div>
       </div>
       <div className='mt-10'>
        <h1>Description: {demoimg.description}</h1>
       </div>

      </div>

    </div>
    </div>
  </div>
  )
}
