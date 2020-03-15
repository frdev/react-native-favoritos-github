import React, {Component} from 'react';
import {ActivityIndicator, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  ContainerLoading,
  MessageErro,
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';

export default class User extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('user').name,
  });

  state = {
    stars: [],
    page: 1,
    loading: true,
    loadingFooter: false,
    erro: false,
    moreItems: true,
  };

  componentDidMount() {
    this.refreshList();
  }

  handleNavigate = repo => {
    const {navigation} = this.props;

    navigation.navigate('Repo', {repo});
  };

  refreshList = async () => {
    const {navigation} = this.props;

    const user = navigation.getParam('user');

    try {
      const response = await api.get(`/users/${user.login}/starred?page=1`);

      this.setState({
        stars: response.data,
        page: 1,
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
        erro: true,
      });
    }
  };

  loadMore = async () => {
    const {page, stars, moreItems} = this.state;

    /** Valida se a última requisição teve 30 itens, senão, nem realiza novas chamadas */
    if (!moreItems) return;

    const {navigation} = this.props;

    const user = navigation.getParam('user');

    this.setState({
      loadingFooter: true,
    });

    try {
      const response = await api.get(
        `/users/${user.login}/starred?page=${page + 1}`
      );

      this.setState({
        stars: [...stars, ...response.data],
        page: page + 1,
        loadingFooter: false,
        moreItems: response.data.length >= 30,
      });
    } catch (err) {
      this.setState({
        loadingFooter: false,
      });
    }
  };

  render() {
    const {navigation} = this.props;
    const {stars, loading, erro, loadingFooter} = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio || 'Sem biografia'}</Bio>
        </Header>
        {!erro ? null : (
          <ContainerLoading>
            <Icon name="error-outline" size={64} color="#BBB" />
            <MessageErro>Erro ao obter favoritos do usuário</MessageErro>
          </ContainerLoading>
        )}
        {stars.length === 0 && !loading ? (
          <ContainerLoading>
            <Icon name="not-interested" size={64} color="#BBB" />
            <MessageErro>Não existem repositórios favoritados</MessageErro>
          </ContainerLoading>
        ) : null}
        <Stars
          data={stars}
          keyExtractor={star => String(star.id)}
          onEndReachedThreshold={0.05}
          onEndReached={() => this.loadMore()}
          ListFooterComponent={() =>
            loadingFooter ? <ActivityIndicator size={24} color="#BBB" /> : null
          }
          onRefresh={() => this.refreshList()}
          refreshing={loading}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => this.handleNavigate(item)}
              key={`${item}`}>
              <Starred>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
                <Icon name="star" size={32} color="#cc9900" />
              </Starred>
            </TouchableOpacity>
          )}
        />
      </Container>
    );
  }
}
