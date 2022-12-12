import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import icBack from '../../assets/back.svg'
import icGoogle from '../../assets/logogoogle.svg'

const Index = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  })

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(form)
    if (form.username == "" || form.email == "" || form.password == "") {
        alert('Semua input wajib diisi')
    } else {
        const body = {
            username: form.username,
            email: form.email,
            password: form.password,
        }
        
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/register`, body)
                .then((response) => {
                    if (response.data.status != 'success') {
                        alert(response.data.message)
                    } else {
                        alert("data berhasil ditambahkan")
                        console.log(response.data)
                        return navigate('/')
                    }
                    // console.log(response.data)
                    // return navigate('/')
                }).catch((err) => {
                    console.error(err)
                })
        
    }
}
  
  return (
    <>
      <section className={`d-flex align-items-center ${styles.main}`}>
        <div className="container">
          <div className="row">
            <div className={`col-md-5 p-5 m-auto ${styles.sideLogin}`}>
              <div className="d-flex flex-row">
                <img src={icBack} alt="logo"  />
                <div className={`mx-auto ${styles.title}`}>Register</div>
              </div>
              <p className={`mt-5 ${styles.subTitle}`}>Let’s create your account!</p>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className="form-floating mb-3">
                <input type="text" 
                className={`form-control ${styles.inputForm}`} 
                id="floatingInput" 
                placeholder="Telegram app"
                onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <label htmlFor="floatingInput" className="form-label">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input type="email" 
                className={`form-control ${styles.inputForm}`} 
                id="floatingInput" 
                placeholder="name@example.com"
                onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <label htmlFor="floatingInput" className="form-label">Email address</label>
              </div>
              <div className="form-floating">
                <input type="password" 
                className={`form-control ${styles.inputForm}`} 
                id="floatingPassword" 
                placeholder="Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <label htmlFor="floatingPassword" className="form-label">Password</label>
              </div>
              <div className="d-flex flex-column mt-4">
                <button type="submit" className={styles.btnRegister}>Register</button>
                <p className="my-4 text-center textLW">Register With</p>
                <button className={styles.btnGLogin}><img src={icGoogle} alt="icGoogle" className="me-3"/> Google </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Index;
