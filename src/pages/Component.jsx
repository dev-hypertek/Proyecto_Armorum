import React from 'react'
import BtnOriginal from '../components/Components/BtnOriginal'
import BtnDisable from '../components/Components/BtnDisable'
import BtnSize from '../components/Components/BtnSize'
import BtnType from '../components/Components/BtnType'
import BtnCheckbox from '../components/Components/BtnCheckbox'
import BtnRadio from '../components/Components/BtnRadio'
import BtnSwitch from '../components/Components/BtnSwitch'
import BtnDropdown from '../components/Components/BtnDropdown'
import ProgressBar from '../components/Components/ProgressBar'
import Input from '../components/Components/Input'
import NavPills from '../components/Components/NavPills'
import Pagination from '../components/Components/Pagination'
import Badge from '../components/Components/Badge'

const Component = () => {
     return (
          <div className="mt-4 p-4">
               <h1 className='text-xl mx-6 font-semibold'>Component</h1>
               <div>
                    <BtnOriginal />
                    <BtnDisable />
                    <BtnSize />
                    <BtnType />
                    <BtnCheckbox />
                    <BtnRadio />
                    <BtnSwitch />
                    <BtnDropdown />
                    <ProgressBar />
                    <Input />
                    <NavPills />
                    <Pagination />
                    <Badge />
               </div>

          </div>
     )
}

export default Component