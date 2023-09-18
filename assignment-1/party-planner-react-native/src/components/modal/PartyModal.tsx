import type { Party } from '../../types/Party';

import * as Contacts from 'expo-contacts';

import {
  Modal,
  Text, 
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable
} from 'react-native';
import React from "react";
import { isPartyPast } from "../../helpers/PartyHelper";

interface PartyModalProps {
  party: Party;
  isVisible: boolean;
  closePartyModal: () => void;
}

const PartyModal: React.FC<PartyModalProps> = ({ party, isVisible, closePartyModal }) => {
  const openContactPicker = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    console.log('STATUS!')
    console.log(status)
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name],
      });

      if (data.length > 0) {
        const contact = data[0];
        console.log(contact);
      }
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closePartyModal}
    >
      <View style={styles.modalView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Party details</Text>
        </View>

        <View style={styles.modalContainer}>
          <Text style={styles.labelText}>Party name</Text>
          <Text style={styles.partyInfoText}>{party.title}</Text>

          <Text style={styles.labelText}>Party location</Text>
          <Text style={styles.partyInfoText}>{party.location}</Text>

          <Text style={styles.labelText}>Party description</Text>
          <Text style={styles.partyInfoText}>{party.description}</Text>

          <Text style={styles.labelText}>Date and time</Text>
          <Text style={[styles.partyInfoText, styles.noMargin, isPartyPast(party) ? styles.pastPartyText : styles.futurePartyText]}>
            {party.date} at {party.time}
          </Text>

          <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={openContactPicker}
          >
              <Text style={styles.buttonTextStyle}>Add attendee</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
              style={[styles.button, styles.closeButton]}
              onPress={closePartyModal}>
            <Text style={styles.buttonTextStyle}>Close</Text>
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
  labelText: {
    color: '#444',
    fontSize: 12
  },
  partyInfoText: {
    fontSize: 16,
    marginBottom: 25
  },
  futurePartyText: {
    color: '#2196F3',
  },
  pastPartyText: {
    color: '#de0c1e'
  },
  buttonContainer: {
    backgroundColor: 'ghostwhite',
    padding: 35,
    paddingVertical: 20,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  closeButton: {
    backgroundColor: '#999',
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }, 
  green: {
    backgroundColor: 'green',
  },
  blue: {
    backgroundColor: '#2196F3',
  },
  noMargin: {
    marginBottom: 0,
    marginStart: 0,
    marginEnd: 0,
    marginTop: 0
  },
});

export default PartyModal;