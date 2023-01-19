import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
// import Footer from '../footer';
// import Navbar from '../navbar';
import ContainLayout from './container';


const PageLayout = Pageprops => {
  return (
    <Box>
        <Box mx="auto" py={{ base: '4', md: '6', lg: '8' }}>
          {Pageprops.children}
        </Box>
    </Box>
  );
};

export default PageLayout;
