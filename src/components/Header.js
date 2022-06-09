import React from "react";

const style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "5px",
    left: "0",
    bottom: "0",
    width: "100%"
};

const Header = (performance) => {
    return (
        <div style={style}  className={"text-dark bg-warning text-center"}>
            <h1>{performance.performance.name}</h1>
            <h5>{performance.performance.description}</h5>
            <h3>{performance.performance.fullName}</h3>
            <h3>{performance.performance.place}</h3>
            <h3>Category: {performance.performance.category.name}</h3>
        </div>
    );
}

export default Header;