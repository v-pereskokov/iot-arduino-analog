import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Card, Icon, Carousel } from 'antd';
import styled from 'styled-components';
import { range } from 'lodash';

import b from '../../middleware/b';

import './Main.scss';

// tslint:disable:variable-name
const Strong = styled.strong`
  font-size: 14pt;
`;

interface IProps {
  text?: string;
  username?: string;
  setUserName?: (value: string) => void;
}

class Main extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div>Soft</div>
    );
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
