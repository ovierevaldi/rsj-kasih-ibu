import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const NavigationButton = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleBack = () => {
    if(isHome){
      return;
    }
    navigate(-1);
  }

  return (
      !isHome && (
        <button 
          className="flex items-center cursor-pointer"
          onClick={() => {
            handleBack();
          }}       
          >
          <IoIosArrowBack /> 
          <div>
            Back
          </div>
        </button>
      )
  )
}

export default NavigationButton