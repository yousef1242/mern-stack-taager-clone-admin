import { store } from "@/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <Toaster position="top-center" />
    </Provider>
  );
}
