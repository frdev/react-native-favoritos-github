import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

import PropTypes from 'prop-types';

export default class Repo extends Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('repo').name,
  });

  render() {
    const {navigation} = this.props;

    return <WebView source={{uri: navigation.getParam('repo').html_url}} />;
  }
}
