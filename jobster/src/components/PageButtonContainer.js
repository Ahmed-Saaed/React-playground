import {HiChevronDoubleLeft, HiChevronDoubleRight} from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import {useSelector, useDispatch} from 'react-redux';
import {changePage} from '../features/job/allJobsSlice';

const PageButtonContainer = () => {
  const {numOfPages, page} = useSelector((store) => store.allJobs);
  const dispatch = useDispatch();

  const pages = Array.from({length: numOfPages}, (_, index) => {
    return index + 1;
  });

  const nextPage = () => {
    let pageNum = page || 1;
    pageNum > numOfPages ? (pageNum = 1) : pageNum++;
    dispatch(changePage(pageNum));
  };
  const prevPage = () => {
    let pageNum = page;
    pageNum < 1 ? (pageNum = 8) : pageNum--;
    dispatch(changePage(pageNum));
  };

  return (
    <Wrapper>
      <button className='prev-btn' onClick={prevPage}>
        <HiChevronDoubleLeft />
        Prev
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>
      <button className='next-btn' onClick={nextPage}>
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageButtonContainer;
