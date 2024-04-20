import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import ActivityDashboard from './features/activities/dashboard/activityDashboard';

function App() {
  const [ activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data)
      })
  }, [])

  return (
    <div>
     <Header as='h2' icon='users' content='Reactivities' />
     <ActivityDashboard activities={activities}/>
    </div>
  )
}

export default App
