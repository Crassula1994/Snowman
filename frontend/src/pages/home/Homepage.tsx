import React from "react";
import { NavLink } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="container">
            <h1>Homepage</h1>
            <p>Welcome to the homepage of the application!</p>
            <NavLink to="/register">
                <button className="btn mx-3 btn-primary">회원가입</button>
            </NavLink>
            <NavLink to="/login">
                <button className="btn btn-primary">로그인</button>
            </NavLink>
        </div>
    );
};

export default Homepage;
