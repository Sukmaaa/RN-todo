import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Checkbox, HStack, Icon, IconButton, Input, Text } from 'native-base';
import React from 'react';
import { FlatList } from 'react-native';

export default function TodoContent({ cb, isLoading, fetchTodos, todos }) {
  const [isEdit, setIsEdit] = React.useState({ id: '', status: false });
  const [valueEdit, setValueEdit] = React.useState('');

  const onPressEdit = (item) => {
    if (item.id !== isEdit.id) {
      setIsEdit({ id: item.id, status: true });
      setValueEdit(item.title);
    } else {
      setIsEdit((currState) => ({
        ...currState,
        id: item.id,
        status: true,
      }));
      setValueEdit(item.title);
    }
  };

  const onPressSave = () => {
    cb({ action: 'update', id: isEdit.id, payload: { title: valueEdit } });
  };

  React.useEffect(() => {
    return () => {
      setValueEdit('');
      setIsEdit({ id: '', status: false });
    };
  }, []);

  const _renderItem = ({ item }) => {
    return (
      <HStack justifyContent="space-between" alignItems="center" px={3} pb={5}>
        {isEdit.status && isEdit.id === item.id ? (
          <Input
            variant="underlined"
            value={valueEdit}
            onChangeText={(v) => setValueEdit(v)}
          />
        ) : (
          <Checkbox
            accessibilityLabel="checkbox"
            colorScheme="blue"
            onChange={() =>
              cb({ action: item.isDone ? 'notDone' : 'done', id: item.id })
            }
            isChecked={item.isDone}
          >
            <Text
              style={{ paddingLeft: 12, fontSize: 18 }}
              strikeThrough={item.isDone}
            >
              {item.title}
            </Text>
          </Checkbox>
        )}
        <HStack>
          <IconButton
            colorScheme="blue"
            icon={
              <Ionicons
                as={FontAwesome5}
                name={
                  isEdit.status && isEdit.id === item.id
                    ? 'checkmark-done-circle-sharp'
                    : 'md-pencil'
                }
                size={24}
                color="#60a5fa"
              />
            }
            onPress={() => {
              if (isEdit.status && isEdit.id === item.id) onPressSave();
              else onPressEdit(item);
            }}
          />
          <IconButton
            colorScheme="danger"
            icon={
              <Icon as={FontAwesome5} name="trash" size={5} color="#ff2626" />
            }
            onPress={() => cb({ action: 'delete', id: item.id })}
          />
        </HStack>
      </HStack>
    );
  };
  return (
    <FlatList
      data={todos}
      renderItem={_renderItem}
      keyExtractor={(item) => item.id.toString()}
      refreshing={isLoading}
      onRefresh={fetchTodos}
    />
  );
}
