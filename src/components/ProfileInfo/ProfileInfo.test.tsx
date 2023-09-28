import React from 'react';
import {create} from 'react-test-renderer';
import {IProfileInfoProps, ProfileInfo} from './Profileinfo';

const props: IProfileInfoProps = {
  completedTasks: 3,
  currentTasks: 10,
  profile: {
    email: 'diogomoura10@gmail.com',
    name: 'Diogo Moura',
    phone: '(+55) 11 983593722',
    phoroUrl: 'https://randomuser.me/api/portraits/men/42.jpg',
    profession: 'React Native Developer',
  },
  testID: 'ProfileInfo',
};

const component = create(<ProfileInfo {...props} />);
const el_profile_image = `${props.testID}_profile_image`;
const el_profession = `${props.testID}_profession`;
const el_name = `${props.testID}_name`;
const el_email = `${props.testID}_email`;
const el_current_tasks = `${props.testID}_current_tasks`;
const el_completed_tasks = `${props.testID}_completed_tasks`;

describe('TaskView Component', () => {
  test(`should render image #${el_profile_image}`, async () => {
    const image = component.root.findByProps({testID: el_profile_image}).props;
    expect(image).toBeTruthy();
  });
  test(`should render label #${el_profession}`, async () => {
    const label = component.root.findByProps({testID: el_profession}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_name}`, async () => {
    const label = component.root.findByProps({testID: el_name}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_email}`, async () => {
    const label = component.root.findByProps({testID: el_email}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_current_tasks}`, async () => {
    const label = component.root.findByProps({testID: el_current_tasks}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_completed_tasks}`, async () => {
    const label = component.root.findByProps({
      testID: el_completed_tasks,
    }).props;
    expect(label).toBeTruthy();
  });
  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
