import "../styles/globals.css";
import Head from "next/head";
import NavBar from "../components/NavBar";

import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import project from "../reducers/project";
import user from "../reducers/user";
import location from "../reducers/location";
import offer from "../reducers/offer";
import job from "../reducers/job";
import { Provider } from "react-redux";

const reducers = combineReducers({ user, project, location, job, offer });
const persistConfig = { key: "allwithin", storage };

const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistor = persistStore(store);

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          <title>Next.js App</title>
        </Head>
        <NavBar />
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
