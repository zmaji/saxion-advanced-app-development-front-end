import type { Party } from '../../types/Party';

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { isPartyPast } from "../../helpers/PartyHelper";

interface PartyProps {
  party: Party;
}

const MediaCard: React.FC<PartyProps> = ({ party }) => {
  return (
      <View style={[styles.mediaCard, isPartyPast(party) ? styles.pastPartyMediaCard : null]}>
      <View style={styles.contentContainer}>
        <Text style={styles.titleText}>
          {party.title}
        </Text>

        <Text style={styles.locationText}>
          {party.location}
        </Text>
      </View>

      <View>
        <Text style={styles.descriptionText}>
          {party.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaCard: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderStartWidth: 5,
    borderStartColor: '#2196F3',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  pastPartyMediaCard: {
    borderStartColor: '#de0c1e'
  },
  contentContainer: {
    marginBottom: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 14,
    color: '#888',
  },
  descriptionText: {
    fontSize: 16,
  },
});

export default MediaCard;
