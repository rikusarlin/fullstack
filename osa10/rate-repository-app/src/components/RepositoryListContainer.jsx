import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../../theme';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
      height: 5,
      backgroundColor: theme.colors.containerBackground,
    },
  });
  

const ItemSeparator = () => <View style={styles.separator} />;
const renderItem = ({ item }) => (
  <RepositoryItem testId="repositoryItem" id={item.id} fullName={item.fullName} description={item.description}
    language={item.language} forksCount={item.forksCount} stargazersCount={item.stargazersCount}
    ratingAverage={item.ratingAverage} reviewCount={item.reviewCount} 
    ownerAvatarUrl={item.ownerAvatarUrl} />
);

const RepositoryListContainer = ({ repositories }) => {

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    
    return (
      <FlatList
        testId='repositorylist'
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        />
    );
  };

  export default RepositoryListContainer;