import { GiftOutlined, UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { PATH } from "constant";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className='Navbar flex justify-center relative z-20 h-[180px] -mt-[30px]'>
      <div className="navbar-content w-[50%] h-[100%] flex flex-col items-center " style={{
        borderRadius: '20px',
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' 
      }}>
        <img className="w-[30%] mt-4 mb-2" src="/image/guildlines.png" alt="guildlines" />
        <ul className="w-full">
          <li onClick={() => { navigate(PATH.statistic) }} className="py-2 pl-2 flex items-center hover:bg-gray-200 w-full transition-all duration-200 hover:cursor-pointer">
            <UserAddOutlined className="font-semibold text-[16px] mr-2"/>
            <p className="font-semibold hover:text-black">Check in</p>
          </li>
          <li onClick={() => { navigate(PATH.attendance) }} className="py-2 pl-2 flex items-center hover:bg-gray-200 w-full transition-all duration-200 hover:cursor-pointer">
            <UserDeleteOutlined className="font-semibold text-[16px] mr-2"/>
            <p className="font-semibold hover:text-black">Check out</p>
          </li>
          <li onClick={() => { navigate(PATH.wheel) }} className="py-2 pl-2 flex items-center hover:bg-gray-200 w-full transition-all duration-200 hover:cursor-pointer overflow-hidden">
            <GiftOutlined className="font-semibold text-[16px] mr-2"/>
            <p className="font-semibold hover:text-black">Wheel</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;