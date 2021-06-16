import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
} from "../constants/portfolioConstants"

export const portfolioListReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case PORTFOLIO_LIST_REQUEST:
      return { loading: true, data: [] }
    case PORTFOLIO_LIST_SUCCESS:
      return {
        loading: false,
        data: action.payload.data,
        pages: action.payload.pages,
        page: action.payload.page,
        total: action.payload.total,
        perPage: action.payload.perPage,
      }
    case PORTFOLIO_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
