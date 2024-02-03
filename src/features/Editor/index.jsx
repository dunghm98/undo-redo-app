'use client'
import React, { useCallback } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { LuUndo } from 'react-icons/lu'
import { LuRedo } from 'react-icons/lu'
import { IoMdAdd } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'

import {
  addInput,
  undo,
  redo,
  removeInput,
  updateInputThrottling
} from './../../redux/editorSlice'

const Editor = () => {
  const { currentState, undoStack, redoStack } = useSelector(
    state => state.editor
  )
  const dispatch = useDispatch()
  const handleAddInput = useCallback(() => {
    dispatch(addInput())
  }, [dispatch, currentState])

  const handleUndo = useCallback(() => {
    if (undoStack.length) {
      dispatch(undo())
    }
  }, [dispatch, undoStack])

  const handleRedo = useCallback(() => {
    if (redoStack.length) {
      dispatch(redo())
    }
  }, [dispatch, redoStack])

  const handleOnChangeInput = useCallback(
    e => {
      const index = e.target.getAttribute('index')
      const value = e.target.value
      dispatch(updateInputThrottling({ index, value }))
    },
    [dispatch]
  )

  const handleRemoveInput = useCallback(
    index => {
      dispatch(removeInput(index))
    },
    [dispatch]
  )

  return (
    <>
      <div className='max-w-screen-sm mt-4 m-auto'>
        <div className='action-wrapper flex justify-between'>
          <div className='flex'>
            <Button
              label='Undo'
              type='icon'
              onClick={handleUndo}
              icon={LuUndo}
              disabled={undoStack.length === 0}
            />
            <Button
              label='Redo'
              type='icon'
              icon={LuRedo}
              onClick={handleRedo}
              disabled={redoStack.length === 0}
            />
          </div>
          <Button
            label='Add Input'
            type='icon'
            icon={IoMdAdd}
            onClick={handleAddInput}
          />
        </div>
        <div className='editor py-4 px-6 mt-10'>
          {currentState &&
            currentState.map((value, index) => {
              return (
                <Input
                  onChange={handleOnChangeInput}
                  key={index}
                  value={value}
                  index={index}
                  onRemove={handleRemoveInput}
                />
              )
            })}
        </div>
      </div>
    </>
  )
}

export default Editor
