import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Link } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
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

const SortPicker = ({sortBy, setSortBy})  => {
  return (
    <View>
      <Picker
        selectedValue={sortBy}
        onValueChange={(itemValue) => {
          console.log("onValueChange, itemValue="+itemValue);
          setSortBy(itemValue);
        }
      }>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

const RepositoryListContainer = ({ repositories, sortBy, setSortBy }) => {

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    
    return (
      <FlatList
        testID="repositorylist"
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <SortPicker sortBy={sortBy} setSortBy={setSortBy}/>}
        renderItem={renderItem}
        />
    );
  };

  export default RepositoryListContainer;