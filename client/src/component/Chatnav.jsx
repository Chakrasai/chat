import React from 'react'
import { useNavigate } from 'react-router-dom'
function Chatnav() {
    const navigate = useNavigate();

    const handleInvite=()=>{
        alert("functionality under construction.")
        navigate('/NotFound')
    }

    const handleBack =()=>{
        navigate('/Choosechat');
    }

return (
    <>
        <nav className="bg-gray-800 p-4 flex justify-between items-center fixed top-0 left-0 w-full z-10">
            <div className="text-white text-2xl font-cursive">Echoo</div>
            <div className="space-x-4">
                <button
                    onClick={handleInvite}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                    Invite
                </button>
                <button
                    onClick={handleBack}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                    Back
                </button>
            </div>
        </nav>
        <div className="pt-16"></div> {/* Add padding to avoid overlap */}
    </>
)
}

export default Chatnav
