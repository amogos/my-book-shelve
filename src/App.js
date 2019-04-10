import React from 'react';
import { View } from 'react-native';
import EventBus from 'react-native-event-bus'
import Banner from './components/banner_component';
import ShowAllBooksScreen from './screens/show_all_books_screen';
import AddNewBookScreen from './screens/add_new_book_screen';
import Strings from './constants/string_constant';
import ConfirmationDialog from './components/dialogs/confirmation_dialog';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { screen: '', counter: 0 };
    this.userData = null;
    this.dbConnector = this.props.dbconnector;
    this.booksArray = [];
  }

  componentDidMount() {
    EventBus.getInstance().addListener("onBookAsigned", this.listener = data => {
      this.onBookAsigned(data);
    });
    EventBus.getInstance().addListener("onBookReturned", this.listener = data => {
      this.onBookReturned(data);
    });
    EventBus.getInstance().addListener("onBookRemoved", this.listener = data => {
      this.onBookRemoved(data);
    });
    EventBus.getInstance().addListener("onSocialConnect", this.listener = data => {
      this.onSocialConnect(data);
    });
    EventBus.getInstance().addListener("onBannerButtonClicked", this.listener = data => {
      this.onBannerButtonClicked(data);
    });
    EventBus.getInstance().addListener("onNewBookAdded", this.listener = data => {
      this.onNewBookAdded(data);
    });
    this.dbConnector.getBooks((books) => this.booksArray = books);
  }

  componentWillUnmount() {
    EventBus.getInstance().removeListener(this.listener);
  }

  showAllBooks() {
    return (
      <View>
        <Banner {...this.props} />
        <ShowAllBooksScreen items={this.booksArray} userdata={this.userData} counter={this.state.counter} />
        <ConfirmationDialog />
      </View>
    );
  }

  addNewBooks() {
    return (
      <View >
        <Banner {...this.props} />
        <AddNewBookScreen userdata={this.userData} />
        <ConfirmationDialog />
      </View>
    );
  }

  showBlankPage() {
    return (
      <View>
        <Banner {...this.props} />
      </View>
    );
  }

  render() {
    if (this.state.screen === ShowAllBooksScreen.screenId)
      return this.showAllBooks();
    else if (this.state.screen === AddNewBookScreen.screenId)
      return this.addNewBooks();
    else
      return this.showBlankPage();
  }

  reload() {
    this.setState({ counter: this.state.counter + 1 });
  }

  onBookAsigned(data) {
    var onCompleteCallback = (bookKey, newHolder) => {
      var match = this.booksArray.find(function (item) {
        return item.id === data.param;
      });
      match.value.holder = newHolder.holder;
      this.reload();
    }
    this.dbConnector.assignBook(data, this.userData, onCompleteCallback);
  }

  onBookReturned(data) {
    var match = this.booksArray.find(function (item) {
      return item.id === data.param;
    });
    var onCompleteCallback = (bookKey, newHolder) => {
      match.value.holder = newHolder.holder;
      this.reload();
    }
    this.dbConnector.assignBook(data, match.value.owner, onCompleteCallback);
  }

  onBookRemoved(data) {
    var onCompleteCallback = (bookKey) => {
      this.booksArray = this.booksArray.filter(function (item) {
        return (item.id !== bookKey);
      });
      this.reload();
      EventBus.getInstance().fireEvent("onOperationCompleted", {
        param: { message: Strings.MYBOOKSHELVE_STRING_BOOK_REMOVED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM }
      })
    }
    this.dbConnector.deleteBook(data, onCompleteCallback);
  }

  onSocialConnect(data) {
    this.userData = data.param;
    this.reload();
  }

  onBannerButtonClicked(data) {
    this.setState({ screen: data.param });
  }

  onNewBookAdded(data) {
    var onCompleteCallback = (newEntry, bookKey) => {
      EventBus.getInstance().fireEvent("onOperationCompleted", {
        param: { message: Strings.MYBOOKSHELVE_STRING_NEW_BOOK_ADDED, button1: Strings.MYBOOKSHELVE_STRING_CONFIRM }
      })
      this.booksArray.push({ id: bookKey, value: newEntry });
    }
    this.dbConnector.addBook(data, this.userData, onCompleteCallback);
  }
}
