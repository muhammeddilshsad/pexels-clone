import React, { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getUserDetails } from "../Slice/followSlice";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 

  
  const { user, loading, error } = useSelector((state) => state.follow || {});
  
  useEffect(() => {
    if (id) {
      dispatch(getUserDetails(id));
    }
  }, [id, dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">User Details</h2>
      {user ? (
        <div className="mt-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (

        <p>No user found.</p>
        
      )}
    </div>
  );
};

export default UserDetails;
