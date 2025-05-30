import { Pressable, Text, View }             from "react-native"
import Input                                 from "@/components/Input"
import { z }                                 from "zod"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { zodResolver }                       from "@hookform/resolvers/zod"
import {
  BodyPartMuscleIcon,
  Dumbbell02Icon,
  FemaleSymbolIcon,
  MaleSymbolIcon,
  OvalIcon,
  WeightScale01Icon
}                                            from "@hugeicons/core-free-icons"
import { HugeiconsIcon }                     from "@hugeicons/react-native"
import Button                                from "@/components/Button"
import GoalButton                            from "@/components/GoalButton"
import { useMutation }                       from "convex/react"
import { api }                               from "@/convex/_generated/api"
import { useUserStore }                      from "@/store/useUser"
import { useRouter }                             from "expo-router"
import { CalculateCaloriesBot, CALORIES_PROMPT } from "@/ai_model"

const schema = z.object( {
  weight:  z.string().regex(/^[0-9]+$/, {
    message: "Weight is required"
  } ),
  height:  z.string().regex(/^[0-9]+$/, {
    message: "Height is required"
  } ),
  gender: z.string( {
    message: "Gender is required"
  } ),
  goal  : z.string( {
    message: "Goal is required"
  } )
} )
export default function index() {

  const methods = useForm(
    {
      resolver: zodResolver( schema )
    } )

  const {
          control,
          handleSubmit,
          setValue,
          formState: { errors }
        } = methods

  const router = useRouter()
  const user    = useUserStore( ( state ) => state.user )
  const setUser = useUserStore( ( state ) => state.setUser )

  const UpdateUserPref = useMutation( api.users.UpdateUserPref )


  const onSubmit = async ( values ) => {
    const data   = {
      id    : user?.id,
      height: values.height,
      weight: values.weight,
      gender: values.gender,
      goal  : values.goal
    }

    const prompt = `${CALORIES_PROMPT}\nUser Info: ${JSON.stringify(data)}`
    const aiResult = await CalculateCaloriesBot(prompt)
    const jsonContent = JSON.parse(aiResult.choices[0].message.content?.replace('```json', '').replace('```', ''))
    await UpdateUserPref( { ...data, ...jsonContent } )
    setUser( { ...user, ...jsonContent, ...data } )
    router.replace('/(tabs)/Home')
  }
  return (
    <FormProvider { ...methods } >
      <View className="p-8 bg-white h-full flex gap-4">
        <Text className="text-center text-xl font-bold">
          Tell us about yourself
        </Text>
        <Text className="text-lg text-center text-gray-500">
          This help us create your personalized diet plan
        </Text>
        <View className="flex flex-row gap-4 w-full ">
          <View className="flex-1">
            <Input keyboardType="numeric" name="weight" placeholder="eg. 70"
                   label="Weight (kg)"/>
          </View>
          <View className="flex-1">
            <Input keyboardType="numeric" name="height" placeholder="eg. 5.10"
                   label="Height (ft)"/>
          </View>
        </View>
        <View className="flex- flex-col gap-4">
          <Text className="text-lg">Gender</Text>
          <View className="flex flex-row w-full gap-4">
            <Controller
              control={ control }
              name="gender"
              render={ ( { field: { value } } ) => (
                <>
                  <Pressable
                    key="female"
                    onPress={ () =>
                      setValue( "gender", "female", {
                        shouldValidate: true
                      } )
                    }
                    style={ {
                      borderColor: value === "female" ? "#8429fa" : "#b0b0b0"
                    } }
                    className={ `border rounded-xl p-4 flex-1  items-center justify-center` }>
                    <HugeiconsIcon
                      icon={ FemaleSymbolIcon }
                      color="#FF69B4"
                    />
                  </Pressable>
                  <Pressable
                    key="male"
                    onPress={ () =>
                      setValue( "gender", "male", {
                        shouldValidate: true
                      } )
                    }
                    style={ {
                      borderColor: value === "male" ? "#8429fa" : "#b0b0b0"
                    } }
                    className="border  rounded-xl p-4 flex-1  items-center justify-center">
                    <HugeiconsIcon
                      icon={ MaleSymbolIcon }
                      color="#00BFFF"
                    />
                  </Pressable>
                  <Pressable
                    key="other"
                    onPress={ () =>
                      setValue( "gender", "other", {
                        shouldValidate: true
                      } )
                    }
                    style={ {
                      borderColor: value === "other" ? "#8429fa" : "#b0b0b0"
                    } }
                    className="border  rounded-xl p-4 flex-1  items-center justify-center">
                    <HugeiconsIcon icon={ OvalIcon }/>
                  </Pressable>
                </>
              ) }
            />
          </View>
          { errors.gender
            ? <Text
              className="text-red-500">{ errors.gender.message }</Text>
            : null }
        </View>
        <View className="flex flex-col gap-4">
          <Text>What's your goal?</Text>
          <Controller
            control={ control }
            name="goal"
            render={ ( { field: { value } } ) => (
              <>
                <GoalButton title="Weight Loss"
                            key="weight-loss"
                            style={ {
                              borderColor: value === "Weight Loss"
                                ? "#8429fa"
                                : "#b0b0b0"
                            } }
                            description="Reduce body fat & get leaner"
                            icon={ <HugeiconsIcon icon={ WeightScale01Icon }/> }
                            onPress={ () => setValue( "goal",
                              "Weight Loss", {
                                shouldValidate: true
                              } ) }/>
                <GoalButton title="Muscle Gain"
                            key="muscle-gain"
                            style={ {
                              borderColor: value === "Muscle Gain"
                                ? "#8429fa"
                                : "#b0b0b0"
                            } }
                            description="Build Muscle & Get Stronger"
                            icon={ <HugeiconsIcon
                              icon={ BodyPartMuscleIcon }/> }
                            onPress={ () => setValue( "goal",
                              "Muscle Gain", {
                                shouldValidate: true
                              } ) }/>
                <GoalButton title="Weight Gain"
                            key="weight-gain"
                            style={ {
                              borderColor: value === "Weight Gain"
                                ? "#8429fa"
                                : "#b0b0b0"
                            } }
                            description="Increase healthy body mass"
                            icon={ <HugeiconsIcon icon={ Dumbbell02Icon }/> }
                            onPress={ () => setValue( "goal",
                              "Weight Gain", {
                                shouldValidate: true
                              } ) }/>
              </>
            ) }
          />
          { errors.goal ? <Text
            className="text-red-500">{ errors.goal.message }</Text> : null }
          <Button title="Continue"
                  onPress={ handleSubmit( onSubmit ) }/>
        </View>
      </View>
    </FormProvider>
  )
}
