import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';

const ImagePickerInput = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const choosePhoto = async () => {
    if (!hasGalleryPermission) {
      alert('É necessário permitir o acesso à galeria.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      props.setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (!hasCameraPermission) {
      alert('É necessário permitir o acesso à câmera.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      props.setImage(result.assets[0].uri);
    }
  };

  const removePhoto = () => {
    props.setImage(null);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        {(!props.image &&  
                <Text style={styles.buttonText}>Câmera/Galeria de imagens</Text>
        )}
        {props.image && (
            <Image source={{ uri: props.image }} style={styles.image} />
        )}
      </TouchableOpacity>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContent}>
          <Text style={styles.message}>
            Deseja tirar uma foto, selecionar uma da galeria ou remover a foto atual?
          </Text>
          
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.modalButton, styles.actionButton]} onPress={() => { toggleModal(); takePhoto(); }}>
                    <Text style={styles.modalButtonText}>Câmera</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.modalButton, styles.actionButton]} onPress={() => { toggleModal(); choosePhoto(); }}>
                    <Text style={styles.modalButtonText}>Galeria</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonRow}>
                <TouchableOpacity style={[styles.modalButton, styles.removeButton]} onPress={() => { toggleModal(); removePhoto(); }}>
                    <Text style={styles.modalButtonText}>Remover</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.modalButton]} onPress={toggleModal}>
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImagePickerInput;

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  label: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 4,
    fontFamily: 'AveriaLibre-Regular',
  },
  button: {
    backgroundColor: '#fff',
    width: '40%',
    height: 80,
    marginVertical: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#939393',
    textAlign: 'center',
  },
  image: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  modalContent: { backgroundColor: '#2B1F5C', padding: 20, borderRadius: 10, maxHeight: '80%', maxWidth: '60%', margin: 'auto' },
  message: { fontSize: 16, fontFamily: 'AveriaLibre-Regular', marginBottom: 10, color: '#fff', textAlign: 'center' },
  buttonContainer: { marginTop: 16, flexDirection: 'row', justifyContent: 'space-between'},
  modalButton: { backgroundColor: '#fff', padding: 8, marginLeft: 4},
  modalButtonText: { fontFamily: 'AveriaLibre-Regular', color: '#fff' },
  actionButton: { backgroundColor: '#3F92C5', color: '#fff'},
  removeButton: { backgroundColor: '#FF8383'},
  cancelText: { color: '#000'},
  buttonRow: { flexDirection: 'row'}
});