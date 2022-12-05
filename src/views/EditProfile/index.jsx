import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from "react-router-dom";

import icMenu from '../../assets/icMenu.svg'
import icBack from '../../assets/icBack.svg'
import icPlus from '../../assets/icPlus.svg'
import icSetting from '../../assets/icSettings.svg'
import icContact from '../../assets/icContacts.svg'
import icPhone from '../../assets/icPhone.svg'
import icSaved from '../../assets/icSaved.svg'
import icInvite from '../../assets/icInvite.svg'
import icFAQ from '../../assets/icFAQ.svg'
import avaThere from '../../assets/avaThere.png'
import avaGregory from '../../assets/avaGregory.png'
import icProfilemenu from '../../assets/icProfilemenu.svg'
import avaMother from '../../assets/avaMother.png'
import icSticker from '../../assets/icSticker.svg'
import icSquare from '../../assets/icSquare.svg'
import icSampah from '../../assets/icSampah.svg'
import icNotif from '../../assets/icNotif.svg'
import icSearch from '../../assets/icSearch.svg'
import icNotifblk from '../../assets/icNotifblk.svg'
import icLock from '../../assets/icLock.svg'
import icDatas from '../../assets/icDatas.svg'
import icChatset from '../../assets/icChatset.svg'
import icDevice from '../../assets/icDevice.svg'
import icGoogle from '../../assets/logogoogle.svg'

import axios from 'axios';

const Index = () => {

    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [update, setUpdate] = useState({
        username: data.username,
        nickname: data.nickname,
        phone: data.phone,
        bio: data.bio
    })
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("data"));
        const id_user = data.id_user
        // console.log(id)
        getId(id_user)
    }, [])

    const getId = (id_user) => {
        axios.get(`http://localhost:3001/user/${id_user}`)
            .then((response) => {
                console.log(response.data)
                setData(response.data)
            })
            .catch((error) => {
                console.error(error)
                // router.push('/login')
            })
    }


    const hiddenFileInput = useRef(null);
    // const navigate = useNavigate();
    const [image, setImage] = useState('');

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const updateForm = (event) => {
        const data = JSON.parse(localStorage.getItem("data"));
        const id = data.id_user
        event.preventDefault();
        let formData = new FormData();
        formData.append("image", image);
        // handlePost(Object.fromEntries(formData));
        axios
            .put(`http://localhost:3001/user/photo/${id}`, formData)
            .then((res) => {
                console.log(res);
                alert("Update Success");
                return navigate('/profile');
            })
            .catch((err) => {
                console.log(err);
                alert("Update Failed");
            })
    };
    const UpdatePhoto = (event) => {
        const fileUploaded = event.target.files[0];
        document.getElementById("addphoto").innerHTML = fileUploaded.name;
        setImage(fileUploaded);
    };


    const handlePost = (e) => {
        const data = JSON.parse(localStorage.getItem("data"));
        const id = data.id_user
        e.preventDefault();
        const form = {
            username: update.username,
            nickname: update.nickname,
            phone: update.phone,
            bio: update.bio
        }
        axios
            .put(`http://localhost:3001/user/${id}`, form)
            .then((res) => {
                console.log(res);
                // setImage("");
                alert("Update Success");
                return navigate('/profile');
            })
            .catch((err) => {
                console.log(err);
                alert("Update Failed");
            })
    };

    const deleteRow = () => {
        const data = JSON.parse(localStorage.getItem("data"));
        const id_user = data.id_user;
        axios
            .delete(`http://localhost:3001/user/${id_user}`)
            .then((res) => {
                console.log(res);
                alert("Profile Terhapus");
                 return navigate('/');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            {/* {JSON.stringify(data)} */}
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-4 px-4  ${styles.leftside}`}>
                        <div className="d-flex flex-row py-5 ">
                            <Link to={`/chat`}> <img src={icBack} alt="icMenu" className='col-auto' type="button" />
                            </Link>
                            {
                            data.map((item, index) => (
                            <div key={index} className={`mx-auto ${styles.titleUsername}`}> {item.nickname} </div>
                            ))
                        }
                        </div>
                            {
                            data.map((item, index) => (
                                <div key={index} className="d-flex flex-column align-items-center">
                                    
                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`} alt="icPlus" className={styles.avaProfile} />
                                    <p className={styles.textNickname}>{item.username}</p>
                                    <p className={styles.textUsername}>{item.nickname}</p>
                                    <div className={`col-md-7 mb-4 d-flex flex-column justify-content-center  ${styles.addphoto}`}>
                                    <input className="form-control" 
                                    type="file" 
                                    ref={hiddenFileInput} 
                                    htmlFor="image" 
                                    onClick={handleClick} 
                                    id="addphoto" 
                                    style={{ display: "none" }}
                                    onChange={UpdatePhoto} />
                                    <div className="text-center" type="button" htmlFor="image" onClick={handleClick}  >
                                        <br />Edit Photo</div>
                                </div>
                                         <button type="submit" className='btn d-grid gap-2 col-3 mx-auto' onClick={updateForm} > Post </button>
                                </div>
                            ))
                        }
                        
                        {
                            data.map((item, index) => (
                                <div key={index} className="d-flex flex-column">
                                    <p className={styles.textTitle}>Account</p>
                                    <p className={styles.textPhone}>{item.phone}</p>
                                </div>
                            ))
                        }
                        <hr />
                        {
                            data.map((item, index) => (
                                <div key={index} className="d-flex flex-column">
                                    <p className={styles.textUsernamedb}>{item.nickname}</p>
                                    <p className={styles.textSubtitle}>Nickname</p>
                                </div>
                            ))
                        }
                        <hr />
                        {
                            data.map((item, index) => (
                        <div key={index} className="d-flex flex-column">
                            <p className={styles.textBiodb}>{item.bio}</p>
                            <p className={styles.textSubtitle}>Bio</p>
                        </div>
                        ))
                    }
                        <p className={`mt-4 ${styles.textTitle}`}>Settings</p>
                        <div className="d-flex flex-row mt-3">
                            <img src={icNotifblk} alt='icNotif' />
                            <div className={`ms-5 ${styles.textSettingbotleft}`}>  Notification and Sounds</div>
                        </div>
                        <div className="d-flex flex-row mt-4">
                            <img src={icLock} alt='icPrivacyansSecurity' />
                            <div className={`ms-5 ${styles.textSettingbotleft}`}>  Privaty and Security </div>
                        </div>
                        <div className="d-flex flex-row mt-4">
                            <img src={icDatas} alt='icDataandStorage' />
                            <div className={`ms-5 ${styles.textSettingbotleft}`}>  Data and Stronge </div>
                        </div>
                        <div className="d-flex flex-row mt-4">
                            <img src={icChatset} alt='icChatsetting' />
                            <div className={`ms-5 ${styles.textSettingbotleft}`}>  Chat settings </div>
                        </div>
                        <div className="d-flex flex-row mt-4">
                            <img src={icDevice} alt='icDevice' />
                            <div className={`ms-5 ${styles.textSettingbotleft}`}>  Devices </div>
                        </div>
                    </div>
                    <div className={`col-md-8 g-0 ${styles.rightside}`}>
                        <div className={`d-flex flex-row px-5 py-3 ${styles.topChat}`}>
                            {/* <img src={avaMother} alt='avaThere' className={styles.imgAva} /> */}
                            <div className="d-flex flex-column ms-3 me-auto">
                                <p className={styles.textNickname}>Update Profile</p>
                                <p className={styles.textOnline}>  Online </p>
                            </div>
                            <button className={styles.Profilemenu} type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                <img src={icProfilemenu} alt='profilemenu' />
                            </button>
                            <div className="row">
                                <div className=' d-flex justify-content-end pe-5'>
                                    <div className={`collapse  ${styles.sideTopCollepse}`} id="collapseExample">
                                        <div className={`card card-body ${styles.cstmCollepsetop} end-0`}>
                                            <ul className={`px-3 ${styles.collepseStyle}`}>
                                                <li className='my-3'><Link className={`p-0 ${styles.textTopmenu}`} to="#"><img src={icPhone} alt="setting" className='me-3' /> Call </Link></li>
                                                <li className='my-3'><Link className={`p-0 ${styles.textTopmenu}`} to="#"><img src={icSampah} alt="setting" className='me-4' /> Delete chat history </Link></li>
                                                <li className='my-3'><Link className={`p-0 ${styles.textTopmenu}`} to="#"><img src={icNotif} alt="setting" className='me-4' /> Mute notification</Link></li>
                                                <li className='my-3'><Link className={`p-0 ${styles.textTopmenu}`} to="#"><img src={icSearch} alt="setting" className='me-4' />Search</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`d-flex flex-column px-5 py-3 ${styles.sideChat}`}>
                            <form onSubmit={(e) => handlePost(e)} className={styles.cstmFormupdate}>
                                {
                                    data.map((item, index) => ( 
                                        <div key={index}> 
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className={`form-control ${styles.inputForm}`}
                                                    id="floatingInput"
                                                    placeholder="Telegram app"
                                                    defaultValue={item.username}
                                                    onChange={(e) => setUpdate({ ...update, username: e.target.value })} />
                                                <label htmlFor="floatingInput" className="form-label">Username</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className={`form-control ${styles.inputForm}`}
                                                    id="floatingInput"
                                                    placeholder="name@example.com"
                                                    defaultValue={item.nickname}
                                                    onChange={(e) => setUpdate({ ...update, nickname: e.target.value })} />
                                                <label htmlFor="floatingInput" className="form-label">Nickname</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className={`form-control ${styles.inputForm}`}
                                                    id="floatingInput"
                                                    placeholder="Phone"
                                                    defaultValue={item.phone}
                                                    onChange={(e) => setUpdate({ ...update, phone: e.target.value })} />
                                                <label htmlFor="floatingInput" className="form-label">Phone</label>
                                            </div>
                                            <div className="form-floating mb-3">
                                                <input type="text"
                                                    className={`form-control ${styles.inputForm}`}
                                                    id="floatingInput"
                                                    placeholder="Bio"
                                                    defaultValue={item.bio}
                                                    onChange={(e) => setUpdate({ ...update, bio: e.target.value })} />
                                                <label htmlFor="floatingInput" className="form-label">Bio</label>
                                            </div>
                                            <div className="d-flex flex-column mt-4">
                                                <button type="submit" className={styles.btnSaved}>Saved</button>
                                                <p className='text-center my-5'>OR</p>
                                                
                                            </div>
                                            
                                        </div>
                                    ))
                                }
                            </form>
                            <button  className={styles.btnDelete} onClick={(e) => deleteRow(e)}>Delete</button>
                        </div>
                        
                        {/* <div className={`d-flex flex-row justify-content-end px-5 py-3 ${styles.sideChat}`}>
                            <p className={`mx-2 ${styles.textSidechatright}`}>Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.</p>
                            <img src={avaThere} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                        </div>
                        <div className={`d-flex flex-row px-5 py-3 ${styles.sideChat}`}>
                            <img src={avaMother} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                            <p className={`mx-2 ${styles.textSidechatleft}`}>Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.</p>
                        </div>
                        <div className={`d-flex flex-row justify-content-end px-5 py-3 ${styles.sideChat}`}>
                            <p className={`mx-2 ${styles.textSidechatright}`}>Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.</p>
                            <img src={avaThere} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                        </div>
                        <div className={`d-flex flex-row px-5 py-3 ${styles.sideChat}`}>
                            <img src={avaMother} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                            <p className={`mx-2 ${styles.textSidechatleft}`}>Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.</p>
                        </div>
                        <div className={`d-flex flex-row justify-content-end px-5 py-3 ${styles.sideChat}`}>
                            <p className={`mx-2 ${styles.textSidechatright}`}>Hi, son, how are you doing? Today, my father and I went to buy a car, bought a cool car.</p>
                            <img src={avaThere} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                        </div> */}
                        {/* <div className={`d-flex flex-row px-5 py-3 ${styles.topChat}`}>
                            <div className="input-group rounded">
                                <input type="text" className="form-control rounded" id={styles.cari2} placeholder="Type your message..." aria-label="Search" aria-describedby="search-addon" />
                                <span className="input-group-text border-0" id="search-addon">
                                    <img src={icPlus} alt="icPlus" />
                                </span>
                                <span className="input-group-text border-0" id="search-addon">
                                    <img src={icSticker} alt="icSticker" />
                                </span>
                                <span className="input-group-text border-0" id="search-addon">
                                    <img src={icSquare} alt="icSquare" />
                                </span>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index