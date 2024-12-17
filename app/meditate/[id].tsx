import { View, Text, ImageBackground, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { Audio } from 'expo-av'

import meditationImages from '@/constants/meditation-images'
import { MEDITATION_DATA, AUDIO_FILES } from '@/constants/MeditationData'
import AppGradient from '@/components/AppGradient'
import AntDesign from '@expo/vector-icons/AntDesign'
import CustomButton from '@/components/CustomButton'

const Meditate = () => {
	const { id } = useLocalSearchParams()

	const [secondsRemaining, setSecondsRemaining] = useState(10)
	const [isMeditating, setIsMeditating] = useState(false)
	const [audio, setAudio] = useState<Audio.Sound>()
	const [isPlayingAudio, setIsPlayingAudio] = useState(false)

	useEffect(() => {
		let timerId: NodeJS.Timeout

		// Exit
		if (secondsRemaining === 0) {
			setIsMeditating(false)
			return
		}

		if (isMeditating) {
			timerId = setTimeout(() => {
				setSecondsRemaining(secondsRemaining - 1)
			}, 1000)
		}

		return () => {
			clearTimeout(timerId)
		}
	}, [secondsRemaining, isMeditating])

	useEffect(() => {
		return () => {
			audio?.unloadAsync()
		}
	}, [audio])

	const toggleMeditationSessionStatus = async () => {
		if (secondsRemaining === 0) setSecondsRemaining(10)
		setIsMeditating(!isMeditating)
		await toggleSound()
	}

	const toggleSound = async () => {
		const sound = audio ? audio : await initializeAudio()
		const status = await sound.getStatusAsync()
		if (status?.isLoaded && !isPlayingAudio) {
			await sound.playAsync()
			setIsPlayingAudio(true)
		} else {
			await sound.pauseAsync()
			setIsPlayingAudio(false)
		}
	}

	const initializeAudio = async () => {
		const audioFileName = MEDITATION_DATA[Number(id) - 1].audio
		const { sound } = await Audio.Sound.createAsync(
			AUDIO_FILES[audioFileName]
		)
		setAudio(sound)
		return sound
	}

	// format the time left to make sure that 2 digits are always displayed
	const formattedTimeMinutes = String(
		Math.floor(secondsRemaining / 60)
	).padStart(2, '0')
	const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, '0')

	return (
		<View className="flex-1">
			<ImageBackground
				//@ts-ignore
				source={meditationImages[Number(id) - 1]}
				resizeMode="cover"
				className="flex-1"
			>
				<AppGradient colors={['transparent', 'rgba(0,0,0,0.8)']}>
					<Pressable
						onPress={() => router.back()}
						className="absolute top-16 left-6"
					>
						<AntDesign
							name="leftcircleo"
							size={40}
							color="white"
						/>
					</Pressable>
					<View className="flex-1 justify-center">
						<View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
							<Text className="text-center text-4xl text-black font-rmono ">
								{formattedTimeMinutes}:{formattedTimeSeconds}
							</Text>
						</View>
					</View>
					<View className="mb-5">
						<CustomButton
							title="Start Meditation"
							onPress={toggleMeditationSessionStatus}
						/>
					</View>
				</AppGradient>
			</ImageBackground>
		</View>
	)
}

export default Meditate
