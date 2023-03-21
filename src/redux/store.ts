import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { reduserAcardionState } from "./redusers/acardion-reduser";
import { reduserAuth } from "./redusers/auth-reduser";
import { reduserBooking } from "./redusers/booking-reduser";
import { reduserCategories } from "./redusers/categories-reduser";
import { reduserBookingDelete } from "./redusers/delete-booking-reduser";
import { reduserForgot } from "./redusers/forgot-reduser";
import { reduserModalState } from "./redusers/modal-reduser";
import { reduserPage } from "./redusers/page-reduser";
import { reduserRateState } from "./redusers/rate-reduser";
import { reduserBurgerState } from './redusers/reduser'
import { reduserBooks } from "./redusers/reduser-book";
import { reduserRegistration } from "./redusers/registration-reduser";
import { reduserReset } from "./redusers/reset-reduser";
import { reduserRev } from "./redusers/rev-reduser";
import { reduserBookingUpdate } from "./redusers/update-booking-reduser";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    books: reduserBooks,
    categories: reduserCategories,
    page: reduserPage,
    burger: reduserBurgerState,
    acardion: reduserAcardionState,
    user: reduserAuth,
    newUser: reduserRegistration,
    forgot: reduserForgot,
    reset: reduserReset,
    modal: reduserModalState,
    rate: reduserRateState,
    rev: reduserRev,
    booking: reduserBooking,
    dateOfBooks: reduserBooks,
    deleteBook: reduserBookingDelete,
    updateBook: reduserBookingUpdate
});

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;