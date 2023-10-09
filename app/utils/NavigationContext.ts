import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { BottomSheetMethods, BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types"
import { createContext, useContext } from "react"
export type NavigationContext = {
    sheetRef: React.MutableRefObject<BottomSheetModalMethods>
}
export const NavigationContext = createContext<NavigationContext>({
    sheetRef: null, // set a default value
})
export const useNavigationContext = () => useContext(NavigationContext)