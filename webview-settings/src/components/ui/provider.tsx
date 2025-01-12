"use client"

import { ChakraProvider } from '@chakra-ui/react';
import { defaultSystem } from '@chakra-ui/react';
export function Provider(props: any) {
	return (
		<ChakraProvider value={defaultSystem}>
			{props.children}
		</ChakraProvider>
	)
}
