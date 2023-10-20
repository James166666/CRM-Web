import React from "react";
import "bootstrap";
import "./Style.css";

function SideBar() {
  return (
    <div class="row container-fluid">
      {/* sidebar col */}
      <div class="col-sm-2 mx-4 mt-2">
        <div class="hstack gap-3 mb-4">
          <div class="p-2">
            <a class="navbar-brand" href="/" aria-label="MyCircles">
              <img
                src="https://github.com/ITProject-Thu-12pm/Assets/blob/main/logo-white-bg.png?raw=true"
                class="mh-100 mw-100"
                alt="logo"
              ></img>
            </a>
          </div>

          <div class="p-2 mt-1">
            <a class="navbar-brand" href="/" aria-label="MyCircles">
              <h5>MyCircles</h5>
            </a>
          </div>
          {/* <div class="p-2">Third item</div> */}
        </div>
        {/* row for web logo and name */}
        {/* <div class="row mt-5 mb-5">
          <div class="col-sm-3">
            <a
              class="navbar-brand"
              href="/"
              aria-label="MyCircles"
            > */}
        {/* web logo */}
        {/* <img
                src="https://github.com/ITProject-Thu-12pm/Assets/blob/main/logo.jpg?raw=true"
                class="h-50 w-50"
                alt="logo"
              ></img>
            </a>
          </div> */}

        {/* web name */}

        {/* <div class="col-sm-8" href="/">
            <p class="display-6">MyCricles</p>
          </div> */}
        {/* </div> */}

        {/* <ul class="nav nav-pills flex-column"> */}
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start">
          <li class="nav-item pb-2">
            <a class="nav-link active" href="#dashboard">
              Dashboard
            </a>
          </li>
          <li class="nav-item pb-2">
            <a class="nav-link" href="#contacts">
              Contacts
            </a>
          </li>
          <li class="nav-item pb-2">
            <a class="nav-link" href="#todo">
              Todo
            </a>
          </li>
          <li class="nav-item pb-2">
            <a class="nav-link" href="#calendar">
              Calendar
            </a>
          </li>
          <li class="nav-item pb-2">
            <a class="nav-link disabled" href="#help">
              Help
            </a>
          </li>
        </ul>
        <hr class="d-sm-none" />
        <div class="dropdown px-2 pb-5 position-absolute bottom-0 start-25">
                    <a href="#" class="d-flex align-items-center text-black text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/>
                        <span class="d-none d-sm-inline mx-1">loser</span>
                    </a>
                    <ul class="dropdown-menu text-small shadow" aria-labelledby="dropdownUser1">
                        <li><a class="dropdown-item" href="#">New project...</a></li>
                        <li><a class="dropdown-item" href="#">Settings</a></li>
                        <li><a class="dropdown-item" href="#">Profile</a></li>
                        <li>
                            <hr class="dropdown-divider" />
                        </li>
                        <li><a class="dropdown-item" href="#">Sign out</a></li>
                    </ul>
                </div>
        {/* <div class="dropdown">
          <a
            class="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown link
          </a>

          <ul class="dropdown-menu">
            <li>
              <a class="dropdown-item" href="#">
                Action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Another action
              </a>
            </li>
            <li>
              <a class="dropdown-item" href="#">
                Something else here
              </a>
            </li>
          </ul>
        </div> */}
      </div>
      <div class="col default-bg-color">
        <nav class="navbar bg-body-tertiary">
          <div class="container-fluid">
            <a class="navbar-brand" href="/">
              Hello Yiqun
              <img
                src="https://github.com/ITProject-Thu-12pm/Assets/blob/main/hello(60%20x%2060).png?raw=true"
                class="h-25 w-25"
                alt="hello"
              />
            </a>

            <form class="d-flex justify-content-end" role="search">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </nav>
      </div>
    </div>
  );
}

// import "bootstrap/dist/css/bootstrap.min.css";

// function SideBarLabel() {
//     return (
//  <div
//             className="offcanvas-md offcanvas-end bg-body-tertiary"
//             tabindex="-1"
//             id="sidebarMenu"
//             aria-labelledby="sidebarMenuLabel"
//           >
//             <div className="offcanvas-header">
//               <h5 className="offcanvas-title" id="sidebarMenuLabel">
//                 Company name
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="offcanvas"
//                 data-bs-target="#sidebarMenu"
//                 aria-label="Close"
//               ></button>
//             </div>
//     );
// }

// function SideBar() {
//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
//           <div
//             className="offcanvas-md offcanvas-end bg-body-tertiary"
//             tabindex="-1"
//             id="sidebarMenu"
//             aria-labelledby="sidebarMenuLabel"
//           >
//             <div className="offcanvas-header">
//               <h5 className="offcanvas-title" id="sidebarMenuLabel">
//                 Company name
//               </h5>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="offcanvas"
//                 data-bs-target="#sidebarMenu"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
//               <ul className="nav flex-column">
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2 active"
//                     aria-current="page"
//                     href="#Dashboard"
//                   >
//                     {/* <svg className="bi">
//                     <use xlinkHref="#house-fill"></use>
//                   </svg> */}
//                     {/* <svg className="bi">
//                       <use xlinkHref="#house-fill"></use>
//                     </svg> */}
//                     Dashboard
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#Orders"
//                   >
//                     {/* <svg className="bi">
//                       <use xlinkHref="#file-earmark"></use>
//                     </svg> */}
//                     Orders
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#Products"
//                   >
//                     {/* <svg className="bi">
//                       <use xlinkHref="#cart"></use>
//                     </svg> */}
//                     Products
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#Customers"
//                   >
//                     {/* <svg className="bi">
//                       <use xlinkHref="#people"></use>
//                     </svg> */}
//                     Customers
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#Reports"
//                   >
//                     {/* <svg className="bi">
//                       <use xlinkHref="#graph-up"></use>
//                     </svg> */}
//                     Reports
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#Integrations"
//                   >
//                     {/* <svg className="bi">
//                       <use xlinkHref="#puzzle"></use>
//                     </svg> */}
//                     Integrations
//                   </a>
//                 </li>
//               </ul>

//               <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
//                 <span>Saved reports</span>
//                 <a
//                   className="link-secondary"
//                   href="#Saved reports"
//                   aria-label="Add a new report"
//                 >
//                   {/* <svg className="bi">
//                     <use xlinkHref="#plus-circle"></use>
//                   </svg> */}
//                 </a>
//               </h6>
//               <ul className="nav flex-column mb-auto">
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#"
//                   >
//                     <svg className="bi">
//                       <use xlinkHref="#file-earmark-text"></use>
//                     </svg>
//                     Current month
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#"
//                   >
//                     <svg className="bi">
//                       <use xlinkHref="#file-earmark-text"></use>
//                     </svg>
//                     Last quarter
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     className="nav-link d-flex align-items-center gap-2"
//                     href="#"
//                   >
//                     <svg className="bi">
//                       <use xlinkHref="#file-earmark-text"></use>
//                     </svg>
//                     Social engagement
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a
//                     classNameName="nav-link d-flex align-items-center gap-2"
//                     href="#"
//                   >
//                     <svg className="bi">
//                       <use xlinkHref="#file-earmark-text"></use>
//                     </svg>
//                     Year-end sale
//                   </a>
//                 </li>
//               </ul>

//               <hr className="my-3" />
//                 <ul className="nav flex-column mb-auto">
//                   <li className="nav-item">
//                     <a
//                       classNameName="nav-link d-flex align-items-center gap-2"
//                       href="#"
//                     >
//                       <svg className="bi">
//                         <use xlinkHref="#gear-wide-connected"></use>
//                       </svg>
//                       Settings
//                     </a>
//                   </li>
//                   <li className="nav-item">
//                     <a
//                       classNameName="nav-link d-flex align-items-center gap-2"
//                       href="#"
//                     >
//                       <svg className="bi">
//                         <use xlinkHref="#door-closed"></use>
//                       </svg>
//                       Sign out
//                     </a>
//                   </li>
//                 </ul>
//               {/* </hr> */}
//             </div>
//           </div>
//         </div>

//         <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//           <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
//             <h1 className="h2">Dashboard</h1>
//             <div className="btn-toolbar mb-2 mb-md-0">
//               <div className="btn-group me-2">
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                 >
//                   Share
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-sm btn-outline-secondary"
//                 >
//                   Export
//                 </button>
//               </div>
//               <button
//                 type="button"
//                 className="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
//               >
//                 <svg className="bi">
//                   <use xlinkHref="#calendar3"></use>
//                 </svg>
//                 This week
//               </button>
//             </div>
//           </div>

//           {/* <canvas
//             className="my-4 w-100"
//             id="myChart"
//             width="1970"
//             height="832"
//             style={{
//               display: "block",
//               boxSizing: "border-box",
//               height: "416px",
//               width: "985px",
//             }}
//           ></canvas> */}

//           {/* <h2>Section title</h2>
//           <div className="table-responsive small">
//             <table className="table table-striped table-sm">
//               <thead>
//                 <tr>
//                   <th scope="col">#</th>
//                   <th scope="col">Header</th>
//                   <th scope="col">Header</th>
//                   <th scope="col">Header</th>
//                   <th scope="col">Header</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>1,001</td>
//                   <td>random</td>
//                   <td>data</td>
//                   <td>placeholder</td>
//                   <td>text</td>
//                 </tr>
//                 <tr>
//                   <td>1,002</td>
//                   <td>placeholder</td>
//                   <td>irrelevant</td>
//                   <td>visual</td>
//                   <td>layout</td>
//                 </tr>
//                 <tr>
//                   <td>1,003</td>
//                   <td>data</td>
//                   <td>rich</td>
//                   <td>dashboard</td>
//                   <td>tabular</td>
//                 </tr>
//                 <tr>
//                   <td>1,003</td>
//                   <td>information</td>
//                   <td>placeholder</td>
//                   <td>illustrative</td>
//                   <td>data</td>
//                 </tr>
//                 <tr>
//                   <td>1,004</td>
//                   <td>text</td>
//                   <td>random</td>
//                   <td>layout</td>
//                   <td>dashboard</td>
//                 </tr>
//                 <tr>
//                   <td>1,005</td>
//                   <td>dashboard</td>
//                   <td>irrelevant</td>
//                   <td>text</td>
//                   <td>placeholder</td>
//                 </tr>
//                 <tr>
//                   <td>1,006</td>
//                   <td>dashboard</td>
//                   <td>illustrative</td>
//                   <td>rich</td>
//                   <td>data</td>
//                 </tr>
//                 <tr>
//                   <td>1,007</td>
//                   <td>placeholder</td>
//                   <td>tabular</td>
//                   <td>information</td>
//                   <td>irrelevant</td>
//                 </tr>
//                 <tr>
//                   <td>1,008</td>
//                   <td>random</td>
//                   <td>data</td>
//                   <td>placeholder</td>
//                   <td>text</td>
//                 </tr>
//                 <tr>
//                   <td>1,009</td>
//                   <td>placeholder</td>
//                   <td>irrelevant</td>
//                   <td>visual</td>
//                   <td>layout</td>
//                 </tr>
//                 <tr>
//                   <td>1,010</td>
//                   <td>data</td>
//                   <td>rich</td>
//                   <td>dashboard</td>
//                   <td>tabular</td>
//                 </tr>
//                 <tr>
//                   <td>1,011</td>
//                   <td>information</td>
//                   <td>placeholder</td>
//                   <td>illustrative</td>
//                   <td>data</td>
//                 </tr>
//                 <tr>
//                   <td>1,012</td>
//                   <td>text</td>
//                   <td>placeholder</td>
//                   <td>layout</td>
//                   <td>dashboard</td>
//                 </tr>
//                 <tr>
//                   <td>1,013</td>
//                   <td>dashboard</td>
//                   <td>irrelevant</td>
//                   <td>text</td>
//                   <td>visual</td>
//                 </tr>
//                 <tr>
//                   <td>1,014</td>
//                   <td>dashboard</td>
//                   <td>illustrative</td>
//                   <td>rich</td>
//                   <td>data</td>
//                 </tr>
//                 <tr>
//                   <td>1,015</td>
//                   <td>random</td>
//                   <td>tabular</td>
//                   <td>information</td>
//                   <td>text</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div> */}
//         </main>
//       </div>
//     </div>
//   );
// }

export default SideBar;
