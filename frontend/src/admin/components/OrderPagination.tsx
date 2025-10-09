import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const OrderPagination = ({ orderAmount }: { orderAmount: number }) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [buttons, setButtons] = useState<number[]>([]);

  const handleButtonsPopulation = (num: number) => {
    if (num <= 0) return setButtons([]);
    const nums = Array.from({ length: num }, (_, i) => i + 1);
    setButtons(nums);
  };

  useEffect(() => {
    handleButtonsPopulation(orderAmount);
  }, [orderAmount]);

  const handleClick = (page: number) => {
    setSearchParams({ page: String(page), skip: String((page - 1) * 5) });
    navigate(`/dashboard/${id}/orders?page=${page}&skip=${(page - 1) * 5}`);
  };

  return (
    <>
      <hr className="w-full h-4 text-slate-400 mt-6" />
      <ul
        className={`w-[80%] rounded-md mt-2 flex flex-wrap gap-6 mb-6 ${
          buttons.length > 10 ? "justify-start" : "justify-center"
        }`}
      >
        {buttons.map((button) => (
          <li key={button} className="w-16 h-16 mb-4">
            <button
              onClick={() => handleClick(button)}
              className={`w-full h-full ${parseInt(searchParams.get("page")?? "1") === button?"bg-slate-700 text-white": ""}bg-slate-950 text-white rounded-md  active:scale-95`}
            >
              {button}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default OrderPagination;
