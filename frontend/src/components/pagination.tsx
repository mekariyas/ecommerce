const Pagination = ({...props}: {totalProducts: number}) => { 
  return (
    <ul className={`border-2 w-[80%] h-28 rounded-md flex ${props.totalProducts > 10? "justify-start":"justify-center"} flex-wrap justify-center pl-2 pt-2 mb-2`}>{props.totalProducts}</ul>
)}

export default Pagination