import './App.css';
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
