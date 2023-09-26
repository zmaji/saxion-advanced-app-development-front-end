import React from 'react';
import {
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

type CalendarModalProps = {
    isVisible: boolean;
    calendars: { id: number; title: string }[];
    selectCalendar: (calendarId: number) => void;
    hideCalendarModal: () => void;
};

const CalendarModal: React.FC<CalendarModalProps> = ({
    isVisible,
    calendars,
    selectCalendar,
    hideCalendarModal,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
        >
            <View style={styles.modalView}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Select Calendar</Text>
                </View>

                <ScrollView style={styles.modalContainer}>
                    {calendars.map((calendar: { id: number, title: string }) => (
                        <TouchableOpacity
                            key={calendar.id}
                            onPress={() => selectCalendar(calendar.id)}
                        >
                            <Text style={[styles.inputField, styles.calendarOption ]}>{calendar.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, styles.cancelButton]}
                        onPress={hideCalendarModal}
                    >
                        <Text style={styles.buttonTextStyle}>Don't add to calendar</Text>
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
    inputField: {
        fontSize: 16,
        marginBottom: 25
    },
    buttonContainer: {
        backgroundColor: 'ghostwhite',
        padding: 35,
        paddingVertical: 20,
        borderBottomStartRadius: 10,
        borderBottomEndRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 5,
        padding: 10,
        elevation: 2,
    },
    cancelButton: {
        backgroundColor: '#999',
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    calendarOption: {
        borderBottomWidth: 1,
        borderBottomColor: '#999'
    }
});

export default CalendarModal;
