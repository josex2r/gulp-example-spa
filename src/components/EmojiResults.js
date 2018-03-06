import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard/dist/clipboard.min';

import EmojiResultRow from './EmojiResultRow';

class EmojiResults extends PureComponent {
  componentDidMount() {
    this.clipboard = new Clipboard('.copy-to-clipboard');
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  render() {
    return (
      <div className="component-emoji-results">
        {this.props.emojiData.map((emojiData) =>
              <EmojiResultRow
                key={emojiData.title}
                symbol={emojiData.symbol}
                title={emojiData.title}/>
          )}
      </div>
    );
  }
}

EmojiResults.propTypes = {
  emojiData: PropTypes.array,
};

export default EmojiResults;
