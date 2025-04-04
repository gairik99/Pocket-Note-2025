import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useGroup } from "../context/groupContext";
import { useModal } from "../context/modalContext";
import { useAuth } from "../context/authContext";

const CreateGroupModal = () => {
    let colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];
    const [val, setVal] = useState({});
    const [selectedColor, setSelectedColor] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setModal } = useModal();
    const { setGroup } = useGroup();
    const { user } = useAuth();
    const handleClick = (e) => {
        setModal((prevModal) => ({
            ...prevModal,
            groupModal: false
        }));
    };
    const handleInputChange = (e) => {
        let v = e.target.value.trim();
        let nm = '';
        let index = Math.floor(Math.random() * (v.length - 1)) + 1;
        if (v[index] == ' ')
            nm = v[0] + v[v.length - 1];
        else
            nm = v[0] + v[index];

        // console.log('index...', index)
        if (v.length < 2) {
            return;
        }
        else {
            setVal({ ...val, fname: v, sname: nm })
        }

    }

    const handleColorClick = (color) => {
        setSelectedColor(color); // Update the selected color
        setVal({ ...val, color: color });
    };

    const handleButtonClick = async () => {
        if (val.sname && val.fname && val.color) {
            setLoading(true);
            try {
                const payload = {
                    fname: val.fname,
                    sname: val.sname,
                    color: val.color,
                    // Generate a unique ID for the group
                };

                const response = await axios.patch(
                    "https://note2-backend.onrender.com/api/v1/users/addGroup",
                    payload,
                    {
                        headers: {
                            Authorization: `Bearer ${user.token}`, // Pass user token for authentication
                        },
                    }
                );
                // console.log(response);

                if (response.data.status === "ok") {
                    toast.success("Group has been created");
                    setGroup(prevGroup => ([...prevGroup, response.data.data]));
                    setModal((prevModal) => ({ ...prevModal, groupModal: false }));
                } else {
                    toast.error(response.data.message || "Something went wrong");
                }
            } catch (error) {
                toast.error(error.response?.data?.message || "Network error");
            }
            finally {
                setLoading(false); // Reset loading state
            }
        } else {
            if (!val.fname) {
                toast.warning("Group Name must contain two characters");
            }
            if (!val.color) {
                toast.warning("Group Must have a color");
            }
        }

    }
    // console.log(group)
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                background: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 5,
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    width: '90%',
                    maxWidth: '400px', // Reduced from 500px for better mobile fit
                    background: '#ffffff',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '1rem',
                    boxSizing: 'border-box',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{
                    paddingBottom: '1%',
                    fontSize: '1.2rem',
                    textAlign: 'center',
                    margin: '0.5rem 0' // Added margin for better spacing
                }}>
                    Create New Group
                </h2>
                <label style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column', // Stack label text and input vertically
                    margin: '0.5rem 0'
                }}>
                    <span style={{ marginBottom: '0.5rem' }}>Group Name</span>
                    <input
                        type="text"
                        placeholder="Enter group name"
                        style={{
                            border: '1px solid grey',
                            padding: '0.5rem',
                            borderRadius: '1rem',
                            width: '100%', // Full width on mobile
                            boxSizing: 'border-box',
                        }}
                        onChange={handleInputChange}
                    />
                </label>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column', // Stack color text and buttons
                    gap: '0.5rem',
                    margin: '1rem 0'
                }}>
                    <span>Choose color</span>
                    <div style={{
                        display: 'flex',
                        gap: '0.5rem',
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start'
                    }}>
                        {colors.map((color) => (
                            <div
                                key={color}
                                style={{
                                    width: '25px', // Slightly smaller for mobile
                                    height: '25px',
                                    backgroundColor: color,
                                    borderRadius: '50%',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 3px rgba(0,0,0,0.3)',
                                    border: selectedColor === color ? '3px solid black' : '2px solid white',
                                }}
                                onClick={() => handleColorClick(color)}
                            ></div>
                        ))}
                    </div>
                </div>
                <button
                    style={{
                        marginTop: '1rem',
                        height: '40px',
                        width: '80%', // Wider button for mobile
                        fontSize: '1rem',
                        background: 'blue',
                        color: 'white',
                        borderRadius: '1rem',
                        border: 'none',
                        cursor: 'pointer',
                    }}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
        </div>
    );
};

export default CreateGroupModal;
