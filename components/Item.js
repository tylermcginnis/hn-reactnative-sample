import React, { Component } from 'react';
import { Text, View, Image, Linking, TouchableOpacity } from 'react-native';
import HighlightedText from './HighlightedText';
import styles from './styles.js';

export default class Item extends Component {
  render() {
    const { hit } = this.props;
    return (
      <TouchableOpacity onPress={() => this.openLink('http://www.google.com')}>
        <View style={styles.hit}>
          <Image source={{uri: hit.avatar}} style={styles.illustration}/>
          <View style={styles.hitContent}>
            <HighlightedText
              tag="**"
              style={styles.title}
              styles={{highlighted: styles.highlighted}}
              numberOfLines={2}>
              {hit._highlightResult.name.value}
            </HighlightedText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  keepDomainName(url) {
    if(!url) return url;
    return url.split('/')[2];
  }
  openLink(url) {
    Linking.openURL(url);
  }
}
