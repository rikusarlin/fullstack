import React, {useState} from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const [sortBy, setSortBy] = useState('lowest');

  const { repositories } = useRepositories(sortBy);

  return (
    <RepositoryListContainer testId="repositoryContainer"
      repositories={repositories} sortBy={sortBy} setSortBy={setSortBy}
      />
  );
};

export default RepositoryList;