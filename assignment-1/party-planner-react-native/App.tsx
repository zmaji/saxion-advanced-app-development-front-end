import type { Party } from './src/types/Party';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';

import MediaCard from './src/components/MediaCard/MediaCard';
import PartyModal from './src/components/modal/PartyModal';

const partyOne: Party = {
  id: 1,
  title: 'Party at Saxion',
  description: 'description',
  location: 'location 1',
  datetime: new Date().toISOString(),
};

const partyTwo: Party = {
  id: 2,
  title: "Domino's",
  description: 'description',
  location: 'location 2',
  datetime: new Date().toISOString(),
};

const partyThree: Party = {
  id: 3,
  title: 'Max his project X chess party',
  description: 'description',
  location: 'location 3',
  datetime: new Date().toISOString(),
};

const partyArray: Party[] = [partyOne, partyTwo, partyThree];

const PartyOverview: React.FC<{ parties: Party[] }> = () => {
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);

  const openPartyModal = (party: Party) => {
    setSelectedParty(party);
  };

  const closeModal = () => {
    setSelectedParty(null);
  };

  return (
    <View style={styles.container}>
      {/* TODO: FIX HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Party overview</Text>
      </View>

      <Text style={styles.subheader}>All upcoming parties</Text>

      <Text style={styles.context}>
        Explore the details, mark your calendars, and prepare for an epic journey through the latest and greatest parties in town!
      </Text>

      <FlatList
        data={partyArray}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => openPartyModal(item)}>
            <View style={styles.partyContainer}>
              <MediaCard party={item} />
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(party) => party.id.toString()}
      />

      {selectedParty && (
        <PartyModal party={selectedParty} isVisible={true} closeModal={closeModal} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  //TODO FIX HEADER
  header: {
    backgroundColor: 'ghostwhite',
    padding: 10,
    textAlign: 'center'
  },
  //TODO FIX HEADER
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  subheader: {
    fontSize: 25,
    margin: 10
  },
  context: {
    margin: 25
  },
  partyContainer: {
    padding: 10,
  },
});

export default PartyOverview;