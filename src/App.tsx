import * as React from "react";
import { ChakraProvider, Box, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import Cart from "./component/Cart/Cart";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign={"center"} fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Cart></Cart>
      </Grid>
    </Box>
  </ChakraProvider>
);
