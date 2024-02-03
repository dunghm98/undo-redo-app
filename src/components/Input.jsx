import React, { memo } from 'react'
import { IoIosRemoveCircleOutline } from 'react-icons/io'
const Input = ({ index, value, onChange, onRemove }) => {
  return (
    <>
      <div className='relative max-w-md mt-3'>
        <input
          type='text'
          value={value}
          name={`input-${index}`}
          index={index}
          onChange={onChange}
          className='w-full border border-gray-500 text-gray-900 text-sm rounded-md focus:ring-gray-200 focus:border-gray-100 block p-2.5'
        />
        {index !== 0 && (
          <div
            className='cursor-pointer absolute -top-px -right-5'
            onClick={() => onRemove(index)}
          >
            <IoIosRemoveCircleOutline size={20} color='red' />
          </div>
        )}
      </div>
    </>
  )
}

export default memo(Input)
