import React from 'react'
import { Grid, GridColumn, List } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
    activities:Activity[]
}

const ActivityDashboard = ({activities}: Props) => {
  return (
    <Grid>
        <GridColumn width='10' >
        <List>
            { activities.map((activity:any) => (
                <List.Item key={activity.id}>
                {activity.title}
                </List.Item>
            ))}
      </List>
        </GridColumn>
    </Grid>
  )
}

export default ActivityDashboard