import { lazy, Suspense } from "react";
import Loading from "./components/ui/loading";
const Chat = lazy(() => import("./pages/chat"));
function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Chat />
    </Suspense>
  );
}

export default App;
