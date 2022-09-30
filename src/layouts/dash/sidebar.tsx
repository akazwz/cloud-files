import {
	Box,
	Divider,
	Flex,
	HStack,
	Spacer,
	Text,
	useColorModeValue,
	BoxProps,
} from '@chakra-ui/react'
import IconPark, { IconType } from '@icon-park/react/lib/all'
import { useLocation, useNavigate } from 'react-router-dom'

import { ColorModeToggle } from '../../components/color-mode-toggle'
import { Logo } from '../../components/logo'
import User from '../../components/user'

interface SidebarProps extends BoxProps{
	onClose: () => void;
	mini: boolean
	setMini: (mini: boolean) => void
}

interface LinkProps{
	name: string;
	route: string;
	icon: IconType;
}

interface NavLinksProps{
	mini: boolean
}

interface SidebarFooterProps{
	mini: boolean
	setMini: (mini: boolean) => void
}

export const NavLinks = ({ mini }: NavLinksProps) => {
	const bg = useColorModeValue('gray.300', 'gray.600')
	const hoverBg = useColorModeValue('gray.200', 'gray.700')

	const LinkList: LinkProps[] = [
		{ name: 'Drive', route: '/drive/folders/root', icon: 'CloudStorage' },
		{ name: 'Movies', route: '/drive/movies', icon: 'Movie' },
		{ name: 'Album', route: '/drive/album', icon: 'ImageFiles' },
		{ name: 'Analysis', route: '/drive/analysis', icon: 'Analysis' },
	]

	const location = useLocation()
	const navigate = useNavigate()

	return (
		<Box mt={3} p={1}>
			{LinkList.map((link) => (
				<Flex
					key={link.route}
					w={mini ? '60px' : '216px'}
					alignItems="center"
					h="44px"
					p="12px"
					mx={'auto'}
					mb="5px"
					borderRadius="lg"
					role="group"
					cursor="pointer"
					bg={link.route === location.pathname ? bg : 'transparent'}
					_hover={{
						bg: hoverBg,
					}}
					onClick={() => navigate(link.route)}
				>
					<Box mx={'auto'}>
						{
							mini
								? <IconPark type={link.icon} size="23px" />
								: (
									<HStack width="200px">
										<IconPark type={link.icon} size="23px" />
										<Text fontWeight="medium">{link.name}</Text>
									</HStack>
								)
						}
					</Box>
				</Flex>
			))}
		</Box>
	)
}

export const SidebarFooter = ({ mini, setMini }: SidebarFooterProps) => {
	const MiniControl = () => {
		return (
			<IconPark type={'Left'} size={'24px'} onClick={() => setMini(true)} />
		)
	}

	const MaxControl = () => {
		return (
			<Box mx={'auto'}>
				<IconPark type={'Right'} size={'24px'} onClick={() => setMini(false)} />
			</Box>
		)
	}

	return (
		<HStack p="24px" spacing="16px" h="75px" whiteSpace="nowrap" fontSize="sm">
			{
				mini
					? <MaxControl />
					: (
						<>
							<ColorModeToggle />
							<Spacer />
							<MiniControl />
						</>
					)
			}
		</HStack>
	)
}

export const DashSidebar = ({ onClose, mini, setMini, ...rest }: SidebarProps) => {
	return (
		<Box
			w={{ base: 'full', md: mini ? 20 : 60 }}
			pos="fixed"
			h={'full'}
			borderRightWidth={1}
			{...rest}
		>
			<Flex direction="column" h="full">
				<HStack justifyContent="center" height={'6vh'} borderBottomWidth={1}>
					<Logo size={'37px'} />
				</HStack>
				<NavLinks mini={mini} />
				<Spacer />
				<Divider />
				<User  mini={mini}/>
				<Divider />
				<SidebarFooter mini={mini} setMini={setMini} />
			</Flex>
		</Box>
	)
}
