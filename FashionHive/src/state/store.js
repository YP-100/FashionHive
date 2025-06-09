import { applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from './Auth/Reducer';

import { cartReducer } from './Cart/Reducer';
import { orderReducer } from './Order/Reducer';
import { customerProductReducer } from './Product/Reducer';
import  adminOrderReducer from './Admin/Orders/Reducer';
import  {reviewReducer } from "./Reviews/Reducer";
import { ratingReducer } from './Ratings/Reducer';
import { CartLoginPopReducer } from './CartLoginPop/Reducer';
import { alluserReducer } from './Admin/Users/Reducer';
import { salesReducer } from './Sales/Reducer';
import { feedbackReducer } from './FeedBack/Reducer';

const rootReducers = combineReducers({
    auth: authReducer,
    products: customerProductReducer,
    cart :cartReducer,
    order : orderReducer,
    adminOrder: adminOrderReducer,
    review: reviewReducer,
    rating: ratingReducer,
    CartLoginpop : CartLoginPopReducer,
    allusers: alluserReducer,
    sales: salesReducer,
    feedback: feedbackReducer,


})
export const store = legacy_createStore(rootReducers,applyMiddleware(thunk))