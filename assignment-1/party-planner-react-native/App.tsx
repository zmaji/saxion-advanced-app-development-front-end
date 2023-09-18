import type { Party } from './src/types/Party';

import React, { useState, useEffect } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
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
        <View style={styles.container}>
            {/* TODO: FIX HEADER */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Party overview</Text>
            </View>

            <Text style={styles.subheader}>All upcoming parties</Text>

            <Text style={styles.context}>
                Explore the details, mark your calendars, and prepare for an epic journey through the latest and greatest parties in town!
            </Text>

            <Button title="Create Party" onPress={showCreatePartyModal} />

            <FlatList
                data={parties}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openPartyModal(item)}>
                        <View style={styles.partyContainer}>
                            <MediaCard party={item} />
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(party) => party.id.toString()}
            />

            <Text>List of Parties:</Text>
            {parties.map((party) => (
                <View key={party.id}>
                    <Text>{party.title}</Text>
                </View>
            ))}

            {selectedParty && (
                <PartyModal party={selectedParty} isVisible={true} closeModal={closePartyModal} />
            )}

            <CreatePartyModal
                visible={isCreatePartyModalVisible}
                onCancel={hideCreatePartyModal}
                onConfirm={handlePartyCreation}
                onPartySaved={fetchParties}
            />
        </View>
    );
}

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
