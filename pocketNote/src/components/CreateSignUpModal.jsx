import { useState } from "react";
import { useModal } from "../context/modalContext";
import { toast } from "react-toastify";
import axios from "axios";
import { validateInput } from "../utils/validateInputUtils";
import { uploadImage } from "../../services/cloudinary";

const CreateSignUpModal = () => {
    const { setModal } = useModal();
    const [inputState, setInputState] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleClick = () => {
        setModal((prevModal) => ({
            ...prevModal,
            signupModal: false,
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInputState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setImagePreview(URL.createObjectURL(file)); // Generate a temporary URL for the image preview
        } else {
            setSelectedImage(null);
            setImagePreview(null); // Clear the preview if no file is selected
        }
    };

    const handleButtonClick = async () => {
        const validationError = validateInput(inputState);
        if (validationError) {
            toast.error(validationError);
            return;
        }
        setLoading(true);
        const { name, email, password } = inputState;
        let imageurl = null;

        try {
            if (selectedImage) {
                imageurl = await uploadImage(selectedImage);
            }

            const response = await axios.post(
                "https://note2-backend.onrender.com/api/v1/register",
                {
                    name,
                    email,
                    password,
                    imageurl,
                }
            );

            if (response.data.status === "ok") {
                setModal((prevModal) => ({
                    ...prevModal,
                    signupModal: false,
                    signinModal: true
                }));
                toast.success("User has been created");
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 5,
            }}
            onClick={handleClick}
        >
            <div
                style={{
                    position: "relative",
                    width: "90%",
                    maxWidth: "400px",
                    background: "#ffffff",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    boxSizing: "border-box",
                    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                    maxHeight: "90vh",
                    overflowY: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 style={{
                    marginBottom: "1rem",
                    color: "#1e293b",
                    fontSize: "1.5rem",
                    textAlign: "center",
                }}>
                    Sign Up
                </h2>

                <label style={{ width: "100%", marginBottom: "1rem", padding: '0.2rem' }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>Name</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            width: "100%",
                            boxSizing: "border-box",
                            fontSize: "1rem",
                        }}
                        onChange={handleInputChange}
                    />
                </label>

                <label style={{ width: "100%", marginBottom: "1rem", padding: '0.2rem' }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>Email</span>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            width: "100%",
                            boxSizing: "border-box",
                            fontSize: "1rem",
                        }}
                        onChange={handleInputChange}
                    />
                </label>

                <label style={{ width: "100%", marginBottom: "1rem", padding: '0.2rem' }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>Password</span>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            width: "100%",
                            boxSizing: "border-box",
                            fontSize: "1rem",
                        }}
                        onChange={handleInputChange}
                    />
                </label>

                <label style={{ width: "100%", marginBottom: "1rem", padding: '0.2rem' }}>
                    <span style={{ display: "block", marginBottom: "0.5rem" }}>Confirm Password</span>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        style={{
                            border: "1px solid #ccc",
                            padding: "0.75rem",
                            borderRadius: "8px",
                            width: "100%",
                            boxSizing: "border-box",
                            fontSize: "1rem",
                        }}
                        onChange={handleInputChange}
                    />
                </label>

                <label style={{ width: "100%", marginBottom: "1rem", padding: "0.5rem" }}>
                    <span style={{ display: "block", marginBottom: "0.5rem", fontWeight: "500", color: "#1e293b" }}>
                        Profile Image (Optional)
                    </span>
                    <div
                        style={{
                            border: "2px dashed #ccc",
                            borderRadius: "8px",
                            padding: "1rem",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "border-color 0.3s, background 0.3s",
                            backgroundColor: "#f9fafb",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = "#2563eb";
                            e.currentTarget.style.backgroundColor = "#f0f4ff";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = "#ccc";
                            e.currentTarget.style.backgroundColor = "#f9fafb";
                        }}
                    >
                        <input
                            type="file"
                            name="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }} // Hide the default file input
                            id="fileInput"
                        />
                        <label
                            htmlFor="fileInput"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "0.5rem",
                                cursor: "pointer",
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#2563eb"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" y1="3" x2="12" y2="15" />
                            </svg>
                            <span style={{ color: "#2563eb", fontWeight: "500" }}>
                                {selectedImage ? "Change Image" : "Upload Image"}
                            </span>
                            <span style={{ color: "#64748b", fontSize: "0.875rem" }}>
                                {selectedImage ? selectedImage.name : "PNG, JPG, or JPEG (max 5MB)"}
                            </span>
                        </label>
                    </div>
                </label>
                {imagePreview && (
                    <div style={{
                        marginBottom: "1rem",
                        textAlign: "center",
                        borderRadius: "8px",
                        overflow: "hidden",
                    }}>
                        <img
                            src={imagePreview}
                            alt="Profile Preview"
                            style={{
                                width: "100%",
                                maxHeight: "200px",
                                objectFit: "cover",
                                borderRadius: "8px",
                            }}
                        />
                    </div>
                )}

                <button
                    style={{
                        marginTop: "1rem",
                        padding: "0.8rem",
                        width: "100%",
                        fontSize: "1rem",
                        background: "#2563eb",
                        color: "white",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        transition: "background 0.3s",
                        fontWeight: "500",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#1d4ed8")}
                    onMouseOut={(e) => (e.target.style.background = "#2563eb")}
                    disabled={loading}
                    onClick={handleButtonClick}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default CreateSignUpModal;