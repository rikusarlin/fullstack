import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
  languageContainer: {
    flexGrow: 0,
    backgroundColor: theme.colors.languageBackground,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  repoNameText: {
    color: theme.colors.textPrimary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.heading,
    paddingBottom: 5,
  },
  bodyText: {
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.body,
    paddingBottom: 5,
  },
  languageText: {
    color: theme.colors.textMenu,
    fontWeight: theme.fontWeights.normal,
    fontSize: theme.fontSizes.menu,
    paddingLeft: 5,
    paddingRight: 5,
  }

});

const ItemHeader = ({fullName, description, language, ownerAvatarUrl}) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: ownerAvatarUrl}} />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.repoNameText}>{fullName}</Text>
        <Text style={styles.bodyText}>{description}</Text>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const RepositoryItem = ({ fullName, description, language, forksCount, stargazersCount,
    ratingAverage, reviewCount, ownerAvatarUrl})  => {
  return (
    <View style={styles.bodyText}>
      <ItemHeader fullName={fullName} description={description} language={language} 
       ownerAvatarUrl={ownerAvatarUrl}/>
      <Text>Stars: {stargazersCount}</Text>
      <Text>Forks: {forksCount}</Text>
      <Text>Reviews: {reviewCount}</Text>
      <Text>Rating: {ratingAverage}</Text>
    </View>
  );
};

export default RepositoryItem;