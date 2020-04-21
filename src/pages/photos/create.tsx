import * as React from 'react';
import { Form, Upload, Icon, Modal, Input, Button } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { TextArea } = Input;

export interface CreatePhotoGroupProps {
  [name: string]: any;
}

export interface CreatePhotoGroupState {
  [name: string]: any;
}

type formValues = {
  upload: [{
    response: { fileMsg: object }
  }],
  fileName: string
}

const mapDispatchToProps = (dispatch) => ({
  create: params => dispatch({ type: 'create', data: params })
})

@(connect(null, mapDispatchToProps) as any)
@(Form.create() as any)
class CreatePhotoGroup extends React.Component<CreatePhotoGroupProps, CreatePhotoGroupState> {
  constructor(props: CreatePhotoGroupProps) {
    super(props);
    this.state = {};
  }
  submit = () => {
    this.props.form.validateFields((err: string, values: formValues) => {
      console.log(' this.props: ', this.props);
      console.log('values: ', values);
      // const ofile = values.upload.file.originFileObj.stream();
      // console.log('ofile: ', ofile);
      if (!err) {
        // const formData = new FormData();
        // formData.append('file', (values as any).upload.file);
        // fetchData.post('uploadPhotos', formData)
        this.props.create({
          ...values,
          uploadMsg: values.upload ? values.upload[0].response.fileMsg : '',
          uploadType: 'dir'
        });
      }
    });
  }
  beforeUpload = (file, fileList) => {
    console.log('fileList: ', fileList);
    console.log('file: ', file);
    return true;
  }
  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (<React.Fragment>
      <div>
        <Form>
          <FormItem label="相册名称">
            {
              getFieldDecorator('uploadName', { rules: [{ required: true }] })(
                <Input />
              )
            }
          </FormItem>
          <FormItem label="简介">
            {
              getFieldDecorator('uploadDescription', {})(
                <TextArea  rows={4} cols={3} />
              )
            }
          </FormItem>
          <FormItem label="封面">
            {
              getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload multiple action="/upload/photos">
                  <Button>
                    <Icon type="upload" /> 上传
              </Button>
                </Upload>
              )
            }
          </FormItem>
          <FormItem >
            <Button type="primary" onClick={this.submit}>submit</Button>
          </FormItem>
        </Form>
      </div>
    </React.Fragment>);
  }
}

export default CreatePhotoGroup;

