import React, { PureComponent } from 'react';
import Header from './Header';
import SearchInput from './SearchInput';
import EmojiResults from './EmojiResults';
import filterEmoji from '../lib/filter-emoji';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      filteredEmoji: filterEmoji('', 20),
    }
  }

  handleSearchChange(event) {
    this.setState({
      filteredEmoji: filterEmoji(event.target.value, 20),
    });
  }

  render() {
    return (
      <div>
        <Header/>
        <SearchInput
          textChange={this.handleSearchChange.bind(this)}
        />
        <EmojiResults
          emojiData={this.state.filteredEmoji}
        />
      </div>
    );
  }
}

export default App;
