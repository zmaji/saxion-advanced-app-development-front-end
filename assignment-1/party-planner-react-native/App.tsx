import type { Party } from './src/types/Party';

import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native';
import { getPartiesFromStorage } from './src/helpers/PartyHelper';
import CreatePartyModal from './src/components/modal/CreatePartyModal';
import MediaCard from './src/components/MediaCard/MediaCard';
import PartyModal from './src/components/modal/PartyModal';

export default function App() {
  const [parties, setParties] = useState<Party[]>([]);
  const [isCreatePartyModalVisible, setCreatePartyModalVisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const fetchParties = async () => {
    const storedParties = await getPartiesFromStorage();
    setParties(storedParties);
  };

  useEffect(() => {
    fetchParties();
  }, []);

  const openPartyModal = (party: Party) => {
    setSelectedParty(party);
  };

  const closePartyModal = () => {
    setSelectedParty(null);
  }

  const showCreatePartyModal = () => {
    setCreatePartyModalVisible(true);
  };

  const hideCreatePartyModal = () => {
    setCreatePartyModalVisible(false);
  };

  const handlePartyCreation = () => {
    hideCreatePartyModal();
  };

  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerText}>Party overview</Text>
        </View>

        <View style={styles.container}>
          <Text style={styles.subheader}>All upcoming parties</Text>

          <Text style={styles.descriptionText}>
            Explore the details, mark your calendars, and prepare for an epic journey through the latest and greatest parties in town!
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={styles.createButton}
              onPress={showCreatePartyModal}>
              <Text style={styles.buttonText}>Create Party</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.partyContainer}>
        {parties.map((party) => (
          <View style={styles.partyItem} key={party.id}>
            <TouchableOpacity onPress={() => openPartyModal(party)}>
              <View>
                <MediaCard party={party} />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {selectedParty && (
        <PartyModal party={selectedParty} isVisible={true} closePartyModal={closePartyModal} />
      )}

      <CreatePartyModal
        visible={isCreatePartyModalVisible}
        onCancel={hideCreatePartyModal}
        onConfirm={handlePartyCreation}
        onPartySaved={fetchParties}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    backgroundColor: 'ghostwhite',
    padding: 20,
    marginTop: StatusBar.currentHeight || 0,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subheader: {
    fontSize: 25,
    marginBottom: 10
  },
  descriptionText: {
    marginBottom: 10
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  createButton: {
    borderRadius: 5,
    padding: 10,
    backgroundColor: '#2196F3'
  },
  buttonText: {
    color: 'white'
  },
  partyContainer: {
    backgroundColor: 'ghostwhite',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  partyItem: {
    paddingVertical: 10
  },
});
