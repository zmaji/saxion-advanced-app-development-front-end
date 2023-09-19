import type { Party } from '../../types/Party';

import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';

import {
  Modal,
  Text, 
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  SafeAreaView,
  FlatList
} from 'react-native';
import React from "react";
import { isPartyPast } from "../../helpers/PartyHelper";

interface PartyModalProps {
  party: Party;
  isVisible: boolean;
  closePartyModal: () => void;
}

const PartyModal: React.FC<PartyModalProps> = ({ party, isVisible, closePartyModal }) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [selectedContacts, setSelectedContacts] = useState<any[]>([]);

  const openContactPicker = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    } else {
      //TODO: Handle denied or restricted permission
    }
  };

  const toggleContactSelection = (contact: any) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.contactItem}>
      <TouchableOpacity onPress={() => toggleContactSelection(item)} style={styles.checkboxButton}>
        {selectedContacts.includes(item) ? (
          <FontAwesome name="check-square-o" size={24} color="green" />
        ) : (
          <FontAwesome name="square-o" size={24} color="gray" />
        )}
      </TouchableOpacity>
      <Text>{item.name}</Text>
    </View>
  );

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

            {contacts.length > 0 && (
                <SafeAreaView style={styles.contactPicker}>
                    <FlatList
                        data={contacts}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                </SafeAreaView>
            )}
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
  contactPicker: {
    marginTop: 20,
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  checkboxButton: {
    marginRight: 16
  },
});

export default PartyModal;