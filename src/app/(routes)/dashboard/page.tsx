import React from 'react'
import { VictoryPie } from 'victory'

const Page = () => {
  return (
    <div className='bg-red-100'>
      <h2>Dashboard</h2>
      <div className='relative w-full h-full'>
        <PieBarGraph />
      </div>
    </div>
  )
}

export default Page

export const PieBarGraph = () => {
  return (
    <>
      <VictoryPie
        colorScale={['gray', '#539BF8']}
        data={[
          { x: 'gray', y: 35 },
          { x: 'blue', y: 40 },
        ]}
        startAngle={90}
        endAngle={-90}
        innerRadius={100}
        labels={() => ''}
      />
      <div className='absolute font-bold  inset-0 w-fit h-5 mx-auto my-auto -top-32 flex flex-col items-center'>
        <p className='font-bold text-3xl'>1754</p>
        <p className='font-bold text-2x'>/ 2500 cal</p>
      </div>
    </>
  )
}
