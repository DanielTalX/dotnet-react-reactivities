import { useEffect, useState } from 'react'
import { Grid, GridColumn, Loader } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite'
import InfiniteScroll from 'react-infinite-scroller';
import ActivityList from './ActivityList'
import { useStore } from '../../../app/stores/store'
import ActivityFilters from './ActivityFilters'
import { PagingParams } from '../../../app/models/pagination'
import ActivityListItemPlaceholder from './ActivityListItemPlaceholder';


const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { loadActivities, activityRegistry, setPagingParams, pagination } = activityStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PagingParams(pagination!.currentPage + 1));
    loadActivities().then(() => setLoadingNext(false));
}

  useEffect(() => {
    if(activityRegistry.size <= 1) loadActivities();
  }, [activityRegistry, activityStore])

  //if(activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading App' />

  return (
    <Grid>
        <GridColumn width='10' >
          {activityStore.loadingInitial && activityRegistry.size === 0 && !loadingNext ? (
            <>
              <ActivityListItemPlaceholder />
              <ActivityListItemPlaceholder />
            </>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={false}>
              <ActivityList />
            </InfiniteScroll>
          )}
        </GridColumn>
        <GridColumn width='6'>
          <ActivityFilters />
        </GridColumn>
        <GridColumn width={10}>
          <Loader active={loadingNext} />
        </GridColumn>
    </Grid>
  )
}

export default observer(ActivityDashboard);