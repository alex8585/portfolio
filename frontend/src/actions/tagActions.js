import axios from "axios"
import {
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAIL,
  SET_ACTIVE_TAG,
} from "../constants/tagConstants"

function getUrl() {
  let url = process.env.REACT_APP_LOCAL_API_URL
  if (process.env.REACT_APP_ENV !== "development") {
    url = process.env.REACT_APP_API_URL
  }
  return url
}

export const filterByTags = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SET_ACTIVE_TAG,
      payload: id,
    })
  } catch (error) {}
}

export const listTags =
  (page = "", perPage = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: TAG_LIST_REQUEST })
      const url = getUrl()

      const { data } = await axios.get(
        `${url}/tags?perPage=${perPage}&page=${page}`
      )
      dispatch({
        type: TAG_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: TAG_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
