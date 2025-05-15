import MyBalance from './MyBalance'
import BalanceProcess from './BalanceProcess'
import BalanceStatistic from './BalanceStatistic'

const Balance = () => {
     return (
          <div className='mx-6 my-6 border shadow-lg w-[96%] px-6 h-auto'>
               <div className="grid grid-cols-[1.5fr_2fr_1fr] my-2  gap-4">
                    <div className="border-r  pr-4">
                         <MyBalance />
                    </div>
                    <div className="border-r px-6">
                         <BalanceProcess />
                    </div>
                    <div className="">
                         <BalanceStatistic />
                    </div>
               </div>
          </div>
     )
}

export default Balance
