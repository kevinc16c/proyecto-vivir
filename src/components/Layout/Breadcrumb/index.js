import React from 'react';
import { withRouter } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';

class Section extends React.Component {
  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const pathSnippetsFormatted = pathSnippets.map((snippet, i) => {
      return snippet.replace(/-/g, ' ');
    });
    const extraBreadcrumbItems = pathSnippetsFormatted.map((snippet, index) => {
      return (
        <Breadcrumb.Item key={{snippet}}>
          {snippet}
        </Breadcrumb.Item>
      );
    });

    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <HomeOutlined />
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
      <div className="app-breadcrumb">
        <Breadcrumb>
          {breadcrumbItems}
        </Breadcrumb>
      </div>
    )
  }
}

export default withRouter(Section);
