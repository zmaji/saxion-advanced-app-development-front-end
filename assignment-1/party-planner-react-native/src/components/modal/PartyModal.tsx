import type { Party } from '../../types/Party';
import type { Person } from '../../types/Person';

import * as Contacts from 'expo-contacts';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';

import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Pressable,
  ScrollView, Linking
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
  const [partyWithAttendees, setPartyWithAttendees] = useState<Party>({
    ...party,
    attendees: [],
  });

  const openContactPicker = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers, Contacts.Fields.Emails],
      });

      if (data.length > 0) {
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setContacts(sortedData);
      }
    } else {
      // TODO: Handle denied or restricted permission
    }
  };

  const toggleContactSelection = (contact: any) => {
    if (selectedContacts.includes(contact)) {
      setSelectedContacts(selectedContacts.filter((c) => c !== contact));
    } else {
      setSelectedContacts([...selectedContacts, contact]);
    }
    console.log('Selected contacts');
    console.log(selectedContacts);
  };

  const addSelectedContactsToParty = () => {
    const attendees: Person[] = selectedContacts.map((contact) => {
      return {
        id: contact.id,
        name: contact.name,
        phoneNumber: contact.phoneNumber || '',
        email: contact.emails && contact.emails.length > 0 ? contact.emails[0] : '',
      };
    });

    const updatedParty = { ...partyWithAttendees, attendees: [...partyWithAttendees.attendees, ...attendees] };
    setPartyWithAttendees(updatedParty);
    setSelectedContacts([]);
  };

  function sendEmail(email: any) {
    const recipientEmail = email.email;
    const subject = "Party invitation";
    const message = "You're invited to my party!";

    const mailtoURL = `mailto:${recipientEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(message)}`;

    console.log("mailtoURL");
    console.log(mailtoURL);
    Linking.openURL(mailtoURL);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closePartyModal}
    >
      <ScrollView style={styles.modalView}>
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
          <Text style={[styles.partyInfoText, isPartyPast(party) ? styles.pastPartyText : styles.futurePartyText]}>
            {party.date} at {party.time}
          </Text>

          <View>
            <Text>Attendees:</Text>

            {partyWithAttendees.attendees.length > 0 ? (
              partyWithAttendees.attendees.map((attendee) => (
                <View key={attendee.id} style={styles.partyAttendee}>
                  <Text>{attendee.name}</Text>

                  {attendee.email && (
                    <TouchableOpacity onPress={() => sendEmail(attendee.email)} style={styles.emaiIconButton}>
                      <FontAwesomeIcon icon={faEnvelope} color="#2196F3" />
                    </TouchableOpacity>
                  )}
                </View>
              ))
            ) : (
              <Text>No attendees yet.</Text>
            )}
          </View>


          {selectedContacts.length > 0 ? (
            <TouchableOpacity
              style={[styles.button, styles.green]}
              onPress={addSelectedContactsToParty}
            >
              <Text style={styles.buttonTextStyle}>Add Selected Contacts</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.button, styles.green, styles.marginTop]}
              onPress={openContactPicker}
            >
              <Text style={styles.buttonTextStyle}>Add Attendee(s)</Text>
            </TouchableOpacity>
          )}

          {contacts.length > 0 && contacts.map((contact) => (
            <View style={styles.contactItem} key={contact.id}>
              <TouchableOpacity onPress={() => toggleContactSelection(contact)} style={styles.checkboxButton}>
                {selectedContacts.includes(contact) ? (
                  <FontAwesomeIcon icon={faSquareCheck} color="green" />
                ) : (
                  <FontAwesomeIcon icon={faSquare} color="gray" />
                )}
              </TouchableOpacity>
              <Text>{contact.name}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.closeButton]}
            onPress={closePartyModal}>
            <Text style={styles.buttonTextStyle}>Close</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  marginTop: {
    marginTop: 20
  },
  partyAttendee: {
    flexDirection: 'row'
  },
  emaiIconButton: {
    marginStart: 5
  }
});

export default PartyModal;