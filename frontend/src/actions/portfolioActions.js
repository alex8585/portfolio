import axios from "axios"
import {
  PORTFOLIO_LIST_REQUEST,
  PORTFOLIO_LIST_SUCCESS,
  PORTFOLIO_LIST_FAIL,
} from "../constants/portfolioConstants"

function getUrl() {
  let url = process.env.REACT_APP_LOCAL_API_URL
  if (process.env.REACT_APP_ENV !== "development") {
    url = process.env.REACT_APP_API_URL
  }
  return url
}

export const listPortfolios =
  (page = "", perPage = "", tags = []) =>
  async (dispatch) => {
    let tagsIds = tags.filter((tag) => tag.active).map((tag) => tag.id)

    let filter = ""
    if (tagsIds.length) {
      filter = { tags: tagsIds.join(",") }
      filter = JSON.stringify(filter)
    }

    try {
      dispatch({ type: PORTFOLIO_LIST_REQUEST })
      const url = getUrl()
      console.log(url)
      const { data } = await axios.get(
        `${url}/portfolios?perPage=${perPage}&page=${page}&filter=${filter}`
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
