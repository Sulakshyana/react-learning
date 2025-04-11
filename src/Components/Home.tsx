import { Link } from "react-router-dom";
function Home() {
    return (
        <>
         <header className='text-white p-3'>
        <h1><i className="bi bi-journal-check"></i> Todo list</h1>
        </header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/count">Count</Link>
          </li>
          <li>
            <Link to="/auto-counter">Auto Counter</Link>
          </li>
        </ul>
      </nav>
        </>
    );
  }
  
export default Home;