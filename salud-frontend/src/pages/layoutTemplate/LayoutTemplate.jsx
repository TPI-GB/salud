import React from "react";
import Navbar from "../../components/Header/Navbar";

// Take in a component as argument WrappedComponent
const LayoutTemplate = (WrappedComponent) => {
  // And return another component
  return class extends React.Component {
    render() {
      return (
        <>
          <Navbar />
          <WrappedComponent />
        </>
      );
    }
  };
};

export default LayoutTemplate;
