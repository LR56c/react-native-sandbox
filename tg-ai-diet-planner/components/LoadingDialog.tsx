import { ActivityIndicator, Modal, Text, View } from "react-native"

interface LoadingDialogProps {
  loading: boolean
}

export default function LoadingDialog( { loading }: LoadingDialogProps ) {
  return (
    <Modal transparent visible={ loading }>
      <View className="flex-1 justify-center items-center bg-transparent">
        <View className="p-4 rounded-xl bg-primary flex flex-col items-center">
          <ActivityIndicator size="large"
                             color="#ffffff"
          />
          <Text className="text-white text-lg">Loading...</Text>
        </View>
      </View>
    </Modal>
  )
}
