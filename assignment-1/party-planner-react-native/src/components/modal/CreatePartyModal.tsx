import type { Party } from '../../types/Party';

import React, { useEffect, useState } from 'react';
import {
  Modal,
  PermissionsAndroid,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Calendar from 'expo-calendar';
import { addPartyToLocalstorage } from '../../helpers/PartyHelper';
import CalendarModal from './CalendarModal';

type CreatePartyModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (party: Party) => void;
  onPartySaved: () => void;
};

const CreatePartyModal: React.FC<CreatePartyModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  onPartySaved,
}) => {
  const initialPartyState: Party = {
    id: 1,
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    attendees: [],
  };

  const [newParty, setNewParty] = useState<Party>({ ...initialPartyState });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendarId, setSelectedCalendarId] = useState(null);
  const [isCalendarModalVisible, setCalendarModalVisible] = useState(false);

  const formatDate = (date: Date): string => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  const formatDateToISO8601String = (date: string): string => {
    const dateComponents = date.split('-');
    const day = parseInt(dateComponents[0]);
    const month = parseInt(dateComponents[1]);
    const year = parseInt(dateComponents[2]);

    return year + '-' + month + '-' + day;
  }

  const addToAndroidCalendar = async (calendarId: string) => {
    console.log('entered android calendar');
    console.log('calendarId', calendarId);

    try {
      if (!calendarId) {
        console.warn('No calendar selected.');
        return;
      }

      const formattedDate = formatDateToISO8601String(newParty.date);

      const event = {
        title: newParty.title,
        startDate: new Date(formattedDate + 'T' + newParty.time),
        endDate: new Date(formattedDate + 'T' + newParty.time),
        timeZone: 'UTC',
        location: newParty.location,
      };

      console.log('event', event);

      const eventId = await Calendar.createEventAsync(
        calendarId,
        event
      );

      console.log('Event added to Android calendar with ID:', eventId);
    } catch (error) {
      console.error('Error adding event to Android calendar:', error);
    } finally {
      resetNewParty();
    }
  };

  const addToiOSCalendar = async () => {
    try {
      const defaultCalendar = await Calendar.getDefaultCalendarAsync();

      if (defaultCalendar) {
        const formattedDate = formatDateToISO8601String(newParty.date);

        const eventDetails = {
          title: newParty.title,
          startDate: new Date(formattedDate + 'T' + newParty.time),
          endDate: new Date(formattedDate + 'T' + newParty.time),
          timeZone: 'UTC',
          location: newParty.location,
        };

        const remindersPermission = await Calendar.requestRemindersPermissionsAsync();
        if (remindersPermission.status === 'granted') {
          const eventId = await Calendar.createEventAsync(
            defaultCalendar.id,
            eventDetails
          );
          console.log('Event added to calendar with ID:', eventId);
        } else {
          console.warn('Reminders permission denied.');
        }
      }
    } catch (error) {
      console.error('Error adding event to calendar:', error);
    } finally {
      resetNewParty();
    }
  };

  const addToCalendar = async () => {
    try {
      if (Platform.OS === 'ios') {
        await addToiOSCalendar();
      } else if (Platform.OS === 'android') {
        const calendars = await Calendar.getCalendarsAsync();

        if (calendars.length > 1) {
          console.log('calendars.length > 1')

          showCalendarModal();
        } else if (calendars.length === 1) {
          console.log('calendars.length === 1')

          // @ts-ignore
          setSelectedCalendarId(calendars[0].id)
          await addToAndroidCalendar(calendars[0].id);
        } else {
          console.warn('No calendars available.');
        }
      }
    } catch (error) {
      console.error('Error adding event to calendar:', error);
    }
  };

  // @ts-ignore
  const handleDateChange = (event, selected) => {
    setShowDatePicker(false);

    if (selected) {
      setSelectedDate(selected);
      setNewParty({
        ...newParty,
        date: formatDate(selected),
      });
    }
  };

  // @ts-ignore
  const handleTimeChange = (event, selected) => {
    setShowTimePicker(false);

    if (selected) {
      setSelectedTime(selected);
      setNewParty({
        ...newParty,
        time: formatTime(selected),
      });
    }
  };

  const showCalendarModal = () => {
    setCalendarModalVisible(true);
  };

  const hideCalendarModal = () => {
    setCalendarModalVisible(false);
  };

  const selectCalendar = async (calendarId: number) => {
    console.log('selecting calendar', calendarId)

    // @ts-ignore
    setSelectedCalendarId(calendarId);
    console.log('set calenderid', selectedCalendarId)

    if (Platform.OS === 'ios') {
      await addToiOSCalendar();
    } else if (Platform.OS === 'android') {
      console.log('addToAndroidCalendar', calendarId)
      // @ts-ignore
      await addToAndroidCalendar(calendarId);
    }

    hideCalendarModal();
  };

  const onPartyConfirm = async () => {
    onConfirm(newParty);
    console.log(newParty);
    await addPartyToLocalstorage(newParty);
    await addToCalendar();

    if (onPartySaved) {
      onPartySaved();
    }
  };

  const displayDatePicker = () => {
    setShowDatePicker(true);
  };

  const displayTimePicker = () => {
    setShowTimePicker(true);
  };

  const resetNewParty = (): void => {
    setNewParty(initialPartyState);
  };

  const fetchCalendars = async () => {
    try {
      if (Platform.OS === 'ios') {
        await fetchiOSCalendars();
      } else if (Platform.OS === 'android') {
        await fetchAndroidCalendars();
      }
    } catch (error) {
      console.error('Error fetching calendars:', error);
    }
  };

  const fetchiOSCalendars = async () => {
    try {
      const calendarPermission = await Calendar.requestCalendarPermissionsAsync();
      const remindersPermission = await Calendar.requestRemindersPermissionsAsync();

      if (
        calendarPermission.status === 'granted' &&
        remindersPermission.status === 'granted'
      ) {

        const calendarList = await Calendar.getCalendarsAsync();
        // @ts-ignore
        setCalendars(calendarList);
      } else {
        console.warn('Calendar permission denied.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching iOS calendars:', error);
      return [];
    }
  };

  const fetchAndroidCalendars = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALENDAR,
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
      ]);

      if (
        granted['android.permission.READ_CALENDAR'] === 'granted' &&
        granted['android.permission.WRITE_CALENDAR'] === 'granted'
      ) {
        const calendarList = await Calendar.getCalendarsAsync();
        // @ts-ignore
        setCalendars(calendarList);
      } else {
        console.warn('Calendar permissions denied.');
        return [];
      }
    } catch (error) {
      console.error('Error fetching Android calendars:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Create a party</Text>
          </View>

          <View style={styles.modalContainer}>
            <Text style={styles.inputLabel}>Name the party</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Party name"
              value={newParty.title}
              onChangeText={(text) => setNewParty({ ...newParty, title: text })}
            />

            <Text>What's the party about?</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Party description"
              multiline={true}
              value={newParty.description}
              onChangeText={(text) =>
                setNewParty({ ...newParty, description: text })
              }
            />

            <Text>Where is the party?</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Party location"
              value={newParty.location}
              onChangeText={(text) => setNewParty({ ...newParty, location: text })}
            />

            <TouchableOpacity onPress={displayDatePicker}>
              <Text style={styles.inputLabel}>When is the party?</Text>

              <Text style={styles.inputField}>{newParty.date ? newParty.date : 'Select a date'}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                mode="date"
                value={selectedDate}
                display="default"
                onChange={handleDateChange}
              />
            )}

            <TouchableOpacity onPress={displayTimePicker}>
              <Text style={styles.inputLabel}>What time is the party?</Text>

              <Text style={[styles.inputField, styles.noMargin]}>{newParty.time ? newParty.time : 'Select the time'}</Text>
            </TouchableOpacity>

            {showTimePicker && (
              <DateTimePicker
                mode="time"
                value={selectedTime}
                is24Hour={true}
                display="default"
                onChange={handleTimeChange}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={styles.buttonTextStyle}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.submitButton]}
              onPress={onPartyConfirm}>
              <Text style={styles.buttonTextStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <CalendarModal
        isVisible={isCalendarModalVisible}
        calendars={calendars}
        selectCalendar={selectCalendar}
        hideCalendarModal={hideCalendarModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'ghostwhite',
    padding: 20,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContainer: {
    padding: 35,
  },
  inputLabel: {
    color: '#444',
    fontSize: 12
  },
  inputField: {
    fontSize: 16,
    marginBottom: 25
  },
  buttonContainer: {
    backgroundColor: 'ghostwhite',
    padding: 35,
    paddingVertical: 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  cancelButton: {
    backgroundColor: '#999',
  },
  submitButton: {
    backgroundColor: '#2196F3',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noMargin: {
    marginBottom: 0,
    marginStart: 0,
    marginEnd: 0,
    marginTop: 0
  }
});

export default CreatePartyModal;
