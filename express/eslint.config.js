export default [
  {
    overrides: [
      {
        files: ["tests/**/*"],
        plugins: ["jest"],
        env: {
          "jest/globals": true,
        },
      },
    ],
  },
];
