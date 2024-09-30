import React from "react";
import { NavLink } from "react-router-dom";

const Homepage = () => {
    return (
        <div className="container">
            <h1>홈페이지</h1>
            <p>환영합니다!</p>
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
