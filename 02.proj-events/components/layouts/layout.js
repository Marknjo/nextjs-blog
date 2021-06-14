import MainHeader from './main-header';

const Layout = function (props) {
  return (
    <>
      <MainHeader />
      {props.children}
    </>
  );
};

export default Layout;
