import * as React from 'react';
import {Button, Text, Provider as PaperProvider} from 'react-native-paper';
import { View } from 'react-native';

export default function App() {
  return (
      <PaperProvider>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text variant='titleLarge' style={{ textAlign: 'center', marginBottom: 24 }}>OLA OWO</Text>
          <Button mode="contained" style={{ marginTop: 20, width: 200, alignSelf: 'center' }}  onPress={()=> console.log("olaa") }>PRESSME</Button>
        </View>
      </PaperProvider>
  );
}
