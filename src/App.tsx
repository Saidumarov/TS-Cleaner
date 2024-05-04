import { ChakraProvider } from "@chakra-ui/react";
import RouterPage from "./router";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <RouterPage />
      </ChakraProvider>
    </>
  );
};

export default App;
