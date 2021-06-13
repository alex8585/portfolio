import { fetchUtils } from "react-admin"

const apiUrl = "http://localhost:5000/api/users"
const httpClient = fetchUtils.fetchJson

// eslint-disable-next-line import/no-anonymous-default-export
const authProvider = {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    const data = { username, password }
    return httpClient(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify(data),
    }).then(({ json }) => {
      console.log(json)
      localStorage.setItem("username", json.email)
      localStorage.setItem("token", json.token)
      return Promise.resolve()
    })
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("username")
    return Promise.resolve()
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      console.log(status)
      localStorage.removeItem("username")
      localStorage.removeItem("token")
      return Promise.reject()
    }
    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem("username")
      ? Promise.resolve()
      : Promise.reject()
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
  getIdentity: () => {
    try {
      const fullName = localStorage.getItem("username")
      return Promise.resolve({ fullName })
    } catch (error) {
      return Promise.reject(error)
    }
  },
}
export default authProvider
