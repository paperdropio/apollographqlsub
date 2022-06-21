
import './App.css';
import {
  gql,
  useSubscription
} from "@apollo/client";
import { useMemo } from 'react';

const serverStatusChangeSubscription = gql`
  subscription onServerStatusChange {
    onServerStatusChange
  }
`;

const ServerUpdates = () => {
  const { data, error, loading } = useSubscription(serverStatusChangeSubscription);

  useMemo(() => {
    console.log(data, error, loading); }
  ,[data, error, loading])

    return (<>
      <div>
        Server Updates
        <div>
          {data} - {loading}
        </div>
      </div>
    </>);
}

export default ServerUpdates;