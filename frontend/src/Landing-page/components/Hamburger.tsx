
interface state{
  handleVisibility: ()=> void
}

const Hamburger = ({...props}: state) => {
  return (
    <button className="h-10 w-12  md:hidden flex flex-col justify-around  items-center mr-2 cursor-pointer" onClick={props.handleVisibility}>
        <section className={`w-[70%] h-[2px] bg-black`}></section>
        <section className={`w-[70%] h-[2px] bg-black`}></section>
        <section className={`w-[70%] h-[2px] bg-black`}></section>
    </button>
  )
}

export default Hamburger