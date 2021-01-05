import React, {Component} from 'react';
import {Keyboard, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  BoxInfo,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  FormGroup,
  InputErro,
} from './styles';

export default class Main extends Component {
  static navigationOptions = {title: 'Usuários Github'};

  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    newUser: '',
    users: [],
    loading: false,
    messageErro: null,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) this.setState({users: JSON.parse(users)});
  }

  componentDidUpdate(_, prevState) {
    const {users} = this.state;

    if (prevState.users !== users)
      AsyncStorage.setItem('users', JSON.stringify(users));
  }

  handleTextChange = text => {
    this.setState({newUser: text, messageErro: false});
  };

  handleAddUser = async () => {
    const {users, newUser} = this.state;

    if (newUser === '') return;

    if (users.findIndex(u => u.login === newUser) > -1) {
      this.setState({
        loading: false,
        messageErro: 'Usuário já foi cadastrado',
      });
      return;
    }

    this.setState({loading: true});

    try {
      const response = await api.get(`/users/${newUser}`);

      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      this.setState({
        users: [...users, data],
        newUser: '',
        loading: false,
      });

      Keyboard.dismiss();
    } catch (err) {
      this.setState({
        loading: false,
        messageErro: 'Erro ao buscar dados do usuário',
      });
    }
  };

  handleNavigate = user => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  render() {
    const {users, newUser, loading, messageErro} = this.state;

    return (
      <Container>
        <Form>
          <FormGroup>
            <Input
              autoCaptalize={false}
              autoCapitalize="none"
              placeholder="Adicionar usuário"
              value={newUser}
              onChangeText={text => this.handleTextChange(text)}
              returnKeyType="send"
              onSubmitEditing={this.handleAddUser}
            />

            <SubmitButton onPress={this.handleAddUser} loading={loading}>
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Icon name="add" size={20} color="#FFF" />
              )}
            </SubmitButton>
          </FormGroup>

          <InputErro message={messageErro}>{messageErro}</InputErro>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <BoxInfo>
                <Name>{item.name}</Name>
                <Bio>{item.bio || 'Sem biografia'}</Bio>
              </BoxInfo>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <Icon name="star" size={25} color="#cc9900" />
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}