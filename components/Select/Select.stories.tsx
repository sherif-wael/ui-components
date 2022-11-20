
import { ComponentMeta, ComponentStory } from '@storybook/react';
import * as React from 'react';

import Select from '../Select';

export default {
  title: 'Components/Select',
  component: Select,
  argTypes: {
    children: {
      control: { type: 'text' },
    },
  },
  args: {
    options: [
      { label: "Option 1", value: "1" },
      { label: "Option 2", value: "2" },
      { label: "Option 3", value: "3" },
      { label: "Option 4", value: "4" },
      { label: "Option 5", value: "5" },
      { label: "Option 6", value: "6" }
    ]
  }
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Default = Template.bind({});
Default.args = {
  variant: 'outline'
};

export const InvalidSelect = Template.bind({});
InvalidSelect.args = {
  invalid: true
}