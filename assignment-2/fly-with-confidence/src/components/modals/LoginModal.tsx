import { useState } from 'react';

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

interface LoginModalProps {
  isVisible: boolean;
  closePartyModal: () => void;
}

const PartyModal: React.FC<LoginModalProps> = ({ isVisible, closePartyModal }) => {

  });

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
                      <FontAwesome name="envelope" size={16} color="#2196F3" />
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
                  <FontAwesome name="check-square-o" size={24} color="green" />
                ) : (
                  <FontAwesome name="square-o" size={24} color="gray" />
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

export default LoginModalProps;