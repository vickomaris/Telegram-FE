import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Link, useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import axios from 'axios'



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
import icProfilemenu from '../../assets/icProfilemenu.svg'
import avaMother from '../../assets/avaMother.png'
import icSticker from '../../assets/icSticker.svg'
import icSquare from '../../assets/icSquare.svg'
import icSampah from '../../assets/icSampah.svg'
import icNotif from '../../assets/icNotif.svg'
import icSearch from '../../assets/icSearch.svg'

const Index = () => {
    // const data = JSON.parse(localStorage.getItem('data'));
    const navigate = useNavigate()
    // const [data, setData] = useState('')
    // useEffect(() => {
    //     const data = JSON.parse(localStorage.getItem("data"));

    //     setData(data.id_user)
    //     console.log(data)
    // }, [])

    const [socketio, setSocketIo] = useState(null)
    const [listchat, setListchat] = useState([])
    useEffect(() => {
        const socket = io(`${process.env.REACT_APP_BACKEND_URL}`);
        socket.on("send-message-response", (response) => {
            // set receiver
            const receiver = JSON.parse(localStorage.getItem('receiver'))
            // Kondisi nampilkan data receiver
            if (
                (receiver.username === response[0].sender) ||
                (receiver.username === response[0].receiver)
            ) {
                setListchat(response)
                console.log(response)
            }
        })
        setSocketIo(socket)
    }, []);


    const [message, setMessage] = useState()
    const onSubmitMessage = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('data'))
        const receiver = JSON.parse(localStorage.getItem('receiver'))

        // list history saat submit message
        const payload = {
            sender: user.username,
            receiver: receiver.username,
            message,
        }
        console.log(payload)

        setListchat([...listchat, payload])

        const data = {
            sender: user.id_user,
            receiver: activeReceiver.id_user,
            message,
        }
        console.log(data)

        socketio.emit('send-message', data);

        setMessage('')
    }

    const [listuser, setListUser] = useState([])
    const [login, setLogin] = useState({})
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('data'))
        setLogin(user)
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/user`)
            .then((response) => {
                setListUser(response.data.data.rows)
                console.log(response.data.data.rows)
            }).catch((error) => {
                console.log(error)
            })
    }, [])

    const [activeReceiver, setActiveReceiver] = useState({})
    const selectReceiver = (item) => {
        //TAMBAHAN MERESET CHAT
        setListchat([])

        setActiveReceiver(item)

        // set RECEIVER
        localStorage.setItem('receiver', JSON.stringify(item));
        socketio.emit('join-room', login)
        console.log(login)

        const data = {
            sender: login.id_user,
            receiver: item.id_user
        }
        console.log(data)

        socketio.emit('chat-history', data)
    }

    const logout = () => {
        localStorage.clear();
        return navigate("/");
    };

    return (
        <>
            {/* {JSON.stringify(activeReceiver)} */}
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-md-4 px-4  ${styles.leftside}`}>
                        <div className="d-flex flex-row py-5 ">
                            <div className={`col-auto me-auto ${styles.title}`}> Telegram {login && login.username} </div>
                            <div className="dropdown">
                                <img src={icMenu} alt="icMenu" className='col-auto' type="button" data-bs-toggle="dropdown" />
                                <ul className={`dropdown-menu ${styles.dropStyle}`}>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to={`/profile`}><img src={icSetting} alt="setting" className='me-3' /> Action</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icContact} alt="setting" className='me-3' /> Contacts</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icPhone} alt="setting" className='me-3' /> Calls</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icSaved} alt="setting" className='me-4' /> Save message</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icInvite} alt="setting" className='me-2' /> Invite Friends</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="#"><img src={icFAQ} alt="setting" className='me-4' />Telegram FAQ</Link></li>
                                    <li><Link className={`dropdown-item ${styles.textMenu}`} to="/" onClick={logout}><i className="fa fa-search me-4" />Logout</Link></li>
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
                        {
                            listuser.map((item, index) => (
                                item.id_user !== login.id_user ? (
                                    <div key={index} className={`d-flex flex-row mt-3 ${styles.divChatleft}`}>
                                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${item.image}`} alt='avaThere' className={styles.imgAva} />
                                        <div className="d-flex flex-column ms-3 me-auto">
                                            <p className='textNickname' onClick={() => selectReceiver(item)}>{item.username}</p>
                                            <p className="textChat">  . </p>
                                        </div>
                                        <div className="d-flex flex-column ms-3">
                                            <p className="textTime">15:20</p>
                                            <p className={`ms-auto ${styles.notifChat}`}>1</p>
                                        </div>
                                    </div>
                                ) : null
                            ))
                        }

                        {/* <div className={`d-flex flex-row mt-3 ${styles.divChatleft}`}>
                            <img src={avaGregory} alt='avaThere' className={styles.imgAva} />
                            <div className="d-flex flex-column ms-3 me-auto">
                                <p className='textNickname'>Gregory Bell</p>
                                <p className="textChat">  Hi, bro! Come t Hi, bro! Come t Hi, bro! Come t  Hi, bro! Come t Hi, bro! Come t Hi, bro! Come t</p>
                            </div>
                            <div className="d-flex flex-column ms-3">
                                <p className="textTime">15:20</p>
                                <p className={`ms-auto ${styles.notifChat}`}>1234</p>
                            </div>
                        </div> */}

                    </div>
                    <div className={`col-md-8 g-0 ${styles.rightside}`}>
                        <div className={`d-flex flex-row px-5 py-3 ${styles.topChat}`}>
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${activeReceiver.image}`} alt='' className={styles.imgAva} />
                            <div className="d-flex flex-column ms-3 me-auto">
                                <p className='textNickname'>{activeReceiver.username}</p>
                                <p className="textChat">  Online </p>
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
                        <div className={`overflow-auto ${styles.kotakchat}`}>
                            {
                                listchat.map((item, index) => (
                                    <div key={index} className='overflow-auto' >
                                        {
                                            item.sender == login.username ? (
                                                <div className={`d-flex flex-row px-5 py-3 ${styles.sideChat}`}>
                                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${login.image}`} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                                                    <p className={`mx-2 ${styles.textSidechatleft}`}>{item.message}</p>
                                                </div>
                                            ) : (
                                                <div className={`d-flex flex-row justify-content-end px-5 py-3 ${styles.sideChat}`}>
                                                    <p className={`mx-2 ${styles.textSidechatright}`}>{item.message}</p>
                                                    <img src={`${process.env.REACT_APP_BACKEND_URL}/${activeReceiver.image}`} alt='avaThere' className={`align-self-center  ${styles.imgChatava}`} />
                                                </div>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <div className={`d-flex flex-row px-5 py-3 ${styles.topChat}`}>
                            <form onSubmit={onSubmitMessage} className={styles.setSearch}>
                                <div className="input-group rounded">
                                    <input type="text" className="form-control rounded" id={styles.cari2} placeholder="Type your message..." aria-label="Search" aria-describedby="search-addon"
                                        onChange={(e) => setMessage(e.target.value)}
                                        value={message} />
                                    <span className="input-group-text border-0" id="search-addon">
                                        <button type='submit'>
                                            <img src={icPlus} alt="icPlus" />
                                        </button>
                                        
                                    </span>
                                    <span className="input-group-text border-0" id="search-addon">
                                        <img src={icSticker} alt="icSticker" />
                                    </span>
                                    <span className="input-group-text border-0" id="search-addon">
                                        <img src={icSquare} alt="icSquare" />
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Index