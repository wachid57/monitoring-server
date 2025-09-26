import axios from 'src/utils/axios';
import { BACKEND_URL, API_PREFIX } from 'src/config/constants';
import { getAuthHeaders } from 'src/utils/auth';
import { createSlice } from '@reduxjs/toolkit';
import { map } from 'lodash';

const BASE = `${BACKEND_URL}${API_PREFIX}`;

const initialState = {
  posts: [],
  followers: [],
  gallery: [],
};

export const UserProfileSlice = createSlice({
  name: 'UserPost',
  initialState,
  reducers: {
    getPosts: (state, action) => {
      state.posts = action.payload;
    },
    getFollowers: (state, action) => {
      state.followers = action.payload;
    },
    getPhotos: (state, action) => {
      state.gallery = action.payload;
    },
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed,
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },
  },
});

export const { getPosts, getFollowers, onToggleFollow, getPhotos } = UserProfileSlice.actions;

export const fetchPosts = () => async (dispatch) => {
  try {
  const res = await fetch(`${BASE}/profiles/users/me/posts`, { headers: getAuthHeaders() });
  const data = await res.json();
  // Backend returns [{id, data}], normalize to shape UI expects if needed
  const normalized = data.map((p) => ({ id: p.id, data: p.data }));
  dispatch(getPosts(normalized));
  } catch (err) {
    throw new Error(err);
  }
};
export const likePosts = (postId) => async (dispatch) => {
  try {
  await fetch(`${BASE}/profiles/users/posts/like`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify({ postId }) });
  // re-fetch posts
  const res = await fetch(`${BASE}/profiles/users/me/posts`, { headers: getAuthHeaders() });
  const data = await res.json();
  const normalized = data.map((p) => ({ id: p.id, data: p.data }));
  dispatch(getPosts(normalized));
  } catch (err) {
    throw new Error(err);
  }
};
export const addComment = (postId, comment) => async (dispatch) => {
  try {
  await fetch(`${BASE}/profiles/users/posts/comments/add`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify({ postId, comment }) });
  const res = await fetch(`${BASE}/profiles/users/me/posts`, { headers: getAuthHeaders() });
  const data = await res.json();
  const normalized = data.map((p) => ({ id: p.id, data: p.data }));
  dispatch(getPosts(normalized));
  } catch (err) {
    throw new Error(err);
  }
};

export const addReply = (postId, commentId, reply) => async (dispatch) => {
  try {
  await fetch(`${BASE}/profiles/users/posts/replies/add`, { method: 'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify({ postId, commentId, reply }) });
  const res = await fetch(`${BASE}/profiles/users/me/posts`, { headers: getAuthHeaders() });
  const data = await res.json();
  const normalized = data.map((p) => ({ id: p.id, data: p.data }));
  dispatch(getPosts(normalized));
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchFollwores = () => async (dispatch) => {
  try {
  const res = await fetch(`${BASE}/profiles/users/me/followers`, { headers: getAuthHeaders() });
  const data = await res.json();
  dispatch(getFollowers(data));
  } catch (err) {
    throw new Error(err);
  }
};

export const fetchPhotos = () => async (dispatch) => {
  try {
  const res = await fetch(`${BASE}/profiles/users/me/photos`, { headers: getAuthHeaders() });
  const data = await res.json();
  dispatch(getPhotos(data));
  } catch (err) {
    throw new Error(err);
  }
};

export default UserProfileSlice.reducer;
