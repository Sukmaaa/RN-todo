import { FontAwesome5 } from '@expo/vector-icons';
import { Icon, IconButton, Input, Text } from 'native-base';
import React from 'react';

export default function InputTodo({ cb, setValue, value }) {
  const [error, setError] = React.useState(false);

  const handleClick = () => {
    if (value.length <= 0) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 1000);
    } else {
      cb();
      setError(false);
    }
  };

  return (
    <>
      <Input
        variant="outline"
        _focus={{ borderColor: '#3b82f6' }}
        borderColor='#93c5fd'
        InputRightElement={
          <IconButton
            icon={
              <Icon as={FontAwesome5} name="plus" size={4} color="blue.400" />
            }
            colorScheme="blue"
            ml={1}
            onPress={handleClick}
            mr={1}
          />
        }
        onChangeText={(v) => setValue(v)}
        value={value}
        placeholder="Add Your Todo . . ."
      />
      {error && <Text style={{ color: 'red' }}> Input Your Todo ! </Text>}
    </>
  );
}
