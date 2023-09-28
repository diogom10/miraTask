import React from 'react';
import {act, create} from 'react-test-renderer';
import {ITaskEmptyProps, TaskEmpty} from './TaskEmpty';

const props: ITaskEmptyProps = {
  title: 'You don`t have any task',
  actionTitle: 'Try add a new task',
  action: jest.fn(),
  testID: 'TaskEmpty',
};

const component = create(<TaskEmpty {...props} />);
const el_title = `${props.testID}_title`;
const el_btn_action = `${props.testID}_btn_action`;
const el_action_title = `${props.testID}_action_title`;

describe('TaskView Component', () => {
  test(`should render label #${el_title}`, async () => {
    const label = component.root.findByProps({testID: el_title}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_action_title}`, async () => {
    const label = component.root.findByProps({testID: el_action_title}).props;
    expect(label).toBeTruthy();
  });
  test(`should render btn #${el_btn_action}`, async () => {
    const button = component.root.findByProps({testID: el_btn_action}).props;
    act(() => button.onPress());
  });
  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
