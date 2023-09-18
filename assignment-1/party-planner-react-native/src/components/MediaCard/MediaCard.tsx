import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Party } from '../../types/Party';

interface PartyProps {
  party: Party;
}

const MediaCard: React.FC<PartyProps> = ({ party }) => {
  return (
    <View style={styles.mediaCard}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{party.title}</Text>
        <Text style={styles.location}>{party.location}</Text>
      </View>
      <View>
        <Text style={styles.description}>{party.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaCard: {
    backgroundColor: 'white',
    borderRadius: 5,
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
  contentContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#888',
  },
  description: {
    fontSize: 16,
  },
});

export default MediaCard;
