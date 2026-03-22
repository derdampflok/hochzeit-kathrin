export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    rootDir: './',
    testMatch: ['**/*.test.ts', '**/*.test.tsx'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                jsx: 'react-jsx',
                esModuleInterop: true,
                types: ['jest', '@testing-library/jest-dom', 'node'],
            },
        }],
    },
    moduleNameMapper: {
        '\\.(scss|sass|css)$': 'identity-obj-proxy',
    },
    setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/main.tsx',
    ],
}
