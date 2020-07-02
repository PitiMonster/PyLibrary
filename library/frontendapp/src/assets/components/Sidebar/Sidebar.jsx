import React, { Component } from 'react'
// import Button from '@bit/semantic-org.semantic-ui-react.button'
// import Header from '@bit/semantic-org.semantic-ui-react.header'
// import Icon from '@bit/semantic-org.semantic-ui-react.icon'
// import Image from '@bit/semantic-org.semantic-ui-react.image'
// import Menu from '@bit/semantic-org.semantic-ui-react.menu'
// import Segment from '@bit/semantic-org.semantic-ui-react.segment'
// import Sidebar from '@bit/semantic-org.semantic-ui-react.sidebar'
import { Header, Icon, Image, Menu, Segment, Sidebar, Button } from 'semantic-ui-react'

const style = <link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css'/>

class SidebarExampleDimmed extends Component {
  state = { visible: true }

  handleHideClick = () => this.setState({ visible: false })
  handleShowClick = () => this.setState({ visible: true })
  handleSidebarHide = () => this.setState({ visible: false })

  render() {
    const { visible } = this.state

    return (
      <div>
        <Button.Group>
          <Button disabled={visible} onClick={this.handleShowClick}>
            Show sidebar
          </Button>
          <Button disabled={!visible} onClick={this.handleHideClick}>
            Hide sidebar
          </Button>
        </Button.Group>

        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={this.handleSidebarHide}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
              <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}

export default () => (<div>{style}<SidebarExampleDimmed/></div>)