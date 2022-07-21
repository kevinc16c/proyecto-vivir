import React from 'react';
import { ArrowRightOutlined, MessageOutlined, NotificationOutlined, ProfileOutlined } from '@ant-design/icons';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { List, Avatar, Tabs, Tag } from 'antd';
import DEMO from 'constants/demoData';

const list = DEMO.list;
const TabPane = Tabs.TabPane;

const NotificationTab = () => (
  <List
    footer={<a href={DEMO.link} className="no-link-style">Read All <ArrowRightOutlined /></a>}
    itemLayout="horizontal"
    dataSource={list.notifications}
    renderItem={item => (
      <List.Item>
        <div className="list-style-v1">
          <div className="list-item">
            <div className={`icon-btn icon-btn-round mr-3 ${item.iconColor}`}><LegacyIcon type={item.icon} /></div>
            <div className="list-item__body">
              <div className="list-item__title">{item.title}</div>
              <div className="list-item__datetime">{item.datetime}</div>
            </div>
          </div>
        </div>
      </List.Item>
    )}
  />
);

const MessageTab = () => (
  <List
    footer={<a href={DEMO.link} className="no-link-style">Read All <ArrowRightOutlined /></a>}
    itemLayout="horizontal"
    dataSource={list.messages}
    renderItem={item => (
      <List.Item>
        <div className="list-style-v1">
          <div className="list-item">
            <Avatar src={item.avatar} className="mr-3"/>
            <div className="list-item__body">
              <div className="list-item__title">{item.title}</div>
              <div className="list-item__desc">{item.desc}</div>
              <div className="list-item__datetime">{item.datetime}</div>
            </div>
          </div>
        </div>
      </List.Item>
    )}
  />
);

const TaskTab = () => (
  <List
    footer={<a href={DEMO.link} className="no-link-style">Read All <ArrowRightOutlined /></a>}
    itemLayout="horizontal"
    dataSource={list.tasks}
    renderItem={item => (
      <List.Item>
        <div className="list-style-v1">
          <div className="list-item">
            <div className="list-item__body">
              <div className="list-item__title">{item.title} <Tag color={item.tagColor}>{item.tag}</Tag></div>
              <div className="list-item__datetime">{item.desc}</div>
            </div>
          </div>
        </div>
      </List.Item>
    )}
  />
);

const PopoverTabs = () => (
  <Tabs animated={false}>
    <TabPane tab={<span><NotificationOutlined />Notifications (4)</span>} key="1">
      <NotificationTab />
    </TabPane>
    <TabPane tab={<span><MessageOutlined />Messages (3)</span>} key="2">
      <MessageTab />
    </TabPane>
    <TabPane tab={<span><ProfileOutlined />Tasks (4)</span>} key="3">
      <TaskTab />
    </TabPane>
  </Tabs>
);

const Notifications = () => (
  <div className="app-header-notifications">
    <PopoverTabs />
  </div>
)

export default Notifications;
