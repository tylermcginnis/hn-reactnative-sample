import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Linking,
} from 'react-native';

import Results from './Results';
import Header from './Header';
import styles from './styles.js';

const algoliasearch = require('algoliasearch/reactnative')('DW545SZAC7', 'd160c658403dfbbff9a42687216e4c61');
import AlgoliaSearchHelper from 'algoliasearch-helper';

export default class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = { lastSearchResults: null };
  }

  componentWillMount(){
    const helper = this.helper = AlgoliaSearchHelper(algoliasearch, 'users');

    helper.on('result', (res) => {
      this.setState({lastSearchResults: res});
    });

    // helper.addTag('story')
          // .setQueryParameter('highlightPreTag', '**')
          // .setQueryParameter('highlightPostTag', '**')
    //       .addNumericRefinement('created_at_i', '>', yesterday)
    //       .search();

    helper
      .setQueryParameter('highlightPreTag', '**')
      .setQueryParameter('highlightPostTag', '**')
      .search();
  }

  render() {
    const content = this.state.lastSearchResults &&
      <Results hits={this.state.lastSearchResults.hits} openLink={this.openLink}/>;

    return (
      <View style={styles.container}>
        <Header helper={this.helper} />
        {content}
      </View>
    );
  }

  openLink(url) {
    Linking.openURL(url);
  }
}

