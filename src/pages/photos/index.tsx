import * as React from 'react';
import { Card, Skeleton, Input, Button, Icon } from 'antd';
import './index.less';
import CreatePhotoGroup from './create';
import { Switch, Route, Redirect } from 'react-router-dom';
import PhotosDetail from './detail'
import { registerSaga } from "store/index";
import photosSagas from "./model";
import { connect } from 'react-redux';
import defaultImg from 'public/static/img/defaultImg.jpg';

registerSaga(photosSagas);

const { Meta } = Card;
const { Search } = Input;


class PhotosIndex extends React.Component {

  render() {
    return (<React.Fragment>
      <Switch>
        <Route exact path="/photos" component={Photos} />
        <Route exact path="/photos/create" component={CreatePhotoGroup} />
        <Route exact path="/photos/detail" component={PhotosDetail} />
      </Switch>
    </React.Fragment>)
  }
}

export interface PhotosProps {
  [name: string]: any;
}

export interface PhotosState {
  [name: string]: any;
}
const mapStateToProps = ({ photoState }) => ({
  photosAlbumList: photoState.photosAlbumList,
  loading: photoState.loading
});
const mapDispatchToProps = dispatch => ({
  getPhotosAlbum: () => dispatch({ type: 'getPhotosAlbum' })
})

@(connect(mapStateToProps, mapDispatchToProps) as any)
class Photos extends React.Component<PhotosProps, PhotosState> {
  constructor(props: PhotosProps) {
    super(props);
    this.state = { loading: true };
  }
  onload = (): void => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 500)
  }

  private gotoCreatePhoto = (): void => {
    this.push('/photos/create');
  }
  private gotoDetail = (): void => {
    !this.state.loading && this.push('/photos/detail');
  }
  push = (path: string): void => {
    this.props.history.push(path);
  }

  componentDidMount() {
    this.props.getPhotosAlbum();
  }
  render() {
    const { loading } = this.state;
    const { photosAlbumList } = this.props;
    return (<React.Fragment>
      <div className="photos-box">
        <div className="photos-header ">
          <div className="search">
            < Search enterButton="搜索" />
          </div>
        </div>
        <div className="photos-btn">
          <Button onClick={this.gotoCreatePhoto} type="primary">新增相册</Button>
        </div>
        <div className={loading ? "photos-container hidden" : 'photos-container'}>
          {
            photosAlbumList.map((item, index) => {
              return (
                <div key={index + '-' + 's'} className={"photos-card"} onClick={this.gotoDetail} >
                  {
                    <Card
                      key={index + '-' + 'p'}
                      hoverable
                      cover={
                        <img
                          onLoad={this.onload}
                          style={loading
                            ? { visibility: 'hidden', height: 0 }
                            : { visibility: 'visible', padding: '10px' }
                          }
                          alt="example"
                          src={item.cover || defaultImg}
                        />
                      }
                      actions={[
                        <Icon type="setting" key="setting" />,
                        <Icon type="edit" key="edit" />,
                        <Icon type="ellipsis" key="ellipsis" />,
                      ]}
                    >
                      <Skeleton loading={loading} avatar active>
                        <Meta title={item.name || ''} description={item.description} />
                      </Skeleton>
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



export default PhotosIndex;