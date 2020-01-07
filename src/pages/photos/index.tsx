import * as React from 'react';
import { Card, Skeleton, Input } from 'antd';
import './index.less';

const { Meta } = Card;
const mockList = [1, 2, 3, 4, 5, 6, 5, 7, 4, 3, 2, 1,];
export interface PhotosProps {
  [name: string]: any;
}

export interface PhotosState {
  [name: string]: any;
}

class Photos extends React.Component<PhotosProps, PhotosState> {
  constructor(props: PhotosProps) {
    super(props);
    this.state = { loading: true };
  }
  onload = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000)
  }
  render() {
    const { loading } = this.state;
    return (<React.Fragment>
      <div className="photos-box">
        <div className="photos-header ">
          <div>search
              <Input />
          </div>
        </div>
        <div className={loading ? "photos-container hidden" : 'photos-container'}>
          {
            mockList.map((item, index) => {
              return (
                <div key={index + '-' + 's'} className={"photos-card"}  >
                  <div style={{ backgroundColor: loading ? '#ffffff' : '', padding: loading ? '10px' : 0 }}>
                    <Skeleton
                      loading={loading}
                      active
                      paragraph={{ width: "0", rows: 5 }}
                      avatar
                    // title
                    />
                  </div>
                  {
                    <Card
                      style={loading ? { visibility: 'hidden', height: 0 } : { visibility: 'visible', height: '100%' }}
                      key={index + '-' + 'p'}
                      hoverable
                      cover={<img onLoad={this.onload} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                      <Meta title="Europe Street beat" description="www.instagram.com" />
                    </Card>
                  }
                </div>
              )
              // }
            })
          }
        </div>
      </div>
    </React.Fragment>);
  }
}

export default Photos;