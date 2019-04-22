import React from "react";
import { AppLoading, Font, Permissions } from 'expo';
import AppNavigation from './config/routes';

export default class App extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     isReady: false,
   }
 }

 async componentWillMount() {
   await Permissions.askAsync(Permissions.LOCATION);
 }

 async _getFonts() {
   await Font.loadAsync({
     'noto-font': require('./assets/fonts/NotoKufiArabic-Regular.ttf')
   })
 }

  render() {
    if(!this.state.isReady) {
      return (
        <AppLoading startAsync={this._getFonts} onFinish={() => this.setState({isReady: true})}/>
      )
    }
    return <AppNavigation />
  }
}

