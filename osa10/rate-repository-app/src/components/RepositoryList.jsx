import React, {useState} from 'react';
import { useDebounce } from 'use-debounce';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('latest');
  const [filterBy, setFilterBy] = useState();
  const [filterByDebounced] = useDebounce(filterBy, 500);

  const { repositories } = useRepositories(sortBy, filterByDebounced);

  return (
    <RepositoryListContainer testId="repositoryContainer"
      repositories={repositories} sortBy={sortBy} setSortBy={setSortBy}
      filterBy={filterBy} setFilterBy={setFilterBy}
      />
  );
};

export default RepositoryList;