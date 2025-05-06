import { BiPieChartAlt2 } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa6";

const BalanceStatistic = () => {
     return (
          <div className='py-8'>
               <h1>Statistic</h1>
               <div className="py-4 mx-6">
                    <div className="flex justify-between items-center border-b py-4">
                         <div>
                              <BiPieChartAlt2 className="text-[#fbad4c] text-5xl" />
                         </div>
                         <div className="flex flex-col items-start">
                              <div>Number</div>
                              <div>150GB</div>
                         </div>
                    </div>
                    <div className="flex justify-between items-center my-2">
                         <div>
                              <FaRegHeart className="text-[#1D62F0] text-5xl" />
                         </div>
                         <div className="flex flex-col items-start">
                              <div>Followers</div>
                              <div>+45k</div>
                         </div>
                    </div>

               </div>
          </div>
     )
}

export default BalanceStatistic