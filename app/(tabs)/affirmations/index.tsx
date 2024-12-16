import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import AppGradient from '@/components/AppGradient'
import AFFIRMATION_GALLERY from '@/constants/affirmation-gallery'
import GuidedAffirmationsGallery from '@/components/GuidedAffirmationsGallery'

const Affirmations = () => {
	return (
		<View className="flex-1">
			<AppGradient colors={['#2e1f58', '#54426b', '#a790af']}>
				<ScrollView
					automaticallyAdjustContentInsets
					className=""
					showsVerticalScrollIndicator={false}
				>
					<Text className="text-zinc-50 text-3xl font-bold text-center">
						Change your beliefs with affirmations
					</Text>
					<View>
						{AFFIRMATION_GALLERY.map((element) => (
							<GuidedAffirmationsGallery
								key={element.title}
								title={element.title}
								previews={element.data}
							/>
						))}
					</View>
				</ScrollView>
			</AppGradient>
		</View>
	)
}

export default Affirmations
