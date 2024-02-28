import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Header from '../../components/Header';
import SearchInput from '../../components/SearchInput';
import {screenWidth} from '../../utils/uiHelpers';
import {Product} from '../../types/ProductTypes';
import {useAppSelector} from '../../redux/store';
import Products from '../../components/Products';
const FavouritesPage = () => {
  const {favouriteItems} = useAppSelector(state => state.favourites);
  const [search, setSearch] = React.useState('');
  const [data, setData] = React.useState<Product[]>(favouriteItems);

  useEffect(() => {
    if (search) {
      const filtered = favouriteItems.filter((item: Product) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setData(filtered);
    } else {
      setData(favouriteItems);
    }
  }, [search, favouriteItems]);
  const renderItem = ({item}: {item: Product}) => {
    return <Products item={item} />;
  };
  return (
    <View style={styles.container}>
      <Header />
      <SearchInput
        value={search}
        setValue={setSearch}
        placeholder="🔍 Search"
        containerStyle={{margin: 10, width: screenWidth - 60}}
      />
      <FlatList
        data={data}
        keyExtractor={(item: Product) => item.id?.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default FavouritesPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
