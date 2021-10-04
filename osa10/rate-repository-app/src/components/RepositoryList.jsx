import React from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

const RepositoryList = () => {
  const { repositories } = useRepositories();

  return (
    <RepositoryListContainer testId="repositoryContainer"
      repositories={repositories}
      />
  );
};

export default RepositoryList;