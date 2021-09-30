import React from 'react';
import { View, StyleSheet, Image} from 'react-native';
import theme from '../../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flexGrow: 0,
  },
  headerContainer: {
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
    paddingLeft: 15,
    paddingTop: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  languageContainer: {
    flexGrow: 0,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    alignSelf: 'flex-start',
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 5,
    paddingRight: 5,
  },
  dataContainer: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-evenly'
  },
  dataItemContainer: {
    alignSelf: 'center',
  },
});

const ItemHeader = ({fullName, description, language, ownerAvatarUrl}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: ownerAvatarUrl}} />
      </View>
      <View style={styles.infoContainer}>
        <Text testId="fullName" padded='bottom' fontWeight='bold' fontSize='subheading'>{fullName}</Text>
        <Text testId="description" padded='bottom'>{description}</Text>
        <View style={styles.languageContainer}>
          <Text testId="language" color='textTertiary'>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const DataItem = ({ number, text }) => {
  return (
    <View>
      <Text testId="dataItemNumber" padded='top' align='center' fontWeight='bold'>{number>1000 ? (Math.round(number/100)/10)+'k' : number}</Text>
      <Text testId="dataItemText" padded='topAndBottom ' align='center'>{text}</Text>
    </View>
  );
};

const RepositoryItem = ({ fullName, description, language, forksCount, stargazersCount,
    ratingAverage, reviewCount, ownerAvatarUrl})  => {
  return (
    <View style={styles.container}>
      <ItemHeader fullName={fullName} description={description} language={language} 
       ownerAvatarUrl={ownerAvatarUrl}/>
      <View style={styles.dataContainer}>
        <DataItem testId="stargazersCount" text='Stars' number={stargazersCount} />
        <DataItem testId="forksCount" text='Forks' number={forksCount} />
        <DataItem testId="reviewCount" text='Reviews' number={reviewCount} />
        <DataItem testId="ratingAverage" text='Rating' number={ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;