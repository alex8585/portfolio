import axios from "axios"

function getUrl() {
  let url = process.env.REACT_APP_LOCAL_API_URL
  if (process.env.REACT_APP_ENV !== "development") {
    url = process.env.REACT_APP_API_URL
  }
  return url
}

export const getList = async (
  resource,
  { perPage = "6", page = "1", filter = "" },
  config = {}
) => {
  const url = getUrl()
  return await axios.get(
    `${url}/${resource}?perPage=${perPage}&page=${page}&filter=${filter}`,
    config
  )
}
