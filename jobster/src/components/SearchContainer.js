import {FormRow, FormRowSelect} from '.';
import Wrapper from '../assets/wrappers/SearchContainer';
import {useSelector, useDispatch} from 'react-redux';
import {handleChange, clearFilters} from '../features/job/allJobsSlice';
import {useState, useMemo} from 'react';

const SearchContainer = () => {
  const [localSearch, setLocalSearch] = useState('');
  const {isLoading, searchStatus, searchType, sort, sortOptions} = useSelector(
    (store) => store.allJobs
  );
  const {jobTypeOptions, statusOptions} = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    // if (isLoading) return;
    // this will not send a new request after typing  the 1st letter, but will affetct the user experience
    // YOU BETTER USE Debounce

    dispatch(handleChange({name: e.target.name, value: e.target.value}));
  };

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setLocalSearch(e.target.value);
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        dispatch(handleChange({name: e.target.name, value: e.target.value}));
      }, 1300);
    };
  };

  const optimizedDebounce = useMemo(() => debounce(), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalSearch('');
    dispatch(clearFilters());
  };

  return (
    <Wrapper>
      <form className='form'>
        <h4>search from</h4>
        <div className='form-center'>
          {/* search position */}
          <FormRow
            type='text'
            name='search'
            value={localSearch}
            handleChange={optimizedDebounce}
          />
          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            list={['all', ...statusOptions]}
          />
          {/* search by type */}
          <FormRowSelect
            labelText='type'
            name='searchType'
            value={searchType}
            handleChange={handleSearch}
            list={['all', ...jobTypeOptions]}
          />
          {/* sort */}
          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
          />
          <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Clear Filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
