import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Text
} from 'react-native';
import {
  TextTitle,
  Button,
  TextButton,
  TextSubTitle,
  FormLabel,
  InputError
} from '../../components';
import {
  getCurrentCity,
  getCurrentLocation,
  getNearbyAirports,
  promptAuthorization
} from '../../helpers/geoLocatationHelper';
import { pickImage } from '../../helpers/imageHelper';
import { inputStyles } from '../../styles/inputs';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import { fontFamilyStyles } from '../../styles/typography';

interface CreatePostModalProps {
  isVisible: boolean;
  closeCreatePostModal: () => void;
  onCreatePost: (title: string, text: string, image: string | null, categories: string[], location: string | null) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isVisible, closeCreatePostModal, onCreatePost }) => {
  const [titleError, setTitleError] = useState<string>('');
  const [textError, setTextError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');

  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const [image, setImage] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [categoryDropdownHeight, setCategoryDropdownHeight] = useState(0);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState([
    { label: 'Anxiety Management', value: 'Anxiety Management' },
    { label: 'Air Travel Worries', value: 'Air Travel Worries' },
    { label: 'Fear of Flying', value: 'Fear of Flying' },
    { label: 'Coping Strategies', value: 'Coping Strategies' },
    { label: 'Travel Anxiety', value: 'Travel Anxiety' },
    { label: 'Stress Reduction', value: 'Stress Reduction' },
    { label: 'Success Stories', value: 'Success Stories' },
    { label: 'Anxiety Victory', value: 'Anxiety Victory' },
    { label: 'Coping Methods', value: 'Coping Methods' },
    { label: 'Anxiety Relief', value: 'Anxiety Relief' },
  ]);

  const [locationDropdownHeight, setLocationDropdownHeight] = useState(0);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([{ label: currentLocation, value: currentLocation }]);

  const handleCreatePost = () => {
    setTitleError('');
    setTextError('');
    setCategoryError('');

    let isValid = true;

    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    }

    if (!text) {
      setTextError('Text is required');
      isValid = false;
    }

    if (selectedCategories.length === 0) {
      setCategoryError('At least one category is required');
      isValid = false;
    }

    if (isValid) {
      onCreatePost(title, text, image, selectedCategories, selectedLocation);
    }
  };

  const handleCloseModal = () => {
    setTitle('');
    setText('');
    setImage('');
    setSelectedCategories([]);
    setSelectedLocation(null);
    setTitleError('');
    setTextError('');
    closeCreatePostModal();
  };

  const promptLocation = async () => {
    try {
      const authorization = await promptAuthorization();

      if (authorization) {
        const coordinates = await getCurrentLocation();

        if (coordinates) {
          const { latitude, longitude } = coordinates;
          const city = await getCurrentCity(latitude, longitude);
          setCurrentLocation(city);

          if (city) {
            const distance = 20;
            const airports = await getNearbyAirports(latitude, longitude, distance);
            const airportNames = airports.map((airport: any) => airport.name);

            const updatedLocations = airportNames.map((name: string) => ({
              label: name,
              value: name,
            }));

            updatedLocations.unshift({ label: `Current location (${currentLocation})`, value: currentLocation });
            setLocations(updatedLocations);
          }
        }
      }
    } catch (error) {
      console.error('Error prompting location:', error);
    }
  };

  const openImagePicker = async () => {
    const imageUri = pickImage();
    // setImage(imageUri);
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={isVisible}
      onRequestClose={closeCreatePostModal}
    >
      <View style={styles.modalView}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <TextTitle content='Create Post' />

          <TextSubTitle content={'Please enter post details'} customStyles={{ marginBottom: 20 }} />

          <View style={inputStyles.formContainer}>
            <View style={inputStyles.formField}>
              <FormLabel content={'Title'} />
              <TextInput
                style={inputStyles.formInput}
                placeholder='Title'
                value={title}
                onChangeText={setTitle}
              />

              {titleError ? (<InputError content={titleError} color='error'></InputError>) : null}
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Text'} />
              <TextInput
                style={[inputStyles.formInput, styles.formHeight]}
                placeholder='Text'
                value={text}
                onChangeText={setText}
                multiline={true}
                numberOfLines={4}
              />

              {textError ? (<InputError content={textError} color='error'></InputError>) : null}
            </View>

            <View>
              <FormLabel content={`Image`} />
              <TouchableOpacity style={[inputStyles.formInput, styles.imageButton]} onPress={openImagePicker}>
                <Text style={styles.imageButtonText}>Open camera roll</Text>
              </TouchableOpacity>
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Category'} />
              <DropDownPicker
                loading={loading}
                placeholder={'Select a category'}
                multiple={true}
                min={0}
                max={2}
                open={isCategoryDropdownOpen}
                value={selectedCategories}
                items={categories}
                setOpen={setIsCategoryDropdownOpen}
                setValue={setSelectedCategories}
                setItems={setCategories}
                listMode="SCROLLVIEW"
                containerStyle={{
                  marginBottom: isCategoryDropdownOpen ? categoryDropdownHeight : 0,
                }}
                style={{
                  borderColor: themeColors.lightGrey,
                }}
                textStyle={{
                  fontFamily: 'Montserrat-Regular'
                }}
                onOpen={() => {
                  setCategoryDropdownHeight(200);
                }}
                onClose={() => {
                  setCategoryDropdownHeight(0);
                }}
              />

              {categoryError ? (<InputError content={categoryError} color='error'></InputError>) : null}
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={`Location`} />
              <DropDownPicker
                placeholder={'Select a location'}
                loading={loading}
                onPress={promptLocation}
                open={isLocationDropdownOpen}
                value={selectedLocation}
                items={locations}
                setOpen={setIsLocationDropdownOpen}
                setValue={setSelectedLocation}
                setItems={setLocations}
                listMode="SCROLLVIEW"
                containerStyle={{
                  marginBottom: isLocationDropdownOpen ? locationDropdownHeight : 0,
                }}
                style={{
                  borderColor: themeColors.lightGrey,
                }}
                textStyle={{
                  ...fontFamilyStyles.montserratRegular
                }}
                onOpen={() => {
                  setLocationDropdownHeight(160);
                }}
                onClose={() => {
                  setLocationDropdownHeight(0);
                }}
              />
            </View>
          </View>

          <Button text='Create Post' customStyles={styles.createButton} onPress={handleCreatePost} />

          <TextButton text={'Cancel'} onPress={handleCloseModal} />
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginLeft: 25,
    marginRight: 25,
    marginTop: 35,
    marginBottom: 35,
    borderRadius: 5,
    backgroundColor: themeColors.white,
    ...globalStyles.defaultShadow,
  },
  scrollViewContent: {
    padding: 25,
  },
  createButton: {
    alignSelf: 'center',
  },
  imageButton: {
    marginBottom: 20
  },
  imageButtonText: {
    ...fontFamilyStyles.montserratRegular
  },
  formHeight: {
    height: 100
  }
});

export default CreatePostModal;
