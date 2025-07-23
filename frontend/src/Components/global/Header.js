// import { Link } from "react-router-dom";
// const Header = ()=>{
//     return (
//      <header >
//     <nav class="navbar navbar-expand-lg navbar-light bg-white px-3 position-fixed" style={{width:"100vw"}}>
//       <a class="navbar-brand" href="#">
//         <img src="images/2.png" alt="Logo" height="50" />
//       </a>
//       <button
//         class="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navbarNav"
//         aria-controls="navbarNav"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span class="navbar-toggler-icon"></span>
//       </button>
//       <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
//         <ul class="navbar-nav">
//           <li class="nav-item mx-2"><Link class="nav-link active fs-4" to="/">Home</Link></li>
//           <li class="nav-item mx-2"><Link class="nav-link fs-4" to="#">Contact</Link></li>
//           <li class="nav-item mx-2"><Link class="nav-link fs-4  " to="Sign-in">Sign in</Link></li>
//           <li class="nav-item mx-2"><Link class="nav-link fs-4" to="Sign-Up">Sign up</Link></li>
//         </ul>
//       </div>
//     </nav>
   
//   </header>

//    );
// }

// export default Header;

import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Header = () => {
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-white px-3 position-fixed"
        style={{ width: "100vw", zIndex: 1000 }}
      >
        <Link className="navbar-brand" to="/">
          <img src="/images/2.png" alt="Logo" height="50" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <Link className="nav-link active fs-4" to="/">Home</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fs-4" to="/Sign-in">Sign in</Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link fs-4" to="/Sign-Up">Sign up</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
