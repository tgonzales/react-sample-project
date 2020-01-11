import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { LongTextField } from 'uniforms-antd';

const schema = new SimpleSchema({
  title: { type: String },
  link: { type: String },
  description: { 
    type: String,
    uniforms: {
      component: LongTextField
    }
  },
  tags: { type: String }
});

const bridge = new SimpleSchema2Bridge(schema);

export default bridge;