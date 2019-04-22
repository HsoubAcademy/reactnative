import React from 'react';
import HeaderButton from '../components/HeaderButton';

const withHeader = (WrappedComponent, title) => {
    return class extends React.Component {
        static navigationOptions = ({navigation}) => {
            return {
                 title: title,
                 headerStyle: {
                     backgroundColor: '#007bff'
                 },
                 headerTintColor: '#fff',
                 headerTitleStyle: {
                     marginHorizontal: 10,
                     textAlign: 'right',
                     flexGrow:1
                 },
                 headerRight: <HeaderButton direction="right" iconName="md-menu" headerPressed={navigation.openDrawer}/>,
                 headerLeft: <HeaderButton direction="left" iconName="md-arrow-back" headerPressed={() => navigation.goBack(null)} />
            }
        }

        componentDidMount() {
            this.props.navigation.setParams({
                openDrawer: this.props.navigation.openDrawer,
                goBack: this.props.navigation.goBack,
            })
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export default withHeader;