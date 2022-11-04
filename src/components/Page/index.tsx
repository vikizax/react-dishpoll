import { Helmet } from "react-helmet-async";
import { forwardRef } from "react";
import { Box, BoxProps } from "@mui/material";

interface PageProps extends BoxProps {
  title?: string;
  meta?: React.ReactNode;
}

const Page = forwardRef<unknown, PageProps>(
  ({ children, title = "", meta, ...other }, ref) => (
    <>
      <Helmet>
        <title>{`${title}`}</title>
        {meta}
      </Helmet>

      <Box ref={ref} {...other}>
        {children}
      </Box>
    </>
  )
);

export default Page;
