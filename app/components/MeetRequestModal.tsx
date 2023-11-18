import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import Modal from "react-native-modal";
import DefaultModalContent from "./DefaultModalContent"
import { Dialog, Portal } from 'react-native-paper';
export interface MeetRequestModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
 * Boolean to control the visibility of the modal
 */
  isVisible: boolean;
  /**
   * Function to update the visibility state
   */
  setIsVisible: (isVisible: boolean) => void;
  /**
    * Children components to be rendered inside the modal
    */
  children: React.ReactNode;
}

/**
 * Describe your component here
 */
export const MeetRequestModal = observer(function MeetRequestModal(props: MeetRequestModalProps) {
  const { style, isVisible, setIsVisible, children } = props;
  const $styles = [$modal, style]


  return (
    <Portal>

      <Dialog style={$styles} visible={isVisible} onDismiss={() => setIsVisible(false)} dismissableBackButton={true}>

        <Dialog.ScrollArea>

          {children}
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>

  )
})

const $modal: ViewStyle = {
  justifyContent: 'center',
}

