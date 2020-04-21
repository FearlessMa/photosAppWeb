
import * as React from 'react';
import { Component } from 'react';

export interface PhotosDetailProps {
  [name: string]: any;
}

export interface PhotosDetailState {
  [name: string]: any;
}

class PhotosDetail extends React.Component<PhotosDetailProps, PhotosDetailState> {
  constructor(props: PhotosDetailProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (<React.Fragment>
      detail
    </React.Fragment>);
  }
}

export default PhotosDetail;