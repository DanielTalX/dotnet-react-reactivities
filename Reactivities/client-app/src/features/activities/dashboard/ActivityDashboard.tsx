import React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityList from './ActivityList'
import ActivityDetails from './../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import { useStore } from '../../../app/stores/store'
import { observer } from 'mobx-react-lite'

interface Props {
    activities: Activity[];
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (is:string) => void;
    submitting: boolean;
}

const ActivityDashboard = ({activities, deleteActivity, createOrEdit, submitting }: Props) => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  return (
    <Grid>
        <GridColumn width='10' >
        <ActivityList 
          activities={activities}
          deleteActivity={deleteActivity}
          submitting={submitting}/>
        </GridColumn>
        <GridColumn width='6'>
          { selectedActivity && !editMode && 
            <ActivityDetails /> }
          { editMode && 
            <ActivityForm 
              createOrEdit={createOrEdit}
              submitting={submitting}
            /> }
        </GridColumn>
    </Grid>
  )
}

export default observer(ActivityDashboard);