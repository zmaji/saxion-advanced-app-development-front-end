import type { Party } from '../../types/Party';

import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

interface PartyModalProps {
  party: Party;
  isVisible: boolean;
  closeModal: () => void;
}

const PartyModal: React.FC<PartyModalProps> = ({ party, isVisible, closeModal }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={closeModal}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>

          <Text style={styles.modalText}>
            {party.title}</Text>

          <Text>{party.location}</Text>

          <Text>{party.description}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={closeModal}
          >

            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#2196F3',
    marginTop: 15,
    paddingHorizontal: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold'
  },
});

export default PartyModal;