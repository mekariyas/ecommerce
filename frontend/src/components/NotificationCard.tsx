interface statusText{
  statusText: string
}

const NotificationCard = ({...props}: statusText) => {
  return (
    <section className="w-[30%] h-10 flex justify-center font-semibold items-center  bg-slate-50 absolute z-[4] rounded-md">
      <p className="w-[90%] text-[17px] text-red-500">{props.statusText}</p>
    </section>
  )
}

export default NotificationCard