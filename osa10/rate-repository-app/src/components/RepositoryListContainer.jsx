import React from 'react';
import { FlatList, Pressable, View} from 'react-native';
import { Link } from 'react-router-native';
import {Picker} from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
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

const renderHeader = (props)  => {
  const onChangeSearch = query => props.setFilterBy(query);

  return (
    <View>
      <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={props.filterBy}/>
      <View>
      <Picker
        selectedValue={props.sortBy}
        onValueChange={(itemValue) => {
          //console.log("onValueChange, itemValue="+itemValue);
          props.setSortBy(itemValue);
        }}>
        <Picker.Item label="Latest" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
      </View>
    </View>
  );
};

const RepositoryListContainer = (props) => {
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map(edge => edge.node)
      : [];
    
    return (
      <FlatList
        testID="repositorylist"
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={renderHeader(props)}
        renderItem={renderItem}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.5}
        />
    );
  };

  export default RepositoryListContainer;