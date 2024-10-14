import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import GetUserTicket from './GetUserTicket';
import CreateTicket from './CreateTicket';

const UserTicketPart = () => {
    return (
        <div>
            <Tabs>
                <TabList>
                    <Tab><b>Your Tickets</b></Tab>
                    <Tab><b>Create Ticket</b></Tab>
                </TabList>

                <TabPanel>
                    <GetUserTicket/>
                </TabPanel>
                <TabPanel>
                    <CreateTicket/>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default UserTicketPart;