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
import { getCurrentCity, getCurrentLocation, getNearbyAirports, promptAuthorization } from '../../helpers/geoLocatationHelper';
import DropDownPicker from 'react-native-dropdown-picker';

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

  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [locations, setLocations] = useState([]);

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

  const promptLocation = async () => {
    try {
      const authorization = await promptAuthorization();

      if (authorization) {
        const coordinates = await getCurrentLocation();

        if (coordinates) {
          const { latitude, longitude } = coordinates
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
            setLocations(updatedLocations);
          }
        }
      }
    } catch (error) {
      console.error('Error prompting location:', error);
    }
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
              <FormLabel content={`Current location: ${currentLocation}`} />
              <DropDownPicker
                onPress={promptLocation}
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
