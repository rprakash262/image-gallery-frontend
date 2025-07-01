import { Provider } from "react-redux";

import Router from "./router/Router";
import { store } from "./store";
import PhotoModal from "./components/photoModal/PhotoModal";
import { AuthContextProvider } from "./hooks/useAuth";

function App() {
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthContextProvider>
  );
}

export default App;
