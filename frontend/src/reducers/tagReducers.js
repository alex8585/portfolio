import {
  TAG_LIST_REQUEST,
  TAG_LIST_SUCCESS,
  TAG_LIST_FAIL,
  SET_ACTIVE_TAG,
} from "../constants/tagConstants"

export const tagListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case SET_ACTIVE_TAG:
      let id = action.payload
      let newData = state.data.map((tag) => {
        if (tag.id === id) {
          tag.active = !tag.active
        }
        return tag
      })
      //console.log(newData)
      return {
        data: newData,
        ...state,
      }
    case TAG_LIST_REQUEST:
      return { loading: true, data: [] }
    case TAG_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
        perPage: action.payload.perPage,
      }
    case TAG_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
