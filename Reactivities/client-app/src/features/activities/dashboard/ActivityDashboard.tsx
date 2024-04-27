import { useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityList from './ActivityList'
import ActivityDetails from './../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent'


const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  useEffect(() => {
    activityStore.loadActivities()
  }, [activityStore])

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <Grid>
        <GridColumn width='10' >
        <ActivityList />
        </GridColumn>
        <GridColumn width='6'>
          { selectedActivity && !editMode && 
            <ActivityDetails /> }
          { editMode && 
            <ActivityForm /> }
        </GridColumn>
    </Grid>
  )
}

export default observer(ActivityDashboard);