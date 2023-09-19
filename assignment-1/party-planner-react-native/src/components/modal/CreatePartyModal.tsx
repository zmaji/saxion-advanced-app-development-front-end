import type { Party } from '../../types/Party';

import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { addPartyToLocalstorage } from '../../helpers/PartyHelper';

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

  const formatDate = (date: Date): string => {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  }

  const formatTime = (date: Date): string => {
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  const [newParty, setNewParty] = useState<Party>({
    id: 1,
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    attendees: [],
  });


  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());

  const resetNewParty = (): void => {
    setNewParty({
      id: 1,
      title: '',
      description: '',
      location: '',
      date: '',
      time: '',
      attendees: [],
    });
  };

  const onPartyConfirm = async () => {
    onConfirm(newParty);
    console.log(newParty);
    await addPartyToLocalstorage(newParty);
    resetNewParty();

    if (onPartySaved) {
      onPartySaved();
    }
  };

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

    return (
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

                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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

                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
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
