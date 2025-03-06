import React  from 'react'

const DemoImgs = {
  img1:{
    img: '/Random/gorgeous-woman-with-blonde-wavy-hair-wearing-elegant-beige-dress.jpg',
    name: 'Women - Gorgeous',
    description: 'Liked on 12/12/2021',
  },

  img2:{
    img: '/Random/demo1.jpg',
    name: 'Men - Gorgeous',
    description: 'Liked on 12/12/2021',
  },
  img3:{
    img: '/Random/full-length-portrait-confident-young-man.jpg',
    name: 'Gorgeous',
    description: 'Liked on 12/12/2021',
  },
  img4:{
    img: '/Random/young-woman-beautiful-red-dress.jpg',
    name: 'Gorgeous',
    description: 'Liked on 12/12/2021',
  },
}

export default function FavouritePage() {
  return (
    <div className="p-6 w-full bg-white rounded-2xl max-md:px-4 max-md:max-w-full mt-4 min-h-screen">
      <h1 className="text-4xl font-bold text-neutral-700 mb-6 tracking-tighter">Favourites</h1>
      <div className="flex flex-wrap gap-4">
       Top Picks From You.
        </div>
        <div className='flex flex-cols-3 gap-4 mt-10'>
            {Object.values(DemoImgs).map((imgs,index) => (
 <div className='h-80 w-full' key={index}>
 <img src={imgs.img} alt="random Clicks" className='object-cover w-[800px] h-80 p-4 rounded-[20px] hover:scale-105 transition-all duration-200' />
    <div className='flex-row mt-4 px-4'>
    <h1 className='text-sm font-semibold text-neutral-700'>{imgs.name}</h1>
    <p className='text-sm text-neutral-500'>{imgs.description}</p>
    </div>
</div>      )
            )}
            </div>
    </div>
  )
}
