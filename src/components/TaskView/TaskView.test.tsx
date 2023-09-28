import React from 'react';
import {ITaskViewProps, TaskView} from './TaskView';
import {create, act} from 'react-test-renderer';

const props: ITaskViewProps = {
  task: {
    id: '34c38a41-dd29-468d-bf58-f9ee16214b58',
    title: 'pede justo eu massa donec dapibus duis',
    description:
      'vel enim sit amet nunc viverra dapibus nulla suscipit ligula in lacus curabitur at ipsum ac tellus semper interdum mauris ullamcorper purus sit amet nulla quisque arcu libero rutrum',
    completed: false,
  },
  onPressCard: jest.fn(),
  onPressOptions: jest.fn(),
  testID: 'TaskView',
};

const component = create(<TaskView {...props} />);
const el_title = `${props.testID}_title`;
const el_description = `${props.testID}_description`;
const el_btn_card = `${props.testID}_btn_card`;
const el_btn_options = `${props.testID}_btn_options`;
const el_check_icon = `${props.testID}_check_icon`;

describe('TaskView Component', () => {
  test(`should render btn #${el_btn_options}`, async () => {
    const button = component.root.findByProps({testID: el_btn_options}).props;
    act(() => button.onPress());
  });
  test(`should render label #${el_title}`, async () => {
    const label = component.root.findByProps({testID: el_title}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_description}`, async () => {
    const label = component.root.findByProps({testID: el_description}).props;
    expect(label).toBeTruthy();
  });
  test(`should render btn #${el_btn_card}`, async () => {
    const button = component.root.findByProps({testID: el_btn_card}).props;
    act(() => button.onPress());
  });
  test(`should render icon #${el_check_icon} when completed is true`, async () => {
    props.task.completed = true;
    const updateComponent = create(<TaskView {...props} />);
    const icon = updateComponent.root.findByProps({
      testID: el_check_icon,
    }).props;
    expect(icon).toBeTruthy();
  });
  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
