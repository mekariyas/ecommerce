const Home = () => {
  return (
    <section className="w-full h-[80vh] md:h-full relative top-16 md:static">
        <h1 className="w-full h-6 font-medium md:font-bold text-lg md:text-xl text-center mb-4">Admin Dashboard</h1>
        <section className="w-full flex flex-col items-start justify-center  pl-3 gap-2">
            <p className="w-52 pl-2">Name: John Doe</p>
            <p className="w-52 pl-2">Email: John@blahblah.com </p>
        </section>
    </section>
  )
}

export default Home