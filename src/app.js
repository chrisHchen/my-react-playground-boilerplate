import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {blue500, red500, greenA200} from 'material-ui/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin( );

class App extends Component{
  state = {
    asyncComp: null,
    asyncComp2: null,
    asyncComp3: null,
    asyncComp4: null,
    asyncComp5: null
  }

  handleClick = (event) => {
    import('material-ui/Slider').then((Slider) => {
      Slider = Slider.default
      this.setState({
        asyncComp: <Slider/>
      })
    }).catch((err) => {
      console.log('Failed to load Slider')
    })
  }

  handleClick2 = () => {
    //magic component
    import(/* webpackChunkName: "magic-chunk" */ 'material-ui/RadioButton').then((RadioButton) => {
      RadioButton = RadioButton.default
      this.setState({
        asyncComp2: <RadioButton label="Simple1"/>
      })
    }).catch((err) => {
      console.log('Failed to load RadioButton')
    })
  }

  handleClick3 = () => {
    //make this a arraw function so this.setState is available
    const load = async () => {
      const Toggle = (await import(/* webpackChunkName: "magic-chunk-await" */ 'material-ui/Toggle')).default
      this.setState({
        asyncComp3: <Toggle label="Simple2"/>
      })
      return 'ok'
    }
    load().then(str => console.log(str)).catch(err => console.log(err))
  }

  handleClick4 = () => {
    require.ensure(['material-ui/Toggle'], (require) => {
        const Slider = require('material-ui/Slider').default
        const Toggle = require('material-ui/Toggle').default
        this.setState({
          asyncComp4: <Toggle label="Simple4"/>,
          asyncComp5: <Slider/>
        })
    },'ensure-chunk');
  }

  render() {
    const {asyncComp, asyncComp2, asyncComp3, asyncComp4, asyncComp5} = this.state
    return (
      <MuiThemeProvider muiTheme={getMuiTheme( )}>
        <div>
          <RaisedButton label="async load" onClick={this.handleClick} style={{marginRight:'10px'}}/>
          <RaisedButton label="magic component" onClick={this.handleClick2} style={{marginRight:'10px'}}/>
          <RaisedButton label="async/await" onClick={this.handleClick3} style={{marginRight:'10px'}}/>
          <RaisedButton label="require.ensure" onClick={this.handleClick4} style={{marginRight:'10px'}}/>
          <FlatButton
            label='flat'
            rippleColor='#00ff00'
            centerRipple={true}/>
          {asyncComp}
          {asyncComp2}
          {asyncComp3}
          {asyncComp4}
          {asyncComp5}
        </div>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(
  <App/>, document.getElementById( 'app' ))

export default App
