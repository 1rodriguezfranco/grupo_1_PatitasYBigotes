import "./assets/css/app.css";
import SideBar from "./components/SideBar/SideBar";
import ContentWrapper from "./views/ContentWrapper/ContentWrapper";

import './App.css';

function App() {
  return (
    <div id="wrapper">

		{/* <!-- Sidebar --> */} 
		<SideBar />
		{/* <!-- End of Sidebar --> */}

		{/* <!-- Content Wrapper --> */}
		<ContentWrapper />
		{/* <!-- End of Content Wrapper --> */}

	</div>
  );
}

export default App;
