import { useEffect, useState } from "react";
import { IoLogOutSharp } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";
import { useStyle } from "../context/styleContext";
import '../style/NavBar.css';


const NavBar = ({ id, hide, hidden }) => {
    let { group } = useGroup();
    let { setModal } = useModal();
    let { user } = useAuth();
    let { setStyle } = useStyle(); // Get user from context
    const [newGroup, setNewGroup] = useState({});
    const [dateTime, setDateTime] = useState(new Date());
    // console.log('navbar', hidden);
    useEffect(() => {
        const nGroup = group?.find(({ _id }) => _id == id);
        setNewGroup(() => nGroup);

        // Update date and time every second
        const intervalId = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId); // Cleanup interval on component unmount
    }, [id]);

    const formattedDateTime = `${dateTime.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    })} \u00A0\u00A0\u00A0 ${dateTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    })}`;

    return (
        <div className='main' style={{
            display: user.token && hide ? 'none' : 'flex',
            height: '8vh',
            background: 'linear-gradient(135deg, #1E3A8A, #3B82F6)', // Gradient background
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.5rem 2rem',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // More prominent shadow
            borderBottom: '3px solid #1E40AF',
        }}>
            {!user?.token && (
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginRight: '1rem'
                }}>
                    <img
                        src="/icon.jpg"
                        alt="note img"
                        style={{
                            width: '40px', // Adjust the width as needed
                            height: '40px', // Adjust the height as needed
                            borderRadius: '50%', // Makes the image circular
                            border: '2px solid white', // Adds a border around the image
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)', // Adds a subtle glow effect
                        }}
                    />
                    Note App
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                {newGroup && (
                    <>
                        <div style={{
                            background: newGroup.color || '#4C51BF',
                            height: '4.5vh',
                            width: '4.5vw',
                            border: "3px solid white",
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: hidden ? '0.5rem' : '1.2rem',
                            fontWeight: "bolder",
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            boxShadow: '0 0 10px rgba(255, 255, 255, 0.6)',
                        }}>
                            {newGroup?.sname?.toUpperCase()}
                        </div>
                        <p style={{
                            marginLeft: '1rem',
                            color: 'white',
                            fontSize: hidden ? '1rem' : '1.6rem',
                            fontWeight: hidden ? '100' : '700',
                        }}>
                            {newGroup.fname}
                        </p>
                    </>
                )}
            </div>

            <div style={{ color: 'white', fontSize: hidden ? '0.8rem' : '1.2rem', fontWeight: '500', marginRight: '0.8vw', padding: '2vw' }}>
                {formattedDateTime}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {!user?.token ? (
                    <>
                        <button
                            style={{
                                padding: '0.4rem 1.2rem',
                                background: '#ECFEFF',
                                color: '#1E293B',
                                fontWeight: 'bold',
                                border: '2px solid #1E40AF',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = '#1E40AF';
                                e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = '#ECFEFF';
                                e.target.style.color = '#1E293B';
                            }}
                            onClick={() => setModal(prev => ({ ...prev, signinModal: true }))}
                        >
                            Sign In
                        </button>
                        <button
                            style={{
                                padding: '0.4rem 1.2rem',
                                background: '#ECFEFF',
                                color: '#1E293B',
                                fontWeight: 'bold',
                                border: '2px solid #1E40AF',
                                borderRadius: '0.5rem',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = '#1E40AF';
                                e.target.style.color = 'white';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = '#ECFEFF';
                                e.target.style.color = '#1E293B';
                            }}
                            onClick={() => setModal(prev => ({ ...prev, signupModal: true }))}
                        >
                            Sign Up
                        </button>
                    </>
                ) : (
                    <>
                        <IoLogOutSharp
                            style={{
                                fontSize: hide ? "1.5rem" : "2rem",
                                color: "white",
                                cursor: "pointer",
                                transition: "transform 0.2s ease",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                            onClick={() => setModal(prev => ({ ...prev, signoutModal: true }))}
                        />
                        {id && hidden ? <IoMdArrowRoundBack onClick={() => setStyle(false)} style={{
                            fontSize: hide ? "1.5rem" : "2rem",
                            color: "white",
                            cursor: "pointer",
                            transition: "transform 0.2s ease",
                        }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} /> : ""}
                    </>
                )}
            </div>
        </div>
    );
};

export default NavBar;
