import { useEffect } from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import ActivityList from './ActivityList'
import { useStore } from '../../../app/stores/store'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import ActivityFilters from './ActivityFilters'


const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry } = activityStore;

  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry, activityStore])

  if(activityStore.loadingInitial) return <LoadingComponent content='Loading App' />

  return (
    <Grid>
        <GridColumn width='10' >
        <ActivityList />
        </GridColumn>
        <GridColumn width='6'>
          <ActivityFilters />
        </GridColumn>
    </Grid>
  )
}

export default observer(ActivityDashboard);