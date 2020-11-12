import './App.css';

import { useQuery, gql } from '@apollo/client';

const EXCHANGE_RATES = gql`
  query {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
      }
      details
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
if (error) return <p>Error !</p>;

  return data.launches.map(({ launch_date_utc, launch_success, rocket, links, details }, i) => (
    <div key={i}>
      <h2>{rocket.rocket_name}</h2>
      <p>
        Lauche date : {launch_date_utc}
      </p>
      <p>
        Success: {launch_success ? 'true' : 'false'}
      </p>
      <p>
        Video: <a href={links.video_link}>here</a>
      </p>
      <p>
        Details: {details}
      </p>
    </div>
  ));
}

export default App;
