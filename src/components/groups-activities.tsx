import { Pressable, StyleSheet, View } from "react-native";


export function GroupActivities() {

  return (
    <View style={styles.container}>
      <View style={styles.GASection}>
        {/**Group button*/}
        <Pressable style={[styles.groupsButton, styles.selected]}>

        </Pressable>
        {/**Activities button */}
        <Pressable style={[styles.activitiesButton, styles.selected]}>

        </Pressable>
      </View>

      <View>
        
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  GASection: {
    borderTopColor: 'black',
    display: 'flex',
    flexDirection: 'row',
  },
  groupsButton: {
    borderRightColor: 'black',
    borderRightWidth: 2.5,
    backgroundColor: '#92D80F',
  },
  activitiesButton: {
    borderLeftColor: 'black',
    borderLeftWidth: 2.5,
    backgroundColor: '#92D80F',
  },
  selected: {
    backgroundColor: '#BD009B',
  },
});
