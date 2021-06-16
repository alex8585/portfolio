import axios from "axios"
import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
} from "../constants/portfolioConstants"

export const listPortfolios =
  (page = "", perPage = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: PORTFOLIO_LIST_REQUEST })

      const { data } = await axios.get(
        `/api/portfolios?perPage=${perPage}&page=${page}`
      )

      dispatch({
        type: PORTFOLIO_LIST_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: PORTFOLIO_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
