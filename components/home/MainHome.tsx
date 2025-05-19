import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text, Card, Button, IconButton} from 'react-native-paper';

type Props = {
    toggleTheme: () => void;
};
const HomeScreen: React.FC<Props> = ({toggleTheme}) => {
    return (
        <>
            {/* Barra superior */}
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                <IconButton icon="theme-light-dark" size={30} onPress={toggleTheme}/>
            </View>
            <Text
                variant="headlineMedium"
                style={{
                    marginTop: 10,
                    marginBottom: 16,
                    textAlign: 'center',
                }}
            >
                Bienvenido a la App
            </Text>
            <ScrollView
                contentContainerStyle={{}}
            >
                <View style={{flex: 0.6, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20}}>
                    <Card style={{marginVertical: 8, width: '90%'}}>
                        <Card.Title title="Deuda 1"/>
                        <Card.Content>
                            <Text>
                                Descubre nuestras nuevas promociones y ahorra más.
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                mode="contained"
                                onPress={() => console.log('Ver más')}
                                style={{marginTop: 8}}
                            >
                                Ver más
                            </Button>
                        </Card.Actions>
                    </Card>
                    <Card style={{marginVertical: 8, width: '90%'}}>
                        <Card.Title title="Deuda 1"/>
                        <Card.Content>
                            <Text>
                                Descubre nuestras nuevas promociones y ahorra más.
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                mode="contained"
                                onPress={() => console.log('Ver más')}
                                style={{marginTop: 8}}
                            >
                                Ver más
                            </Button>
                        </Card.Actions>
                    </Card>
                    <Card style={{marginVertical: 8, width: '90%'}}>
                        <Card.Title title="Deuda 1"/>
                        <Card.Content>
                            <Text>
                                Descubre nuestras nuevas promociones y ahorra más.
                            </Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button
                                mode="contained"
                                onPress={() => console.log('Ver más')}
                                style={{marginTop: 8}}
                            >
                                Ver más
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>


            </ScrollView>
        </>
    );
};

export default HomeScreen;
