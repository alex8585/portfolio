import { fetchUtils } from "react-admin"
import { stringify } from "query-string"

const apiUrl = "http://localhost:5000/api"
//const httpClient = fetchUtils.fetchJson

const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" })
  }
  const token = localStorage.getItem("token")
  options.headers.set("authorization", "Bearer " + token)
  return fetchUtils.fetchJson(url, options)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getList: (resource, params) => {
    //console.log(resource)

    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: field,
      direction: order,
      page,
      perPage,
      filter: JSON.stringify(params.filter),
    }
    // const query = {
    //   sort: JSON.stringify([field, order]),
    //   range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
    //   filter: JSON.stringify(params.filter),
    // }
    const url = `${apiUrl}/${resource}?${stringify(query)}`
    //const url = `${apiUrl}/test`
    return httpClient(url).then(({ headers, json }) => {
      return {
        data: json.data,
        total: parseInt(json.total, 10),
      }
    })
  },

  getOne: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
      data: json,
    })),

  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    const url = `${apiUrl}/${resource}/by-ids/?${stringify(query)}`
    const r = httpClient(url).then(({ json }) => {
      return { data: json.data }
    })

    return r
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination
    const { field, order } = params.sort
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    }
    const url = `${apiUrl}/${resource}?${stringify(query)}`

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range").split("/").pop(), 10),
    }))
  },

  update: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json })),

  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: "PUT",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }))
  },

  create: (resource, params) =>
    httpClient(`${apiUrl}/${resource}`, {
      method: "POST",
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({
      data: { ...params.data, id: json.id },
    })),

  delete: (resource, params) =>
    httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: "DELETE",
    }).then(({ json }) => {
      return { data: json.data }
    }),

  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    }

    return httpClient(`${apiUrl}/${resource}/multi/?${stringify(query)}`, {
      method: "DELETE",
    }).then(({ json }) => {
      return { data: json.data }
    })
  },
}
