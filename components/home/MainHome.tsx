import React from 'react';
import {View, ScrollView} from 'react-native';
import { Text, Card, Button, IconButton} from 'react-native-paper';

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

            {/* Contenido principal */}
            <ScrollView
                contentContainerStyle={{}}
            >
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

                <Card style={{marginVertical: 8}}>
                    <Card.Title title="Oferta destacada"/>
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
            </ScrollView>
        </>
    );
};

export default HomeScreen;
