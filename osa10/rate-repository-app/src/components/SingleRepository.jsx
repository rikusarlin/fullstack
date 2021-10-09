import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useParams} from "react-router-native";
import * as Linking from 'expo-linking';
import theme from '../../theme';
import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';

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

const SingleRepository = ()  => {
  let { id } = useParams();
  const {data, loading} = useRepository(id);

  if(loading){
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    const repository = data.repository;
    const handlePress = () => {
      Linking.openURL(repository.url);
    };
  
    return (
      <View>
        <RepositoryItem testID='repositorySingleItem' id={id} fullName={repository.fullName}
        description={repository.description} language={repository.language} 
        forksCount={repository.forksCount} 
        stargazersCount={repository.stargazersCount} ratingAverage={repository.ratingAverage} 
        reviewCount={repository.reviewCount} ownerAvatarUrl={repository.ownerAvatarUrl} />
        <View style={styles.urlButton}>
          <Button testID='repositoryUrlButton' 
            onPress={handlePress} title='Open in GitHub' color='white'/>
        </View>
      </View>
    );
  }
};

export default SingleRepository;