import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import SearchInput from '../../../components/SearchInput';
import {screenWidth} from '../../../utils/uiHelpers';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  addFilterBrands,
  addFilterModels,
  setSort,
} from '../../../redux/slices/DataSlice/DataSlice';

interface Product {
  id: string;
  brand: string;
  model: string;
  name: string;
  price: string;
  description: string;
  image: string;
  createdAt: string;
}

type RadioButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

type FilterModalProps = {
  isVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  products: Product[];
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButton}>
    <View style={styles.radioCircle} />
    {selected && <View style={styles.checkedCircle} />}
    <Text style={styles.radioText}>{label}</Text>
  </TouchableOpacity>
);

const Checkbox = ({checked}: {checked: boolean}) => (
  <View style={[styles.checkbox, checked && styles.checkedBox]}>
    {checked ? (
      <Icon name="check" size={14} color="white" />
    ) : (
      <Icon name="square-o" size={12} color="white" />
    )}
  </View>
);

const FilterModal: React.FC<FilterModalProps> = ({
  isVisible,
  setModalVisible,
  products,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [brand, setBrand] = useState<Product[]>([]);
  const [models, setModels] = useState<Product[]>([]);
  const [searchModel, setSearchModel] = useState<string>('');
  const [searchBrand, setSearchBrand] = useState<string>('');
  const [selectedBrands, setSelectedBrands] = useState<Product[]>([]);
  console.log('selectedBrandsssssss', selectedBrands);
  const [selectedModels, setSelectedModels] = useState<Product[]>([]);
  console.log('selectedBrands', selectedBrands);
  const dispatch = useAppDispatch();
  const filteredModels = useAppSelector(
    (state: any) => state.data.filterModels,
  );
  const filteredBrands = useAppSelector(
    (state: any) => state.data.filterBrands,
  );
  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
  };

  const uniqueBrands = products?.reduce((acc: Product[], item: Product) => {
    if (!acc.find(i => i.brand === item.brand)) {
      acc.push(item);
    }
    return acc;
  }, []);

  const uniqueModels = products?.reduce((acc: Product[], item: Product) => {
    if (!acc.find(i => i.model === item.model)) {
      acc.push(item);
    }
    return acc;
  }, []);

  useEffect(() => {
    setModels(
      products?.reduce((acc: Product[], item: Product) => {
        if (!acc.find(i => i.model === item.model)) {
          acc.push(item);
        }
        return acc;
      }, []),
    );
    setBrand(
      products?.reduce((acc: Product[], item: Product) => {
        if (!acc.find(i => i.brand === item.brand)) {
          acc.push(item);
        }
        return acc;
      }, []),
    );
  }, [products]);

  useEffect(() => {
    filterModels();
  }, [searchModel]);

  useEffect(() => {
    filterBrands();
  }, [searchBrand]);

  useEffect(() => {
    console.log('aaaaa');
    console.log('bbbbbbb', filteredBrands);
    console.log('cccccc', filteredModels);
    setSelectedBrands(filteredBrands);
    setSelectedModels(filteredModels);
  }, [filteredBrands, filteredModels, isVisible]);

  const filterModels = () => {
    const filterModels = uniqueModels.filter(i =>
      i.model.toLowerCase().includes(searchModel.toLowerCase()),
    );
    setModels(filterModels);
  };

  const filterBrands = () => {
    const filterBrands = uniqueBrands.filter(i =>
      i.brand.toLowerCase().includes(searchBrand.toLowerCase()),
    );
    setBrand(filterBrands);
  };
  const brandRenderItem = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity
        style={styles.selectionContainer}
        onPress={() => {
          if (selectedBrands.includes(item)) {
            setSelectedBrands(selectedBrands.filter(i => i !== item));
          } else {
            setSelectedBrands([...selectedBrands, item]);
          }
        }}>
        <Checkbox
          checked={selectedBrands.some(
            selectedItem => selectedItem.brand === item?.brand,
          )}
        />
        <Text> {item.brand}</Text>
      </TouchableOpacity>
    );
  };
  console.log('selectedBrands', selectedBrands);
  const modelRenderItem = ({item}: {item: Product}) => {
    return (
      <TouchableOpacity
        style={styles.selectionContainer}
        onPress={() => {
          if (selectedModels.includes(item)) {
            setSelectedModels(selectedModels.filter(i => i !== item));
          } else {
            setSelectedModels([...selectedModels, item]);
          }
        }}>
        <Checkbox
          checked={selectedModels.some(
            selectedItem => selectedItem?.id === item?.id,
          )}
        />
        <Text> {item.model}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <Modal visible={isVisible} animationType="slide">
      <SafeAreaView>
        <View style={styles.body}>
          <View>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text>X</Text>
              </TouchableOpacity>
              <Text>Filter</Text>
              <Text />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              <RadioButton
                label="Old to New"
                selected={selectedOption === 'newest'}
                onPress={() => handleSelectOption('newest')}
              />
              <RadioButton
                label="New to Old"
                selected={selectedOption === 'oldest'}
                onPress={() => handleSelectOption('oldest')}
              />
              <RadioButton
                label="Price high to low"
                selected={selectedOption === 'highToLow'}
                onPress={() => handleSelectOption('highToLow')}
              />
              <RadioButton
                label="Price low to high"
                selected={selectedOption === 'lowToHigh'}
                onPress={() => handleSelectOption('lowToHigh')}
              />
              <View style={styles.blank} />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.sectionTitle}>Brand</Text>
              <SearchInput
                value={searchBrand}
                setValue={setSearchBrand}
                placeholder="🔍 Search"
                containerStyle={{margin: 5, width: screenWidth - 60}}
                inputStyle={{backgroundColor: 'whitesmoke'}}
              />
              <View style={styles.brandContainer}>
                {brand && brand.length > 0 ? (
                  <FlatList
                    data={brand}
                    keyExtractor={(item: any) => item?.id.toString()}
                    renderItem={brandRenderItem}
                  />
                ) : (
                  <View style={styles.centerView}>
                    <Text>No Brand Found</Text>
                  </View>
                )}
              </View>
              <View style={styles.blank} />
            </View>
            <View style={{paddingHorizontal: 10}}>
              <Text style={styles.sectionTitle}>Model</Text>
              <SearchInput
                value={searchModel}
                setValue={setSearchModel}
                placeholder="🔍 Search"
                containerStyle={{margin: 5, width: screenWidth - 60}}
                inputStyle={{backgroundColor: 'whitesmoke'}}
              />
              <View style={styles.brandContainer}>
                {models && models.length > 0 ? (
                  <FlatList
                    data={models}
                    keyExtractor={(item: any) => item?.id?.toString()}
                    renderItem={modelRenderItem}
                  />
                ) : (
                  <View style={styles.centerView}>
                    <Text>No Model Found</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => {
                if (selectedBrands.length !== 0) {
                  dispatch(addFilterBrands(selectedBrands.map(i => i?.brand)));
                }
                if (selectedModels.length !== 0) {
                  dispatch(addFilterModels(selectedModels.map(i => i?.model)));
                }
                if (selectedOption) {
                  dispatch(setSort(selectedOption));
                }
                setModalVisible(false);
              }}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    height: 60,
  },
  body: {justifyContent: 'space-between', height: '100%'},
  sectionTitle: {
    fontSize: 16,
    marginVertical: 10,
    color: 'grey',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioText: {
    marginLeft: 10,
  },
  checkedCircle: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: 4,
    bottom: 4,
    height: 12,
    width: 12,
    borderRadius: 12,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  blank: {
    height: 1,
    marginVertical: 5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  checkedBox: {
    backgroundColor: 'blue',
  },
  brandContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: 10,
    maxHeight: 90,
  },
  applyButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: screenWidth - 60,
  },
});
