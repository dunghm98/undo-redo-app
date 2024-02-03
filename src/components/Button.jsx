import React, { memo } from 'react'

const Button = ({ Icon, type, label, onClick, disabled }) => {
  const getButtonType = () => {
    switch (type) {
      case 'primary':
        return 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 '
      case 'success':
        return 'focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 '
      case 'warning':
        return 'focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 '
      case 'icon':
        return 'flex items-center justify-between focus:outline-none text-gray hover:bg-gray-200 font-medium rounded-lg text-sm px-4 py-2 me-2 mb-2 '
      default:
        return 'py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 '
    }
  }

  if (disabled) {
    return (
      <button
        type='button'
        className='opacity-30 flex items-center justify-between cursor-not-allowed font-medium rounded-lg text-sm px-4 py-2  me-2 mb-2 text-center'
        disabled
      >
        {Icon && <Icon size={20} className='mr-2' />}
        {label}
      </button>
    )
  }

  return (
    <button onClick={onClick} className={getButtonType()}>
      {Icon && <Icon  size={20} className='mr-2' />}
      {label}
    </button>
  )
}
export default memo(Button)
