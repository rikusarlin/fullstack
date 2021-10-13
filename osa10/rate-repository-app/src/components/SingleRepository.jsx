import React from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import { useParams} from "react-router-native";
import * as Linking from 'expo-linking';
import theme from '../../theme';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  urlButton: {
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    alignSelf: 'center',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 110,
    paddingRight: 110,
    margin: 10,
    borderColor: 'white',
    borderRadius: 5,
  },
});

const RepositoryInfo = ({ repository })  => {

    const handlePress = () => {
      Linking.openURL(repository.url);
    };

    const separator = (repository.reviews.edges.length>0) ? <ItemSeparator/> : <View/>;
  
    return (
      <View>
        <RepositoryItem testID='repositorySingleItem' 
          id={repository.id}
          fullName={repository.fullName}
          description={repository.description} 
          language={repository.language} 
          forksCount={repository.forksCount} 
          stargazersCount={repository.stargazersCount}
          ratingAverage={repository.ratingAverage} 
          reviewCount={repository.reviewCount}
          ownerAvatarUrl={repository.ownerAvatarUrl} />
        <View style={styles.urlButton}>
          <Button testID='repositoryUrlButton' 
            onPress={handlePress} title='Open in GitHub' color='white'/>
        </View>
        {separator}
      </View>
    );
};

const SingleRepository = () => {
  let { id } = useParams();
  const first = 8;

  const {repository, fetchMore, loading} = useRepository(id, first);

  const onEndReach = () => {
    fetchMore();
  };

  if(loading){
    return(
      <View>
        <Text>Loading repository info...</Text>
      </View>
    );
  } else {
    const reviewNodes = repository.reviews
      ? repository.reviews.edges.map(edge => edge.node)
      : [];

    // console.log("SingleRepository, repository: "+JSON.stringify(repository));

    return (
      <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} showUsername/>}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
  );
  }
};

export default SingleRepository;
