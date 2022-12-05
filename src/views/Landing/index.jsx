import React from 'react'
import styles from './styles.module.css'
import { Link } from "react-router-dom";

import icMenu from '../../assets/icMenu.svg'
import icPlus from '../../assets/icPlus.svg'
import icSetting from '../../assets/icSettings.svg'
import icContact from '../../assets/icContacts.svg'
import icPhone from '../../assets/icPhone.svg'
import icSaved from '../../assets/icSaved.svg'
import icInvite from '../../assets/icInvite.svg'
import icFAQ from '../../assets/icFAQ.svg'
import avaThere from '../../assets/avaThere.png'
import avaGregory from '../../assets/avaGregory.png'



const index = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-4 px-4  ${styles.leftside}`}>
                        <div className="d-flex flex-row py-5 ">
                            <div className={`col-auto me-auto ${styles.title}`}> Telegram </div>
                            <div className="dropdown">
                                <img src={icMenu} alt="icMenu" className='col-auto' type="button" data-bs-toggle="dropdown" />
                                <ul className={`dropdown-menu ${styles.dropStyle}`}>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icSetting} alt="setting" className='me-3' /> Action</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icContact} alt="setting" className='me-3' /> Contacts</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icPhone} alt="setting" className='me-3' /> Calls</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icSaved} alt="setting" className='me-4' /> Save message</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icInvite} alt="setting" className='me-2' /> Invite Friends</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icFAQ} alt="setting" className='me-4' />Telegram FAQ</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="d-flex flex-row">
                            <div className={`input-group flex-nowrap ${styles.cari}`}>
                                <div className="input-group-text" id="addon-wrapping"><i className="fa fa-search"> </i></div>
                                <input type="text" className="form-control me-5" id={styles.cari2} placeholder="Type your message..." aria-describedby="addon-wrapping" />
                            </div>
                            <img src={icPlus} alt="icPlus" />
                        </div>
                        <div className="d-flex flex-row mb-5">
                            <p className='mt-5 '>All</p>
                            <p className='mt-5 mx-auto'>Important</p>
                            <p className='mt-5 '>Unread</p>
                        </div>
                        <div className={`d-flex flex-row mt-3 ${styles.divChatleft}`}>
                            <img src={avaThere} alt='avaThere' className={styles.imgAva} />
                            <div className="d-flex flex-column ms-3 me-auto">
                                <p className='textNickname'>Theresa Webb</p>
                                <p className="textChat">  Hi, bro! Come t Hi, bro! Come t Hi, bro! Come t  Hi, bro! Come t Hi, bro! Come t Hi, bro! Come t</p>
                            </div>
                            <div className="d-flex flex-column ms-3">
                                <p className="textTime">15:20</p>
                                <p className={`ms-auto ${styles.notifChat}`}>1</p>
                            </div>
                        </div>
                        <div className={`d-flex flex-row mt-3 ${styles.divChatleft}`}>
                            <img src={avaGregory} alt='avaThere' className={styles.imgAva} />
                            <div className="d-flex flex-column ms-3 me-auto">
                                <p className='textNickname'>Gregory Bell</p>
                                <p className="textChat">  Hi, bro! Come t Hi, bro! Come t Hi, bro! Come t  Hi, bro! Come t Hi, bro! Come t Hi, bro! Come t</p>
                            </div>
                            <div className="d-flex flex-column ms-3">
                                <p className="textTime">15:20</p>
                                <p className={`ms-auto ${styles.notifChat}`}>1234</p>
                            </div>
                        </div>
                    </div>
                    <div className={`col-md-8 d-flex align-items-center ${styles.rightside}`}>
                        <div className="m-auto">
                            <p className={styles.textRightside}>Please select a chat to start messaging </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default index