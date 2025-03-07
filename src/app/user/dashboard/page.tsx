import AppDemo from '@/app/components/App/App'
import { DragCards } from '@/app/components/ui/cards'
import React from 'react'

export default function Dashboard() {
  return (
    <div className='bg-white rounded-xl'>
        <div className='mt-16'>
        <AppDemo/>
        </div>
      <DragCards/>
    </div>
  )
}
