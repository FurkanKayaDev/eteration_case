import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import SearchInput from '../../components/SearchInput';
import {screenHeight, screenWidth} from '../../utils/uiHelpers';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {fetchProducts} from '../../redux/slices/DataSlice/DataSlice';
import Products from './components/Products';
import FilterModal from './components/FilterModal';
import {Product} from '../../types/ProductTypes';
import Header from '../../components/Header';

const ProductList = () => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();
  const {products, filterBrands, filterModels, sort} = useAppSelector(
    state => state.data,
  );
  const [displayedProductsCount, setDisplayedProductsCount] = useState(12);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then((data: Product[]) => {
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    if (search) {
      const filtered = products.filter((item: Product) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [search, products]);

  useEffect(() => {
    let filtered: Product[] = products;
    if (filterBrands.length > 0) {
      filtered = filtered.filter(item =>
        filterBrands.some((brand: string) => item.brand === brand),
      );
    }
    if (filterModels.length > 0) {
      filtered = filtered.filter(item =>
        filterModels.some((model: string) => item.model === model),
      );
    }
    if (sort) {
      const sorted = sortProducts(filtered, sort);
      setFilteredProducts(sorted);
    } else {
      setFilteredProducts(filtered);
    }
  }, [filterBrands, filterModels, sort, products]);

  const sortProducts = (products: Product[], sort: string) => {
    const sortedProducts = [...products];
    if (sort === 'lowToHigh') {
      return sortedProducts.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === 'highToLow') {
      return sortedProducts.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sort === 'newest') {
      return sortedProducts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else {
      return sortedProducts.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }
  };

  const onLoadMore = () => {
    setDisplayedProductsCount(prevCount => prevCount + 12);
  };

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
      <View style={styles.filterContainer}>
        <Text style={{fontSize: 18}}>Filters:</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}>
          <Text>Select Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredProducts?.slice(0, displayedProductsCount)}
        keyExtractor={(item: Product) => item.id?.toString()}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReached={onLoadMore}
        contentContainerStyle={styles.productContainer}
        onEndReachedThreshold={0.1}
      />
      <FilterModal
        isVisible={modalVisible}
        setModalVisible={setModalVisible}
        products={products}
      />
    </View>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  filterContainer: {
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: screenWidth - 60,
  },
  filterButton: {
    width: screenWidth / 3,
    height: 35,
    backgroundColor: 'lightgrey',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  loadMoreButton: {
    width: screenWidth - 60,
    height: 40,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
