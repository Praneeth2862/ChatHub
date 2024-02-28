import React from 'react'
import { Skeleton,Stack } from '@chakra-ui/react'
function SearchLoader() {
  return (
    
      <Stack  mt={20}>
        
        <Skeleton height='40px'/>
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
        <Skeleton height='40px' />
    </Stack>
  )
}

export default SearchLoader;
