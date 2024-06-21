import {useEffect} from 'react';
import {StatsContainer, Loading, ChartsContainer} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {showStats} from '../../features/job/allJobsSlice';
const Stats = () => {
  const {isLoading, monthlyApplications} = useSelector(
    (store) => store.allJobs
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('showing stats');
    dispatch(showStats());
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
