import * as React from "react";
import "./logo.less";
interface Iprops {
  [name: string]: any;
}

export default class LogoContainer extends React.Component {
  constructor(readonly props: Iprops) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Logo />
      </React.Fragment>
    );
  }
}

const Logo: IFCspace.IFC = (): React.ReactElement => {
  return (
    <React.Fragment>
      <div className="logo box">logo</div>
    </React.Fragment>
  );
};
