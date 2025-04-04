import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";
import { useStyle } from "../context/styleContext";
import SidebarHeader from "./SidebarHeader";


const Sidebar = ({ id, hidden }) => {
    const [selectedId, setSelectedId] = useState(id);
    const { group } = useGroup();
    const { setModal } = useModal();
    const { user } = useAuth();
    const { setStyle, style } = useStyle();
    const navigate = useNavigate();
    // console.log('sidebar', style)
    const handleClick = (id) => {
        setSelectedId(() => id);
        setStyle(true)
    };

    useEffect(() => {
        if (selectedId !== undefined) {
            navigate(`/notes/${selectedId}`);
        }
    }, [selectedId]);

    const handleButtonClick = () => {
        if (user?.token) {
            setModal((prevModal) => ({
                ...prevModal,
                groupModal: true,
            }));
        } else {
            setModal((prevModal) => ({
                ...prevModal,
                signinModal: true,
            }));
        }
    };

    // const handleHomePage = () => {
    //     navigate("/");
    // };

    return (
        <div
            style={{
                width: hidden ? (!style ? "100%" : '0%') : hidden ? "75%" : "25%",
                maxWidth: "100%",
                height: "100%",
                position: "relative",
                background: "rgb(239, 240, 231)",
                display: hidden ? (!style ? "block" : "none") : "block",
                transition: "width 0.3s ease", // Smooth transition for width changes
            }}
        >
            {/* Header with image and h1 side by side */}
            <SidebarHeader hide={hidden} />

            {/* Group List */}
            <ul
                style={{
                    maxHeight: "calc(100vh - 40vh)",
                    overflowY: "auto",
                    padding: "0",
                    margin: "0",
                    listStyle: "none",
                }}
            >
                {user?.token && group.map(({ _id, sname, fname, color }) => (
                    <li
                        key={_id}
                        style={{
                            margin: "1px",
                            height: hidden ? "8vh" : "10vh",
                            padding: hidden ? "0.25rem" : "0.5rem",
                            display: "flex",
                            alignItems: "center",
                            background: _id == selectedId ? "rgba(220, 209, 209, 0.42)" : "transparent",
                            borderRadius: _id == selectedId ? "0 5% 5% 0" : "",
                            cursor: "pointer",
                            overflow: "hidden",
                        }}
                        onClick={() => handleClick(_id)}
                    >
                        <p
                            style={{
                                height: hidden ? "6vh" : "8vh",
                                width: hidden ? "40px" : "4vw",
                                minWidth: "40px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "3px solid white",
                                borderRadius: "100%",
                                background: color,
                                color: "white",
                                fontSize: hidden ? "16px" : "1.4vw",
                                fontWeight: "bold",
                            }}
                        >
                            {sname.toUpperCase()}
                        </p>
                        <div
                            style={{
                                display: "inline-block",
                                marginLeft: hidden ? "0.25rem" : "0.5rem",
                                padding: hidden ? "0.5rem" : "1.2rem",
                                fontSize: hidden ? "0.8rem" : "1rem",
                                fontWeight: "bold",
                                color: id == selectedId ? "#525252" : "",
                            }}
                        >
                            {fname.substring(0, hidden ? 15 : 25)}
                            {fname.length > 15 && hidden && "..."}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Add Group Button */}
            <button
                style={{
                    color: "white",
                    height: hidden ? "3rem" : "4rem",
                    width: hidden ? "3rem" : "4rem",
                    position: "fixed",
                    bottom: hidden ? "1rem" : "auto",
                    top: hidden ? "auto" : "84vh",
                    left: hidden ? "1rem" : "20vw",
                    background: "blue",
                    borderRadius: "100%",
                    cursor: "pointer",
                    fontSize: hidden ? "2rem" : "3.2rem",
                    boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    border: "none",
                }}
                onClick={handleButtonClick}
            >
                +
            </button>
        </div>
    );
};

export default Sidebar;