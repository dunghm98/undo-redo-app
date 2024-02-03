import { createAction, createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { throttle } from "lodash";
const hydrate = createAction(HYDRATE);
const HISTORY_CAPACITY = 100;

const initialState = {
  currentState: [""],
  undoStack: [],
  redoStack: [],
};

const checkAndTrimUndoStack = (stack) => {
  while (stack.length > HISTORY_CAPACITY) {
    stack.shift();
  }
};

export const editorSlice = createSlice({
  name: "editor",
  initialState: initialState,
  reducers: {
    addInput(state) {
      const lastState = [...state.currentState];
      state.undoStack.push(lastState);
      state.currentState.push("");
      state.redoStack = [];
      checkAndTrimUndoStack(state.undoStack);
    },
    undo: (state) => {
      const lastState = [...state.currentState];
      state.redoStack.push(lastState);
      state.currentState = state.undoStack.pop() || [];
    },
    redo: (state) => {
      const lastState = [...state.currentState];
      state.undoStack.push(lastState);
      state.currentState = state.redoStack.pop() || [];
    },
    updateCurrentStateInput: (state, action) => {
      const { index, value } = action.payload;
      state.currentState[index] = value;
    },
    updateInputUndoValue: (state, action) => {
      const { index, value } = action.payload;
      const lastState = [...state.currentState];
      if (lastState[index] !== value) {
        state.undoStack.push(lastState);
        state.redoStack = [];
        checkAndTrimUndoStack(state.undoStack);
      }
    },
    removeInput: (state, action) => {
      const index = action.payload;
      const lastState = [...state.currentState];
      state.undoStack.push(lastState);
      state.currentState.splice(index, 1);
      state.redoStack = [];
      checkAndTrimUndoStack(state.undoStack);
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state) => {
      return {
        ...state,
      };
    });
  },
});

const { updateCurrentStateInput, updateInputUndoValue } = editorSlice.actions;

const throttleUpdateChangeInput = throttle((dispatch, payload) => {
  dispatch(updateInputUndoValue(payload));
}, 300);

export const updateInputThrottling = (payload) => (dispatch) => {
  throttleUpdateChangeInput(dispatch, payload);
  dispatch(updateCurrentStateInput(payload));
};

export const { addInput, undo, redo, onChangeInput, removeInput } =
  editorSlice.actions;

export default editorSlice.reducer;
