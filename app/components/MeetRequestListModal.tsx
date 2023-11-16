import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "app/theme"
import { Text } from "app/components/Text"
import Modal from "react-native-modal";

export interface MeetRequestListModalProps {
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
export const MeetRequestListModal = observer(function MeetRequestListModal(props: MeetRequestListModalProps) {
  const { style, isVisible, setIsVisible, children } = props
  const $styles = [$container, style]

  return (
    <Modal
      testID={'modal'}
      isVisible={isVisible}
      onSwipeComplete={() => { setIsVisible(false) }}
      swipeDirection={['up', 'left', 'right', 'down']}
      style={$styles}>
      {children}
    </Modal>
  )
})

const $container: ViewStyle = {
  justifyContent: 'flex-start',
  margin: 20,
}
