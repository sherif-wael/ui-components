
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Input from '../Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'outline',
};

export const WithLeftAddon = Template.bind({});
WithLeftAddon.args = {
  leftAddon: 'https://',
  variant: 'outline',
};

export const WithRightAddon = Template.bind({});
WithRightAddon.args = {
  rightAddon: '.com',
  variant: 'outline',
};

export const WithBothAddons = Template.bind({});
WithBothAddons.args = {
    leftAddon: "https://",    
    rightAddon: '.com',
    variant: 'outline',
};

export const InvalidInput = Template.bind({});
InvalidInput.args = {
  invalid: true,
  variant: 'outline',
};
