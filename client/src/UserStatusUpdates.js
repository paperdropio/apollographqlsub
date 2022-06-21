import './App.css';
import {
  gql,
  useSubscription
} from "@apollo/client";
import { useMemo } from 'react';

const userStatusSubscription = gql`
  subscription updateUserStatus {
    onUserStatusChange {
      isOnline
      lastSeenOn
      userId
    }
  }
`;

const UserStatusUpdates = () => {
  const { data, error, loading } = useSubscription(userStatusSubscription);

  useMemo(() => {
    console.log(data, error, loading); }
  ,[data, error, loading])

    return (<>
      <div>
        User Status Updates
        <div>
          {data} - {loading}
        </div>
      </div>
    </>);
}

export default UserStatusUpdates;