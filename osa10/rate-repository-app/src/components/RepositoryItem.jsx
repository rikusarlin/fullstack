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
    width: 50,
    height: 50,
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
        <Text testID="fullName" padded='bottom' fontWeight='bold' fontSize='subheading'>{fullName}</Text>
        <Text testID="description" padded='bottom'>{description}</Text>
        <View style={styles.languageContainer}>
          <Text testID="language" color='textTertiary'>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const DataItem = ({ name, number, text }) => {
  const dataNumberTestId = `${name}-dataItemNumber`;
  const dataTextTestId = `${name}-dataItemText`;
  return (
    <View>
      <Text testID={dataNumberTestId} padded='top' align='center' fontWeight='bold'>{number>1000 ? (Math.round(number/100)/10)+'k' : number}</Text>
      <Text testID={dataTextTestId} padded='topAndBottom ' align='center'>{text}</Text>
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
        <DataItem name="stargazersCount" text='Stars' number={stargazersCount} />
        <DataItem name="forksCount" text='Forks' number={forksCount} />
        <DataItem name="reviewCount" text='Reviews' number={reviewCount} />
        <DataItem name="ratingAverage" text='Rating' number={ratingAverage} />
      </View>
    </View>
  );
};

export default RepositoryItem;