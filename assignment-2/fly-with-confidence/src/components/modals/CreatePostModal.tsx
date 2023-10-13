import React, { useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import { inputStyles } from '../../styles/inputs';
import { themeColors } from '../../styles/themeColors';
import { globalStyles } from '../../styles/global';
import {
  TextTitle,
  Button,
  TextButton,
  TextSubTitle,
  FormLabel,
  InputError
} from '../../components';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import * as Location from 'expo-location';

interface CreatePostModalProps {
  isVisible: boolean;
  closeCreatePostModal: () => void;
  onCreatePost: (title: string, text: string, image: string | null, category: string, location: string) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isVisible, closeCreatePostModal, onCreatePost }) => {
  const [titleError, setTitleError] = useState<string>('');
  const [textError, setTextError] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);

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

  // TODO: Move to config
  const OPEN_CAGE_DATA_API_KEY = '056405b34b074031b8620556873c974f';
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([
    { label: 'Location 1', value: 'Location 1' },
    { label: 'Location 2', value: 'Location 2' },
    { label: 'Location 3', value: 'Location 3' },
  ]);

  const handleCreatePost = () => {
    setTitleError('');
    setTextError('');

    let isValid = true;

    if (!title) {
      setTitleError('Title is required');
      isValid = false;
    }

    if (!text) {
      setTextError('Text is required');
      isValid = false;
    }

    if (isValid) {
      onCreatePost(title, text, image, selectedCategories, location);
    }
  };

  const handleCloseModal = () => {
    setTitle('');
    setText('');
    setImage(null);
    setSelectedCategories([]);
    setSelectedLocation('');
    setTitleError('');
    setTextError('');
    closeCreatePostModal();
  };

  const getCoordinatesInfo = async (latitude: number, longitude: number) => {
    console.log(latitude)
    console.log(longitude)
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?key=${OPEN_CAGE_DATA_API_KEY}&q=${latitude}%2C+${longitude}&pretty=1&no_annotations=1`
      );

      if (response.data.results.length > 0) {
        const city = response.data.results[0].components.city
        setCurrentLocation(city);
      }
    } catch (error) {
      console.error('Error fetching location information:', error);
    }
    return null;
  };

  const promptGeolocatioPermissions = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permission to access location was denied');
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      const result = await getCoordinatesInfo(latitude, longitude);
      console.log('result');
      console.log('result');
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

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
                style={inputStyles.formInput}
                placeholder='Text'
                value={text}
                onChangeText={setText}
              />

              {textError ? (<InputError content={textError} color='error'></InputError>) : null}
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Category'} />
              <DropDownPicker
                multiple={true}
                min={0}
                max={2}
                disableBorderRadius={true}
                open={isCategoryDropdownOpen}
                value={selectedCategories}
                items={categories}
                setOpen={setIsCategoryDropdownOpen}
                setValue={setSelectedCategories}
                setItems={setCategories}
                containerStyle={{
                  marginBottom: 200
                }}
              />
            </View>

            <View style={inputStyles.formField}>
              <FormLabel content={'Location'} />
              <DropDownPicker
                onPress={promptGeolocatioPermissions}
                open={isLocationDropdownOpen}
                value={selectedLocation}
                items={locations}
                setOpen={setIsLocationDropdownOpen}
                setValue={setSelectedLocation}
                setItems={setLocations}
                containerStyle={{
                  marginBottom: 150
                }}
              />
            </View>
          </View>

          <Button text='Create Post' customStyles={styles.createPostButton} onPress={handleCreatePost} />

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
  createPostButton: {
    alignSelf: 'center',
  },
});

export default CreatePostModal;
