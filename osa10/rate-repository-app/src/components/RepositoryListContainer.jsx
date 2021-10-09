import React from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Link } from 'react-router-native';
import theme from '../../theme';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
    separator: {
      height: 5,
      backgroundColor: theme.colors.containerBackground,
    },
  });
  

const ItemSeparator = () => <View style={styles.separator} />;

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