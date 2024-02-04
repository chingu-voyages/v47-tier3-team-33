import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
	verbose: true,
	transform: {
		'^.+\\.tsx?$': 'ts-ject',
	},
};

export default config;
