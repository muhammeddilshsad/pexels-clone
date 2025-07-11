
import { X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "../Slice/ProfileSlice";

function MessageModal({ isOpen, onClose, recipient }) {
  const [message, setMessage] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch=useDispatch()
  const {loading, error, successMessage } = useSelector((state) => state.profile);

  if (!isOpen) return null;


  const handleSend = async (email, message) => {
    try {
      await dispatch(sendEmail({ email, message })); 
      console.log(email, message);
      setShowSuccess(true);
    } catch (error) {
      console.log("Send email error:", error);
      setShowSuccess(true); 
    }
  };

  



  const handleCancel = () => {
    setMessage("");
    setAgreedToTerms(false);
    onClose();
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setMessage("");
    setAgreedToTerms(false);
    onClose();
  };


  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full">
       
          <div className="flex justify-end p-4">
            <button
              onClick={handleCloseSuccess}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          
          <div className="px-8 pb-8 text-center">
   
            <div className="mb-6">
              <img
                src={`https://i.pravatar.cc/150?u=${recipient?.email}`}
                alt={`${recipient?.name}'s avatar`}
                className="w-20 h-20 rounded-full mx-auto object-cover"
              />
            </div>

          
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Message sent!
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Your message was sent. We hope you'll get a reply via email.
            </p>

     
            <button
              onClick={handleCloseSuccess}
              className="bg-gray-800 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
 
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex-1" />
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 text-center">
 
          <div className="mb-6">
            <img
              src={`https://i.pravatar.cc/150?u=${recipient?.email}`}
              alt={`${recipient?.name}'s avatar`}
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
          </div>

     
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">
            Send a message to {recipient?.name}
          </h2>

     
          <div className="text-left mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Write your message here..."
              required
            />
          </div>


          <div className="flex items-start space-x-3 mb-8 text-left">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
              I understand that my email address will be visible to the recipient and that Pexels reviews my message to protect against spam.
            </label>
          </div>

  
          <div className="flex space-x-4">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={()=> handleSend(recipient.email,message)}
              disabled={!message.trim() || !agreedToTerms}
              className={`flex-1 py-3 px-6 rounded-lg font-medium transition-colors ${
                message.trim() && agreedToTerms
                  ? 'bg-green-400 text-white hover:bg-green-500'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


export default MessageModal;