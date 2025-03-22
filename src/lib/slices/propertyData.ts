import { Property } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    properties: [] as Property[],
    likedProperties: [] as number[],
};

const slice = createSlice({
  name: "propertyData",
  initialState,
  reducers: {
    addProperties: (state, action: PayloadAction<Property[]>) => {
      state.properties = [...state.properties, ...action.payload];
    },
    addLikedProperty: (state, action: PayloadAction<number>) => {
      state.likedProperties = [...state.likedProperties, action.payload];
    },
    removeLikedProperty: (state, action: PayloadAction<number>) => {
      state.likedProperties = state.likedProperties.filter(
        (id) => id !== action.payload
      );
    }
  },
});

export const { reducer } = slice;

export const propertyDataActions = slice.actions;

export default slice;
