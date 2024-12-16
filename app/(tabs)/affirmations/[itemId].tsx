import {
	View,
	Text,
	ImageBackground,
	Pressable,
	ScrollView,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, router } from 'expo-router'
import { GalleryPreviewData } from '@/constants/models/AffirmationCategory'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import AppGradient from '@/components/AppGradient'
import AntDesign from '@expo/vector-icons/AntDesign'

const AffirmationPractice = () => {
	const { itemId } = useLocalSearchParams()

	const [affirmation, setAffirmation] = useState<GalleryPreviewData>()
	const [affirmationArray, setAffirmationArray] = useState<string[]>([])

	useEffect(() => {
		const affirmationsData = AFFIRMATION_GALLERY.flatMap(
			(element) => element.data
		)
		const affirmationSelected = affirmationsData.find(
			(aff) => aff.id === Number(itemId)
		)
		if (affirmationSelected) {
			setAffirmation(affirmationSelected)
			const affirmationArray = affirmationSelected.text.split('.')
			if (affirmationArray[affirmationArray.length - 1] == '') {
				affirmationArray.pop()
			}
			setAffirmationArray(affirmationArray)
		}
	}, [])

	return (
		<View className="flex-1">
			<ImageBackground
				source={affirmation?.image}
				resizeMode="cover"
				className="flex-1"
			>
				<AppGradient colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.6)']}>
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
					<ScrollView
						className="mt-20"
						showsVerticalScrollIndicator={false}
					>
						<View className="h-full justify-center">
							{affirmationArray.map((aff, index) => (
								<Text
									className="mt-10 text-2xl font-bold text-center text-white"
									key={index}
								>
									{aff}
								</Text>
							))}
						</View>
					</ScrollView>
				</AppGradient>
			</ImageBackground>
		</View>
	)
}

export default AffirmationPractice
