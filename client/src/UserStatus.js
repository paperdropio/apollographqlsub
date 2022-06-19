import './App.css';
import { gql,
  useMutation
} from "@apollo/client";
import React, {useState} from 'react'

const updateUserStatus = gql`mutation updateUserStatus($id: String!, $isOnline: Boolean!) {
    updateUserStatus(id: $id, isOnline: $isOnline) {
      userId
      isOnline
      lastSeenOn
    }
  }`
  

const UserStatus = () => {
    const [runUpdateUserStatus, { data, loading, error }] = useMutation(updateUserStatus);
    const [id, setId] = useState(0);
    const [isOnline, setIsOnline] = useState(false);

    return (<>
        <div>
            <div>
                Id: <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
            </div>
            <div>
                Is Online: <input type="checkbox" value={isOnline} onChange={(e) => setIsOnline(e.target.value)} />
            </div>
            <div>
                <button onClick={(e) => runUpdateUserStatus({variables: {id, isOnline}})}>Run</button>
            </div>
        </div>
    </>);
}

export default UserStatus;