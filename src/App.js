import logo from './logo.svg';
import './App.css';
import { Box } from '@chakra-ui/react';
import PageLayout from './components/page-layout';
import ContainLayout from './components/page-layout/container';
import Home from './components/home';

function App() {
  return (
    <PageLayout>
      <ContainLayout>
        <Home/>
      </ContainLayout>
    </PageLayout>
  );
}

export default App;
