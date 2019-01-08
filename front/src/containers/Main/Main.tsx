import * as React from 'react';
import { Button, Card, Col, Form, Icon, Menu, Row, Input, notification } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import styled from 'styled-components';
import transport from '../../service/Transport/Transport';
import { get } from 'lodash';

import './Main.scss';

// tslint:disable:variable-name
const Strong = styled.strong`
  font-size: 14pt;
`;

interface IProps extends FormComponentProps {
}

interface IState {
    lcdState: boolean;
    motorState: boolean;
    tempState: boolean;
    motorValue: boolean;
}

class Main extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            lcdState: true,
            motorState: true,
            tempState: true,
            motorValue: false,
        };
    }

    public render(): JSX.Element {
        const {form} = this.props;
        const { getFieldDecorator } = form;
        const {lcdState, motorState, tempState, motorValue} = this.state;

        return (
            <React.Fragment>
                <Menu
                    selectedKeys={['start']}
                    mode={'horizontal'}
                >
                    <Menu.Item key={'start'}>
                        <Icon type={'table'}/> <span>Устройства</span>
                    </Menu.Item>
                </Menu>
                <div style={{width: '100%', height: '100%', padding: 30}}>
                    <Button type={'primary'} icon={'reload'} onClick={this.updateAll}>Обновить</Button>

                    <br/>
                    <br/>

                    <Row gutter={8}>
                        <Col span={4}>Обозначение</Col>
                        <Col span={4}>Название</Col>
                        <Col span={4}>Статус</Col>
                        <Col span={4}>IP</Col>
                        <Col span={4}>COM-порт</Col>
                    </Row>

                    <hr/>

                    <Row gutter={32}>
                        <Col span={4}><Icon type={'tablet'}/></Col>
                        <Col span={4}>LCD-экран</Col>
                        <Col span={4}><Icon type={lcdState ? 'check' : 'close'}/></Col>
                        <Col span={4}>192.168.1.153</Col>
                        <Col span={4}>COM4</Col>
                        <Col span={4}>
                            <Icon
                                type={ 'reload' }
                                onClick={this.update('is_ok_lcd')}
                                style={{cursor: 'pointer'}}
                            />
                        </Col>
                    </Row>

                    <Row gutter={32}>
                        <Col span={4}><Icon type={'lock'}/></Col>
                        <Col span={4}>Шлагбаум</Col>
                        <Col span={4}><Icon type={motorState ? 'check' : 'close'}/></Col>
                        <Col span={4}>192.168.1.153</Col>
                        <Col span={4}>COM6</Col>
                        <Col span={4}>
                            <Icon
                                type={ 'reload' }
                                onClick={this.update('is_ok_motor')}
                                style={{cursor: 'pointer'}}
                            />
                        </Col>
                    </Row>

                    <Row gutter={32}>
                        <Col span={4}><Icon type={'dashboard'}/></Col>
                        <Col span={4}>Датчик температуры</Col>
                        <Col span={4}><Icon type={tempState ? 'check' : 'close'}/></Col>
                        <Col span={4}>192.168.1.153</Col>
                        <Col span={4}>COM8</Col>
                        <Col span={4}>
                            <Icon
                                type={ 'reload' }
                                onClick={this.update('is_ok_temp')}
                                style={{cursor: 'pointer'}}
                            />
                        </Col>
                    </Row>

                    <br/>
                    <br/>

                    {/* Cards with actions */}
                    <Row gutter={8}>
                        <Col span={8}>
                            <Card title={'LCD'} style={{width: '100%'}}>
                                <Form.Item>
                                    {getFieldDecorator('lcd_text', {
                                        rules: [{ required: true, message: 'Введите текст' }],
                                    })(<Input type='text' placeholder="Введите текст" />)}
                                </Form.Item>

                                <Button onClick={this.setText}>Задать текст</Button>
                                <Button onClick={this.clearText}>Скрыть текст</Button>
                                <Button onClick={this.getText}>Текущий текст</Button>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card title={'Шлагбаум'} style={{width: '100%'}}>
                                <p>Шлагбаум { motorValue ? 'открыт' : 'закрыт' }</p>

                                <Button onClick={this.turnMotor}>{ motorValue ? 'Закрыть' : 'Открыть' }</Button>
                                <Button onClick={this.getMotorStatus}>Статус шлагбаума</Button>
                            </Card>
                        </Col>

                        <Col span={8}>
                            <Card title={'Температура'} style={{width: '100%'}}>
                                <Button onClick={this.getTemp}>Текущая температура</Button>
                                <Button icon={ 'up' } onClick={this.changeTemp(true)}>температуру</Button>
                                <Button icon={ 'down' } onClick={this.changeTemp(false)}>температуру</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        );
    }

    private update = (route: 'is_ok_lcd' | 'is_ok_motor' | 'is_ok_temp') => () => {
        transport.get(`/${route}`).then((response: Response) => {
            switch (route) {
                case 'is_ok_lcd':
                    this.setState({lcdState: response.ok});
                    break;
                case 'is_ok_motor':
                    this.setState({motorState: response.ok});
                    break;
                case 'is_ok_temp':
                default:
                    this.setState({tempState: response.ok});
                    break;
            }
        });
    };

    private updateAll = () => {
        this.update('is_ok_lcd')();
        this.update('is_ok_motor')();
        this.update('is_ok_temp')();
    };

    private setText = () => {
        const {form} = this.props;
        const text: string = get(form.getFieldsValue(), 'lcd_text', '');

        transport
            .get(`/set_lcd_text?text=${text}`)
            .then(() => notification.success({message: 'Текст задан', description: `Текст: ${text}`}))
    };

    private clearText = () => transport.get('/clear_lcd').then(() => notification.success({message: 'Текст скрыт', description: ''}));

    private getText = () => transport
        .get('/get_lcd_text')
        .then((response: Response) => response.text())
        .then((text: string) => notification.success({message: 'Текст', description: text}));

    private turnMotor = () => transport.get('/turn_motor')
        .then((response: Response) => response.text())
        .then((text: string) => this.setState({motorValue: text.toLowerCase().includes('open')}));

    private getMotorStatus = () => transport.get('/status_motor')
        .then((response: Response) => response.text())
        .then((text: string) => {
            const motorValue: boolean = text.toLowerCase().includes('open');
            this.setState({motorValue});
            notification.success({message: 'Шлагбаум', description: text});
        });

    private getTemp = () => transport
        .get('/get_temperature')
        .then((response: Response) => response.text())
        .then((text: string) => notification.success({message: 'Температура', description: text}));

    private changeTemp = (isUp: boolean) => () => transport
        .get(`/change_temperature?type=${isUp ? 'up' : 'low'}`)
        .then(() => notification.success({message: 'Температура', description: isUp ? 'Увеличена' : 'Уменьшена'}));
}

export default Form.create()(Main);
