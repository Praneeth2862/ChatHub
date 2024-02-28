import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,Text
  } from '@chakra-ui/react'

export default function ProfileModal({text,user}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
      <>
        <Box w={"100%"} onClick={onOpen} bg={"transparent"} p={3}>
          
            {
                text?<Text fontSize={"1em"} fontWeight={"bold"} textAlign={"center"}>
                  <i className='fa-solid fa-user'/>
                  Profile</Text>:<i class="fa-solid fa-eye"></i>
            }
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Profile</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                {user.email}
            </ModalBody>

            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                
            </ModalFooter>
            </ModalContent>
        </Modal>
      </>
    )
  }