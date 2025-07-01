import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Album {
  _id: string;
  albumName: string;
  description: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

interface AlbumsState {
  allAlbums: Album[];
}

const initialState: AlbumsState = {
  allAlbums: [],
};

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    setAllAlbums: (state, action) => {
      state.allAlbums = action.payload;
    },
  },
});

export const { setAllAlbums } = albumsSlice.actions;

export default albumsSlice.reducer;
