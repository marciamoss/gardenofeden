import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Profile from "../components/Profile/Profile";

const DEFAULTCOMPONENTS = [
  {
    r: "/",
    p: (
      <>
        <Header />
        <Main />
        <Footer />
      </>
    ),
  },
];

const SIGNEDINCOMPONENTS = [
  {
    r: "/profile",
    p: (
      <>
        <Header />
        <Profile />
        <Footer />
      </>
    ),
  },
];

export { DEFAULTCOMPONENTS, SIGNEDINCOMPONENTS };
