import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import axios from "axios";

const Index = () => {
    const navigate = useNavigate();

    const [form, setform] = useState({
        email: '',
        password: '',
    })

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log(form)
        // //root dari backend
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, form)
            .then((response) => {
                console.log(response.data)
                if (response.data.status !== 'success') {
                    alert(response.data.message)
                } else {
                    localStorage.setItem("token", response.data.token.token);
                    localStorage.setItem("data", JSON.stringify(response.data.token.data));
                    alert("data berhasil login")
                    return navigate('/chat')}
                })
            .catch((err) => {
                console.log(err);
            })
    }

    
    return (
        <>
            <section className={`d-flex align-items-center ${styles.main}`}>
                <div className="container">
                    <div className="row">
                        <div className={`col-md-5 p-5 m-auto ${styles.sideLogin}`}>
                            <div className={`text-center ${styles.title}`}>Login</div>
                            <p className={`mt-5 ${styles.subTitle}`}>Hi, Welcome back!</p>
                            <form onSubmit={(e) => onSubmit(e)}>
                                <div className="form-floating mb-3">
                                <input type="email" 
                                className={`form-control ${styles.inputForm}`} 
                                id="floatingInput" 
                                placeholder="name@example.com"
                                onChange={(e) => setform({ ...form, email: e.target.value })}/> 
                                <label htmlFor="floatingInput" className="form-label">Email address</label>
                            </div>
                            <div className="form-floating">
                                <input type="password" 
                                className={`form-control ${styles.inputForm}`} 
                                id="floatingPassword" 
                                placeholder="Password"
                                onChange={(e) => setform({ ...form, password: e.target.value })}/> 
                                <label htmlFor="floatingPassword" className="form-label">Password</label>
                            </div>
                            <p className={`my-5 text-end ${styles.textForgot}`}>Forgot Password?</p>
                            <div className="d-flex flex-column">
                                <button type="submit" className={styles.btnLogin}>Login</button>
                                <p className="my-4 text-center textLW">Login With</p>
                                <button className={styles.btnGLogin}>Google</button>
                            </div>
                            </form>
                            
                                    <p className={`text-center mt-5 ${styles.signup}`}>Don't have a account? <Link to="/register" style={{ textDecoration:'none' }}>
                                    <span className={styles['signup-page']}>Sign Up</span> </Link> </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Index;
