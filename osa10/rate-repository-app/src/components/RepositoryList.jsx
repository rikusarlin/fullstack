import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: theme.colors.containerBackground,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => (
  <RepositoryItem id={item.id} fullName={item.fullName} description={item.description}
    language={item.language} forksCount={item.forksCount} stargazersCount={item.stargazersCount}
    ratingAverage={item.ratingAverage} reviewCount={item.reviewCount} 
    ownerAvatarUrl={item.ownerAvatarUrl} />
);

const RepositoryList = () => {
  const { repositories } = useRepositories();
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
  
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      />
  );
};

export default RepositoryList;