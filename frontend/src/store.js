import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { portfolioListReducer } from "./reducers/portfolioReducers"

import { tagListReducer } from "./reducers/tagReducers"

const reducer = combineReducers({
  tagList: tagListReducer,
  portfolioList: portfolioListReducer,
})

const initialState = {}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
