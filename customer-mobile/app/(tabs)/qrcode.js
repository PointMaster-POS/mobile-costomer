import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const QRCodeView = () => {
    const userId = '12390';
    return (
        <View style={styles.container}>
            <Text style={styles.title}>User QR Code</Text>
            <View style={styles.qrCodeContainer}>
                <QRCode
                    value={userId}
                    size={200}
                />
            </View>
            <Text style={styles.userIdText}>User ID: {userId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    qrCodeContainer: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        elevation: 5,
        
    },
    userIdText: {
        marginTop: 20,
        fontSize: 16,
        color: '#333',
    },
});

export default QRCodeView;
