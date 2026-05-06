import React from 'react'

const Loading = () => {
  return (
    <section className="w-full h-[100vh] flex justify-center items-center">
      {/* Loading Spinner */}
      <section className="w-10 h-10 md:w-30 md:h-30 rounded-full border-4 md:border-8 border-l-red-600 border-r-white border-t-red-600 border-b-red-600 animate-spin"></section>
    </section>
  )
}

export default Loading