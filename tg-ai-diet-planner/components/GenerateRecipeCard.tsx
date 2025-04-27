import { Pressable, Text, View } from "react-native"
import { LinearGradient }        from "expo-linear-gradient"
import Button                                 from "@/components/Button"
import { ArrowRight02Icon, SpoonAndForkIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon }                      from "@hugeicons/react-native"
import { useRouter } from "expo-router"

export default function GenerateRecipeCard(  ) {
  const router = useRouter()
  return (
    <LinearGradient
      colors={ ["#0d54ff", "#904be8"] }
      style={ { borderRadius: 12 } }
      className="flex flex-col gap-4 p-4"
    >
      <Text className="text-white font-bold text-lg">Need Meal Ideas? ✨</Text>
      <Text className="text-white/80">
        Lets generate some meal ideas for you!
      </Text>
      <Pressable onPress={()=>router.push('/generate-recipe')} className="flex flex-row items-center bg-white gap-4 rounded-xl p-4">
        <Text className="text-primary text-lg">Generate with AI</Text>
        <HugeiconsIcon
          icon={ArrowRight02Icon}
          color="#904be8"
        />
      </Pressable>
    </LinearGradient>
  )
}
