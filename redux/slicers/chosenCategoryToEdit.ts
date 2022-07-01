import { createSlice } from "@reduxjs/toolkit";
import { ChosenCategoryState } from "common/interfaces/types";

const initialState: ChosenCategoryState = {
    category: {
        name: '',
        url: '',
        parent: {
            id: ''
        }
    },
};

const chosenCategorySlicer = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setState(state: ChosenCategoryState, action: { payload: any}) {
            console.log(action.payload)
            state.category = action.payload
        },
        clearState(state: ChosenCategoryState) {
            state.category = {
                name: '',
                url: '',
                parent: {}
            }
        },
        setName(state: ChosenCategoryState, action: { payload: any}) {
            state.category.name = action.payload
        },
        setUrl(state: ChosenCategoryState, action: { payload: any}) {
            state.category.url = action.payload
        },
        setParent(state: ChosenCategoryState, action: { payload: any}) {
            state.category.parent.id = action.payload
        }
    }
})

export const { setState, clearState, setName, setUrl, setParent } = chosenCategorySlicer.actions

export default chosenCategorySlicer.reducer