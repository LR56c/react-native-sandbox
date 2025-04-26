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

const schema = z.object( {
  weight: z.number( {
    message: "Weight is required"
  } ),
  height: z.number( {
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

  const { control, handleSubmit, setValue, formState: { errors } } = methods

  const onSubmit = async ( data ) => {
    console.log( "onSubmit", data )
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
            <Input name="weight" placeholder="eg. 70" label="Weight (kg)"/>
          </View>
          <View className="flex-1">
            <Input name="height" placeholder="eg. 5.10" label="Height (ft)"/>
          </View>
        </View>
        <View className="flex- flex-col gap-4">
          <Text className="text-lg">Gender</Text>
          <View className="flex flex-row w-full gap-4">
            <Controller
              control={ control }
              name="gender"
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <Pressable
                  onPress={ () => setValue( "gender", "female" ) }
                  style={ {
                    borderColor: value === "female" ? "#FF69B4" : "#b0b0b0"
                  } }
                  className={ `border rounded-xl p-4 flex-1  items-center justify-center` }>
                  <HugeiconsIcon
                    icon={ FemaleSymbolIcon }
                    color="#FF69B4"
                  />
                </Pressable>
              ) }
            />
            <Controller
              control={ control }
              name="gender"
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <Pressable
                  onPress={ () => setValue( "gender", "male" ) }
                  style={ {
                    borderColor: value === "male" ? "#00BFFF" : "#b0b0b0"
                  } }
                  className="border  rounded-xl p-4 flex-1  items-center justify-center">
                  <HugeiconsIcon
                    icon={ MaleSymbolIcon }
                    color="#00BFFF"
                  />
                </Pressable>
              ) }
            />
            <Controller
              control={ control }
              name="gender"
              render={ ( { field: { onChange, onBlur, value } } ) => (
                <Pressable
                  onPress={ () => setValue( "gender", "other" ) }
                  style={ {
                    borderColor: value === "other" ? "#000000" : "#b0b0b0"
                  } }
                  className="border  rounded-xl p-4 flex-1  items-center justify-center">
                  <HugeiconsIcon icon={ OvalIcon }/>
                </Pressable>
              ) }
            />
          </View>
          { errors.gender
            ? <Text className="text-red-500">{ errors.gender.message }</Text>
            : null }
        </View>
        <View className="flex flex-col gap-4">
          <Text>What's your goal?</Text>
          <Controller
            control={ control }
            name="goal"
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <GoalButton title="Weight Loss"
                          style={ {
                            borderColor: value === "Weight Loss"
                              ? "#000000"
                              : "#b0b0b0"
                          } }
                          description="Reduce body fat & get leaner"
                          icon={ <HugeiconsIcon icon={ WeightScale01Icon }/> }
                          onPress={ () => setValue( "goal",
                            "Weight Loss" ) }/>
            ) }
          />
          <Controller
            control={ control }
            name="goal"
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <GoalButton title="Muscle Gain"
                          style={ {
                            borderColor: value === "Muscle Gain"
                              ? "#000000"
                              : "#b0b0b0"
                          } }
                          description="Build Muscle & Get Stronger"
                          icon={ <HugeiconsIcon icon={ BodyPartMuscleIcon }/> }
                          onPress={ () => setValue( "goal",
                            "Muscle Gain" ) }/>
            ) }
          />
          <Controller
            control={ control }
            name="goal"
            render={ ( { field: { onChange, onBlur, value } } ) => (
              <GoalButton title="Weight Gain"
                          style={ {
                            borderColor: value === "Weight Gain"
                              ? "#000000"
                              : "#b0b0b0"
                          } }
                          description="Increase healthy body mass"
                          icon={ <HugeiconsIcon icon={ Dumbbell02Icon }/> }
                          onPress={ () => setValue( "goal",
                            "Weight Gain" ) }/>
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
