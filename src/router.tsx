import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home';
import Counter from './components/Counter';

  const Router: React.FC = () => {
    return(
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/count' element={ <Counter/>}/>
    </Routes>
);
  };

export default Router;
