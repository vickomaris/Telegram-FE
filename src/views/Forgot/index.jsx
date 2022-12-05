import React from 'react'
import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import icBack from '../../assets/back.svg'

const index = () => {
  return (
    <>
      <section className={`d-flex align-items-center ${styles.main}`}>
        <div className="container">
          <div className="row">
            <div className={`col-md-5 p-5 m-auto ${styles.sideLogin}`}>
              <div className="d-flex flex-row">
                <img src={icBack} alt="logo"  />
                <div className={`mx-auto ${styles.title}`}>Forgot Password</div>
              </div>
              <p className={`mt-5 ${styles.subTitle}`}>You’ll get messages soon on your e-mail </p>
              <div className="form-floating mb-3">
                <input type="email" className={`form-control ${styles.inputForm}`} id="floatingInput" placeholder="name@example.com" />
                <label htmlFor="floatingInput" className="form-label">Email address</label>
              </div>
              <div className="d-flex flex-column mt-4">
                <button className={styles.btnSend}>Send</button>
              </div>
              
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default index