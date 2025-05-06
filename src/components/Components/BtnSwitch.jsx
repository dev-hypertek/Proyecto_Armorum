import MultipleSwitcheRounded from './MultipleSwitcheRounded'
import MultipleSwitcheSquare from './MultipleSwitcheSquare'

const BtnSwitch = () => {
     return (
          <div className='border shadow-md w-[98%] mx-4 my-8'>
               <h1 className='px-4 py-1 mt-1 text-lg'>Bootstrap Switch</h1>
               <p className='text-gray-400 px-4 text-xs'>Here is a subtitle for this table</p>
               <div className='border mt-4 border-gray-200'></div>

               <div className='px-4 py-6 flex flex-wrap gap-3'>
                    <MultipleSwitcheSquare color="#607D8B" />
                    <MultipleSwitcheSquare color="#1D62F0" />
                    <MultipleSwitcheSquare color="#23CCEF" />
                    <MultipleSwitcheSquare color="#59d05d" />
                    <MultipleSwitcheSquare color="#fbad4c" />
                    <MultipleSwitcheSquare color="#ff646d" />
               </div>
               <div className='px-4 py-2 flex flex-wrap gap-3'>
                    <MultipleSwitcheRounded color="#607D8B" />
                    <MultipleSwitcheRounded color="#1D62F0" />
                    <MultipleSwitcheRounded color="#23CCEF" />
                    <MultipleSwitcheRounded color="#59d05d" />
                    <MultipleSwitcheRounded color="#fbad4c" />
                    <MultipleSwitcheRounded color="#ff646d" />
               </div>

          </div>)
}

export default BtnSwitch