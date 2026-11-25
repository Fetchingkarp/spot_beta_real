
import {
  Image,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PetBubble } from '@/components/pet-bubble';
import { ThemedView } from '@/components/themed-view';
import { HeaderBar } from '@/components/ui/header-bar';
import { WebBadge } from '@/components/web-badge';

import { MaxContentWidth } from '@/constants/theme';

export default function PetScreen() {
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);

  const openCustomizeModal = () => {
    setShowCustomizeModal(true);
  };

  const closeCustomizeModal = () => {
    setShowCustomizeModal(false);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>

        {/* HEADER */}
        <View style={styles.headerSection}>
          <HeaderBar />
        </View>

        {/* MAIN PET CONTENT */}
        <View style={styles.heroSection}>

          {/* PET IMAGE */}
          <View style={styles.petImageContainer}>
            <PetBubble animState="action" />
          </View>

          {/* PET INFORMATION */}
          <View style={styles.statsContainer}>

            <View style={styles.nameRow}>
              <Text style={styles.petName}>[NAME]</Text>
              <Text style={styles.petLevel}>
                Level x Tae Kwon-Doe
              </Text>
            </View>

            <View style={styles.statsContent}>

              <View style={styles.statRow}>
                <Text style={styles.statHeading}>Status</Text>
                <Text style={styles.statValue}>[status]</Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statHeading}>Likes</Text>
                <Text style={styles.statValue}>[XXXXX]</Text>
              </View>

              <View style={styles.statRow}>
                <Text style={styles.statHeading}>Dislikes</Text>
                <Text style={styles.statValue}>[XXXXX]</Text>
              </View>

              <View style={styles.otherSection}>
                <Text style={styles.statHeading}>Other</Text>
                <Text style={styles.statValue}>[other]</Text>
              </View>

              <View style={styles.descriptionSection}>
                <Text style={styles.statHeading}>
                  Other description / details about
                  your pet go here
                </Text>
              </View>

            </View>
          </View>

          {/* PET ACTION BUTTONS */}
          <View style={styles.buttonsContainer}>

            <Pressable style={styles.changePetsButton}>
              <Text style={styles.changePetsText}>
                Change Pet
              </Text>
            </Pressable>

            <Pressable
              style={styles.customizeButton}
              onPress={openCustomizeModal}
            > 
              <Image
                source={require('@/assets/images/customise.png')}
                style={styles.customizeImage}
              />
              <Text style={styles.customizeText}>
                Customize
              </Text>
            </Pressable>

          </View>

        </View>

        {/* CUSTOMIZE MODAL */}
        <Modal
          visible={showCustomizeModal}
          transparent={true}
          animationType="fade"
          onRequestClose={closeCustomizeModal}
        >
          <View style={styles.modalOverlay}>

            <Pressable
              style={styles.modalBackground}
              onPress={closeCustomizeModal}
            />

            <View style={styles.modalContainer}>

              {/* MODAL HEADER */}
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>
                  Customize
                </Text>

                <Pressable
                  style={styles.closeButton}
                  onPress={closeCustomizeModal}
                >
                  <Image
                    source={require('@/assets/images/exit.png')}
                    style={styles.closeButtonImage}
                  />
                </Pressable>
              </View>

              {/* SCROLLABLE CUSTOMIZATION OPTIONS */}
              <ScrollView
                style={styles.optionsScroll}
                contentContainerStyle={styles.optionsGrid}
                showsVerticalScrollIndicator={true}
              >

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/hat.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>HATS</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/hand.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>GLOVES</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/shoe.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>SHOES</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/hand.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>GLOVES</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/sparkle.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>GLOW</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/misc.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>MISC.</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/shoe.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>SHOES</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/hand.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>GLOVES</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/sparkle.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>GLOW</Text>
                </Pressable>

                <Pressable style={styles.optionButton}>
                  <Image
                    source={require('@/assets/images/misc.png')}
                    style={styles.optionImage}
                    resizeMode="contain"
                  />
                  <Text style={styles.optionText}>MISC.</Text>
                </Pressable>

              </ScrollView>
              
            </View>
          </View>
        </Modal>

        {Platform.OS === 'web' && <WebBadge />}

      </SafeAreaView>
    </ThemedView>
  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  safeArea: {
    flex: 1,
    width: '100%',
    maxWidth: MaxContentWidth,
    alignSelf: 'center',
  },

  // HEADER
  headerSection: {
    width: '100%',
    height: '12%',
    justifyContent: 'center',
  },

  // MAIN CONTENT
  heroSection: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },

  // PET IMAGE
  petImageContainer: {
    flex: 4,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // STATS PANEL
  statsContainer: {
    flex: 3,
    width: '100%',
    backgroundColor: '#92D80F',
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderColor: 'black',
    padding: 8,
  },

  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },

  petName: {
    fontSize: 35,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  petLevel: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  statsContent: {
    flex: 1,
  },

  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    marginBottom: 4,
  },

  statHeading: {
    fontSize: 14,
    fontWeight: 'bold',
  },

  statValue: {
    fontSize: 13,
    fontWeight: 'bold',
  },

  otherSection: {
    marginTop: 3,
  },

  descriptionSection: {
    marginTop: 8,
  },

  // ACTION BUTTONS
  buttonsContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    gap: 12,
  },

  changePetsButton: {
    flex: 1,
    height: '75%',
    borderWidth: 3,
    borderColor: '#BD009B',
    justifyContent: 'center',
    alignItems: 'center',
  },

  changePetsText: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  customizeButton: {
    flex: 2,
    height: '75%',
    borderWidth: 6,
    borderColor: '#BD009B',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
    customizeText: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    customizeImage: {
      width: 65,
      height: 30,
    },


  // MODAL OVERLAY
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalBackground: {
    ...StyleSheet.absoluteFillObject,
  },

  // GREEN MODAL PANEL
  modalContainer: {
    position: 'absolute',
    bottom: 40,
    width: '98%',
    height: '49%',
    minHeight: 260,
    backgroundColor: '#92D80F',
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 55,
    padding: 14,
    overflow: 'hidden',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
  },

  modalTitle: {
    flex: 1,
    fontSize: 40,
    fontWeight: 'bold',
    marginLeft: 20
  },

  closeButton: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonImage: {
    width: 80,
    height: 70,
  },

  // SCROLLABLE OPTIONS
  optionsScroll: {
    flex: 1,
    width: '100%',
  },

  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    paddingBottom: 10,
  },

  // INDIVIDUAL CATEGORY BOXES
  optionButton: {
    width: '48%',
    height: 55,
    backgroundColor: 'white',
    borderWidth: 5,
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    gap: 8,
  },

  // CATEGORY IMAGES
  optionImage: {
    width: 45,
    height: 45,
  },

  optionText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
