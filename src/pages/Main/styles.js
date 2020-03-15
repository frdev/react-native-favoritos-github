import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  background-color: #fff;
`;

export const Form = styled.View`
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #7159c1;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 12px;
  opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndication: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 10px;
`;

export const Avatar = styled.Image`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  background-color: #eee;
`;

export const BoxInfo = styled.View`
  flex: 1;
  margin: 0 10px;
  align-items: flex-start;
`;

export const Name = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 14px;
  color: #333;
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 16px;
  color: #bbb;
  margin: 10px 0;
  text-align: left;
`;

export const ProfileButton = styled(RectButton)`
  border-radius: 4px;
  padding: 5px;
  justify-content: center;
  align-items: center;
`;

export const ProfileButtonText = styled.Text`
  color: #7159c1;
  font-weight: bold;
`;

export const FormGroup = styled.View`
  flex-direction: row;
`;

export const InputErro = styled.Text`
  display: ${props => (props.message ? 'flex' : 'none')};
  color: red;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 5px;
`;
