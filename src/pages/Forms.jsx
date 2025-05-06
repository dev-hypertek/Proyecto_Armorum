import React from 'react'
import BasicForms from '../components/Forms/BasicForms'
import ControlForm from '../components/Forms/ControlForm'
import FormStyle from './../components/Forms/FormStyle';

const Forms = () => {
  return (
    <div className="mt-4 p-4">
      <h1 className='text-xl mx-6 font-semibold'>Forms</h1>
      <div className='flex gap-6 py-7 px-4 items-start'>
        <BasicForms />
        <div className='flex flex-col flex-1 gap-4'> {/* Added flex-col and gap */}
          <ControlForm />
          <FormStyle />
        </div>
      </div>
    </div>
  )
}

export default Forms
