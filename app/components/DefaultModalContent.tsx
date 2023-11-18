import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { colors, spacing } from 'app/theme';
import { observer } from 'mobx-react-lite';
import { Text } from './Text';
import { Button } from './Button';

type Props = {
    onPress: () => void;
};

export interface DefaultModalContentProps {
    /**
     * Function to update the visibility state
     */
    onPress: () => void;
}
export const DefaultModalContent = observer(function DefaultModalContent(props: DefaultModalContentProps) {
    const { onPress } = props;
    return (
        <View style={$content}>
            <Button
                testID="login-button"
                tx="DefaultModalContent.buttonText"
                style={$tapButton}
                preset="reversed"
                onPress={onPress}
            />
        </View>
    )

})

const $content: ViewStyle = {
    backgroundColor: colors.backgroundAccent,
    padding: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: 'rgba(0, 0, 0, 0.1)',
}
const $tapButton: ViewStyle = {
    marginTop: spacing.xs,
}
const $contentTitle: TextStyle = {
    fontSize: spacing.xl,
    marginBottom: 12,
}

export default DefaultModalContent;