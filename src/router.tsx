import './index.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home.tsx'
import Counter from './Components/count.tsx'

  const Router: React.FC = () => {
    return(
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/count' element={ <Counter/>}/>
    </Routes>
);
  };

export default Router;
