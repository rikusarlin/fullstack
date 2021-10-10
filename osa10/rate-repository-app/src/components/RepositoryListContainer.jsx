import React from 'react';
import { FlatList, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import RepositoryItem from './RepositoryItem';
import ItemSeparator from './ItemSeparator';

const renderItem = ({ item }) => {
  const linkTo = '/repository/'+item.id;
  return(
    <Pressable>
      <Link to={linkTo}>
      <RepositoryItem testID="repositoryItem" id={item.id} fullName={item.fullName} description={item.description}
        language={item.language} forksCount={item.forksCount} stargazersCount={item.stargazersCount}
        ratingAverage={item.ratingAverage} reviewCount={item.reviewCount} 
        ownerAvatarUrl={item.ownerAvatarUrl} />
      </Link>
    </Pressable>
  );
};

const RepositoryListContainer = ({ repositories }) => {

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    
    return (
      <FlatList
        testID="repositorylist"
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        />
    );
  };

  export default RepositoryListContainer;