
import {Container} from '@mui/material';
import {Tabs} from 'antd'
import Upcoming from './Upcoming'
import History from './History';
const { TabPane } = Tabs;

export default function MyAppointmentPage() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Container >
        <Tabs>
            <TabPane tab='Upcoming' key='1'>
                <Upcoming />
            </TabPane>
            <TabPane tab='History' key='2'>
                <History />
            </TabPane>
        </Tabs>
    </Container>
    
    </div>
    
  )
}
