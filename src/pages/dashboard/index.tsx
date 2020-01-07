import * as React from 'react';
import { Skeleton } from 'antd';
import './index.less';

export interface DashboardProps {
  [name: string]: any;
}

export interface DashboardState {
  [name: string]: any;
}

class Dashboard extends React.Component<DashboardProps, DashboardState> {
  constructor(props: DashboardProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (<React.Fragment>
      <div className="dashboard-box">
        <Skeleton active paragraph={{ rows: 40 }} />
      </div>
    </React.Fragment>);
  }
}

export default Dashboard;