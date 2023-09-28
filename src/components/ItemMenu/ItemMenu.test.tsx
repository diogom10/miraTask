import React from 'react';
import {create, act} from 'react-test-renderer';
import {ItemMenu, ItemMenuProps} from './ItemMenu';
import {CheckIcon} from '../../assets/icons/check';

const props: ItemMenuProps = {
  title: 'Mark All tasks as Completed',
  icon: (
    <CheckIcon
      testID={`ItemMenu_icon`}
      width={20}
      height={20}
      fill={'#4270d4'}
    />
  ),
  testID: 'ItemMenu',
};

const component = create(<ItemMenu {...props} />);
const el_title = `${props.testID}_title`;
const el_icon = `${props.testID}_icon`;
const el_btn_action = `${props.testID}_btn_action`;

describe('ItemMenu Component', () => {
  test(`should render btn #${el_btn_action}`, async () => {
    const button = component.root.findByProps({testID: el_btn_action}).props;
    act(() => button.onPress());
  });
  test(`should render icon #${el_icon}`, async () => {
    const label = component.root.findByProps({testID: el_icon}).props;
    expect(label).toBeTruthy();
  });
  test(`should render label #${el_title}`, async () => {
    const label = component.root.findByProps({testID: el_title}).props;
    expect(label).toBeTruthy();
  });

  test('snapshot', () => {
    expect(component).toMatchSnapshot();
  });
});
